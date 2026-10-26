"""Build the root index.html from the reviewed food/drink PDF transcriptions."""
import json
import re
import unicodedata
from html import escape as e
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
data = json.loads((ROOT / 'data/menu.json').read_text(encoding='utf-8'))
drinks = json.loads((ROOT / 'data/drinks.json').read_text(encoding='utf-8'))
groups = json.loads((ROOT / 'data/menu-groups.json').read_text(encoding='utf-8'))
parent = {category: group['id'] for group in groups for category in group['categories']}
categories = [dict(c, menuType=kind, source=source['source'], menuGroup=parent[c['id']])
              for kind, source in [('speisen', data), ('getraenke', drinks)]
              for c in source['categories']]
assert len(parent) == len(categories), 'Every PDF category must have exactly one menu group.'
assert len(set(c['id'] for c in categories)) == len(categories)
html = (ROOT / 'index.html').read_text(encoding='utf-8')
catalog = []

def markings(item):
    label = item.get('marksLabel', 'Allergene und Zusatzstoffe')
    return f'<span class="dish-marks"><span class="sr-only">{e(label)}: </span>{e(item["marks"])}</span>' if item['marks'] else ''

def slug(value):
    return re.sub(r'[^a-z0-9]+', '-', unicodedata.normalize('NFKD', value).encode('ascii', 'ignore').decode().lower()).strip('-')

def cents(value):
    return int(value.replace(',', '')) if value else None

def dish(item, category):
    item = dict(item, marksLabel='Kennzeichnungen (Getränkekarte)' if category['menuType'] == 'getraenke' else 'Allergene und Zusatzstoffe')
    key = f'{category["id"]}-{item["code"].lower()}-{slug(item["name"])}'
    options, option_label = [], ''
    if category['id'] == 'vorspeise-sushi' and item['code'] in ('23', '24'):
        options, option_label = ['Lachs', 'Thunfisch'], 'Fisch wählen'
    elif category['id'] == 'signature':
        options, option_label = ['Süßkartoffeln', 'Pommes', 'Reis'], 'Beilage wählen'
    catalog.append({
        'key': key, 'code': item['code'], 'name': item['name'], 'description': item['description'],
        'marks': item['marks'], 'marksLabel': item['marksLabel'], 'volume': item.get('volume', ''),
        'serving': item.get('quantity', category['quantity']), 'menuType': category['menuType'],
        'variantLabel': item.get('variantLabel', 'Variante wählen'), 'price': cents(item['price']),
        'variants': [{'code': v['code'], 'name': v['name'], 'price': cents(v['price'])} for v in item.get('variants', [])],
        'options': options, 'optionLabel': option_label
    })
    price = f'<span class="dish-price">{e(item["price"])} €</span>' if item['price'] else ''
    desc = f'<p class="dish-description">{e(item["description"])}</p>' if item['description'] else ''
    volume = f'<span class="dish-volume">{e(item["volume"])}</span>' if item.get('volume') else ''
    serving = f'<span class="dish-volume">{e(item["quantity"])}</span>' if item.get('quantity') else ''
    spicy = '<span class="dish-spicy">Scharf</span>' if item.get('spicy') else ''
    variants = ''
    if 'variants' in item:
        def variant_row(v):
            code = f'<span class="variant-code">{e(v["code"])}</span>' if category['menuType'] == 'speisen' else ''
            return f'<div><dt>{code}{e(v["name"])}</dt><dd>{e(v["price"])} €</dd></div>'
        variants = '<dl class="dish-variants">' + ''.join(variant_row(v) for v in item['variants']) + '</dl>'
    label = 'Auswählen' if options or 'variants' in item else 'Hinzufügen'
    control = f'<div class="dish-order"><button type="button" class="dish-add" data-add-dish="{e(key)}" aria-label="{e(item["name"])} {label.lower()}" hidden>{label}<span aria-hidden="true">+</span></button></div>'
    return f'<li class="menu-dish" data-code="{e(item["code"])}" data-source-file="{e(category["source"])}" data-source-page="{item["sourcePage"]}"><div class="dish-top"><span class="dish-code">{e(item["code"])}</span><div class="dish-name-wrap"><h4>{e(item["name"])}</h4>{volume}{serving}{spicy}{markings(item)}</div>{price}</div>{desc}{variants}{control}</li>'

sections = []
for cat in categories:
    quantity = f'<span class="category-quantity">{e(cat["quantity"])}</span>' if cat['quantity'] else ''
    intro = f'<p class="category-intro">{e(cat["intro"])}</p>' if cat['intro'] else ''
    rows, previous_group = [], ''
    for item in cat['items']:
        group = item.get('group', '')
        if group and group != previous_group:
            rows.append(f'<li class="dish-group"><strong>{e(group)}</strong></li>')
        previous_group = group
        rows.append(dish(item, cat))
    sections.append(f'<section class="menu-category" id="menu-{e(cat["id"])}" data-category="{e(cat["id"])}" data-menu-group="{cat["menuGroup"]}" data-menu-type="{cat["menuType"]}" aria-labelledby="title-{e(cat["id"])}"><div class="category-heading"><h3 id="title-{e(cat["id"])}">{e(cat["name"])}</h3>{quantity}</div>{intro}<ul class="dish-list">' + ''.join(rows) + '</ul></section>')

nav = ''.join(f'<a class="category-link category-overview" id="{g["id"]}" href="#menu-{g["categories"][0]}" data-category="{g["id"]}"><span class="menu-index" aria-hidden="true">{n:02}</span><span>{e(g["name"])}</span><span class="menu-arrow" aria-hidden="true">↗</span></a>' for n, g in enumerate(groups, 1))
nav += '<a class="category-link all-categories" href="#speisekarte" data-category="all">Die ganze Karte<span class="menu-arrow" aria-hidden="true">↗</span></a>'
subnav = ''.join(f'<a class="category-link subcategory-link" href="#menu-{e(c["id"])}" data-category="{e(c["id"])}" data-parent-group="{c["menuGroup"]}">{e(c["name"])}</a>' for c in categories)
options = '<option value="all">Die ganze Karte</option><option value="speisen">Alle Speisen</option>'
for group in groups:
    options += f'<optgroup label="{e(group["name"])}"><option value="{group["id"]}">Alle {e(group["name"])}</option>'
    options += ''.join(f'<option value="{e(c["id"])}">{e(c["name"])}</option>' for c in categories if c['menuGroup'] == group['id'])
    options += '</optgroup>'
def legend(source):
    return ''.join('<div><h3>' + title + '</h3><dl>' + ''.join(f'<div><dt>{e(k)}</dt><dd>{e(v)}</dd></div>' for k, v in source[field].items()) + '</dl></div>'
                   for title, field in [('Allergene', 'allergens'), ('Zusatzstoffe', 'additives')])
previews = []
for cat_id, code, label in [('nigiri', 'N1', '01 / NIGIRI'), ('fusion', 'F29', '02 / FUSION ROLLS'), ('signature', '41', '03 / SIGNATURE'), ('sets', 'M103', '04 / ZUM TEILEN')]:
    cat = next(c for c in categories if c['id'] == cat_id)
    item = next(i for i in cat['items'] if i['code'] == code)
    previews.append(f'<article class="dish-preview"><p class="eyebrow">{e(label)}</p><div class="preview-title"><h3><a href="#menu-{e(cat_id)}" data-show-category="{e(cat_id)}">{e(item["name"])}</a></h3><span class="preview-price">{e(item["price"])} €</span></div><p>{e(item["description"])}</p><div class="preview-bottom">{markings(item)}<span class="eyebrow">{e(cat["quantity"])}</span></div></article>')

def replace_block(name, body):
    global html
    pattern = rf'<!-- {name} START -->.*?<!-- {name} END -->'
    assert re.search(pattern, html, re.S), f'Missing HTML marker: {name}'
    html = re.sub(pattern, lambda _: f'<!-- {name} START -->\n{body}\n<!-- {name} END -->', html, flags=re.S)

def embedded_json(id, value):
    payload = json.dumps(value, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c').replace('>', '\\u003e').replace('&', '\\u0026')
    return f'<script type="application/json" id="{id}">{payload}</script>'

replace_block('MENU', '\n'.join(sections))
replace_block('CATEGORY NAV', nav)
replace_block('SUBCATEGORY NAV', subnav)
replace_block('ALLERGENS', legend(data))
replace_block('DRINK ALLERGENS', legend(drinks))
replace_block('PREVIEWS', '\n'.join(previews))
replace_block('ORDER CATALOG', embedded_json('order-catalog', catalog) + '\n' + embedded_json('menu-groups', groups))
html = re.sub(r'(<select id="menu-category"[^>]*>).*?(</select>)', lambda m: m.group(1) + options + m.group(2), html, flags=re.S)
(ROOT / 'index.html').write_text(html, encoding='utf-8')
print(f'Built {len(groups)} menu groups, {len(categories)} PDF categories and {len(catalog)} items.')
