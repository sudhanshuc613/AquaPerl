# AquaNexa – Install & Deploy Guide (Step by Step, Beginner Friendly)

Project location: `/home/user/aquanexa/` is the built code.
Apne PC pe chalaane ke liye neeche ke steps follow karo.

---

## ✅ Step A — Project Download / Copy

Tareeka 1 (agar tum Arena pe dekh rahe ho):
Poora `aquanexa/` folder apne PC pe download/zip karke kahi extract karo (e.g. `C:\aquanexa` ya `~/aquanexa`)

Tareeka 2 (agar tum Git use karte ho):
```bash
git clone <your-repo-url> aquanexa
cd aquanexa
```

## ✅ Step B — Dependencies Install

Project folder ke andar terminal/CMD kholo aur yeh chalao:

```bash
npm install
```

(Agar `ERESOLVE` error aaye to ye chalao)
```bash
npm install --legacy-peer-deps
```

## ✅ Step C — .env File Setup

Project ke root folder mein ek naya file banayo naam `.env` aur neeche ke content ko usme paste karo,
phir `DATABASE_URL` aur `RAZORPAY_KEY_ID/SECRET` ko apne asli keys se replace karo:

```
DATABASE_URL="postgresql://neondb_owner:YOUR_PASSWORD@ep-xxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
NEXTAUTH_SECRET="aquanexa-ye-ek-bada-random-secret-hai-badal-dena-1234567890abcdef"
NEXTAUTH_URL="http://localhost:3000"

RAZORPAY_KEY_ID="rzp_test_xxxxxx"
RAZORPAY_KEY_SECRET="xxxxxx"

STRIPE_SECRET_KEY=""
STRIPE_PUBLISHABLE_KEY=""

TWILIO_ACCOUNT_SID=""
TWILIO_AUTH_TOKEN=""
TWILIO_WHATSAPP_FROM="whatsapp:+14155238886"

SMTP_HOST=""
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASS=""
ADMIN_EMAIL="support@rokadoctor.in"

NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

## ✅ Step D — Database Setup (Peheli Baar Only)

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
```

Isse:
1.  Tables ban jaengi Neon/local Postgres mein
2.  Sample categories (RO Purifiers, Spare Parts, Commercial Plants)
3.  4 sample products (demo ke liye)
4.  Patna ke 12 popular pincodes serviceable mark ho jaenge
5.  Contact numbers, banners, settings seed ho jayenge

## ✅ Step E — Local Server Chalu Karo

```bash
npm run dev
```

Ab browser mein kholo: **http://localhost:3000**

Dekhne waale pages:
- Homepage: http://localhost:3000
- Product (sample): http://localhost:3000/product/aquanexa-pro-12l
- Service Booking: http://localhost:3000/book-service
- Cart: http://localhost:3000/cart
- Categories: http://localhost:3000/categories/ro-purifiers
- Admin: http://localhost:3000/admin/dashboard

---

# 🌐 Part 3 — rokadoctor.in Pe Live Kaise Le Jayein

## Sabse Aasan Tarika: Vercel (FREE + One-Click Deploy)
Next.js Vercel ki hi company ka product hai — isliye sabse smooth rahta hai.

### Step 1 — GitHub pe repo banao
1. https://github.com pe jaake sign up
2. "New Repository" button → naam do `aquanexa` → Public/Private → Create
3. Terminal mein jao (project folder mein):
   ```bash
   git init
   git add .
   git commit -m "Initial AquaNexa commit"
   git branch -M main
   git remote add origin https://github.com/TUMHARA_USERNAME/aquanexa.git
   git push -u origin main
   ```

### Step 2 — Vercel pe deploy karo
1. https://vercel.com pe jaake "Sign Up" → "Continue with GitHub"
2. "Import Project" → tumhara `aquanexa` repo select karo
3. "Environment Variables" section mein woh saare keys daalo jo `.env` mein the
   (DATABASE_URL, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, NEXTAUTH_SECRET, NEXTAUTH_URL=https://rokadoctor.in, NEXT_PUBLIC_SITE_URL=https://rokadoctor.in)
4. **Deploy** button dabao — 2 minute mein live ho jaega ek URL pe (e.g. `aquanexa-xxx.vercel.app`)

### Step 3 — Apne custom domain rokadoctor.in ko Vercel se jodo
1. Vercel dashboard → apne project → **Settings → Domains**
2. `rokadoctor.in` add karo → Add
3. `www.rokadoctor.in` bhi add karo
4. Vercel tumhe **DNS records** batayega — tumhe ye apne domain provider (jahan se rokadoctor.in khareeda hai — GoDaddy/Namecheap/Hostinger/ResellerClub) ke DNS settings mein jake add karne hain:

| Type | Name | Value |
|------|------|-------|
| A    | @    | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

(Agar multiple IPs de rakhe hain, to purane A/CNAME records hata ke sirf ye upar wale rakho)

DNS propagate hone mein 5 min se lekar 48 ghante lag sakte hain (usually 10-15 min mein ho jata hai). Vercel "Valid Configuration" dikhane lage → domain live! 🔴→🟢

### Step 4 — SSL / HTTPS
Vercel pe DNS set hote hi automatic SSL lag jata hai (browser mein 🔐 lock dikhega). Kuch extra nahi karna.

---

## 🗄️ Database for Production
Vercel deploy ke time Neon wala hi DATABASE_URL use kar lo — Neon already cloud pe hai aur free plan 500MB data deta hai (kaafi hai shuruaat mein). Bad mein zarurat lage to upgrade ya AWS RDS switch kar lena.

---

## 📱 Domain + Hosting Recap (sabse simple setup)

| Chiz | Provider | Cost approx |
|------|----------|-------------|
| Domain rokadoctor.in | Pehle se tumhara hai (pehle se khareeda hua) | already paid |
| Hosting | **Vercel** (Pro plan bhi free for small projects) | ₹0 (FREE hobby plan) |
| Database | **Neon** (cloud Postgres) | ₹0 (500MB free) |
| Email/SMTP | Brevo / Resend | ₹0 free tier |
| Payment | Razorpay/Stripe | per-transaction |
| WhatsApp | Twilio WhatsApp Business | usage based |

👉 **Total monthly cost to launch: ~₹0 se ₹200** (jab tak traffic bada nahi hota)

---

## 🔁 Baad mein code update karna jab bhi changes karo
1.  Code edit karo apne editor mein
2.  Local pe test karo (`npm run dev`)
3.  Commit karo:
    ```bash
    git add .
    git commit -m "kya badla"
    git push
    ```
4.  Vercel **auto-deploy** kar dega (1 minute mein live ho jaega)

---

## 🛡️ Admin Panel Access

Abhi tak admin login wire-up nahi kiya tha (UI bana di hai). Pehla admin create karne ke liye:

1. Database seed chala diya to bhi nahi aaya kyunki seed mein admin user nahi tha.
2. Tum manually ya toh Prisma Studio chalao:
   ```bash
   npx prisma studio
   ```
   Browser http://localhost:5555 pe khulega → "User" table mein ek record banao:
   - name: Admin
   - email: admin@rokadoctor.in
   - phone: 8969821440
   - role: SUPER_ADMIN
   - passwordHash: iske liye ek chhota script banao ya main tumhare liye next message mein add kar deta hoon

3.  Phir `/api/auth/[...nextauth]` se login karke `/admin/dashboard` access kar paoge.

---

## ❓ Problem aaye to
- **Port 3000 already in use?** Koi aur app chala ra hoga — ya toh usko band karo ya port badlo: `npm run dev -- -p 3001`
- **Prisma DATABASE_URL error?** `.env` file sahi jagah hai (project root mein) aur connection string galat nahi hai, check karo
- **npm install fail?** Node version 18+ hai na? `node -v` se check karo — agar 16 se kam hai to update karo
- **Vercel build fail?** Build log dekhke batao main debug kar dunga
