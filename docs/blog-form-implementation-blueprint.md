# Blueprint Implementasi Admin Form Blog

## Tujuan Dokumen

Dokumen ini adalah versi eksekusi dari rancangan arsitektur sebelumnya. Fokusnya bukan lagi "apa yang ideal", tetapi "bagaimana implementasinya secara nyata" di project TukangDiLombok saat ini.

Target hasil akhir:

- admin bisa membuat artikel lewat form
- artikel bisa disimpan sebagai draft atau publish
- blog publik tetap SEO-friendly
- migrasi dilakukan bertahap tanpa merusak halaman blog live

## Kondisi Project Saat Ini

Blog publik saat ini:

- daftar artikel diambil lewat `getAllArticles()` pada [blog.ts](file:///e:/xampp/htdocs/tukang/lib/blog.ts)
- halaman list blog ada di [page.tsx](file:///e:/xampp/htdocs/tukang/app/blog/page.tsx)
- halaman detail blog ada di [page.tsx](file:///e:/xampp/htdocs/tukang/app/blog/%5Bslug%5D/page.tsx)
- isi artikel berasal dari file `content/blog/*.mdx`
- metadata artikel diturunkan dari data statis

Artinya, implementasi admin blog tidak cukup menambah halaman form saja. Kita perlu menambahkan lapisan data baru yang nantinya menggantikan sumber artikel statis.

## Keputusan Teknis Final

### Stack Yang Direkomendasikan

Gunakan stack berikut:

- `MySQL` atau `MariaDB`
- `Prisma`
- `Next.js App Router`
- `Server Actions`
- autentikasi admin sederhana berbasis session
- editor `Markdown` untuk fase awal

### Kenapa Stack Ini Dipilih

- `MySQL/MariaDB` cocok dengan lingkungan VPS dan pola deploy project ini
- `Prisma` mempercepat pembuatan schema, query, dan migrasi
- `Server Actions` cocok untuk create/update form internal tanpa membuat API besar di awal
- editor `Markdown` lebih aman, ringan, dan paling dekat dengan blog system yang sekarang

## Paket Yang Direkomendasikan

Paket minimum saat implementasi nanti:

```bash
npm install prisma @prisma/client mysql2 zod bcryptjs iron-session
npm install -D prisma
```

Catatan:

- `zod` untuk validasi form
- `bcryptjs` untuk hash password admin
- `iron-session` untuk session sederhana

Kalau ingin auth yang lebih besar, bisa pindah ke `NextAuth/Auth.js`, tetapi untuk admin tunggal internal, `iron-session` lebih ringan.

## Environment Variables Yang Dibutuhkan

Tambahkan env berikut:

```env
DATABASE_URL=
ADMIN_EMAIL=
ADMIN_PASSWORD_HASH=
SESSION_SECRET=
```

Penjelasan:

- `DATABASE_URL`: koneksi `MySQL/MariaDB`
- `ADMIN_EMAIL`: email login admin
- `ADMIN_PASSWORD_HASH`: password admin yang sudah di-hash
- `SESSION_SECRET`: secret session

## Struktur Folder Yang Disarankan

Tambahkan struktur berikut:

```text
app/
  admin/
    login/
      page.tsx
    blog/
      page.tsx
      new/
        page.tsx
      [id]/
        edit/
          page.tsx
components/
  admin/
    blog-form.tsx
    blog-post-table.tsx
    login-form.tsx
lib/
  auth/
    session.ts
  blog-admin/
    actions.ts
    queries.ts
    mapper.ts
    validation.ts
  db/
    prisma.ts
prisma/
  schema.prisma
```

## Route Yang Akan Dibuat

### 1. Login Admin

Route:

- `/admin/login`

Fungsi:

- form email dan password
- membuat session admin
- redirect ke `/admin/blog`

### 2. Daftar Artikel Admin

Route:

- `/admin/blog`

Fungsi:

- daftar semua artikel
- filter `draft` dan `published`
- pencarian judul
- aksi edit
- aksi hapus
- tombol tambah artikel

### 3. Tambah Artikel

Route:

- `/admin/blog/new`

Fungsi:

- isi form blog lengkap
- simpan draft
- publish artikel

### 4. Edit Artikel

Route:

- `/admin/blog/[id]/edit`

Fungsi:

- ubah artikel
- ubah status
- update metadata

## Model Data Yang Direkomendasikan

### Prisma Schema Sederhana

```prisma
model BlogPost {
  id              BigInt      @id @default(autoincrement())
  title           String
  slug            String      @unique
  excerpt         String      @db.Text
  category        String
  coverImage      String?
  authorName      String
  content         String      @db.LongText
  metaTitle       String?
  metaDescription String?     @db.Text
  status          BlogStatus  @default(DRAFT)
  publishedAt     DateTime?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  keywords        BlogKeyword[]
}

model BlogKeyword {
  id      BigInt   @id @default(autoincrement())
  keyword String
  postId  BigInt
  post    BlogPost @relation(fields: [postId], references: [id], onDelete: Cascade)
}

enum BlogStatus {
  DRAFT
  PUBLISHED
}
```

## Kontrak Tipe Data Di Aplikasi

Tipe data yang disarankan:

```ts
export type AdminBlogFormValues = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  coverImage: string;
  authorName: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  status: "draft" | "published";
  publishedAt?: string;
};
```

## Validasi Form

Validasi minimum:

- `title` wajib
- `slug` wajib dan unik
- `excerpt` wajib
- `category` wajib
- `authorName` wajib
- `content` wajib
- `metaTitle` maksimal 60-70 karakter
- `metaDescription` maksimal sekitar 160 karakter
- `keywords` minimal 1

Contoh arah validasi dengan `zod`:

```ts
const blogPostSchema = z.object({
  title: z.string().min(5),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  excerpt: z.string().min(20),
  category: z.string().min(2),
  coverImage: z.string().optional(),
  authorName: z.string().min(2),
  content: z.string().min(50),
  metaTitle: z.string().min(10).max(70),
  metaDescription: z.string().min(30).max(170),
  keywords: z.array(z.string().min(2)).min(1),
  status: z.enum(["draft", "published"]),
  publishedAt: z.string().optional(),
});
```

## Bentuk UI Form Yang Direkomendasikan

Urutan field pada halaman form:

1. Judul artikel
2. Slug
3. Ringkasan
4. Kategori
5. Cover image
6. Author
7. Keywords
8. Meta title
9. Meta description
10. Isi artikel
11. Status
12. Published date

Tombol aksi:

- `Simpan Draft`
- `Publish`
- `Preview`

## Alur Submit Form

### Simpan Draft

Saat klik `Simpan Draft`:

1. validasi input
2. simpan artikel dengan status `draft`
3. artikel belum tampil di frontend publik
4. redirect kembali ke halaman edit atau list admin

### Publish

Saat klik `Publish`:

1. validasi input
2. simpan artikel dengan status `published`
3. isi `publishedAt` bila belum ada
4. halaman blog publik langsung bisa membaca artikel tersebut
5. artikel masuk sitemap

## Strategi Query Blog Publik

Alih-alih langsung mengganti semua logic lama, gunakan strategi transisi.

### Tahap Transisi Aman

`lib/blog.ts` bisa diubah bertahap menjadi:

1. baca artikel database yang `published`
2. jika belum ada data database, fallback ke artikel statis lama

Keuntungan:

- migrasi bisa bertahap
- artikel lama tetap aman
- tidak perlu memigrasikan semua artikel dalam satu waktu

## Mapper Yang Dibutuhkan

Karena komponen blog publik saat ini mengharapkan tipe `BlogArticle`, perlu dibuat mapper:

- dari `BlogPost` database
- ke format `BlogArticle`

Contoh tanggung jawab mapper:

- convert `authorName` menjadi `author`
- convert `coverImage`
- hitung `readingTime`
- generate `toc` dari markdown
- render markdown menjadi HTML/component

## Pilihan Rendering Isi Artikel

### Rekomendasi Fase 1

Gunakan `Markdown` string yang dirender saat halaman detail dibuka.

Kebutuhan:

- parser markdown
- sanitasi output
- heading extraction untuk TOC

Untuk fase awal, jangan langsung mengejar editor WYSIWYG karena kompleksitasnya jauh lebih besar.

## Dampak Ke Halaman Detail Blog

Halaman [page.tsx](file:///e:/xampp/htdocs/tukang/app/blog/%5Bslug%5D/page.tsx) nantinya perlu menyesuaikan dua hal:

- sumber data artikel bukan lagi murni file statis
- bagian `<article.Content />` diganti menjadi renderer markdown/database content

Rute dan struktur URL tidak perlu diubah:

- `/blog`
- `/blog/[slug]`

Ini penting agar SEO yang sudah berjalan tetap aman.

## Dampak Ke Sitemap

Sitemap nantinya perlu memuat:

- artikel statis lama yang masih aktif
- artikel database dengan status `published`

Draft tidak boleh masuk sitemap.

## Dampak Ke Metadata

Metadata artikel tetap harus dibangun dari field:

- `title`
- `excerpt`
- `slug`
- `keywords`
- `coverImage`
- `authorName`
- `publishedAt`
- `updatedAt`

Dengan begitu kualitas SEO artikel tetap sejajar atau lebih baik dari sistem sekarang.

## Kebutuhan Auth Minimum

Untuk fase awal, auth paling masuk akal:

- satu admin internal
- login email dan password
- session cookie
- proteksi semua route `/admin/*`

Guard minimum:

- jika belum login, redirect ke `/admin/login`
- jika session invalid, hapus cookie dan minta login ulang

## Kebutuhan Aksi Backend

Server action minimum yang nanti perlu dibuat:

- `loginAdmin`
- `logoutAdmin`
- `createBlogPost`
- `updateBlogPost`
- `deleteBlogPost`
- `publishBlogPost`
- `saveDraftBlogPost`

## Kebutuhan Halaman List Admin

Kolom yang disarankan:

- Judul
- Status
- Kategori
- Author
- Updated at
- Published at
- Aksi

Aksi:

- Edit
- Publish
- Jadikan draft
- Hapus

## Fase Implementasi Yang Disarankan

### Fase 1: Fondasi Data

Kerjakan:

- install dependency
- buat `prisma/schema.prisma`
- buat koneksi database
- migrate schema
- buat query dasar blog

Output:

- tabel blog siap dipakai

### Fase 2: Admin Auth

Kerjakan:

- halaman login admin
- session helper
- route guard

Output:

- area admin sudah terlindungi

### Fase 3: Form Admin Blog

Kerjakan:

- komponen form
- server action create/update
- status draft/publish

Output:

- admin sudah bisa membuat artikel

### Fase 4: Blog Publik Membaca Database

Kerjakan:

- ubah `getAllArticles()`
- ubah `getArticleBySlug()`
- buat fallback ke data lama bila perlu

Output:

- artikel database tampil di frontend publik

### Fase 5: Refinement

Kerjakan:

- upload image
- preview artikel
- auto slug
- auto meta description

Output:

- pengalaman admin lebih nyaman

## Risiko Dan Cara Menghindarinya

### Risiko 1: Blog live rusak saat migrasi

Mitigasi:

- gunakan fallback ke artikel statis lama
- migrasi bertahap

### Risiko 2: Metadata SEO menurun

Mitigasi:

- samakan field metadata database dengan kebutuhan `buildMetadata()`

### Risiko 3: Admin panel terlalu besar di awal

Mitigasi:

- mulai dari editor markdown sederhana
- fokus dulu pada create/edit/publish

### Risiko 4: Upload file memperumit rilis pertama

Mitigasi:

- fase awal gunakan input URL cover image
- upload file ditambahkan di fase berikutnya

## Rekomendasi Implementasi Paling Aman

Urutan eksekusi terbaik untuk project ini:

1. siapkan database dan Prisma
2. buat auth admin sederhana
3. buat halaman daftar artikel admin
4. buat form create/edit blog
5. ubah frontend blog membaca database
6. pertahankan fallback artikel statis sampai sistem baru stabil

## Keputusan Final

Blueprint ini menetapkan bahwa implementasi blog form yang paling tepat untuk TukangDiLombok adalah:

- blog admin internal
- database `MySQL/MariaDB`
- `Prisma`
- auth sederhana berbasis session
- editor `Markdown`
- workflow `draft/published`
- migrasi bertahap dengan fallback ke sistem lama

Dengan keputusan ini, tahap berikutnya bisa langsung masuk ke implementasi teknis tanpa perlu mengulang diskusi arsitektur dari nol.
