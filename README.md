# TukangDiLombok.com

Website jasa tukang dan teknisi profesional di Lombok berbasis Next.js App Router, TypeScript, Tailwind CSS, MDX blog, dan programmatic SEO untuk kombinasi layanan + area.

## Local Development

Jalankan development server:

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Production Build

Untuk build production:

```bash
npm run build
npm run start
```

## Environment Variables

Salin `.env.example` menjadi `.env.local` untuk development atau isi variabel yang sama di server production:

```bash
GOOGLE_SITE_VERIFICATION=
BING_SITE_VERIFICATION=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

Keterangan:

- `GOOGLE_SITE_VERIFICATION`: token dari Google Search Console
- `BING_SITE_VERIFICATION`: token dari Bing Webmaster Tools
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: Measurement ID Google Analytics 4, contoh `G-XXXXXXXXXX`

## Search Console dan Bing

### Google Search Console

1. Tambahkan property domain atau URL prefix untuk `https://tukangdilombok.com`
2. Ambil token verifikasi HTML tag
3. Isi ke `GOOGLE_SITE_VERIFICATION`
4. Deploy ulang website
5. Buka Search Console dan submit sitemap:

```text
https://tukangdilombok.com/sitemap.xml
```

### Bing Webmaster Tools

1. Tambahkan site `https://tukangdilombok.com`
2. Ambil token verifikasi meta tag `msvalidate.01`
3. Isi ke `BING_SITE_VERIFICATION`
4. Deploy ulang website
5. Submit sitemap:

```text
https://tukangdilombok.com/sitemap.xml
```

## Google Analytics 4

Jika ingin mengaktifkan GA4:

1. Buat property dan web data stream di Google Analytics
2. Ambil Measurement ID
3. Isi ke `NEXT_PUBLIC_GA_MEASUREMENT_ID`
4. Deploy ulang website

Analytics hanya aktif jika variabel tersebut diisi.

## Live URLs

- Domain: [https://tukangdilombok.com](https://tukangdilombok.com)
- Robots: [https://tukangdilombok.com/robots.txt](https://tukangdilombok.com/robots.txt)
- Sitemap: [https://tukangdilombok.com/sitemap.xml](https://tukangdilombok.com/sitemap.xml)
