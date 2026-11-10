@echo off
setlocal
echo ========================================================
echo  SUBRAT.DEV + SENKU AI - GITHUB REPOSITORY DEPLOYMENT
echo ========================================================
echo.
echo Make sure you have created an empty repository on GitHub:
echo https://github.com/new
echo.
set /p REPO_URL="Enter your GitHub Repository URL (e.g. https://github.com/YOUR_USERNAME/senku-portfolio.git): "

if "%REPO_URL%"=="" (
    echo [ERROR] No repository URL entered. Exiting.
    pause
    exit /b 1
)

echo.
echo [1/3] Configuring git remote origin...
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo [2/3] Renaming branch to main...
git branch -M main

echo [3/3] Pushing all files to GitHub...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo  SUCCESS! Repository pushed to %REPO_URL%
    echo  Your GitHub Actions will deploy GitHub Pages automatically!
    echo ========================================================
) else (
    echo.
    echo [ERROR] Push failed. Please check your GitHub credentials or repo URL.
)
echo.
pause
