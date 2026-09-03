@echo off
title Stop Cloudflare Tunnel
color 0C

echo Stopping cloudflared...
taskkill /f /im cloudflared.exe >nul 2>&1
if %errorlevel% equ 0 (
    echo Cloudflare Tunnel stopped.
) else (
    echo No running tunnel found.
)

echo Stopping server...
taskkill /f /im python.exe >nul 2>&1
if %errorlevel% equ 0 (
    echo Server stopped.
) else (
    echo No running server found.
)
pause