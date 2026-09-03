@echo off
title LoopFix - Server + Tunnel Auto Start
color 0A

echo ============================================
echo  STARTING LOOPFIX SERVER + CLOUDFLARE TUNNEL
echo ============================================
echo.

cd /d "%~dp0"

echo Starting FastAPI server on port 8000...
start "LoopFix Server" cmd /c "python -m uvicorn run:app --host 0.0.0.0 --port 8000 --reload"

echo Waiting for server to be ready...
timeout /t 3 /nobreak >nul

echo Starting Cloudflare Tunnel...
start "Cloudflare Tunnel" cmd /c "D:\Belajar Koding\PRAKTEK\run-tunnel.bat"

echo.
echo ============================================
echo  BOTH SERVICES STARTED!
echo ============================================
echo.
echo  Server: http://localhost:8000
echo  Tunnel: https://myfix.loopfix.my.id
echo.
echo  To stop: taskkill /f /im python.exe
echo  To stop: taskkill /f /im cloudflared.exe
echo.
pause