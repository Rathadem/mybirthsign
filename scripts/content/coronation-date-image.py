"""Write the Coronation Day date onto the banner image.

    python3 scripts/content/coronation-date-image.py 2027

Starts from the original supplied banner (scripts/content/assets/coronation-day-source.jpg),
removes its printed date line, writes "October 29, <year>" in Crimson Text (SIL OFL) in the
same gold, and saves images/guides/coronation-day.jpg. Needs: pip install pillow opencv-python-headless numpy
"""
import os, sys
import numpy as np, cv2
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
SRC = os.path.join(HERE, "assets", "coronation-day-source.jpg")
FONT = os.path.join(HERE, "assets", "crimson-text-400.woff")
OUT = os.path.join(ROOT, "images", "guides", "coronation-day.jpg")

year = int(sys.argv[1])
text = f"October 29, {year}"
im = np.array(Image.open(SRC).convert("RGB"))
x0, y0, x1, y1 = 46, 80, 168, 108                      # the date line in the 764x280 source
reg = im[y0:y1, x0:x1].astype(int)
lum = reg.mean(axis=2)
m = (lum > 95) & (reg[:, :, 0] > reg[:, :, 2] + 25)   # warm, bright text pixels
ys, xs = np.nonzero(m)
col = tuple(int(c) for c in np.median(reg[m & (lum > np.percentile(lum[m], 60))], axis=0))
mask = np.zeros(im.shape[:2], np.uint8); mask[y0:y1, x0:x1][m] = 255
mask = cv2.dilate(mask, np.ones((5, 5), np.uint8), iterations=2)
clean = cv2.inpaint(cv2.cvtColor(im, cv2.COLOR_RGB2BGR), mask, 7, cv2.INPAINT_TELEA)
clean = Image.fromarray(cv2.cvtColor(clean, cv2.COLOR_BGR2RGB))
font = ImageFont.truetype(FONT, 20)
cols = np.nonzero(m.any(axis=0))[0]
right = m[:, int(cols.min() + (cols.max() - cols.min()) * 0.55):]
baseline = np.nonzero(right.any(axis=1))[0].max() + y0  # bottom of the original digits
ImageDraw.Draw(clean).text((xs.min() + x0 - font.getbbox(text)[0], baseline - font.getbbox("2004")[3]), text, font=font, fill=col)
clean.save(OUT, quality=92, subsampling=0)
print("wrote", OUT, "with", text)
