#!/usr/bin/env python3
"""Images for the three calendar guides, made only from the site's own art (images/fortune/*):
   holidays -> right side of hero-scene (pagoda town, moon, lanterns)
   animal year & Sak -> horse and zodiac wheel from hero-horse
   leap months -> night sky (hero-night) with 13 drawn moons, the 13th marking the extra month
Each guide gets images/og/<slug>.jpg (1200x630), images/guides/<slug>-card.webp (900x373) and a hero."""
from PIL import Image, ImageDraw, ImageFilter
R = "/home/claude/mybirthsign/images/"

def fit(im, W, H, cx=.5, cy=.5):
    s = max(W / im.width, H / im.height); im = im.resize((int(im.width * s) + 1, int(im.height * s) + 1), Image.LANCZOS)
    x = int((im.width - W) * cx); y = int((im.height - H) * cy); return im.crop((x, y, x + W, y + H))

def save(slug, base, cx=.5, cy=.5):
    fit(base, 1200, 630, cx, cy).convert("RGB").save(R + f"og/{slug}.jpg", quality=85, optimize=True)
    fit(base, 900, 373, cx, cy).convert("RGB").save(R + f"guides/{slug}-card.webp", quality=82)
    fit(base, 1600, 560, cx, cy).convert("RGB").save(R + f"guides/{slug}-hero.webp", quality=80)

scene = Image.open(R + "fortune/hero-scene.webp").convert("RGB")
save("cambodian-holidays", scene.crop((1150, 0, 2000, 560)), .5, .5)

horse = Image.open(R + "fortune/hero-horse.webp").convert("RGB")
comp = Image.new("RGB", (1500, 560)); comp.paste(horse.crop((0, 0, 750, 560)), (0, 0)); comp.paste(horse.crop((1250, 0, 2000, 560)), (750, 0))
save("khmer-animal-year-sak", comp, .5, .5)

night = Image.open(R + "fortune/hero-night.webp").convert("RGBA")
night = fit(night, 1500, 620)
glow = Image.new("RGBA", night.size); g = ImageDraw.Draw(glow)
n, r, y = 13, 30, 210
x0, x1 = 230, 1270; gap = (x1 - x0) / (n - 1)
moons = []
for i in range(n):
    x = x0 + i * gap
    g.ellipse([x - r - 16, y - r - 16, x + r + 16, y + r + 16], fill=(243, 215, 143, 60 if i < 12 else 150))
    m = Image.new("RGBA", (2 * r + 2, 2 * r + 2)); md = ImageDraw.Draw(m)
    md.ellipse([1, 1, 2 * r, 2 * r], fill=(243, 215, 143, 255))
    k = (i % 12) / 11.0 if i < 12 else 0.5            # 0 new -> 0.5 full -> 1 new; the 13th (extra) month is drawn full
    if i < 12 and abs(k - 0.5) > 0.02:
        sh = Image.new("RGBA", m.size); sd = ImageDraw.Draw(sh)
        off = (k - 0.5) * 4 * r                        # shadow disc slides across the moon
        sd.ellipse([1 - off, 1, 2 * r - off, 2 * r], fill=(24, 18, 56, 240))
        mask = Image.new("L", m.size); ImageDraw.Draw(mask).ellipse([1, 1, 2 * r, 2 * r], fill=255)
        sh.putalpha(Image.composite(sh.getchannel("A"), Image.new("L", m.size), mask))
        m.alpha_composite(sh)
    moons.append((m, int(x - r), int(y - r)))
glow = glow.filter(ImageFilter.GaussianBlur(12)); night.alpha_composite(glow)
for m, x, yy in moons: night.alpha_composite(m, (x, yy))
d = ImageDraw.Draw(night); xl = x0 + 12 * gap
d.ellipse([xl - r - 8, y - r - 8, xl + r + 8, y + r + 8], outline=(255, 236, 170, 255), width=3)
save("khmer-leap-months", night.convert("RGB"), .5, .3)
print("images written")
