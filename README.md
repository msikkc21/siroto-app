# 🌿 Siroto App — IoT Monitoring System

Sistem monitoring IoT berbasis web untuk **kolam lele** dan **kondisi tanah**. Dibangun dengan Next.js (frontend), Express.js + Prisma (backend), dan Supabase (database PostgreSQL).

---

## 📁 Struktur Project

```
siroto-app/                     ← Monorepo root
├── frontend/                   ← Next.js (React)
│   ├── src/lib/api.js          ← Helper fetch ke backend
│   ├── next.config.ts          ← Konfigurasi proxy ke backend
│   └── vercel.json             ← Config deploy Vercel
│
├── backend/                    ← Express.js + Prisma
│   ├── src/
│   │   ├── index.js            ← Entry point server
│   │   ├── lib/prisma.js       ← Prisma client (singleton)
│   │   └── routes/sensor.js   ← API routes sensor
│   ├── prisma/
│   │   └── schema.prisma       ← Definisi tabel database
│   └── vercel.json             ← Config deploy Vercel
│
└── package.json                ← Root scripts (monorepo)
```

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS |
| **Backend** | Express.js 5, Prisma ORM |
| **Database** | PostgreSQL via Supabase (gratis) |
| **Deploy** | Vercel (2 project terpisah) |

---

## 🚀 Instalasi Awal

### Prasyarat

Pastikan sudah terinstall di komputermu:
- [Node.js](https://nodejs.org) versi **18 ke atas**
- [Git](https://git-scm.com)
- Akun [Supabase](https://supabase.com) (gratis)

---

### Step 1 — Clone Repository

```bash
git clone https://github.com/username/siroto-app.git
cd siroto-app
```

---

### Step 2 — Install Dependencies

```bash
# Install semua dependencies (frontend + root)
npm install

# Install dependencies backend secara terpisah
npm install --prefix backend
```

> ⚠️ Backend diinstall terpisah karena Prisma tidak kompatibel dengan npm workspaces hoisting.

---

### Step 3 — Setup Database (Supabase)

#### 3a. Buat project di Supabase
1. Buka [supabase.com](https://supabase.com) → **New Project**
2. Pilih region **Southeast Asia (Singapore)**
3. Catat **password** database-mu

#### 3b. Ambil Connection String
1. Di Supabase Dashboard → **Settings** → **Database**
2. Pilih tab **Connect** → pilih ORM **Prisma**
3. Copy dua URL yang tersedia:
   - `DATABASE_URL` — Transaction mode (ada `?pgbouncer=true`)
   - `DIRECT_URL` — Session mode (port 5432)

#### 3c. Buat file `.env` di folder backend

```bash
cp backend/.env.example backend/.env
```

Buka `backend/.env` dan isi dengan URL dari Supabase:

```env
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"

PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

---

### Step 4 — Setup Prisma (Buat Tabel di Database)

```bash
cd backend
npx prisma db push
```

Output yang diharapkan:
```
🚀  Your database is now in sync with your Prisma schema.
✔  Generated Prisma Client
```

---

### Step 5 — Setup Environment Frontend

```bash
cp frontend/.env.local.example frontend/.env.local
```

File `frontend/.env.local` sudah berisi nilai default untuk development:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
BACKEND_URL=http://localhost:5000
```

---

### Step 6 — Jalankan Development Server

```bash
# Dari root folder — jalankan frontend & backend sekaligus
npm run dev
```

Atau jalankan secara terpisah:

```bash
# Terminal 1 — Backend (http://localhost:5000)
npm run dev:backend

# Terminal 2 — Frontend (http://localhost:3000)
npm run dev:frontend
```

---

## ✅ Verifikasi

Pastikan semuanya berjalan dengan benar:

| URL | Yang Diharapkan |
|---|---|
| `http://localhost:5000/api/health` | `{"status":"ok","message":"Siroto API is running 🚀"}` |
| `http://localhost:5000/api/sensor/kolam` | `{"success":true,"data":[...]}` |
| `http://localhost:3000` | Halaman frontend Next.js |

---

## 📡 API Endpoints

### Health Check
```
GET /api/health
```

### Sensor Kolam Lele
```
GET  /api/sensor/kolam?limit=50     ← Ambil data terbaru
POST /api/sensor/kolam              ← Kirim data dari device IoT
```

**Body POST kolam:**
```json
{
  "deviceId": "device-kolam-01",
  "suhuAir": 28.5,
  "ph": 7.2,
  "dissolvedOxygen": 6.8,
  "tds": 450
}
```

### Sensor Tanah
```
GET  /api/sensor/tanah?limit=50     ← Ambil data terbaru
POST /api/sensor/tanah              ← Kirim data dari device IoT
```

**Body POST tanah:**
```json
{
  "deviceId": "device-tanah-01",
  "kelembabanTanah": 65.3,
  "suhuTanah": 26.1,
  "phTanah": 6.5
}
```

---

## 🌐 Deploy ke Vercel

Project ini di-deploy sebagai **2 project terpisah** di Vercel (tetap 1 repo di GitHub).

### Deploy Backend
1. Buka [vercel.com](https://vercel.com) → **New Project**
2. Import repo `siroto-app`
3. Set **Root Directory** ke `backend`
4. Tambah **Environment Variables** (isi dari `backend/.env`)
5. Deploy

### Deploy Frontend
1. Buka [vercel.com](https://vercel.com) → **New Project**
2. Import repo `siroto-app` (lagi)
3. Set **Root Directory** ke `frontend`
4. Tambah **Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=https://url-backend-vercel-kamu.vercel.app
   BACKEND_URL=https://url-backend-vercel-kamu.vercel.app
   ```
5. Deploy

> 💡 Deploy backend dulu, baru frontend — supaya kamu sudah punya URL backend untuk diisi di env frontend.

---

## 🗄️ Prisma Commands

```bash
cd backend

# Sinkronkan schema ke database (development)
npx prisma db push

# Buka Prisma Studio (GUI database)
npx prisma studio

# Generate ulang Prisma Client
npx prisma generate
```

---

## 📝 Lisensi

ISC
