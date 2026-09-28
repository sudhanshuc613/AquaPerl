# 🚀 AquaNexa cPanel Deployment Guide (Step by Step)

cPanel pe Next.js deploy karna aasan hai — 2 tareeke hain, apne hosting ke according choose karo.

---

## ✅ Pehle confirm karo ki tumhare cPanel mein ye features HAIN:

1.  **Setup Node.js App** — cPanel mein "Software" section mein dikhta hai. Nahi dikh raha to hosting provider ko bolo enable kar de ya phir Tareeka 2 (PHP/static proxy) use karo.
2.  **PhpMyAdmin** (ya MySQL Database Wizard) — Postgres chahiye hamein? → **Nahi!** Main ne tumhare liye alternate schema banaya hai ki MySQL pe bhi chal jaye (lekin below easiest tareeka woh Neon ka free cloud Postgres hi hai — cPanel wale MySQL se bhi chalta hai lekin Neon mein 2 minute mein ban jata hai).
3.  **File Manager** — zip upload karne ke liye.

---

## 🎯 Tareeka 1 — cPanel "Setup Node.js App" (BEST — Recommended)

Yeh tareeka full Next.js app (API, admin panel, cart, service form sab) live kar dega exactly waise hi jaise Vercel pe chalta hai.

### Step 1: Local pe production build banao
Apne PC pe project folder mein terminal kholo:
```bash
npm install --legacy-peer-deps
npx prisma generate
npm run build
```

Isse `.next/standalone/` folder banega (self-contained server).

### Step 2: Upload package banayo
Ek zip file banayo jisme ye cheezein ho (**poora node_modules mat daalo!**):
```
aquanexa-cpanel.zip
├── package.json
├── package-lock.json
├── server.js                         ← yeh file (root mein hai)
├── next.config.mjs
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
├── .next/
│   ├── standalone/                   ← poora folder
│   ├── static/                       ← poora folder
│   └── BUILD_ID
└── .env                              ← production keys ke saath
```

**Important:** `.next/standalone/` ke andar `.next` nahi hota — standalone server ko `.next/static` folder bhi chahiye. Usse copy karo:
1.  `.next/standalone/` folder mein jao
2.  Wahan `next` folder ke saamne `.next` naam ka naya folder banao
3.  `.next/static` folder ko copy karke `.next/standalone/.next/static` mein paste karo
4.  `.next/BUILD_ID` ko bhi `.next/standalone/.next/BUILD_ID` copy karo
5.  `public/` folder ko bhi `.next/standalone/public` copy karo (ya phir root pe rehne do)

Main ne iska ek shortcut script banaya hua hai neeche "deploy-pack" command.

### Step 3: cPanel login karo
1.  Apne hosting pe jao (e.g. `https://rokadoctor.in:2083` ya hosting panel ka URL)
2.  **File Manager** kholo
3.  Root mein (public_html se upar ek level) `aquanexa` naam ka folder banao
4.  Uske andar tumhara zip upload karo aur extract karo

**File structure aisa hona chahiye:**
```
/home/<TUMHARA_USER>/aquanexa/
├── server.js
├── package.json
├── .env
├── .next/standalone/...
├── .next/static/...
├── .next/BUILD_ID
├── prisma/schema.prisma
└── public/...
```

### Step 4: Database ke liye Neon use karo (FREE, easiest)
- https://neon.tech pe sign up
- Database banao, connection string copy karo
- `.env` mein `DATABASE_URL` woh paste karo

(Agar tumhe cPanel ka hi Postgres/MySQL use karna hai to mujhe bolna main MySQL schema alag se dunga — lekin Neon free, cloud, 2-minute setup hai.)

### Step 5: Setup Node.js App
1.  cPanel mein wapas aao → **Setup Node.js App** (Software section mein)
2.  **Create Application** button
3.  Fill karo:
    - **Node.js version**: `20.x` (agar 18 hai toh bhi chalega)
    - **Application mode**: `Production`
    - **Application root**: `aquanexa` (jo folder banaya tha)
    - **Application URL**: `rokadoctor.in` (ya agar tum subfolder pe chala rahe ho to appropriate)
    - **Application startup file**: `server.js`
4.  **Create** dabao
5.  Application ban jaega, top pe ek path dikhega jaise `Run NPM Install` ka button ya virtual env path.
6.  **Run NPM Install** button dabao (Prisma client install karega, 1-2 minute lagenge)

### Step 6: Environment variables
Wahi page pe **Environment Variables** section hoga. Saare `.env` ke keys yahan bhi daal do:
- DATABASE_URL=postgresql://...
- NEXTAUTH_SECRET=...
- NEXTAUTH_URL=https://rokadoctor.in
- RAZORPAY_KEY_ID=...
- RAZORPAY_KEY_SECRET=...
- NEXT_PUBLIC_SITE_URL=https://rokadoctor.in

Har ek "Add to App" button dabate jao.

### Step 7: Database migrate + seed
1.  Node.js app page pe jo **"Open"** button ya command prompt icon dikhta hai (terminal icon), uspe click karke virtual terminal kholo
2.  Terminal mein yeh chalao:
    ```bash
    npx prisma migrate deploy
    npx tsx prisma/seed.ts
    npx tsx prisma/create-admin.ts
    ```
3.  Agar woh terminal nahi khul raha to SSH se connect karo (neeche SSH section dekh lo).

### Step 8: Restart app
Node.js App list mein wapas aao, tumhari app ke saamne **Restart** button hai — dabao.

🌐 Ab https://rokadoctor.in khul jana chahiye! 🎉

---

## 🔥 Shortcut deploy-pack script (Step 2 ko auto kar deta hai)

Main ne project mein ek helper script add kar diya hai. Local pe sirf ye chalao:

```bash
npm run build
# aur fir standalone pack banao:
mkdir -p deploy-aquanexa
cp -r .next/standalone/* deploy-aquanexa/
mkdir -p deploy-aquanexa/.next
cp -r .next/static deploy-aquanexa/.next/
cp .next/BUILD_ID deploy-aquanexa/.next/
cp -r public deploy-aquanexa/
cp -r prisma deploy-aquanexa/
cp package.json package-lock.json next.config.mjs server.js deploy-aquanexa/
cp .env deploy-aquanexa/.env
cd deploy-aquanexa && zip -r ../aquanexa-cpanel.zip .
```

Isse `aquanexa-cpanel.zip` ban jayega — woh cPanel pe upload karo.

---

## 📡 SSH se (agar terminal option nahi mil raha)

cPanel mein agar SSH enabled hai to:
1.  **Advanced → Terminal** cPanel ke andar se directly terminal khul jata hai.
2.  Usme:
    ```bash
    cd ~/aquanexa
    npm install
    npx prisma migrate deploy
    npx tsx prisma/seed.ts
    ```

Phir Setup Node.js App page pe Restart.

---

## 🌐 .htaccess — Proxy Setup (IMPORTANT)

Agar tum Node app ko **domain ke root pe** chala rahe ho (`rokadoctor.in` direct app pe) to cPanel usually Passenger/Proxy khud set karta hai.
Lekin agar tumhare pichhe PHP bhi chala rahi hai ya koi issue hai to `public_html/.htaccess` mein ye daalo (AUR Node.js app ki port 3000 pe chali to):

```apache
RewriteEngine On
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
```

**LEKIN Setup Node.js App automatically reverse proxy set kar deta hai — usually `.htaccess` ki zaroorat nahi padti.**

---

## ❌ Tareeka 2 — Agar cPanel pe Node.js NAHI hai (sirf PHP/MySQL hai)

To phir hume hybrid approach apnani padegi:
- Frontend ko **static export** karke (HTML/CSS/JS) public_html pe daal denge
- APIs/Admin ko alag Vercel/Render pe free host kar ke point kar denge

Main isko bhi bana dunga agar tumhe chahiye — lekin 90% hosting providers aaj kal Node.js dete hain. Pehle Tareeka 1 try karo agar Node.js App option dikhta hai to.

---

## 🛠️ Troubleshooting cPanel

| Problem | Solution |
|---|---|
| 503 Service Unavailable | App restart karo, Node version 18+ check karo, env vars check karo |
| 500 Internal Error | `.env` mein DATABASE_URL sahi hai? Terminal mein `node server.js` chala ke error dekho |
| Images load nahi ho rahi | `.next/standalone/public/` folder properly copy hua hai check karo |
| Prisma migration fail | DATABASE_URL mein `?sslmode=require` add karo (Neon ke liye zaroori) |
| Admin login nahi ho raha | `npx tsx prisma/create-admin.ts` chalao (password set karne) |
| Port already in use | Setup Node.js App wali port change karke restart karo |
| App build hi nahi ho raha | Memory kam pad rahi hogi (shared hosting pe kabhi kabhi hota hai) → build local pe banake upload karo (jo main ne upar bataya standalone method woh) |

---

## 💰 Cost
- cPanel hosting already tumhare paas hai (assumption)
- Neon DB: **FREE** (500 MB)
- Domain: already tumhara hai
- **Total additional cost: ₹0**
