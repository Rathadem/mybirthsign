#!/usr/bin/env python3
"""Draws the Vassa guide images from the site's own art: images/og/chol-vassa.jpg (1200x630) and
images/guides/chol-vassa-card.webp (900x373). Night background + lotus are existing site images;
the Vassa candles and the rain are drawn here."""
import random
from PIL import Image, ImageDraw, ImageFilter
R = "/home/claude/mybirthsign/"
random.seed(7)

def scene(W, H, cx):
    bg = Image.open(R + "images/fortune/hero-night.webp").convert("RGB")
    s = max(W / bg.width, H / bg.height); bg = bg.resize((int(bg.width * s) + 1, int(bg.height * s) + 1), Image.LANCZOS)
    bg = bg.crop(((bg.width - W) // 2, (bg.height - H) // 2, (bg.width - W) // 2 + W, (bg.height - H) // 2 + H)).convert("RGBA")
    # rain
    rain = Image.new("RGBA", (W, H)); d = ImageDraw.Draw(rain)
    for _ in range(int(W * H / 2600)):
        x, y, L = random.randint(-40, W), random.randint(-40, H), random.randint(14, 34)
        d.line([(x, y), (x - L * .28, y + L)], fill=(205, 215, 255, random.randint(40, 95)), width=1)
    bg = Image.alpha_composite(bg, rain)
    # three candles (tall Vassa candle in the middle)
    glow = Image.new("RGBA", (W, H)); g = ImageDraw.Draw(glow)
    lay = Image.new("RGBA", (W, H)); c = ImageDraw.Draw(lay)
    u = H / 630
    for dx, h, w in ((-0.62, 250, 46), (0, 360, 64), (0.62, 230, 44)):
        x = cx + dx * 150 * u; h *= u; w *= u; base = H - 70 * u; top = base - h
        for r in range(6, 0, -1):                                                                   # soft halo around the flame
            rr = 40 * u * r; g.ellipse([x - rr, top - 30 * u - rr, x + rr, top - 30 * u + rr], fill=(255, 185, 80, 48))
        for i in range(int(w)):                                                                     # rounded wax body: shade left to right
            t = i / max(1, w - 1); k = 1 - abs(t - .35) * 1.25
            col = (int(190 + 60 * k), int(140 + 75 * k), int(55 + 70 * k), 255)
            c.line([(x - w / 2 + i, top + 4 * u), (x - w / 2 + i, base)], fill=col)
        c.ellipse([x - w / 2, top - 2 * u, x + w / 2, top + 10 * u], fill=(250, 222, 150, 255))   # melted top
        for k in (0.3, 0.62):                                                                       # two carved gold rings
            yy = top + h * k; c.rectangle([x - w / 2, yy, x + w / 2, yy + 5 * u], fill=(214, 160, 62, 255))
        c.line([(x, top + 2 * u), (x, top - 10 * u)], fill=(60, 40, 30, 255), width=max(1, int(2 * u)))
        c.ellipse([x - 11 * u, top - 50 * u, x + 11 * u, top - 6 * u], fill=(255, 205, 90, 255))
        c.ellipse([x - 5 * u, top - 34 * u, x + 5 * u, top - 10 * u], fill=(255, 250, 220, 255))
    glow = glow.filter(ImageFilter.GaussianBlur(26 * u))
    bg = Image.alpha_composite(Image.alpha_composite(bg, glow), lay)
    lotus = Image.open(R + "images/wedding/lotus-gold.webp").convert("RGBA")
    lw = int(330 * u); lotus = lotus.resize((lw, int(lotus.height * lw / lotus.width)), Image.LANCZOS)
    bg.alpha_composite(lotus, (int(cx - lw / 2), int(H - lotus.height - 8 * u)))
    return bg.convert("RGB")

scene(1200, 630, 560).save(R + "images/og/chol-vassa.jpg", quality=86, optimize=True)
scene(900, 373, 450).save(R + "images/guides/chol-vassa-card.webp", quality=82)
print("images written")
