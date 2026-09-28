# 🌐 Vercel pe LIVE karo — Step by Step Guide (NO CODING NEEDED)

Time required: **10-15 minutes**
Cost: **FREE forever** (1 lakh+ monthly visitors tak)
Speed: ⚡ Mumbai CDN (1 second load time India mein)

---

## 🎯 2 tareeke — jo tumhe easy lage woh choose karo:

- **Tareeka A — GitHub + Vercel** (BEST, auto-deploy har baar push pe)
- **Tareeka B — Direct drag-drop upload** (GitHub nahi aati to, one-time upload)

---

## 🔴 Dono tareeqon se PEHLE ye 2 cheezein kar lo:

### ✅ Step 0.1 — FREE Database bana lo (Neon)
1.  Browser mein https://neon.tech kholo
2.  **"Sign Up"** button dabao → Google/GitHub se sign up kar lo (10 second)
3.  "Create Project" form mein:
    - Project name: `aquanexa`
    - Region: **Asia Pacific (Mumbai)** ⭐ (important — India mein fast rahega)
    - Postgres version: 17 (default)
4.  "Create Project" dabao
5.  Next screen pe tumhe connection strings dikhenge.
    - **Prisma** wale dropdown se option select karo
    - Connection string copy kar lo — kuch aisa dikhega:
      ```
      postgresql://neondb_owner:aBcD1234xxxx@ep-floral-voice-123456.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
      ```
    - **Ye poora string kahin copy karke rakho** — aage use hoga

### ✅ Step 0.2 — Razorpay keys (optional baad mein bhi kar sakte ho)
- Shuru mein chaahe toh isko skip kar do, order place nahi honge lekin site poori khulegi.
- Baad mein Razorpay dashboard se key leke daal dena.

---

## 🅰️ Tareeka A — GitHub + Vercel Auto Deploy (RECOMMENDED)

### Step 1 — GitHub pe repository banao
1.  https://github.com pe jaake sign up (agar account nahi hai)
2.  Top right **"+"** → **"New repository"**
3.  Name: `aquanexa`
4.  **Public** select karo
5.  ✅ "Add a README file" pe check mat lagao (blank repo chahiye)
6.  **Create repository** dabao

### Step 2 — Apne PC se code GitHub pe upload karo

Project folder `aquanexa` ke andar Terminal / CMD / PowerShell kholo aur ye commands ek-ek kar ke chalao:

```bash
# GitHub repo ko initialize karo
git init
git branch -M main

# Saare files add karo
git add .
git commit -m "AquaNexa first launch 🚀"

# Apna GitHub repo ka URL yahan dalo (GitHub pe repo khulne pe green "Code" button mein dikhta hai)
git remote add origin https://github.com/TUMHARA_USERNAME/aquanexa.git

# Upload kar do
git push -u origin main
```

Ye 30 sec - 2 minute lega (upload speed pe depend karta hai). Poora code GitHub pe chala jayega.

> **Agar git command nahi chala?** Git software yahan se install kar lo: https://git-scm.com/download/win — install ke baad terminal restart kar ke fir wahi commands chalao.

### Step 3 — Vercel se connect karo

1.  https://vercel.com/signup → **"Continue with GitHub"** se sign up (GitHub wahi account use karo jo upar use kiya tha)
2.  Permission allow karo jab pooche.
3.  Dashboard aaye to **"Add New..."** → **"Project"** dabao
4.  "Import Git Repository" section mein tumhara `aquanexa` repo dikhega — uske saamne **"Import"** button dabao.

### Step 4 — Project settings
Tumhare samne ek form hoga:

1.  **Project Name**: `aquanexa` (ya jo mann kare)
2.  **Framework Preset**: **Next.js** (auto-select ho jayega)
3.  **Root Directory**: `./` (default)
4.  **Node.js Version**: **20.x** (ya default)

### Step 5 — Environment Variables (IMPORTANT ⭐)
"Environment Variables" section mein **ek-ek kar ke** ye add karo (har ek key+value daal ke "Add" dabao):

| KEY | VALUE |
|---|---|
| `DATABASE_URL` | Woh Neon connection string jo Step 0.1 mein copy ki thi (poori paste karo) |
| `NEXTAUTH_SECRET` | `aquanexa-top-secret-key-2026-bhai-ka-rocks-xy7k2m4p` (ya koi bhi random 32+ character string) |
| `NEXTAUTH_URL` | `https://rokadoctor.in` (ya temporary Vercel URL aane ke baad badal lena) |
| `NEXT_PUBLIC_SITE_URL` | `https://rokadoctor.in` |
| `RAZORPAY_KEY_ID` | (baad mein daalo, ya khaali chordo) |
| `RAZORPAY_KEY_SECRET` | (baad mein daalo) |
| `STRIPE_SECRET_KEY` | (khaali chordo) |
| `STRIPE_PUBLISHABLE_KEY` | (khaali chordo) |
| `TWILIO_ACCOUNT_SID` | (khaali chordo) |
| `TWILIO_AUTH_TOKEN` | (khaali chordo) |
| `TWILIO_WHATSAPP_FROM` | (khaali chordo) |
| `SMTP_HOST` | (khaali chordo) |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | (khaali chordo) |
| `SMTP_PASS` | (khaali chordo) |
| `ADMIN_EMAIL` | `support@rokadoctor.in` |

### Step 6 — Deploy!
**"Deploy"** button dabao. Vercel automatically:
1.  Code download karega
2.  `npm install` karega
3.  `prisma generate` + `next build` karega (2-3 minute)
4.  Live URL pe deploy kar dega (e.g. `aquanexa-xxxx.vercel.app`)

Jab **"Congratulations!"** screen dikhe — click on preview URL. Site live! 🎉

### Step 7 — Ab database set up karo (tables banao + admin banao)

Abhi site khul jayegi lekin products nahi dikhenge kyunki database tables abhi nahi bane.

1.  Vercel dashboard → apna project → **Storage** tab
2.  Ya simplest: apne PC pe Terminal kholo, project folder mein jao aur ye chalao:

    ```bash
    # .env file mein wahi DATABASE_URL paste karo jo Neon se li thi
    npx prisma migrate deploy
    npm run db:seed
    npx tsx prisma/create-admin.ts
    ```

    Ye commands Neon cloud database mein tables bana dengi, sample products, categories, Patna pincodes etc. daal dengi, aur admin user bana dengi (admin@rokadoctor.in / admin@123).

> 💡 Alternative: Vercel "Data" tab se Neon add karne ka option bhi hai, lekin upar wala local se migrate karna simple hai.

---

## 🅱️ Tareeka B — Direct Drag & Drop (GitHub nahi chahiye)

Agar tum GitHub nahi use karna chahte, direct built files upload kar sakte ho:

1.  Pehle Tareeka A ke **Step 0.1** (Neon database) kar lo
2.  Project folder mein terminal kholo:
    ```bash
    npm install --legacy-peer-deps
    ```
3.  `.env` file mein Neon connection string set karo
4.  Database migration:
    ```bash
    npx prisma migrate deploy
    npm run db:seed
    npx tsx prisma/create-admin.ts
    ```
5.  Production build banao:
    ```bash
    npm run build
    ```
6.  Vercel pe jao → sign in with **Email** (Google se bhi chala lo) → "Add New Project"
7.  Template select mein se **"Other"** (blank template)
8.  Project name daalo, environment variables wahi daalo jo upar Step 5 mein di hain, phir Deploy.
9.  Deploy ke baad Vercel CLI command deta hai, ya alternative simpler: **Vercel has drag-and-drop on https://vercel.com/new but only for static sites — for Next.js dynamic apps, GitHub method is required.**

👉 Isliye **Tareeka A (GitHub wala) hi use karo** — 5 minute extra ka kaam hai lekin baad mein future updates 1 command `git push` se ho jayenge.

---

## 🌐 Domain (rokadoctor.in) Vercel se connect karo

Ab tak tumhari site `aquanexa-xxxx.vercel.app` pe live hogi. Apna custom domain lagane ke liye:

### Step D1 — Vercel mein domain add
1.  Vercel Dashboard → your `aquanexa` project → **Settings → Domains**
2.  **"Connect a domain you own"** mein `rokadoctor.in` likho → **Add**
3.  Phir `www.rokadoctor.in` bhi add karo

### Step D2 — DNS settings update karo (domain provider pe)

Ab tumhe woh company ke DNS panel mein jaana hai **jahan se tumne rokadoctor.in khareeda hai** (GoDaddy / Namecheap / ResellerClub / BigRock / Hostinger / etc.)

1.  Us company ke website pe login → Domains → Manage DNS for `rokadoctor.in`
2.  **PURANE A RECORDS AUR CNAME RECORDS JO @ AUR www KE LIYE HAIN UNKO DELETE KAR DO** (lekin MX records for email mat delete karna! Agar email cPanel se chala rahe ho to woh waisa ka waisa rahega)
3.  Naye records add karo:

    | Type | Host/Name | Value | TTL |
    |---|---|---|---|
    | **A** | `@` | `76.76.21.21` | Auto / 300 |
    | **CNAME** | `www` | `cname.vercel-dns.com` | Auto / 300 |

4.  Save kar do.

> **Emails wahi chalu rahenge!** DNS mein MX records tumhare cPanel/email provider ke hi rahenge — website Vercel se serve hogi but emails jaise `support@rokadoctor.in` purane hosting provider se aate rahenge. Koi problem nahi.

### Step D3 — Wait & Verify
DNS propagate hone mein **5-30 minute lagte hain** (kabhi kabhi 2 hour bhi lag jaate hain). Vercel "Valid Configuration" ka green tick dikhayega.
Phir NEXTAUTH_URL ko bhi `https://rokadoctor.in` set kar do Vercel Settings → Environment Variables mein, aur redeploy kar do.

🌐 **Ab https://rokadoctor.in poori duniya ke liye LIVE!** 🔒 SSL automatic lag jayega.

---

## 🔐 Admin Login
Jab site live ho jaye:
1.  Browser mein https://rokadoctor.in/login kholo
2.  Credentials:
    - **Email**: `admin@rokadoctor.in`
    - **Password**: `admin@123`
3.  Login ke baad https://rokadoctor.in/admin/dashboard jao
4.  PEHLA KAAM: Settings mein jaake password badal lena (abhi ke liye main admin-password change UI nahi banaya hai — Prisma Studio se ya seed script run karke change kar lena, ya bolna main admin password reset API bana dunga)

---

## 🔄 Future mein code update karna (naya version upload)

Jab bhi code mein changes karo:
```bash
git add .
git commit -m "kya badla yahan describe karo"
git push
```
Bas! Vercel **automatically** build karega aur 60 second mein live kar dega. Koi zip/upload/restart nahi karna padta.

---

## 📊 Pehle se chali aa rahi cPanel hosting ka kya hoga?

Kuch nahi! Woh waisi ka waisa chalu rahegi — tumhari emails, old PHP websites, subdomains sab chalta rahega. Sirf domain ke `@` aur `www` ke DNS records Vercel pe point karna hai (website ke liye), baaki sab (MX for email, TXT, other subdomains like `mail.rokadoctor.in`, `cpanel.rokadoctor.in`) **puraani hosting pe hi rahenge**.

✅ cPanel ki koi bhi cheez band nahi hogi
✅ Emails chalu rahenge
✅ Old PHP sites chalu rahengi
✅ Sirf new Next.js website Vercel se serve hogi (super fast)

---

## ❓ Common Problems & Solutions

| Problem | Solution |
|---|---|
| Vercel build fail ho gaya | Vercel build log mein kya error hai woh dekhke batao — ya local pe `npm run build` chala ke error same aayega woh fix kar lo |
| Domain connect nahi ho raha | Purane A records delete kiye? IP `76.76.21.21` sahi dala? Wait karo DNS propagate ka |
| Database errors site pe | DATABASE_URL sahi copy ki hai? SSL mode `?sslmode=require` end mein hai? Migrations chalae? |
| Admin login nahi ho raha | `npx tsx prisma/create-admin.ts` dobara chalao |
| Images load nahi ho rahi | next.config.mjs mein remotePatterns maine already pe sab allow kiya hai |
| Sample product images nahi dikh rahe | Unsplash images hain — internet hona chahiye browser mein, ya Cloudinary pe upload karke product images replace kar lo admin panel se |

---

## 🎉 Summary (5 bullet points mein)

1.  Neon.tech pe free database banao → connection string copy
2.  GitHub pe repo banao → code `git push` karo
3.  Vercel pe project import karo → env vars daalo → Deploy
4.  Domain ke DNS mein 2 records change karo (76.76.21.21 + cname.vercel-dns.com)
5.  Database migrate karo (`prisma migrate deploy` + seed + admin) → site LIVE!

Bilkul atakna to batao, har step main help karunga. 🚀
