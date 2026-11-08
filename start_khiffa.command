#!/bin/zsh
cd "$(dirname "$0")"
PORT=8765
LOCAL_IP=$(ipconfig getifaddr en0 2>/dev/null || echo "localhost")
echo "=========================================================="
echo "🌿 خِفَّة (Khiffa iOS) — يعمل الآن!"
echo "💻 على الماك:   http://localhost:$PORT"
echo "📱 على الآيفون: http://$LOCAL_IP:$PORT"
echo "=========================================================="
open "http://localhost:$PORT" 2>/dev/null || true
python3 -m http.server $PORT
