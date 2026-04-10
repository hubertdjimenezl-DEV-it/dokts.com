# Ejecutar en PowerShell (clic derecho → Ejecutar con PowerShell, o: powershell -File D:\dokts.com\sync-to-desktop-and-push.ps1)
$ErrorActionPreference = "Stop"
$src = "D:\dokts.com"
$dest = "$env:USERPROFILE\Desktop\dokts.com"

Write-Host "=== npm install en D:\dokts.com ==="
Set-Location $src
npm install

Write-Host "=== Copiar a Escritorio (sin node_modules / .next) ==="
if (-not (Test-Path $dest)) { New-Item -ItemType Directory -Path $dest | Out-Null }
robocopy $src $dest /E /XD node_modules .next /NFL /NDL /NJH /NJS
if ($LASTEXITCODE -ge 8) { throw "robocopy fallo con codigo $LASTEXITCODE" }

Write-Host "=== npm install en clon del Escritorio ==="
Set-Location $dest
npm install

Write-Host "=== Git: add, commit, push ==="
if (-not (Test-Path "$dest\.git")) {
  Write-Warning "No hay .git en $dest — inicializa o clona el repo primero."
  exit 1
}
git add -A
$msg = "feat(landing): pagina completa Dokts (brand, secciones, calculadora)"
git diff --cached --quiet
if ($LASTEXITCODE -eq 0) {
  Write-Host "Nada que commitear."
} else {
  git commit -m $msg
}
git push origin master
Write-Host "Listo."
