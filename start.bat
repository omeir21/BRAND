@echo off
REM ============================================
REM ATLAS_EO - Start Development Server
REM ============================================

echo Starting ATLAS_EO Development Server...
echo.

REM Start npm dev server
start cmd /k "cd C:\Users\pc\Desktop\atlas && npm run dev"

REM Wait 5 seconds for server to start
timeout /t 5

REM Open browser to localhost:3000
start http://localhost:3000

echo.
echo Browser should open automatically!
echo If not, manually go to: http://localhost:3000
echo.
pause
