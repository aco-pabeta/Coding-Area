@echo off
title Cloudflare Tunnel - Auto Restart
color 0A

echo [%DATE% %TIME%] Opening firewall for ICMP...
netsh advfirewall firewall add rule name="Allow ICMPv4-In" protocol=icmpv4:8,any dir=in action=allow >nul 2>&1
netsh advfirewall firewall add rule name="Allow ICMPv4-Out" protocol=icmpv4:8,any dir=out action=allow >nul 2>&1

:loop
echo [%DATE% %TIME%] Starting tunnel...
"C:\Program Files (x86)\cloudflared\cloudflared.exe" tunnel --config "C:\Users\Aco\.cloudflared\tunnel-config.yml" --no-autoupdate --no-prechecks run --url http://localhost:8000
echo [%DATE% %TIME%] Tunnel disconnected. Restarting in 5 seconds...
timeout /t 5 /nobreak >nul
goto loop