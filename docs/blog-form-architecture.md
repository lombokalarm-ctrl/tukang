# Rancangan Form Blog Untuk TukangDiLombok.com

## Tujuan

Membuat alur input artikel blog yang mudah dipakai oleh pemilik website tanpa harus:

- membuka file `.mdx` secara manual
- mengedit `lib/blog.ts`
- menambah mapping komponen artikel satu per satu
- bingung mengisi metadata SEO

Target akhirnya adalah cukup membuka halaman admin, mengisi form blog, lalu artikel bisa disimpan sebagai draft atau dipublish.

## Kondisi Arsitektur Saat Ini

Saat ini blog masih berbasis file statis:

- metadata artikel disimpan dalam struktur data internal
- isi artikel disimpan di folder `content/blog/*.mdx`
- artikel di-load oleh `lib/blog.ts`
- setiap artikel masih dipetakan manual ke `articleComponentMap`

Konsekuensinya:

- sistem sekarang bagus untuk performa dan SEO
- tetapi belum cocok untuk input artikel lewat form biasa
- setiap artikel baru masih butuh pekerjaan teknis di level file/project

## Masalah Utama Jika Tetap Memakai Struktur Sekarang

Kalau dibuat form sederhana tetapi backend tetap memakai sistem saat ini, maka submit form harus:

1. membuat file `.mdx`
2. memperbarui metadata artikel
3. memperbarui mapping artikel di `lib/blog.ts`
4. memicu build ulang Next.js
5. me-restart aplikasi

Secara teknis ini bisa dilakukan, tetapi tidak ideal untuk operasional harian.

## Rekomendasi Arsitektur

Rekomendasi terbaik adalah memisahkan blog dari file statis dan memindahkannya ke model berbasis database.

Arsitektur yang disarankan:

1. halaman admin internal untuk input artikel
2. database untuk menyimpan artikel
3. editor rich text atau markdown untuk isi artikel
4. sistem status `draft` dan `published`
5. upload gambar cover
6. frontend blog membaca data dari database

Dengan arsitektur ini, pengelolaan artikel menjadi jauh lebih mudah tanpa perlu edit file project.

## Rekomendasi Teknis Yang Paling Cocok

Untuk project ini, pendekatan paling realistis adalah:

- tetap memakai frontend `Next.js App Router`
- menambahkan halaman admin internal, misalnya `/admin/blog`
- memakai database `MySQL/MariaDB` karena lingkungan VPS dan stack bisnis seperti ini biasanya paling cocok ke arah itu
- menambahkan tabel artikel blog
- memakai `Server Actions` atau route handler untuk simpan data

Kalau ingin implementasi cepat dan ringan, database yang direkomendasikan:

- `MySQL` atau `MariaDB`

Kalau ingin tipe data dan migrasi lebih rapi:

- `Prisma + MySQL`

## Bentuk Fitur Form Blog

Form blog minimum yang disarankan:

- Judul artikel
- Slug otomatis
- Ringkasan artikel
- Kategori
- Kata kunci SEO
- Gambar cover
- Nama penulis
- Tanggal publish
- Isi artikel
- Meta title
- Meta description
- Status `Draft`
- Status `Published`

Tambahan yang sangat berguna:

- preview URL
- tombol `Simpan Draft`
- tombol `Publish`
- upload gambar isi artikel
- auto-generate slug dari judul
- auto-generate meta description dari ringkasan

## Struktur Database Yang Disarankan

### Tabel `blog_posts`

Field yang direkomendasikan:

- `id`
- `title`
- `slug`
- `excerpt`
- `category`
- `cover_image`
- `author_name`
- `content`
- `meta_title`
- `meta_description`
- `status`
- `published_at`
- `updated_at`
- `created_at`

Contoh struktur logis:

```sql
CREATE TABLE blog_posts (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  cover_image VARCHAR(500) NULL,
  author_name VARCHAR(120) NOT NULL,
  content LONGTEXT NOT NULL,
  meta_title VARCHAR(255) NULL,
  meta_description TEXT NULL,
  status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  published_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Tabel `blog_post_keywords`

Karena website ini cukup SEO-driven, keyword sebaiknya tidak disimpan sebagai satu string panjang.

Field yang direkomendasikan:

- `id`
- `post_id`
- `keyword`

Contoh:

```sql
CREATE TABLE blog_post_keywords (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  post_id BIGINT UNSIGNED NOT NULL,
  keyword VARCHAR(120) NOT NULL,
  CONSTRAINT fk_blog_post_keywords_post
    FOREIGN KEY (post_id) REFERENCES blog_posts(id)
    ON DELETE CASCADE
);
```

## Alternatif Struktur Yang Lebih Sederhana

Kalau ingin implementasi lebih cepat, keyword bisa disimpan dulu sebagai JSON string atau comma-separated text di tabel utama.

Namun untuk jangka menengah, tabel terpisah tetap lebih rapi.

## Bentuk Tipe Data Di Aplikasi

Contoh tipe data yang disarankan di aplikasi:

```ts
export type BlogPostStatus = "draft" | "published";

export type BlogPostRecord = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  coverImage: string | null;
  authorName: string;
  content: string;
  metaTitle: string | null;
  metaDescription: string | null;
  status: BlogPostStatus;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  keywords: string[];
};
```

## Alur Admin Yang Direkomendasikan

Alur kerja paling nyaman:

1. admin login
2. buka `/admin/blog`
3. klik `Tambah Artikel`
4. isi form
5. klik `Simpan Draft` atau `Publish`
6. artikel otomatis masuk daftar blog

Kalau statusnya `draft`:

- artikel tidak tampil di halaman publik
- tidak masuk sitemap
- tidak bisa diindeks Google

Kalau statusnya `published`:

- artikel tampil di blog publik
- metadata SEO dibuat otomatis
- artikel masuk sitemap

## Alur Frontend Yang Direkomendasikan

Setelah blog pindah ke database, halaman publik berubah menjadi:

- halaman daftar artikel mengambil data dari database
- halaman detail artikel mengambil artikel berdasarkan `slug`
- metadata artikel dibangun dari data database
- artikel terkait tetap bisa dihitung dari kategori/keyword

## Format Isi Artikel

Ada tiga pilihan isi artikel:

### Opsi A: textarea biasa

Kelebihan:

- paling cepat dibuat
- paling ringan

Kekurangan:

- formatting terbatas

### Opsi B: markdown editor

Kelebihan:

- tetap ringan
- cocok untuk SEO article
- lebih fleksibel daripada textarea biasa

Kekurangan:

- perlu belajar sintaks markdown dasar

### Opsi C: rich text editor

Kelebihan:

- paling nyaman untuk non-teknis
- pengalaman paling mirip CMS

Kekurangan:

- implementasi lebih besar
- sanitasi HTML harus lebih ketat

## Rekomendasi Format Editor

Untuk website ini, rekomendasi paling seimbang adalah:

- gunakan editor `Markdown` dulu untuk fase awal

Alasannya:

- lebih ringan
- lebih mudah dikontrol
- lebih aman untuk rendering
- dekat dengan struktur blog Anda yang sekarang masih bernuansa MDX

## Status Dan Workflow

Status minimal yang direkomendasikan:

- `draft`
- `published`

Kalau nanti dibutuhkan, bisa ditambah:

- `archived`

Workflow minimum:

1. simpan draft
2. review
3. publish
4. edit artikel lama
5. update `updatedAt`

## Kebutuhan Halaman Admin

Minimal perlu 3 halaman:

### 1. Daftar Artikel

Contoh route:

- `/admin/blog`

Fitur:

- tabel artikel
- filter `draft/published`
- pencarian judul
- tombol edit
- tombol hapus
- tombol tambah artikel

### 2. Tambah Artikel

Contoh route:

- `/admin/blog/new`

Fitur:

- form lengkap
- simpan draft
- publish

### 3. Edit Artikel

Contoh route:

- `/admin/blog/[id]/edit`

Fitur:

- edit semua field
- update status
- preview artikel

## Kebutuhan Keamanan

Karena ini area admin, minimal perlu:

- login admin
- proteksi route admin
- validasi input server-side
- sanitasi isi artikel
- pembatasan upload file

Pilihan login sederhana yang masuk akal:

- session login admin internal
- email/password admin tunggal

Kalau ingin lebih rapi:

- `NextAuth` atau auth internal berbasis session

## Dampak Ke SEO

Kalau implementasi dilakukan dengan benar, SEO tetap aman.

Yang harus dijaga:

- slug tetap konsisten
- artikel `published` punya metadata lengkap
- canonical tetap benar
- sitemap hanya memuat artikel publish
- structured data `Article` tetap dipasang

## Strategi Migrasi Dari Sistem Sekarang

Karena sekarang artikel masih sedikit, migrasi bisa dibuat sederhana:

### Tahap 1

- buat tabel blog
- pindahkan artikel lama ke database
- biarkan frontend masih memakai tampilan yang sama

### Tahap 2

- ubah `getAllArticles()` agar membaca dari database
- ubah halaman detail blog membaca dari database

### Tahap 3

- buat admin form untuk create/edit/publish

### Tahap 4

- tambah upload cover image
- tambah preview artikel

## Dua Opsi Implementasi Nyata

### Opsi Rekomendasi: Dynamic Blog Berbasis Database

Cocok jika:

- Anda ingin update artikel dengan mudah
- tidak ingin edit file lagi
- ingin fondasi admin panel

Kelebihan:

- paling nyaman dipakai
- scalable
- cocok untuk operasional harian

Kekurangan:

- butuh implementasi lebih besar di awal

### Opsi Transisi: Form Admin Yang Tetap Menghasilkan Konten Build

Cocok jika:

- ingin perubahan seminimal mungkin ke frontend sekarang

Alurnya:

- isi form
- backend membuat data/file
- website dibuild ulang

Kelebihan:

- dekat dengan arsitektur saat ini

Kekurangan:

- operasional lebih ribet
- publish tidak sefleksibel database

## Rekomendasi Final

Untuk TukangDiLombok.com, rekomendasi final adalah:

- jangan menambah form di atas sistem blog statis yang sekarang
- buat fondasi baru untuk blog berbasis database
- gunakan admin internal sederhana
- gunakan status `draft/published`
- gunakan markdown editor untuk fase awal

Ini adalah jalur paling masuk akal jika tujuan Anda memang ingin update blog hanya lewat form.

## Tahapan Eksekusi Yang Disarankan

### Fase 1

- pasang database blog
- buat tipe data dan query dasar
- migrasi artikel lama

### Fase 2

- ubah halaman blog publik membaca database
- pertahankan metadata SEO

### Fase 3

- buat halaman admin blog
- buat form create/edit
- buat status draft/publish

### Fase 4

- tambah upload gambar
- tambah preview artikel
- tambah dashboard artikel

## Output Akhir Yang Akan Didapat

Kalau rancangan ini diimplementasikan, maka nanti alurnya menjadi:

1. Anda login ke admin
2. Anda isi form blog
3. Anda simpan draft atau publish
4. Artikel langsung muncul di website
5. Metadata SEO tetap otomatis terbentuk

Itulah model yang paling dekat dengan "update blog mudah hanya lewat form".
