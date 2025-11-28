# Start Server Script for Hero's Journey App
# This script handles PowerShell execution policy and starts the dev server

Write-Host "Starting Hero's Journey App..." -ForegroundColor Cyan

# Bypass execution policy for this session
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Installation failed. Trying with legacy peer deps..." -ForegroundColor Yellow
        npm install --legacy-peer-deps
    }
}

# Create data directory if it doesn't exist
if (-not (Test-Path "data")) {
    New-Item -ItemType Directory -Path "data" | Out-Null
    Write-Host "Created data directory" -ForegroundColor Green
}

# Start the development server
Write-Host "Starting development server on port 3004..." -ForegroundColor Green
npm run dev


