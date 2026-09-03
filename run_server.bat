@echo off
title LoopFix FastAPI Server
echo ============================================
echo   Starting LoopFix FastAPI Server...
echo ============================================
echo.
cd /d "%~dp0"

python -m uvicorn run:app --host 0.0.0.0 --port 8000 --reload

echo.
echo ============================================
echo   Server stopped. Press any key to exit...
echo ============================================
pause >nul