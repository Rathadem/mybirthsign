#!/usr/bin/env python3
"""Build the 12 daily-favicon icons from the site's own gold zodiac badges.

    python3 scripts/favicon-icons.py      (needs: pip install potracer cairosvg pillow numpy scikit-image)

For each animal it lifts the gold silhouette out of images/zodiac-badges/<animal>.webp (dropping the ring,
the purple sky and the small stars), traces it to a smooth vector path, and writes:
    images/favicon/<animal>.svg      deep-navy rounded square, metallic-gold silhouette, two small stars
    images/favicon/<animal>-32.png   for browsers that do not use SVG favicons
    images/favicon/<animal>-16.png
Run once; the icons are static files. js/daily-favicon.js only chooses which one to show.
"""
import os, warnings, numpy as np, potrace, cairosvg
warnings.filterwarnings("ignore", category=FutureWarning)
from PIL import Image
from skimage import morphology, measure, filters

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "images", "zodiac-badges")
OUT = os.path.join(ROOT, "images", "favicon")
ANIMALS = ["rat", "ox", "tiger", "rabbit", "dragon", "snake", "horse", "goat", "monkey", "rooster", "dog", "pig"]
TRACE = 1024          # tracing canvas
VB = 64               # SVG viewBox size
INNER = 52            # silhouette box inside the 64 viewBox

def silhouette(name):
    im = np.asarray(Image.open(os.path.join(SRC, name + ".webp")).convert("RGBA")).astype(int)
    r, g, b, a = im[..., 0], im[..., 1], im[..., 2], im[..., 3]
    gold = (a > 128) & (r > 120) & (r - b > 45) & (g > 80)
    h, w = gold.shape
    yy, xx = np.mgrid[0:h, 0:w]
    cy, cx = h / 2, w / 2
    gold &= np.hypot(yy - cy, xx - cx) < 0.40 * min(h, w)      # inside the ring only
    gold = morphology.remove_small_objects(gold, 40)              # drop sparkles / specks
    gold = morphology.remove_small_holes(gold, 30)
    lab = measure.label(gold)
    if lab.max() > 1:                                             # keep the animal (largest parts)
        sizes = np.bincount(lab.ravel()); sizes[0] = 0
        keep = sizes >= 0.04 * sizes.max()
        gold = keep[lab]
    ys, xs = np.nonzero(gold)
    y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    crop = gold[y0:y1, x0:x1]
    side = max(crop.shape)
    sq = np.zeros((side, side), bool)
    oy, ox = (side - crop.shape[0]) // 2, (side - crop.shape[1]) // 2
    sq[oy:oy + crop.shape[0], ox:ox + crop.shape[1]] = crop
    big = np.asarray(Image.fromarray((sq * 255).astype(np.uint8)).resize((TRACE, TRACE), Image.LANCZOS)) / 255.0
    big = filters.gaussian(big, 3) > 0.5
    big = morphology.binary_dilation(big, morphology.disk(9))     # thicken thin lines so 16px stays readable
    big = morphology.binary_closing(big, morphology.disk(6))
    return big

def path_d(mask):
    bm = potrace.Bitmap(~mask)   # potracer traces False pixels as ink
    plist = bm.trace(turdsize=60, alphamax=1.0, opticurve=True, opttolerance=0.4)
    f = lambda p: f"{p.x:.0f} {p.y:.0f}"
    parts = []
    for curve in plist:
        parts.append("M" + f(curve.start_point))
        for seg in curve.segments:
            if seg.is_corner:
                parts.append("L" + f(seg.c) + "L" + f(seg.end_point))
            else:
                parts.append("C" + f(seg.c1) + " " + f(seg.c2) + " " + f(seg.end_point))
        parts.append("Z")
    return "".join(parts)

def svg(d):
    s = INNER / TRACE
    off = (VB - INNER) / 2
    star = lambda x, y, r: (f'<path d="M{x} {y - r}Q{x} {y} {x + r} {y}Q{x} {y} {x} {y + r}Q{x} {y} {x - r} {y}Q{x} {y} {x} {y - r}Z" fill="#f3dc9b"/>')
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {VB} {VB}">'
        '<defs><linearGradient id="n" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b2552"/><stop offset="1" stop-color="#0a1028"/></linearGradient>'
        '<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbe7a8"/><stop offset=".5" stop-color="#d4af37"/><stop offset="1" stop-color="#a87b2a"/></linearGradient></defs>'
        f'<rect width="{VB}" height="{VB}" rx="13" fill="url(#n)"/>'
        f'<rect x="1.5" y="1.5" width="{VB - 3}" height="{VB - 3}" rx="11.5" fill="none" stroke="#d4af37" stroke-opacity=".55" stroke-width="1.5"/>'
        + star(9, 9, 3.2) + star(56, 55, 2.4) +
        f'<path transform="translate({off} {off}) scale({s:.6f})" fill="url(#g)" d="{d}"/>'
        '</svg>'
    )

def main():
    os.makedirs(OUT, exist_ok=True)
    for a in ANIMALS:
        d = path_d(silhouette(a))
        doc = svg(d)
        with open(os.path.join(OUT, a + ".svg"), "w") as fh:
            fh.write(doc)
        for px in (32, 16):
            cairosvg.svg2png(bytestring=doc.encode(), write_to=os.path.join(OUT, f"{a}-{px}.png"), output_width=px, output_height=px)
        print(f"{a}: svg {len(doc) / 1024:.1f} KB")

if __name__ == "__main__":
    main()
