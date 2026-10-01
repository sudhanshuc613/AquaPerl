@echo off
chcp 65001 >nul
echo ============================================
echo   RO SERVICE PATNA - 1-CLICK CLEANUP
echo ============================================
echo.
cd /d "%~dp0"

echo [1/4] Removing OLD leftover route groups (duplicates hata raha hai)...
if exist "src\app\(auth)" rmdir /s /q "src\app\(auth)"
if exist "src\app\(shop)" rmdir /s /q "src\app\(shop)"
if exist "src\app\admin\(dashboard)" rmdir /s /q "src\app\admin\(dashboard)"
if exist "src\app\(frontend)\(dashboard)" rmdir /s /q "src\app\(frontend)\(dashboard)"
echo     Done.

echo [2/4] Cleaning build cache...
if exist ".next" rmdir /s /q ".next"
if exist "node_modules" rmdir /s /q "node_modules"
echo     Done.

echo [3/4] Git cleanup - purane deleted files ko git se bhi hatao...
git rm -r --cached src/app/(auth) 2>nul
git rm -r --cached src/app/(shop) 2>nul
git rm -r --cached src/app/admin/(dashboard) 2>nul
git rm -r --cached src/app/(frontend)/(dashboard) 2>nul
echo     Done.

echo [4/4] Verify - listing remaining bracket-folders (should be ONLY '(frontend)' )...
echo     Found folders:
dir /b /ad "src\app" 2>nul | findstr "("
echo.

echo ============================================
echo   AB YE 3 COMMANDS CHALAO:
echo.
echo   git add -A
echo   git commit -m "Clean build - removed duplicate route groups"
echo   git push --force
echo ============================================
pause
