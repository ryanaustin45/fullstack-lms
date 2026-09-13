# LMS by Ryan Austin Andika — Fullstack

Learning Management System dengan backend **NestJS + PostgreSQL** dan frontend **React + Vite + Tailwind**.

## Struktur Repo

```
fullstack-lms/
├── lms-backend/     # REST API (NestJS, Prisma, JWT Auth)
└── lms-frontend/    # Dashboard (React, Vite, Tailwind)
```

## Tech Stack

| Layer    | Teknologi                             |
| -------- | ------------------------------------- |
| Backend  | NestJS, Prisma ORM, PostgreSQL, JWT   |
| Frontend | React, Vite, TypeScript, Tailwind CSS |
| API Docs | Swagger (auto-generate dari backend)  |

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
2. Buka `http://localhost:5173/register`, daftar akun sebagai **peserta** atau **pemateri** (role dipilih langsung di form)
3. Untuk akun **admin**, daftar dulu lewat form (jadi peserta/pemateri), lalu ubah kolom `role` jadi `admin` manual — registrasi publik sengaja tidak bisa langsung jadi admin
4. Login → masuk ke dashboard
5. Buat kategori dulu di menu **Kategori** sebelum bisa membuat course (course butuh kategori)
6. Lanjut buat course di menu **Modul**, klik judul course untuk kelola materinya

## Modul yang Tersedia

| Module      | Endpoint Backend                            | Halaman Frontend           | Catatan                                                                                    |
| ----------- | ------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------ |
| Auth        | register, login, refresh                    | `/login`, `/register`      | Register hanya bisa role `peserta`/`pemateri`                                              |
| Categories  | full CRUD                                   | `/categories`              | Perlu diisi dulu sebelum bisa buat course                                                  |
| Courses     | CRUD + search & paginate                    | `/courses`, `/courses/:id` | Search real-time dengan debounce                                                           |
| Materials   | create, list per course, delete             | Nested di `/courses/:id`   | Ditampilkan sebagai daftar materi per course                                               |
| Enrollments | enroll, update progress, list milik sendiri | `/enrollments`             | Khusus role peserta; admin/pemateri belum bisa lihat semua peserta (backend belum support) |
| Leaderboard | get ranking, input poin manual              | `/leaderboard`             | Input poin masih pakai User ID manual (belum ada search user)                              |
| Schedules   | list per bulan, create                      | `/schedules`               | Filter per bulan dengan navigasi maju/mundur                                               |

## Role & Hak Akses

| Role       | Bisa Register Sendiri?                  | Kelola Course/Kategori/Jadwal | Enroll & Progress | Terima Poin                |
| ---------- | --------------------------------------- | ----------------------------- | ----------------- | -------------------------- |
| `admin`    | Tidak (harus diubah manual di database) | Ya (termasuk hapus)           | -                 | -                          |
| `pemateri` | Ya                                      | Ya (kecuali hapus kategori)   | -                 | Bisa kasih poin ke peserta |
| `peserta`  | Ya                                      | Read-only                     | Ya                | Ya                         |

## Keterbatasan yang Diketahui (Belum Dikerjakan)

- Endpoint `GET /users` belum ada → form "Berikan Poin" di Leaderboard masih input User ID manual
- Admin/Pemateri belum bisa lihat daftar semua peserta yang enroll ke suatu course (perlu endpoint baru di Enrollments)
- Halaman "Group Chat" dan "Pemateri" di sidebar belum dibuat
- Progress belajar dihitung per course (bukan per materi), sesuai keputusan awal — materi belum ada status selesai/belum per peserta

## Roadmap

- [ ] Endpoint `GET /users` + halaman search user di Leaderboard
- [ ] Endpoint list peserta per course untuk admin/pemateri
- [ ] Halaman Group Chat & Pemateri
- [ ] Deploy backend (Railway/Render) & frontend (Vercel/Netlify)

## Development

Setiap module backend mengikuti pola: `*.controller.ts` (route) → `*.service.ts` (logic) → `*.module.ts` (registrasi), dengan validasi lewat `dto/`. Lihat `lms-backend/src/courses/` sebagai referensi paling lengkap saat menambah module baru.

Setiap halaman frontend mengikuti pola: fetch data di `useEffect`, modal terpisah untuk form create/edit (`src/components/*FormModal.tsx`), dan cek `getCurrentUser()?.role` untuk menyembunyikan aksi yang tidak diizinkan.
