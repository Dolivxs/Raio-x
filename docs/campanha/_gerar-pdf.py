import re, markdown, html as ihtml

SRC = 'docs/campanha/banco-de-copys-45-dias.md'
OUT_HTML = '/tmp/banco.html'

md = open(SRC, encoding='utf-8').read()

# remove o titulo/capa do markdown (vira capa propria)
md = md.split('---', 1)[1] if md.startswith('# BANCO') else md
md = re.sub(r'^\s*#\s*BANCO DE COPYS.*?\n', '', md)
md = re.sub(r'^###\s*Candidato a Deputado Federal.*?\n', '', md, flags=re.M)
md = re.sub(r'^\*\*Base:\*\*.*?\n', '', md, flags=re.M)
md = re.sub(r'^\*\*Formato:\*\*.*?\n', '', md, flags=re.M)
md = md.lstrip('\n-* \n')

body = markdown.markdown(md, extensions=['tables', 'sane_lists', 'nl2br'])

# checkbox markdown virando caixinha visual
body = body.replace('[ ]', '<span class="cbx"></span>')

# destaca o bloco de legenda (texto pronto para copiar)
body = re.sub(
    r'(<p><strong>Legenda:</strong>.*?)(?=<p><strong>(?:CTA|Hashtags|Produ|Roteiro|Estrutura))',
    r'<div class="copybox">\1</div>', body, flags=re.S)

CSS = """
@page { size: A4; margin: 18mm 16mm 20mm 16mm; }
:root{
  --ink:#16181d; --muted:#5d6472; --line:#e2e5ea;
  --accent:#0f4c81; --accent-soft:#eef3f8; --gold:#b8862b;
}
*{box-sizing:border-box}
body{
  font-family:"Liberation Sans","DejaVu Sans",Arial,sans-serif;
  color:var(--ink); font-size:10.2pt; line-height:1.55; margin:0;
  -webkit-print-color-adjust:exact; print-color-adjust:exact;
}

/* ---------- CAPA ---------- */
.cover{height:245mm;display:flex;flex-direction:column;justify-content:space-between;page-break-after:always}
.cover .top{border-top:6px solid var(--accent);padding-top:10mm}
.cover .kicker{font-size:9pt;letter-spacing:.22em;text-transform:uppercase;color:var(--accent);font-weight:700}
.cover h1{font-family:"Liberation Serif","DejaVu Serif",Georgia,serif;font-size:40pt;line-height:1.05;margin:8mm 0 4mm;letter-spacing:-.01em}
.cover h2{font-size:13pt;font-weight:400;color:var(--muted);margin:0;max-width:130mm}
.cover .meta{border-top:1px solid var(--line);padding-top:6mm;font-size:9.5pt;color:var(--muted)}
.cover .meta b{color:var(--ink)}
.cover .pillbox{display:flex;gap:4mm;flex-wrap:wrap;margin:10mm 0}
.cover .pill{background:var(--accent-soft);color:var(--accent);border-radius:2mm;padding:2mm 4mm;font-size:8.6pt;font-weight:700;letter-spacing:.04em}
.cover .quote{font-family:"Liberation Serif","DejaVu Serif",Georgia,serif;font-style:italic;font-size:15pt;color:var(--ink);border-left:3px solid var(--gold);padding-left:6mm;margin:0}

/* ---------- TITULOS ---------- */
h1{
  font-family:"Liberation Serif","DejaVu Serif",Georgia,serif;
  font-size:22pt;line-height:1.15;margin:0 0 2mm;padding-top:4mm;
  border-top:4px solid var(--accent);page-break-before:always;page-break-after:avoid;
}
h1:first-of-type{page-break-before:avoid}
h2{
  font-size:13.5pt;margin:9mm 0 2mm;padding-bottom:1.5mm;
  border-bottom:1px solid var(--line);page-break-after:avoid;letter-spacing:-.01em;
}
h3{
  font-size:11pt;margin:7mm 0 2mm;padding:2.5mm 4mm;background:var(--accent-soft);
  border-left:3px solid var(--accent);color:var(--accent);page-break-after:avoid;
  letter-spacing:.01em;
}
h1+p em, h2+p em{color:var(--muted)}

p{margin:0 0 2.6mm;orphans:2;widows:2}
strong{color:#0b0d12}
em{color:inherit}
a{color:var(--accent);text-decoration:none}

ul,ol{margin:0 0 3mm;padding-left:5.5mm}
li{margin:.6mm 0}

blockquote{
  margin:3mm 0;padding:3mm 5mm;background:#fbf7ee;border-left:3px solid var(--gold);
  color:#4a3c1d;font-size:9.6pt;page-break-inside:avoid;
}
blockquote p{margin:0 0 1.5mm}
blockquote p:last-child{margin:0}

table{width:100%;border-collapse:collapse;margin:3mm 0 5mm;font-size:9pt;page-break-inside:avoid}
th{background:var(--accent);color:#fff;text-align:left;padding:2mm 2.5mm;font-size:8.6pt;letter-spacing:.03em}
td{border-bottom:1px solid var(--line);padding:2mm 2.5mm;vertical-align:top}
tr:nth-child(even) td{background:#f7f9fb}

hr{border:0;border-top:1px solid var(--line);margin:6mm 0}

code{font-family:"DejaVu Sans Mono",monospace;font-size:8.8pt;background:#f1f3f6;padding:.4mm 1.2mm;border-radius:1mm}

.copybox{
  background:#fcfcfd;border:1px solid var(--line);border-radius:1.5mm;
  padding:3mm 4mm 1.5mm;margin:2mm 0 3mm;page-break-inside:avoid;
}
.copybox p{margin:0 0 2.4mm}
.copybox p:last-child{margin-bottom:1mm}

.cbx{display:inline-block;width:3mm;height:3mm;border:1px solid var(--muted);border-radius:.6mm;vertical-align:-.3mm;margin-right:1mm}
"""

COVER = """
<div class="cover">
  <div class="top">
    <div class="kicker">Plano de conte&uacute;do &middot; 45 dias</div>
    <h1>Banco de<br>Copys</h1>
    <h2>Postagens semanais para os 45 dias de campanha &mdash; candidato a deputado federal pelo Tocantins</h2>
    <div class="pillbox">
      <span class="pill">4 FASES</span>
      <span class="pill">3 PILARES DE RECONHECIMENTO</span>
      <span class="pill">8 PILARES DE CONTE&Uacute;DO</span>
      <span class="pill">7 BANDEIRAS</span>
      <span class="pill">7 SEMANAS &middot; 49 POSTS</span>
    </div>
  </div>
  <p class="quote">&ldquo;Ele n&atilde;o fala apenas do que conhece.<br>Ele fala do que viveu.&rdquo;</p>
  <div class="meta">
    <p><b>Documento-base:</b> Mapa de Campanha &mdash; Planejamento Estrat&eacute;gico, 45 dias</p>
    <p><b>Uso interno:</b> comunica&ccedil;&atilde;o, marketing digital, produ&ccedil;&atilde;o audiovisual e redes sociais</p>
    <p><b>Aten&ccedil;&atilde;o:</b> refor&ccedil;o de n&uacute;mero, pedido de voto, uso de imagem de terceiros e dados citados
    devem ser validados pelo jur&iacute;dico da campanha, conforme as regras eleitorais aplic&aacute;veis.</p>
  </div>
</div>
"""

doc = f"""<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8">
<title>Banco de Copys — Campanha 45 dias</title>
<style>{CSS}</style></head>
<body>{COVER}{body}</body></html>"""

open(OUT_HTML, 'w', encoding='utf-8').write(doc)
print('html ok', len(doc))
