# Forum Diskusi (React + Redux) + Automation Testing & CI/CD

Aplikasi forum diskusi untuk submission Dicoding **Menjadi React Web Developer Expert**:

1) **Membangun Aplikasi React dengan Redux**
2) **Menerapkan Automation Testing dan CI/CD pada Aplikasi Forum Diskusi**

API Base URL: `https://forum-api.dicoding.dev/v1/`

## Fitur (sesuai kriteria)
- Register & Login
- List thread + info pembuat + total komentar
- Detail thread + komentar
- Buat thread (butuh login)
- Buat komentar (butuh login)
- Loading indicator ketika fetch API
- Redux Store untuk state yang bersumber dari API (threads, users, thread detail, leaderboards, auth)
- Tidak ada pemanggilan REST API langsung di komponen (API call ada di thunk)
- React StrictMode
- ESLint config (StandardJS) dan script lint

## Fitur opsional (nilai lebih)
- Votes thread & komentar (optimistic update)
- Halaman Leaderboards
- Filter thread berdasarkan kategori (client-side)

## Menjalankan (step-by-step)
1. **Install Node.js** (disarankan Node 18+).
2. Ekstrak ZIP project, lalu buka terminal di folder project.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Jalankan mode development:
   ```bash
   npm run dev
   ```
   Buka URL yang muncul (biasanya http://localhost:5173).
5. Cek lint:
   ```bash
   npm run lint
   ```

## Akun (jawaban untuk "user pass nya apa")
- Aplikasi **tidak punya akun default**.
- Untuk login, silakan buat akun lewat menu **Register** (password Anda tentukan sendiri), lalu login.
6. Build production:
   ```bash
   npm run build
   npm run preview
   ```

## Catatan Teknis
- Token disimpan di `localStorage` dan dipakai sebagai header `Authorization: Bearer <token>`.
- Saat reload, aplikasi akan mencoba memuat profil dari endpoint `/users/me`.

## Automation Testing (wajib)

### Menjalankan unit / component test
Perintah wajib: 
```bash
npm test
```

Yang diuji (minimal):
- **Reducer**: `src/states/threads/slice.test.js`
- **Thunk**: `src/states/threads/thunks.test.js` (mock API)
- **React Component**: `src/ui/components/components.test.jsx`

### Menjalankan End-to-End (Cypress)
Perintah wajib:
```bash
npm run e2e
```

Test E2E:
- `cypress/e2e/login.cy.js`

Catatan:
- E2E menggunakan **cy.intercept** + fixtures agar stabil (tidak bergantung pada kondisi server).

## React Ecosystem (wajib)
Proyek ini menggunakan **Storybook** (React ecosystem) dan menyediakan minimal 2 story:
- `src/ui/components/ThreadItem.stories.jsx`
- `src/ui/components/VoteButtons.stories.jsx`

Jalankan:
```bash
npm run storybook
```

## CI/CD (wajib)

### 1) Siapkan repository GitHub
1. Buat repo baru di GitHub (untuk branch protection, **wajib public** saat proses penilaian).
2. Di folder project:
   ```bash
   git init
   git branch -M master
   git add .
   git commit -m "init forum app"
   git remote add origin <URL_REPO_ANDA>
   git push -u origin master
   ```

### 2) Continuous Integration (GitHub Actions)
Workflow sudah disediakan: `.github/workflows/ci.yml`

Workflow menjalankan:
- `npm run lint`
- `npm test`
- `npm run build`
- `npm run e2e` (Cypress)

Cara mendapatkan screenshot:
1. Buat branch fitur:
   ```bash
   git checkout -b add-awesome-feature
   ```
2. Untuk menghasilkan **CI gagal** (screenshot 1), lakukan perubahan yang membuat test fail, misalnya ubah ekspektasi pada salah satu file test, commit, push, dan buat Pull Request.
3. Untuk menghasilkan **CI lolos** (screenshot 2), kembalikan perubahan agar test pass, commit, push. Pada PR yang sama, checks akan berubah menjadi green.

> File placeholder screenshot sudah ada di folder `screenshot/`. **Ganti** isinya dengan screenshot asli PR Anda.

### 3) Continuous Deployment (Vercel)
1. Login ke Vercel.
2. Import project dari GitHub repo.
3. Framework preset: **Vite**.
4. Build command: `npm run build`
5. Output: `dist`
6. Deploy.

Setelah deploy, salin URL Vercel dan tempel di catatan submission Dicoding.

### 4) Branch Protection (master)
1. Buka repo di GitHub → **Settings → Branches**.
2. Add branch protection rule untuk `master`.
3. Centang:
   - **Require a pull request before merging**
   - **Require status checks to pass before merging**
   - Pilih check: `automation-test-job` (dari GitHub Actions)

Lalu buat PR (contoh: `add-awesome-feature` → `master`) dan ambil screenshot saat merge ter-block (screenshot 3).


## Catatan Dependensi ESLint
Project ini menggunakan ESLint v8 + eslint-config-standard v17 (kompatibel). Jika sebelumnya gagal install, hapus `node_modules` dan `package-lock.json`, lalu jalankan `npm install`.
