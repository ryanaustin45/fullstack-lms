# LMS Backend — NestJS + Prisma + PostgreSQL + JWT

Struktur module: `auth`, `categories`, `courses`, `materials`, `enrollments`, `leaderboard`, `schedules`.

## Cara Menjalankan (Windows)

### 1. Extract project & install dependency

```bash
cd lms-backend
npm install
```

### 2. Setup database

1. Buka **pgAdmin 4**, pastikan database `lms_db` sudah dibuat (lihat panduan setup sebelumnya).
2. Copy `.env.example` menjadi `.env`:

```bash
copy .env.example .env
```

3. Edit `.env`, ganti `PASSWORD_KAMU` dengan password PostgreSQL kamu, dan ganti `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET` dengan string random (bisa pakai https://randomkeygen.com atau ketik bebas asal panjang & unik).

### 3. Generate Prisma Client & jalankan migration

```bash
npx prisma migrate dev --name init
```

Command ini akan:

- Membuat semua tabel di database `lms_db` sesuai `prisma/schema.prisma`
- Generate Prisma Client (query builder yang dipakai di semua service)

### 4. Jalankan server

```bash
npm run start:dev
```

Kalau berhasil, akan muncul:

```
🚀 Server berjalan di http://localhost:3000
📚 API Docs tersedia di http://localhost:3000/api/docs
```

Buka `http://localhost:3000/api/docs` di browser — ini Swagger UI, dokumentasi API interaktif yang bisa langsung dipakai untuk testing (klik "Authorize" untuk pakai token JWT setelah login).

## Testing Cepat (via Swagger atau Thunder Client)

1. **Register**: `POST /auth/register` — body: `{ "name": "Admin", "email": "admin@mail.com", "password": "admin123", "role": "admin" }`
2. **Login**: `POST /auth/login` — dapatkan `access_token`
3. Pakai `access_token` di header `Authorization: Bearer <token>` untuk akses endpoint lain (`/courses`, `/categories`, dst)

## Melihat Data di Database (GUI)

```bash
npx prisma studio
```

Ini membuka GUI di browser (`localhost:5555`) untuk lihat/edit data langsung — alternatif visual dari pgAdmin, khusus untuk tabel yang didefinisikan Prisma.

## Struktur Project

```
src/
├── auth/            # register, login, refresh token, JWT strategy
├── categories/       # kategori/modul kompetensi
├── courses/          # CRUD course + search & paginate (CONTOH POLA UNTUK MODULE LAIN)
├── materials/         # materi per course
├── enrollments/        # peserta enroll ke course + progress
├── leaderboard/        # poin & ranking peserta
├── schedules/         # jadwal pemateri
├── common/            # guards, decorators, filters yang dipakai bersama
└── prisma/            # koneksi database (global, bisa dipakai di module manapun)
```
