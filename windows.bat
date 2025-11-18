@echo off
echo ====================================
echo == BAT: Installation Script ==
echo ====================================

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js not found. Please install Node.js first.
    goto end
)
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] npm (Node Package Manager) not found. Please check your Node.js installation.
    goto end
)

echo [INFO] Installing external Node.js modules: hpack, axios, set-cookie-parser, colors, random-useragent
npm install hpack axios set-cookie-parser colors random-useragent

if %errorlevel% neq 0 (
    echo [ERROR] Module installation failed.
    goto end
)

echo [SUCCESS] Module installation complete. You are ready to run the tools.

:end
pause