# LapCare - Sistem Pakar Diagnosis Kerusakan Laptop (Dempster-Shafer)

Web app statis (HTML/CSS/JS, tanpa backend). Bisa dibuka langsung dengan klik dua kali `index.html`, termasuk tanpa internet.

## Struktur
- `data/*.csv` — 6 CSV basis pengetahuan (sama dengan notebook)
- `scripts/build-data.js` — konversi CSV → `data.json` + `js/data.js`, dengan validasi konsistensi (build gagal bila tidak lolos)
- `js/ds.js` — mesin Dempster-Shafer (`gabung`, `kombinasi`, `belPl`, `diagnosis`) dengan pecahan eksak BigInt
- `js/app.js` — antarmuka (6 halaman, router hash)
- `scripts/test-ds.js` — 6 kasus uji + 4 contoh acuan PRD 5.4

## Perintah
```
npm test        # build data + jalankan uji
npm run serve   # server lokal di http://localhost:5173
```
Setelah mengubah CSV, jalankan `npm run build`.

## Deploy
Unggah seluruh folder ke GitHub Pages / Netlify / Vercel (tanpa langkah build).
