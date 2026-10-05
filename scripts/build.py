"""Rebuild the static HTML menu from its reviewed, editable PDF transcription.
Run from the project root: python3 scripts/build.py
No framework or browser-side data request is needed.
"""
import json
import re
import unicodedata
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
data = json.loads((ROOT / 'data/menu.json').read_text(encoding='utf-8'))
drinks = json.loads((ROOT / 'data/drinks.json').read_text(encoding='utf-8'))
categories = [dict(c, menuType=kind, source=source['source'])
              for kind, source in [('speisen', data), ('getraenke', drinks)]
              for c in source['categories']]
html = (ROOT / 'index.html').read_text(encoding='utf-8')
e = escape
def markings(item):
    marks=item['marks']
    label=item.get('marksLabel','Allergene und Zusatzstoffe')
    return f'<span class="dish-marks"><span class="sr-only">{e(label)}: </span>{e(marks)}</span>' if marks else ''

catalog=[]
def slug(value):
    return re.sub(r'[^a-z0-9]+','-',unicodedata.normalize('NFKD',value).encode('ascii','ignore').decode().lower()).strip('-')
def dish(item, category):
    item=dict(item, marksLabel='Kennzeichnungen (Getränkekarte)' if category['menuType']=='getraenke' else 'Allergene und Zusatzstoffe')
    key=f'{category["id"]}-{item["code"].lower()}-{slug(item["name"])}'
    options=[]
    option_label=''
    if category['id']=='vorspeise-sushi' and item['code'] in ('23','24'):
        options=['Lachs','Thunfisch']
        option_label='Fisch wählen'
    elif category['id']=='signature':
        options=['Süßkartoffeln','Pommes','Reis']
        option_label='Beilage wählen'
    def cents(value): return int(value.replace(',','')) if value else None
    catalog.append({'key':key,'code':item['code'],'name':item['name'],'description':item['description'],'marks':item['marks'],'marksLabel':item['marksLabel'],'volume':item.get('volume',''),'menuType':category['menuType'],'variantLabel':item.get('variantLabel','Variante wählen'),'price':cents(item['price']),'variants':[{'code':v['code'],'name':v['name'],'price':cents(v['price'])} for v in item.get('variants',[])],'options':options,'optionLabel':option_label})
    price=f'<span class="dish-price">{e(item["price"])} €</span>' if item['price'] else ''
    desc=f'<p class="dish-description">{e(item["description"])}</p>' if item['description'] else ''
    volume=f'<span class="dish-volume">{e(item["volume"])}</span>' if item.get('volume') else ''
    variants=''
    if 'variants' in item:
        def variant_row(v):
            code=f'<span class="variant-code">{e(v["code"])}</span>' if category['menuType']=='speisen' else ''
            return f'<div><dt>{code}{e(v["name"])}</dt><dd>{e(v["price"])} €</dd></div>'
        variants='<dl class="dish-variants">'+''.join(variant_row(v) for v in item['variants'])+'</dl>'
    label='Auswählen' if options or 'variants' in item else 'Hinzufügen'
    control=f'<div class="dish-order"><button type="button" class="dish-add" data-add-dish="{e(key)}" aria-label="{e(item["name"])} {label.lower()}" hidden>{label}<span aria-hidden="true">+</span></button></div>'
    return f'<li class="menu-dish" data-code="{e(item["code"])}" data-source-file="{e(category["source"])}" data-source-page="{item["sourcePage"]}"><div class="dish-top"><span class="dish-code">{e(item["code"])}</span><div class="dish-name-wrap"><h4>{e(item["name"])}</h4>{volume}{markings(item)}</div>{price}</div>{desc}{variants}{control}</li>'

sections=[]
for cat in categories:
    quantity=f'<span class="category-quantity">{e(cat["quantity"])}</span>' if cat['quantity'] else ''
    intro=f'<p class="category-intro">{e(cat["intro"])}</p>' if cat['intro'] else ''
    rows=[]
    previous_group=''
    for item in cat['items']:
        group=item.get('group','')
        if group and group!=previous_group:
            rows.append(f'<li class="dish-group"><strong>{e(group)}</strong></li>')
        previous_group=group
        rows.append(dish(item,cat))
    sections.append(f'<section class="menu-category" id="menu-{e(cat["id"])}" data-category="{e(cat["id"])}" data-menu-type="{cat["menuType"]}" aria-labelledby="title-{e(cat["id"])}"><div class="category-heading"><h3 id="title-{e(cat["id"])}">{e(cat["name"])}</h3>{quantity}</div>{intro}<ul class="dish-list">'+''.join(rows)+'</ul></section>')

nav='<a class="category-link" href="#speisekarte" data-category="all" aria-current="true">Die ganze Karte <span>↗</span></a>'
options='<option value="all">Die ganze Karte</option>'
for kind, label in [('speisen','Speisen'),('getraenke','Getränke')]:
    nav+=f'<a class="category-link category-overview" href="#speisekarte" data-category="{kind}">{label}<span>↗</span></a>'
    options+=f'<optgroup label="{label}"><option value="{kind}">Alle {label}</option>'
    for c in categories:
        if c['menuType']!=kind: continue
        nav+=f'<a class="category-link" href="#menu-{e(c["id"])}" data-category="{e(c["id"])}">{e(c["name"])}<span>↗</span></a>'
        options+=f'<option value="{e(c["id"])}">{e(c["name"])}</option>'
    options+='</optgroup>'
allergens='<div><h3>Allergene</h3><dl>'+''.join(f'<div><dt>{e(k)}</dt><dd>{e(v)}</dd></div>' for k,v in data['allergens'].items())+'</dl></div><div><h3>Zusatzstoffe</h3><dl>'+''.join(f'<div><dt>{e(k)}</dt><dd>{e(v)}</dd></div>' for k,v in data['additives'].items())+'</dl></div>'
preview_specs=[('nigiri','N1','01 / NIGIRI'),('fusion','F29','02 / FUSION ROLLS'),('signature','41','03 / SIGNATURE'),('sets','M103','04 / ZUM TEILEN')]
previews=[]
for cat_id,code,label in preview_specs:
    item=next(i for c in data['categories'] if c['id']==cat_id for i in c['items'] if i['code']==code)
    quantity=next(c['quantity'] for c in data['categories'] if c['id']==cat_id)
    previews.append(f'<article class="dish-preview"><p class="eyebrow">{e(label)}</p><div class="preview-title"><h3><a href="#menu-{e(cat_id)}" data-show-category="{e(cat_id)}">{e(item["name"])}</a></h3><span class="preview-price">{e(item["price"])} €</span></div><p>{e(item["description"])}</p><div class="preview-bottom">{markings(item)}<span class="eyebrow">{e(quantity)}</span></div></article>')

def replace_block(name,body):
    global html
    html=re.sub(rf'<!-- {name} START -->.*?<!-- {name} END -->',lambda _:f'<!-- {name} START -->\n{body}\n<!-- {name} END -->',html,flags=re.S)
replace_block('MENU','\n'.join(sections))
replace_block('CATEGORY NAV',nav)
replace_block('ALLERGENS',allergens)
replace_block('PREVIEWS','\n'.join(previews))
payload=json.dumps(catalog,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c').replace('>','\\u003e').replace('&','\\u0026')
replace_block('ORDER CATALOG',f'<script type="application/json" id="order-catalog">{payload}</script>')
html=re.sub(r'(<select id="menu-category"[^>]*>).*?(</select>)',lambda m:m.group(1)+options+m.group(2),html,flags=re.S)
(ROOT/'index.html').write_text(html,encoding='utf-8')
print(f'Built {len(sections)} categories and {len(catalog)} food/drink items.')
