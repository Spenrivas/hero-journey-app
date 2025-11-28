# Install Dependencies Script
# Fixes PowerShell execution policy and installs npm packages

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Installing Dependencies" -ForegroundColor Cyan
Write-Host "This may take 3-5 minutes. Please wait..." -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Bypass execution policy for this session
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force

# Try normal install first with progress
Write-Host "Starting npm install..." -ForegroundColor Green
$startTime = Get-Date

npm install --progress=true

# If that fails, try with legacy peer deps
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "Trying with legacy peer deps..." -ForegroundColor Yellow
    npm install --legacy-peer-deps --progress=true
}

$endTime = Get-Date
$duration = $endTime - $startTime

Write-Host ""
if ($LASTEXITCODE -eq 0) {
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "Dependencies installed successfully!" -ForegroundColor Green
    Write-Host "Time taken: $($duration.Minutes)m $($duration.Seconds)s" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now run: .\start-server.ps1" -ForegroundColor Cyan
} else {
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "Installation failed. Please check the error messages above." -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
}

