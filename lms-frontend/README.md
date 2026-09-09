# LMS Frontend — React + Vite + Tailwind

Frontend dashboard sesuai mockup, terhubung ke backend `lms-backend` (NestJS).

## Cara Menjalankan (Windows)

### 1. Install dependency

```bash
cd lms-frontend
npm install
```

### 2. Konfigurasi API URL

```bash
copy .env.example .env
```

Isi default `VITE_API_URL=http://localhost:3000` sudah sesuai dengan backend yang dijalankan di panduan sebelumnya — tidak perlu diubah kalau backend jalan di port 3000.

### 3. Jalankan dev server

```bash
npm run dev
```

Buka `http://localhost:5173` di browser.

**Penting**: pastikan **backend (`lms-backend`) sudah jalan lebih dulu** di `http://localhost:3000`, karena dashboard ini fetch data course/leaderboard/schedule langsung dari API.

## Alur Testing

1. Buka `http://localhost:5173` → otomatis redirect ke `/login` (belum ada token)
2. Register user dulu lewat Swagger backend (`http://localhost:3000/api/docs`) — belum ada halaman register di frontend ini
3. Login dengan akun yang baru dibuat → masuk ke dashboard
4. Dashboard akan kosong/error kalau belum ada data course/leaderboard/schedule di database — input dulu lewat Swagger atau Prisma Studio (`npx prisma studio` di folder backend)

## Struktur Project

```
src/
├── components/
│   ├── Sidebar.tsx        # navigasi kiri
│   ├── Header.tsx          # search bar + notifikasi
│   ├── HeroBanner.tsx       # banner course utama (gradient ungu)
│   ├── ModuleCard.tsx       # card kategori kompetensi
│   ├── LeaderboardTable.tsx # tabel nilai peserta
│   └── RightPanel.tsx       # profile, kalender, jadwal pemateri
├── pages/
│   ├── Login.tsx
│   └── Dashboard.tsx        # menyatukan semua komponen di atas
├── lib/
│   ├── api.ts               # axios instance + auto-refresh token
│   └── auth.ts              # login/logout/getCurrentUser
└── types/index.ts           # TypeScript interfaces (User, Course, dll)
```
