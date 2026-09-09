# LMS by Adhivasindo — Fullstack

Learning Management System dengan backend **NestJS + PostgreSQL** dan frontend **React + Vite + Tailwind**.

## Struktur Repo

```
fullstack-lms/
├── lms-backend/     # REST API (NestJS, Prisma, JWT Auth)
└── lms-frontend/    # Dashboard (React, Vite, Tailwind)
```

## Tech Stack

| Layer | Teknologi |
|---|---|
| Backend | NestJS, Prisma ORM, PostgreSQL, JWT |
| Frontend | React, Vite, TypeScript, Tailwind CSS |
| API Docs | Swagger (auto-generate dari backend) |

## Prasyarat

- [Node.js](https://nodejs.org) (LTS)
- [PostgreSQL](https://www.postgresql.org/download/) — sudah jalan & database sudah dibuat
- Git

## Cara Menjalankan (Local Development)

Jalankan **backend terlebih dahulu**, baru **frontend** (frontend butuh backend untuk fetch data).

### 1. Backend

```bash
cd lms-backend
npm install
copy .env.example .env
```

Edit `.env`:
- `DATABASE_URL` → sesuaikan dengan koneksi PostgreSQL kamu
- `JWT_ACCESS_SECRET` & `JWT_REFRESH_SECRET` → isi string random

```bash
npx prisma migrate dev --name init
npm run start:dev
```

Backend jalan di `http://localhost:3000`
Dokumentasi API (Swagger): `http://localhost:3000/api/docs`

Detail lengkap ada di [`lms-backend/README.md`](./lms-backend/README.md).

### 2. Frontend

Buka terminal baru (biarkan backend tetap jalan):

```bash
cd lms-frontend
npm install
copy .env.example .env
npm run dev
```

Frontend jalan di `http://localhost:5173`

Detail lengkap ada di [`lms-frontend/README.md`](./lms-frontend/README.md).

## Alur Testing Pertama Kali

1. Backend & frontend sudah jalan (lihat langkah di atas)
2. Buka `http://localhost:3000/api/docs`, coba `POST /auth/register` untuk buat akun pertama (misal role `admin`)
3. Buka `http://localhost:5173`, login pakai akun tadi
4. Dashboard masih kosong karena belum ada data course/category/schedule — input dulu lewat Swagger, atau lewat `npx prisma studio` (di folder `lms-backend`) untuk input manual ke database

## Modul yang Tersedia

- **Auth**: register, login, refresh token
- **Categories**: kategori/modul kompetensi
- **Courses**: CRUD + search & paginate
- **Materials**: materi per course
- **Enrollments**: peserta enroll + progress
- **Leaderboard**: poin & ranking peserta (input manual oleh pemateri/admin)
- **Schedules**: jadwal pemateri

## Roadmap

- [ ] Halaman Register di frontend
- [ ] Halaman Modul, Peserta, Group Chat, Pemateri
- [ ] Role-based UI (tampilan beda untuk admin/pemateri/peserta)
- [ ] Deploy backend (Railway/Render) & frontend (Vercel/Netlify)

## Kontribusi / Development

Setiap module backend mengikuti pola: `*.controller.ts` (route) → `*.service.ts` (logic) → `*.module.ts` (registrasi). Lihat contoh di `lms-backend/src/courses/` sebagai referensi saat menambah module baru.
