@echo off
echo ========================================
echo Quick Install - Hero's Journey App
echo ========================================
echo.
echo Step 1: Cleaning up...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del /q package-lock.json
echo.
echo Step 2: Installing dependencies...
echo This will take 3-5 minutes. Please wait...
echo.
call npm install --legacy-peer-deps
echo.
if errorlevel 1 (
    echo Installation had errors. Trying alternative method...
    call npm install --force
)
echo.
echo Step 3: Creating data directory...
if not exist data mkdir data
echo.
echo ========================================
if exist node_modules\next (
    echo SUCCESS! Dependencies installed.
    echo.
    echo To start the server, run:
    echo   npm run dev
    echo.
    echo Then open: http://localhost:3004
) else (
    echo Installation incomplete. Please check errors above.
)
echo ========================================
pause


