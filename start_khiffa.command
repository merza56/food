#!/bin/zsh
cd "$(dirname "$0")"
PORT=8765
LOCAL_IP=$(ipconfig getifaddr en0 2>/dev/null || echo "localhost")
echo "=========================================================="
echo "🌿 خِفَّة (Khiffa iOS v4.0) — يعمل الآن بدون كاش قديم!"
echo "💻 على الماك:   http://localhost:$PORT"
echo "📱 على الآيفون: http://$LOCAL_IP:$PORT"
echo "=========================================================="
open "http://localhost:$PORT" 2>/dev/null || true
python3 -c '
import http.server, socketserver

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", 8765), NoCacheHandler) as httpd:
    httpd.serve_forever()
'
