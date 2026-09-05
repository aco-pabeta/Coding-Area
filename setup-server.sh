#!/bin/bash
# ============================================
# LOOPFIX - SERVER SETUP SCRIPT
# Jalankan di Ubuntu server dengan:
#   bash setup-server.sh
# ============================================

PASS="camar007"
REPO_URL="https://github.com/aco-pabeta/Coding-Area.git"
INSTALL_DIR="/home/myfix/Coding-Area"
TUNNEL_TOKEN="eyJhIjoiMGUxZDIwZGZiMTQxZjdhOWI4OThiOWQ4NTMxODM3NDQiLCJ0IjoiYmRhYTBkMjAtYTJjYy00NDRmLWJmMWMtNThlYjEwMWRjY2IxIiwicyI6Ik16Z3hPVE14WXpVdFpqZzVOQzAwTlRJMUxUZzBNREF0TURJek5tUmpOV1V4TmpNMCJ9"

echo "============================================"
echo " LOOPFIX - AUTOMATIC SERVER SETUP"
echo "============================================"

# 1. Install dependencies
echo ""
echo "[1/7] Installing system packages..."
echo "$PASS" | sudo -S apt-get update -y
echo "$PASS" | sudo -S apt-get install -y python3 python3-pip python3-venv git curl

# 2. Clone / pull repo
echo ""
echo "[2/7] Cloning repo..."
cd /home/myfix
if [ -d "Coding-Area" ]; then
    cd Coding-Area
    git pull
else
    git clone "$REPO_URL"
    cd Coding-Area
fi
echo "Repo ready at: $(pwd)"

# 3. Setup Python venv & install deps
echo ""
echo "[3/7] Setting up Python venv + installing dependencies..."
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip -q
pip install -q -r backend/requirements.txt
pip install -q "uvicorn[standard]"
echo "Python dependencies installed."

# 4. Create systemd service for FastAPI (LoopFix)
echo ""
echo "[4/7] Creating LoopFix systemd service..."
echo "$PASS" | sudo -S tee /etc/systemd/system/loopfix.service > /dev/null << 'SVCEOF'
[Unit]
Description=LoopFix FastAPI Server
After=network.target

[Service]
User=myfix
WorkingDirectory=/home/myfix/Coding-Area
ExecStart=/home/myfix/Coding-Area/venv/bin/uvicorn run:app --host 0.0.0.0 --port 8000
Restart=always
RestartSec=3
Environment=PYTHONUNBUFFERED=1

[Install]
WantedBy=multi-user.target
SVCEOF

echo "$PASS" | sudo -S systemctl daemon-reload
echo "$PASS" | sudo -S systemctl enable loopfix
echo "$PASS" | sudo -S systemctl restart loopfix
sleep 2

# Check if loopfix is running
if echo "$PASS" | sudo -S systemctl is-active --quiet loopfix; then
    echo "LoopFix service: RUNNING"
else
    echo "LoopFix service: FAILED! Checking logs..."
    echo "$PASS" | sudo -S journalctl -u loopfix --no-pager -n 20
fi

# 5. Install cloudflared
echo ""
echo "[5/7] Installing cloudflared..."
if ! command -v cloudflared &> /dev/null; then
    echo "$PASS" | sudo -S wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -O /usr/local/bin/cloudflared
    echo "$PASS" | sudo -S chmod +x /usr/local/bin/cloudflared
fi
cloudflared --version

# 6. Setup cloudflared systemd service
echo ""
echo "[6/7] Creating Cloudflare tunnel service..."
echo "$PASS" | sudo -S tee /etc/systemd/system/cloudflared.service > /dev/null << TUNEOF
[Unit]
Description=Cloudflare Tunnel (LoopFix)
After=network.target loopfix.service

[Service]
Type=simple
ExecStart=/usr/local/bin/cloudflared tunnel --no-autoupdate run --token ${TUNNEL_TOKEN}
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
TUNEOF

echo "$PASS" | sudo -S systemctl daemon-reload
echo "$PASS" | sudo -S systemctl enable cloudflared
echo "$PASS" | sudo -S systemctl restart cloudflared
sleep 5

# Check if cloudflared is running
if echo "$PASS" | sudo -S systemctl is-active --quiet cloudflared; then
    echo "Cloudflared service: RUNNING"
else
    echo "Cloudflared service: FAILED! Checking logs..."
    echo "$PASS" | sudo -S journalctl -u cloudflared --no-pager -n 20
fi

# 7. Verify
echo ""
echo "[7/7] === VERIFICATION ==="
echo ""

echo "--- LoopFix Status ---"
echo "$PASS" | sudo -S systemctl status loopfix --no-pager -l 2>&1 | head -15
echo ""

echo "--- Local Endpoint Test ---"
LOCAL_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/ 2>/dev/null)
echo "http://localhost:8000/ -> HTTP $LOCAL_STATUS"
echo ""

echo "--- Tunnel Endpoint Test ---"
TUNNEL_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 https://myfix.loopfix.my.id/ 2>/dev/null)
echo "https://myfix.loopfix.my.id/ -> HTTP $TUNNEL_STATUS"
echo ""

echo "============================================"
echo " SETUP COMPLETE!"
echo ""
echo " Local:  http://localhost:8000"
echo " Tunnel: https://myfix.loopfix.my.id"
echo ""
echo " Useful commands:"
echo "   sudo systemctl status loopfix"
echo "   sudo systemctl status cloudflared"
echo "   sudo journalctl -u loopfix -f"
echo "   sudo journalctl -u cloudflared -f"
echo "============================================"
