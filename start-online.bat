@echo off
title Subrat's Senku Portfolio - Cloudflare Tunnel
echo ========================================================
echo   Starting Subrat's 3D Glassmorphic Portfolio
echo   with Senku AI (Google DeepMind Antigravity Core)
echo ========================================================
echo.

:: Start Node HTTP Server in the background
start /B node server.js

echo Local Server started on http://127.0.0.1:3000
echo Starting Cloudflare Edge Tunnel...
echo.

:: Start Cloudflare tunnel
bin\cloudflared.exe tunnel --url http://127.0.0.1:3000
pause
