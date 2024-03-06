@echo off

REM Set environment variables
set HOSTNAME=127.0.0.1
set PORT=39899

REM Check if node binary exists
if not exist .\bin\node\bin\node (
    node .\core\server.js
) else (
    .\bin\node\bin\node .\core\server.js
)

pause