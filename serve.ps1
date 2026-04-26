# Simple static file HTTP server using PowerShell + System.Net.HttpListener
# Usage:  powershell -ExecutionPolicy Bypass -File .\serve.ps1 [-Port 8080] [-Root .]
param(
    [int]$Port = 8080,
    [string]$Root = "."
)

$ErrorActionPreference = "Stop"

$RootFull = (Resolve-Path $Root).Path
Write-Host "[serve.ps1] Serving '$RootFull' on http://localhost:$Port  (Ctrl+C to stop)" -ForegroundColor Green

$mime = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".mjs"  = "application/javascript; charset=utf-8"
    ".jsx"  = "application/javascript; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".svg"  = "image/svg+xml"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif"  = "image/gif"
    ".ico"  = "image/x-icon"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".map"  = "application/json"
    ".txt"  = "text/plain; charset=utf-8"
    ".md"   = "text/markdown; charset=utf-8"
}

$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Prefixes.Add("http://127.0.0.1:$Port/")
$listener.Start()

try {
    while ($listener.IsListening) {
        $ctx = $listener.GetContext()
        $req = $ctx.Request
        $res = $ctx.Response

        try {
            $localPath = $req.Url.LocalPath.TrimStart("/")
            if ([string]::IsNullOrEmpty($localPath)) {
                # Default to standalone.html if it exists, otherwise index.html
                if (Test-Path (Join-Path $RootFull "standalone.html")) {
                    $localPath = "standalone.html"
                } else {
                    $localPath = "index.html"
                }
            }

            # Sanitize path - prevent path traversal
            $localPath = $localPath -replace "\.\.\\", "" -replace "\.\./", ""
            $fullPath = Join-Path $RootFull $localPath

            if ((Test-Path $fullPath) -and ((Get-Item $fullPath) -is [System.IO.DirectoryInfo])) {
                $candidate = Join-Path $fullPath "index.html"
                if (Test-Path $candidate) { $fullPath = $candidate }
            }

            if (Test-Path $fullPath -PathType Leaf) {
                $ext = ([System.IO.Path]::GetExtension($fullPath)).ToLowerInvariant()
                $ct = $mime[$ext]
                if (-not $ct) { $ct = "application/octet-stream" }
                $bytes = [System.IO.File]::ReadAllBytes($fullPath)
                $res.ContentType = $ct
                $res.StatusCode = 200
                $res.Headers.Add("Cache-Control", "no-store")
                $res.Headers.Add("Access-Control-Allow-Origin", "*")
                $res.OutputStream.Write($bytes, 0, $bytes.Length)
                Write-Host ("  200 {0,-7} {1}" -f $req.HttpMethod, $req.Url.LocalPath)
            } else {
                $res.StatusCode = 404
                $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $localPath")
                $res.ContentType = "text/plain; charset=utf-8"
                $res.OutputStream.Write($msg, 0, $msg.Length)
                Write-Host ("  404 {0,-7} {1}" -f $req.HttpMethod, $req.Url.LocalPath) -ForegroundColor Yellow
            }
        } catch {
            try {
                $res.StatusCode = 500
                $errBytes = [System.Text.Encoding]::UTF8.GetBytes("500: $($_.Exception.Message)")
                $res.OutputStream.Write($errBytes, 0, $errBytes.Length)
            } catch {}
            Write-Host "  500 $_" -ForegroundColor Red
        } finally {
            try { $res.OutputStream.Close() } catch {}
        }
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
