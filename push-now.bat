@echo off
cd /d "%~dp0"
echo ========================================================
echo  Pushing to https://github.com/subrat-sahu444/senku-portfolio.git
echo ========================================================
git branch -M main
git push -u origin main
echo.
pause
