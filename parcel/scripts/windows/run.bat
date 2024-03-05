@echo off

REM Set HOSTNAME environment variable
set HOSTNAME=127.0.0.1
set PORT=39899

REM Start the server
.\bin\node\node.exe .\core\server.js