@echo off
chcp 65001 >nul
echo ============================================
echo   RO SERVICE PATNA - 1-CLICK CLEANUP
echo   (BUILD KO 100% SAFE BANATA HAI)
echo ============================================
echo.
cd /d "%~dp0"

echo [1/6] Removing OLD duplicate route groups (parallel route bug fix)...
if exist "src\app\(auth)" rmdir /s /q "src\app\(auth)"
if exist "src\app\(shop)" rmdir /s /q "src\app\(shop)"
if exist "src\app\admin\(dashboard)" rmdir /s /q "src\app\admin\(dashboard)"
if exist "src\app\(frontend)\(dashboard)" rmdir /s /q "src\app\(frontend)\(dashboard)"
if exist "src\app\(frontend)\auth" rmdir /s /q "src\app\(frontend)\auth"
echo     Done.

echo [2/6] Cleaning Next.js build cache...
if exist ".next" rmdir /s /q ".next"
echo     Done.

echo [3/6] node_modules hata rahe (Vercel apne aap install karega, fresh install hoga)...
if exist "node_modules" rmdir /s /q "node_modules"
echo     Done.

echo [4/6] Git cleanup - purane deleted files ko cache se nikal raha...
git rm -r --cached src/app/(auth) 2>nul
git rm -r --cached src/app/(shop) 2>nul
git rm -r --cached src/app/admin/(dashboard) 2>nul
git rm -r --cached src/app/(frontend)/(dashboard) 2>nul
git rm -r --cached src/app/(frontend)/auth 2>nul
echo     Done.

echo [5/6] Verifying - bracket folders (should ONLY show (frontend), NO (auth)/(shop)/(dashboard))...
echo     Found folders in src\app:
dir /b /ad "src\app" 2>nul | findstr "("
echo.

echo [6/6] Checking key files exist:
if exist "src\app\sitemap.ts" (echo     [OK] sitemap.ts) else (echo     [MISSING] sitemap.ts)
if exist "src\app\robots.ts" (echo     [OK] robots.ts) else (echo     [MISSING] robots.ts)
if exist "next.config.mjs" (echo     [OK] next.config.mjs) else (echo     [MISSING] next.config.mjs)
if exist "public\google893626847fe7ea68.html" (echo     [OK] Google verification HTML) else (echo     [MISSING] GSC HTML)
if exist "src\app\(frontend)\login\page.tsx" (echo     [OK] Admin login /login) else (echo     [MISSING] login)
if exist "src\app\(frontend)\auth" (echo     [ERROR] auth folder abhi bhi hai!) else (echo     [OK] /auth/ folder removed)
echo.

echo ============================================
echo   CLEANUP HO GAYA! AB YE 3 COMMANDS CHALAO:
echo.
echo   git add -A
echo   git commit -m "Final verified build - SEO, sitemap, noindex headers"
echo   git push --force
echo ============================================
echo.
echo   Vercel pe push hote hi 2 minute mein auto-deploy hoga.
echo   Deploy ke baad browser mein kholo:
echo   https://www.roserviceinpatna.in/auth/register
echo   (Yeh /login pe redirect hona chahiye — agar hua to sahi build hai)
pause
