@echo off
title Hotel Sherpa Soul - 1-Click Emergency Restore
color 0A
echo ======================================================
echo    HOTEL SHERPA SOUL - 1-CLICK EMERGENCY RESTORE
echo ======================================================
echo.
echo Starting self-healing and restoration process...
echo.

node scripts/emergency_restore.cjs

echo.
echo Press any key to exit...
pause >nul
