@echo off
echo ============================================
echo   RO Service Patna - CLEANUP BEFORE PUSH
echo ============================================
echo.

cd /d "%~dp0"

echo [1/3] Removing old leftover route groups if they exist...
if exist "src\app\(auth)" rmdir /s /q "src\app\(auth)"
if exist "src\app\(shop)" rmdir /s /q "src\app\(shop)"
if exist "src\app\(auth)\login" rmdir /s /q "src\app\(auth)\login"
if exist "src\app\(shop)\cart" rmdir /s /q "src\app\(shop)\cart"
echo     Done.

echo [2/3] Cleaning build cache...
if exist ".next" rmdir /s /q ".next"
if exist "node_modules" rmdir /s /q "node_modules"
echo     Done.

echo [3/3] Git safety - deleting any old tracked deleted files...
git ls-files --deleted -z | xargs -0 git rm 2>nul
echo     Done.

echo.
echo ============================================
echo   CLEANUP COMPLETE! Ab ye chalao:
echo   git add .
echo   git commit -m "Final fixed build - node 20.x, 42 areas, 30-day session"
echo   git push --force
echo ============================================
pause
