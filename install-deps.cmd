@echo off
REM Install Dependencies Script (CMD version)
REM This bypasses PowerShell execution policy issues

echo ========================================
echo Installing Dependencies
echo This may take 3-5 minutes. Please wait...
echo ========================================
echo.

REM Run npm install
call npm install

REM If that fails, try with legacy peer deps
if errorlevel 1 (
    echo.
    echo Trying with legacy peer deps...
    call npm install --legacy-peer-deps
)

echo.
if errorlevel 1 (
    echo ========================================
    echo Installation failed. Please check the error messages above.
    echo ========================================
) else (
    echo ========================================
    echo Dependencies installed successfully!
    echo ========================================
    echo.
    echo You can now run: npm run dev
)

pause


