@echo off
setlocal

:: Read port value from properties file
for /F "tokens=1,2 delims==" %%a in (./config/startup.properties) do (
    if "%%a"=="port" set "port=%%b"
)

:: Use port as parameter to start service
start /b "" ./core.bin server --root=%cd% --port=%port% --debug=false

endlocal