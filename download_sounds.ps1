# LingoCards — Pobieranie darmowych dźwięków otoczenia (CC0)
# Uruchom: .\download_sounds.ps1 (z folderu projektu)
# Pliki zostaną zapisane w public/sounds/

$soundsDir = "public\sounds"
if (-not (Test-Path $soundsDir)) {
    New-Item -ItemType Directory -Path $soundsDir | Out-Null
    Write-Host "Utworzono folder: $soundsDir" -ForegroundColor Green
}

# Źródła: Freesound.org (CC0 — brak atrybucji wymagany)
# Numery ID plików CC0 z Freesound.org — dostępne przez API preview
$sounds = @(
    @{
        name = "rain.mp3"
        # Rain on window CC0 — Freesound #397795 (Laribum / CC0)
        url  = "https://freesound.org/data/previews/397/397795_4284968-lq.mp3"
        desc = "Deszcz (rain.mp3)"
    },
    @{
        name = "forest.mp3"
        # Forest birds ambience CC0 — Freesound #270310
        url  = "https://freesound.org/data/previews/270/270310_5123851-lq.mp3"
        desc = "Las / ptaki (forest.mp3)"
    },
    @{
        name = "cafe.mp3"
        # Coffee shop ambience CC0 — Freesound #197673
        url  = "https://freesound.org/data/previews/197/197673_3248244-lq.mp3"
        desc = "Kawiarnia (cafe.mp3)"
    },
    @{
        name = "lofi.mp3"
        # Lo-fi hip hop ambient CC0 — Freesound #476178
        url  = "https://freesound.org/data/previews/476/476178_9159316-lq.mp3"
        desc = "Lo-fi muzyka (lofi.mp3)"
    }
)

$headers = @{
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    "Referer"    = "https://freesound.org/"
}

foreach ($sound in $sounds) {
    $destPath = Join-Path $soundsDir $sound.name
    if (Test-Path $destPath) {
        Write-Host "  [SKIP] $($sound.desc) — już istnieje" -ForegroundColor Yellow
        continue
    }
    try {
        Write-Host "  [DOWNLOAD] $($sound.desc)..." -ForegroundColor Cyan
        Invoke-WebRequest -Uri $sound.url -Headers $headers -OutFile $destPath -TimeoutSec 30
        $size = (Get-Item $destPath).Length / 1KB
        Write-Host "  [OK] $($sound.name) — $([int]$size) KB" -ForegroundColor Green
    } catch {
        Write-Host "  [BLAD] $($sound.desc): $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "         Pobierz recznie i zapisz jako: $destPath" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "Gotowe! Uruchom 'npm run dev' zeby przetestowac dzwieki." -ForegroundColor Green
Write-Host ""
Write-Host "Jesli jakis plik nie zostal pobrany, pobierz recznie z:" -ForegroundColor Yellow
Write-Host "  Deszcz:    https://freesound.org/people/Laribum/sounds/397795/" -ForegroundColor Gray
Write-Host "  Las:       https://freesound.org/sounds/270310/" -ForegroundColor Gray
Write-Host "  Kawiarnia: https://freesound.org/sounds/197673/" -ForegroundColor Gray
Write-Host "  Lo-fi:     https://freesound.org/sounds/476178/" -ForegroundColor Gray
