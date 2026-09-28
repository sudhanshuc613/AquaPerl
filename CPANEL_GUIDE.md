# 🌐 AquaNexa — cPanel pe LIVE kaise karein (Bilkul Aasan Bhasha)

Tum jaisa pehle PHP/WordPress wagera cPanel pe upload karte the waise hi isko bhi kar sakte ho — thoda alag process hai lekin ek baar ho gaya to baar-baar aasan hai.

---

## 📋 Pehle Check Karo — Tumhare cPanel mein ye hai?

cPanel login karo (typically `https://tumhara-domain.com:2083`):

- ✅ **Setup Node.js App** dikh raha hai "Software" section mein? — To Tareeka #1 (full Next.js) use karo
- ❌ Nahi dikh raha? — Hosting support ko bolo "Enable Node.js for my account" ya phir Tareeka #2 (static+Vercel API) use karo

---

## 🎯 Tareeka #1 — Setup Node.js App (FULL FEATURES, RECOMMENDED)

Yeh tareeka bilkul waise hi chalta hai jaise tumhara WhatsApp ya koi modern app — cart, admin, service form, payment sab kaam karega.

### 🖥️ Step A — Apne PC pe production ZIP banao (1 baar karna)

1. **VS Code / CMD** mein project folder `aquanexa` ke andar jao
2. Ye command chalao (Mac/Linux pe direct, Windows pe Git Bash ya WSL se):

   ```bash
   bash pack-cpanel.sh
   ```

   **Windows pe agar bash nahi hai to ye commands ek-ek karo (CMD/PowerShell):**
   ```cmd
   npm run build
   mkdir deploy-aquanexa
   xcopy /E /I /Y .next\standalone\* deploy-aquanexa\
   mkdir deploy-aquanexa\.next
   xcopy /E /I /Y .next\static deploy-aquanexa\.next\static
   copy /Y .next\BUILD_ID deploy-aquanexa\.next\
   xcopy /E /I /Y public deploy-aquanexa\public\
   xcopy /E /I /Y prisma deploy-aquanexa\prisma\
   copy /Y package.json deploy-aquanexa\
   copy /Y package-lock.json deploy-aquanexa\
   copy /Y next.config.mjs deploy-aquanexa\
   copy /Y server.js deploy-aquanexa\
   if exist .env copy /Y .env deploy-aquanexa\.env
   cd deploy-aquanexa
   npm install --production --legacy-peer-deps
   npx prisma generate
   cd ..
   ```

   Phir `deploy-aquanexa` folder ko right-click → Compress to ZIP → naam `aquanexa-cpanel.zip` rakh lo.

3. **Done!** Tumhare paas `aquanexa-cpanel.zip` file ready hai.

### 🗄️ Step B — FREE cloud database banao (2 minute)

cPanel ke MySQL pe bhi chala sakte ho lekin **Neon.tech** bilkul free, fast, aur 10 second mein ban jata hai:

1.  https://neon.tech → "Sign Up" → GitHub se login
2.  "Create Project" button → naam do `aquanexa` → Create
3.  Dashboard pe tumhe ek **connection string** milega:
    ```
    postgresql://neondb_owner:xxxxx@ep-xxx-xxx.ap-south-1.aws.neon.tech/neondb?sslmode=require
    ```
4.  **Ye poora string copy kar lo** — aage `.env` mein daalna hai.

### 📤 Step C — cPanel pe upload + extract

1.  cPanel login → **File Manager** kholo
2.  **Home directory** mein (`public_html` ke andar NAHI, uske upar — `/home/tumhara-username/`)
3.  Wahan ek naya folder banao: **`aquanexa`**
4.  `aquanexa` ke andar jao
5.  **Upload** button dabao → tumhara `aquanexa-cpanel.zip` upload karo
6.  Upload ho jaaye to zip pe right-click → **Extract** → Extract files
7.  Extract ho jaane ke baad zip ko delete kar sakte ho

    ✅ File structure aisa dikhna chahiye:
    ```
    /home/tum/aquanexa/
    ├── server.js
    ├── package.json
    ├── node_modules/
    ├── .next/
    ├── prisma/
    └── public/
    ```

### ⚙️ Step D — .env file edit karo

File Manager mein `.env` file wahan hogi (agar nahi hai to new file banayo `.env` naam se):
Usko edit karo aur ye content daalo (apne Neon ke connection string se replace karo):

```env
# DATABASE
DATABASE_URL="NEON KA CONNECTION STRING YAHAN ?sslmode=require ke saath"

# AUTH
NEXTAUTH_SECRET="aquanexa-bhai-ka-secret-key-2026-abcdef-123456"
NEXTAUTH_URL="https://rokadoctor.in"

# PAYMENTS
RAZORPAY_KEY_ID="rzp_live_xxx"
RAZORPAY_KEY_SECRET="xxx"
STRIPE_SECRET_KEY=""
STRIPE_PUBLISHABLE_KEY=""

# WHATSAPP (baad mein fill karna)
TWILIO_ACCOUNT_SID=""
TWILIO_AUTH_TOKEN=""
TWILIO_WHATSAPP_FROM=""

# EMAIL
SMTP_HOST=""
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASS=""
ADMIN_EMAIL="support@rokadoctor.in"

# SITE
NEXT_PUBLIC_SITE_URL="https://rokadoctor.in"
```

> 💡 **Shuruaat mein sirf `DATABASE_URL` aur `NEXTAUTH_SECRET` bhar lo — baaki baad mein jab Razorpay etc. connect karo tab bhar lena.**

### 🚀 Step E — Setup Node.js App create karo

1.  cPanel home → **Setup Node.js App** (Software section mein)
2.  **Create Application** button
3.  Form fill karo:
    | Field | Value |
    |---|---|
    | Node.js version | **20.x** (ya 18.x agar 20 na ho) |
    | Application mode | **Production** |
    | Application root | `aquanexa` |
    | Application URL | `rokadoctor.in` |
    | Application startup file | `server.js` |
4.  **Create** dabao

5.  App ban jaegi. Page pe ek section hoga **Environment Variables**.
    `.env` ke saare key=pair wahan bhi daal do (ek-ek karke "Add to App" dabate jao):
    ```
    DATABASE_URL=postgresql://neondb_owner:xxxxx@ep-xxx...
    NEXTAUTH_SECRET=aquanexa-bhai-ka-secret-key-2026-abcdef-123456
    NEXTAUTH_URL=https://rokadoctor.in
    NODE_ENV=production
    ```

6.  **Save** dabao.

### 🗄️ Step F — Database tables banayo (pehli baar only)

Node.js App page pe **terminal/virtual environment** access hoga:

Option 1 — Web Terminal (cPanel ke andar):
1.  cPanel home → **Advanced** → **Terminal** (agar dikh raha hai)
2.  Ye commands chalao:
    ```bash
    cd ~/aquanexa
    source ~/nodevenv/aquanexa/10/bin/activate  # path apne app ke according hoga, NVM section mein aapas dekh lena
    npx prisma migrate deploy
    npx tsx prisma/seed.ts
    npx tsx prisma/create-admin.ts
    ```

Option 2 — Agar web terminal nahi hai, to setup Node.js App wale page pe niche ek "Run NPM command" option hota hai. Wahan `run build` type chala ke nahi, balki direct terminal pane se (hosting provider pe depend karta hai). Agar na samajh aaye to hosting support se SSH access maang lo — aasan hai.

Option 3 — **Sabse aasan (recommended for tum):**
Local pe (apne PC pe) ye chalao with production DATABASE_URL set:
```bash
# apne PC pe .env mein Neon wali DATABASE_URL already hai
npx prisma migrate deploy
npx tsx prisma/seed.ts
npx tsx prisma/create-admin.ts
```
Isse tumhare PC se directly Neon cloud DB mein tables ban jaenge — phir cPanel pe migrate chalaane ki zaroorat nahi! ✅

### 🔄 Step G — App Restart karo
Setup Node.js App page pe wapas aao, app ke saamne **Restart** icon/button hai — dabao.

🌐 **Ab browser mein https://rokadoctor.in kholo!**

Admin login ke liye: https://rokadoctor.in/login
- Email: `admin@rokadoctor.in`
- Password: `admin@123` (jaldi change kar lena!)

---

## 🔁 Baad mein code update karna (new version upload)

Jab bhi tum code mein change karo:

1.  Local pe: `bash pack-cpanel.sh` (ya Windows commands)
2.  Naya `aquanexa-cpanel.zip` banega
3.  cPanel File Manager → `aquanexa/` folder mein jaake naya zip upload, extract (confirm overwrite YES)
4.  Setup Node.js App → **Restart**
5.  Bas! 2 minute mein live ho jayega

---

## 🔴 Tareeka #2 — Agar cPanel mein Node.js HI NAHI HAI

(95% chance tumhare host pe hai, lekin agar nahi to ye fallback)

A. Frontend ko static banao (main ek flag set kar dunga static export ke liye)
B. `out/` folder bnega usko `public_html` mein daal do
C. APIs (payment, service form, admin panel) Vercel free pe chalao aur frontend se point karwao
D. Admin bhi Vercel pe raho

Mujhe bolna main is tareeke ke liye bhi code set kar dunga.

---

## 🆘 Common Masle (Troubleshooting)

1. **"503 Service Unavailable"** → App restart karo. `.env` sahi hai? Node version 18+ hai?
2. **"500 Internal Server Error"** → Terminal mein `cd ~/aquanexa && node server.js` chala ke error dekho
3. **CSS nahi dikh raha / site broken** → `.next/static` folder sahi copy hua hai?
4. **Images load nahi ho rahi** → `public/` folder copy hua hai check karo
5. **Database connection error** → DATABASE_URL mein `?sslmode=require` hai? Neon IP whitelist mein apne hosting ke IPs add karne ki zaroorat nahi hoti usually.
6. **Prisma "binary not found"** → `npm install` production mode mein chala tha? Prisma binary usmein aa jata hai. Agar nahi to local prisma generate output copy karo.
7. **Port error** → `server.js` port `process.env.PORT` se leta hai (cPanel automatically set karta hai), 3000 hardcoded nahi hai — to conflict nahi hoga.

---

## 💵 Kitna kharcha?

| Item | Cost |
|---|---|
| Tumhara existing cPanel hosting | Already paid |
| Neon Postgres database | FREE (500MB = 50k+ products easily) |
| Domain (rokadoctor.in) | Already hai |
| Razorpay/Stripe | Per transaction (2%) |
| Twilio WhatsApp | Usage based (~₹0.5/message) |

**Total monthly: ~₹0** (jab tak daily 100+ orders nahi aate)

---

## 📞 Phir bhi problem aaye to

Bilkul batao — exact kaha atak rahe ho, screenshot bhejo, main step-by-step help karunga. Next message mein:
1.  "Setup Node.js App dikh raha hai ya nahi" — batana
2.  Kaunsa hosting hai (Hostinger, BigRock, GoDaddy, ResellerClub, etc.) — batana
3.  Agar error aa raha to exact error paste karna
