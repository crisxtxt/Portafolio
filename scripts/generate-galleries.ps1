param()

$dir = "public\images"
New-Item -ItemType Directory -Force -Path $dir | Out-Null

function Write-Svg($name, $svg) {
  Set-Content -LiteralPath (Join-Path $dir "$name.svg") -Value $svg -Encoding UTF8
}

function New-Gallery {
  param($name, $bg1, $bg2, $body1, $body2, $win, $accent)
  $svg = @"
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="$bg1"/><stop offset="1" stop-color="$bg2"/></linearGradient>
    <linearGradient id="body" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="$body1"/><stop offset="1" stop-color="$body2"/></linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#sky)"/>
  <rect x="0" y="600" width="1200" height="200" fill="#9b9386"/>
  <rect x="0" y="150" width="520" height="460" fill="url(#body)"/>
  <rect x="360" y="80" width="300" height="380" fill="url(#body)"/>
  <g fill="$win" opacity="0.85">
    <rect x="60" y="220" width="70" height="90"/><rect x="180" y="220" width="70" height="90"/>
    <rect x="60" y="360" width="70" height="90"/><rect x="180" y="360" width="70" height="90"/>
    <rect x="410" y="140" width="60" height="80"/><rect x="510" y="140" width="60" height="80"/>
    <rect x="410" y="260" width="60" height="80"/><rect x="510" y="260" width="60" height="80"/>
  </g>
  <rect x="700" y="240" width="420" height="360" fill="url(#body)"/>
  <rect x="740" y="300" width="80" height="90"/><rect x="860" y="300" width="80" height="90"/><rect x="980" y="300" width="80" height="90"/>
  <rect x="700" y="600" width="420" height="24" fill="$accent" opacity="0.55"/>
  <rect x="0" y="610" width="520" height="22" fill="$accent" opacity="0.45"/>
</svg>
"@
  Write-Svg $name $svg
}

New-Gallery "casa-luz-g1" "#dfe9df" "#f3f7ee" "#cfc4ae" "#8f826c" "#b5653a" "#7a8b6f"
New-Gallery "casa-luz-g2" "#e9e8d6" "#f6f4e8" "#b9b1a5" "#6f675e" "#f0c987" "#5b554d"
New-Gallery "casa-luz-g3" "#cfd6c9" "#e9eede" "#a89f8e" "#7a6a52" "#dfe8df" "#8f826c"

New-Gallery "loft-g1" "#d8d4cd" "#efedea" "#8c8378" "#5f594f" "#e0d9cd" "#b5653a"
New-Gallery "loft-g2" "#d2d6da" "#eceeef" "#7d7a75" "#4f4d49" "#cfd6da" "#f0c987"
New-Gallery "loft-g3" "#d8d4cd" "#efedea" "#9b9386" "#6b635a" "#e0d9cd" "#5b554d"

New-Gallery "torre-g1" "#cfe0ea" "#eef4f7" "#7c9ab3" "#43586a" "#dfe8ef" "#f0c987"
New-Gallery "torre-g2" "#dce8ef" "#f2f6f8" "#9fb8cc" "#5f7d8f" "#eaf3f7" "#b5653a"
New-Gallery "torre-g3" "#cfe0ea" "#eef4f7" "#6b8ea6" "#3a5163" "#dfe8ef" "#9fb8cc"

New-Gallery "villa-g1" "#e6e2d4" "#f7f3ea" "#cfc4ae" "#8f826c" "#dfe8df" "#b5653a"
New-Gallery "villa-g2" "#dfe6d6" "#f2f5eb" "#a89f8e" "#7a6a52" "#f0c987" "#7a8b6f"
New-Gallery "villa-g3" "#d6dccb" "#eef2e5" "#b9b1a5" "#6f675e" "#e0d9cd" "#5b554d"

New-Gallery "plaza-g1" "#d7e3d2" "#f3f7ee" "#b7c4ae" "#8a9980" "#eaf1dd" "#7a8b6f"
New-Gallery "plaza-g2" "#dde8d0" "#f4f8ec" "#9fb47f" "#7d9160" "#d7e6c6" "#b5653a"
New-Gallery "plaza-g3" "#cfe0c9" "#edf4e4" "#b3c3a5" "#8a9980" "#eaf1dd" "#5f7160"

New-Gallery "bosque-g1" "#cfe0ce" "#f0f4ea" "#6d7f64" "#47573f" "#a6b59a" "#8a9a8a"
New-Gallery "bosque-g2" "#d5e4d2" "#f2f7ee" "#7a8b6f" "#5f7160" "#b7c4ae" "#f0c987"
New-Gallery "bosque-g3" "#cbe0c4" "#eef4e8" "#5f7160" "#3f4f40" "#a6b59a" "#7d9160"

New-Gallery "rehab-g1" "#d5d0c8" "#eeebe4" "#9b9386" "#6b635a" "#e0d9cd" "#b5653a"
New-Gallery "rehab-g2" "#d8d4cd" "#efedea" "#8c8378" "#5f594f" "#cfd6da" "#f0c987"
New-Gallery "rehab-g3" "#cfccc5" "#e7e4de" "#777267" "#4f4d49" "#e0d9cd" "#8f826c"

New-Gallery "mar-g1" "#d6e4e6" "#eef5f5" "#8aa8a8" "#5f7d7d" "#e3eeec" "#f0c987"
New-Gallery "mar-g2" "#cfe0e0" "#eaf3f3" "#a3bbbb" "#6f8b8b" "#e3eeec" "#b5653a"
New-Gallery "mar-g3" "#d9e6e4" "#f0f6f5" "#7d9b9b" "#547070" "#dbe9e9" "#5f7d7d"

Write-Output "Generated gallery images"