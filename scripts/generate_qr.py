"""Generate the footer's static, locally served Google Maps QR code.

Build-only requirement: pip install qrcode
The website does not load a QR service or a JavaScript QR library.
"""
from pathlib import Path
import re
from html import unescape

import qrcode
from qrcode.image.svg import SvgPathFillImage

ROOT = Path(__file__).resolve().parents[1]
html = (ROOT / 'index.html').read_text(encoding='utf-8')
match = re.search(r'<a class="footer-qr-code" href="([^"]+)"', html)
if not match:
    raise ValueError('Footer QR destination is missing from index.html')
url = unescape(match.group(1))
if not url.startswith('https://'):
    raise ValueError('The QR destination must be a public HTTPS URL')

qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, border=4)
qr.add_data(url)
qr.make(fit=True)
qr.make_image(image_factory=SvgPathFillImage).save(ROOT / 'assets' / 'location-qr.svg')
print(f'Generated location-qr.svg ({qr.modules_count} modules, four-module quiet zone).')
