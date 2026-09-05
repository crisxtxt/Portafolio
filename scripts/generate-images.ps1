param()

$dir = "public\images"
New-Item -ItemType Directory -Force -Path $dir | Out-Null

function Write-Svg($name, $svg) {
  Set-Content -LiteralPath (Join-Path $dir "$name.svg") -Value $svg -Encoding UTF8
}

# --- Before / After pairs (obra gris vs acabado) ---
$base = @'
<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900" viewBox="0 0 1400 900">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{SKY1}"/><stop offset="1" stop-color="{SKY2}"/></linearGradient>
    <linearGradient id="body" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{B1}"/><stop offset="1" stop-color="{B2}"/></linearGradient>
  </defs>
  <rect width="1400" height="900" fill="url(#sky)"/>
  <rect x="0" y="700" width="1400" height="200" fill="#9b9386"/>
  <g fill="url(#body)">
    <rect x="250" y="240" width="420" height="470"/>
    <rect x="720" y="330" width="380" height="380"/>
    <rect x="330" y="120" width="160" height="120"/>
  </g>
  <g fill="{WIN}">
    <rect x="300" y="320" width="60" height="80"/><rect x="400" y="320" width="60" height="80"/>
    <rect x="340" y="440" width="60" height="80"/><rect x="440" y="440" width="60" height="80"/>
    <rect x="770" y="380" width="55" height="70"/><rect x="870" y="380" width="55" height="70"/>
    <rect x="970" y="380" width="55" height="70"/><rect x="770" y="490" width="55" height="70"/>
    <rect x="360" y="150" width="100" height="60"/>
  </g>
  <rect x="250" y="710" width="420" height="30" fill="url(#body)"/>
  <rect x="720" y="710" width="380" height="30" fill="url(#body)"/>
</svg>
'@

function New-BAPair($name, $sky1, $sky2, $b1, $b2, $win) {
  $svg = $base.Replace('{SKY1}', $sky1).Replace('{SKY2}', $sky2).Replace('{B1}', $b1).Replace('{B2}', $b2).Replace('{WIN}', $win)
  Write-Svg $name $svg
}

# obra gris: monótono gris/cauce
New-BAPair "casa-luz-before" "#d8d4cd" "#efedea" "#8f8a82" "#5f5b55" "#6b7480"
# acabado final: cálido carne+claro
New-BAPair "casa-luz-after" "#f3ead9" "#faf6ee" "#cfc4ae" "#8f826c" "#e8e3d3"

New-BAPair "loft-before" "#d8d4cd" "#efedea" "#7d7a75" "#4f4d49" "#5a6066"
New-BAPair "loft-after" "#e6e2dc" "#f5f3f0" "#b9b1a5" "#6f675e" "#efebe4"

New-BAPair "torre-before" "#cdd6dc" "#eef2f4" "#6b7480" "#41484f" "#5a6168"
New-BAPair "torre-after" "#d7e7f0" "#f2f7fa" "#a8c2d4" "#4e6a80" "#eaf3f7"

# --- Blueprints ---
$blueprint = @'
<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="1000" viewBox="0 0 1400 1000">
  <rect width="1400" height="1000" fill="#1e3a5f"/>
  <g stroke="#9fc3e8" stroke-width="2" fill="none">
    <rect x="120" y="100" width="1160" height="800"/>
    <rect x="180" y="160" width="300" height="240"/>
    <rect x="180" y="440" width="300" height="240"/>
    <rect x="520" y="160" width="300" height="520"/>
    <rect x="860" y="160" width="300" height="240"/>
    <rect x="860" y="440" width="200" height="300"/>
  </g>
  <g stroke="#9fc3e8" stroke-width="1.2" fill="none" opacity="0.6">
    <line x1="180" y1="400" x2="480" y2="400"/>
    <line x1="180" y1="680" x2="480" y2="680"/>
    <line x1="520" y1="420" x2="820" y2="420"/>
    <circle cx="330" cy="300" r="90" stroke-dasharray="8 8"/>
    <line x1="520" y1="300" x2="820" y2="300"/>
    <line x1="1060" y1="300" x2="1060" y2="440"/>
  </g>
  <g stroke="#7fa8d8" fill="none" opacity="0.5" stroke-width="1">
    <line x1="120" y1="120" x2="1280" y2="120"/>
    <line x1="120" y1="480" x2="1280" y2="480"/>
    <line x1="120" y1="880" x2="1280" y2="880"/>
    <line x1="330" y1="90" x2="330" y2="910"/>
    <line x1="670" y1="90" x2="670" y2="910"/>
    <line x1="1010" y1="90" x2="1010" y2="910"/>
  </g>
  <text x="80" y="60" fill="#9fc3e8" font-family="monospace" font-size="28">PLANTA NIVEL 01 — ESC 1:50 — PROYECTO CASA LUZ</text>
  <text x="80" y="960" fill="#7fa8d8" font-family="monospace" font-size="22">ARQ. CRISTINA VARGAS · Nº REG. CENARQ 12-485 · HOJA 01/03</text>
</svg>
'@
Write-Svg "casa-luz-blueprint" $blueprint

$blueprint2 = $blueprint.Replace('CASA LUZ', 'LOFT MONTAÑEZ').Replace('02', '02').Replace('01/03','01/04')
Write-Svg "loft-blueprint" $blueprint2

$blueprint3 = $blueprint.Replace('CASA LUZ', 'TORRE AURORA').Replace('01/03','02/06')
Write-Svg "torre-blueprint" $blueprint3

$blueprint4 = $blueprint.Replace('CASA LUZ', 'VILLA PAZO').Replace('01/03','01/03')
Write-Svg "villa-pazo-blueprint" $blueprint4

# --- Portraits ---
function New-Portrait($name, $bg1, $bg2, $skin, $shirt) {
  $svg = @"
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="$bg1"/><stop offset="1" stop-color="$bg2"/></linearGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#bg)"/>
  <g transform="translate(400,330)">
    <ellipse cx="0" cy="-40" rx="150" ry="180" fill="$skin"/>
    <rect x="-180" y="110" width="360" height="520" rx="20" fill="$shirt"/>
    <path d="M-150,110 Q0,200 150,110" fill="$shirt" stroke="#00000022"/>
    <path d="M-196,-40 Q0,40 196,-40" fill="#00000030"/>
    <path d="M-150,-220 Q0,-260 150,-220" fill="$skin"/>
    <rect x="-170" y="-230" width="340" height="90" rx="45" fill="#231d18"/>
  </g>
</svg>
"@
  Write-Svg $name $svg
}

New-Portrait "portrait-cristina" "#e9e2d4" "#d6cbb8" "#e0b594" "#b5653a"
New-Portrait "portrait-2" "#d5d6c8" "#c2c4ac" "#d9a47c" "#5f7160"
New-Portrait "portrait-3" "#d8d4cd" "#c6c1b7" "#c7926e" "#41484f"
New-Portrait "portrait-4" "#d6dbe0" "#c2cad1" "#dfae8b" "#7a8b6f"

# --- Studio extras ---
$atelier = @'
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
  <rect width="1600" height="1000" fill="#efe9dc"/>
  <rect x="200" y="120" width="200" height="420" fill="#cfc4ae"/>
  <rect x="430" y="180" width="250" height="360" fill="#b9b1a5"/>
  <rect x="720" y="90" width="380" height="450" fill="#d8d0c2"/>
  <rect x="1140" y="220" width="260" height="320" fill="#cfc4ae"/>
  <rect x="200" y="700" width="1200" height="140" rx="14" fill="#8f826c"/>
  <circle cx="300" cy="760" r="30" fill="#f0c987"/>
  <circle cx="1380" cy="760" r="22" fill="#b5653a"/>
  <g stroke="#9b9386" stroke-width="6" opacity="0.5">
    <line x1="0" y1="560" x2="1600" y2="560"/>
    <line x1="1000" y1="60" x2="1000" y2="560"/>
  </g>
</svg>
'@
Write-Svg "atelier" $atelier

$workspace = @'
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <rect width="1600" height="900" fill="#e6e0d3"/>
  <rect x="0" y="640" width="1600" height="260" fill="#a89f8e"/>
  <rect x="120" y="160" width="520" height="360" fill="#cfc4ae"/>
  <rect x="680" y="120" width="300" height="400" fill="#beb4a4"/>
  <rect x="1020" y="220" width="420" height="300" fill="#d8d0c2"/>
  <rect x="140" y="360" width="120" height="160" fill="#faf6ee"/>
  <circle cx="1520" cy="120" r="90" fill="#f0c987"/>
  <g fill="#5f594f">
    <circle cx="260" cy="700" r="34"/>
    <rect x="230" y="660" width="60" height="14" rx="7"/>
  </g>
</svg>
'@
Write-Svg "workspace" $workspace

Write-Output "Generated comparisons, blueprints, portraits, studio images"