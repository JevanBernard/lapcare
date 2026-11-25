// Dibuat otomatis oleh scripts/build-data.js dari data/*.csv — jangan disunting manual.
window.LAPCARE_DATA = {
 "dibuat": "2026-11-25T07:13:49.368Z",
 "kategori": [
  {
   "id": "layar",
   "nama": "Layar & tampilan",
   "kerusakan": [
    "K1",
    "K3",
    "K4"
   ],
   "warna": "lavender",
   "ikon": "monitor"
  },
  {
   "id": "daya",
   "nama": "Daya, baterai & mainboard",
   "kerusakan": [
    "K2",
    "K8",
    "K11",
    "K12",
    "K16"
   ],
   "warna": "peach",
   "ikon": "battery"
  },
  {
   "id": "input",
   "nama": "Keyboard & touchpad",
   "kerusakan": [
    "K5",
    "K6"
   ],
   "warna": "mint",
   "ikon": "keyboard"
  },
  {
   "id": "kinerja",
   "nama": "Penyimpanan, memori & kinerja",
   "kerusakan": [
    "K7",
    "K10",
    "K17",
    "K18"
   ],
   "warna": "sky",
   "ikon": "chip"
  },
  {
   "id": "konek",
   "nama": "Audio, jaringan & port",
   "kerusakan": [
    "K9",
    "K13",
    "K14",
    "K15"
   ],
   "warna": "lilac",
   "ikon": "wifi"
  }
 ],
 "kerusakan": [
  {
   "kode": "K1",
   "nama": "IC VGA",
   "sumber": "Saragih dkk. (2018) Tabel 1",
   "jurnal": "Saragih"
  },
  {
   "kode": "K2",
   "nama": "IC Power",
   "sumber": "Saragih dkk. (2018) Tabel 1",
   "jurnal": "Saragih"
  },
  {
   "kode": "K3",
   "nama": "Inverter/gangguan pada kabel fleksibel laptop",
   "sumber": "Saragih dkk. (2018) Tabel 1",
   "jurnal": "Saragih"
  },
  {
   "kode": "K4",
   "nama": "LCD",
   "sumber": "Saragih dkk. (2018) Tabel 1",
   "jurnal": "Saragih"
  },
  {
   "kode": "K5",
   "nama": "Keyboard laptop",
   "sumber": "Saragih dkk. (2018) Tabel 1",
   "jurnal": "Saragih"
  },
  {
   "kode": "K6",
   "nama": "TouchPad laptop",
   "sumber": "Saragih dkk. (2018) Tabel 1",
   "jurnal": "Saragih"
  },
  {
   "kode": "K7",
   "nama": "Harddisk laptop",
   "sumber": "Saragih dkk. (2018) Tabel 1",
   "jurnal": "Saragih"
  },
  {
   "kode": "K8",
   "nama": "Charger laptop",
   "sumber": "Saragih dkk. (2018) Tabel 1",
   "jurnal": "Saragih"
  },
  {
   "kode": "K9",
   "nama": "Sound Card",
   "sumber": "Saragih dkk. (2018) Tabel 1",
   "jurnal": "Saragih"
  },
  {
   "kode": "K10",
   "nama": "RAM",
   "sumber": "Saragih dkk. (2018) Tabel 1",
   "jurnal": "Saragih"
  },
  {
   "kode": "K11",
   "nama": "Baterai CMOS",
   "sumber": "Saragih dkk. (2018) Tabel 1",
   "jurnal": "Saragih"
  },
  {
   "kode": "K12",
   "nama": "Baterai laptop",
   "sumber": "Saragih dkk. (2018) Tabel 1",
   "jurnal": "Saragih"
  },
  {
   "kode": "K13",
   "nama": "Wireless Card",
   "sumber": "Saragih dkk. (2018) Tabel 1",
   "jurnal": "Saragih"
  },
  {
   "kode": "K14",
   "nama": "Port USB laptop",
   "sumber": "Saragih dkk. (2018) Tabel 1",
   "jurnal": "Saragih"
  },
  {
   "kode": "K15",
   "nama": "Pemutar CD/DVD",
   "sumber": "Saragih dkk. (2018) Tabel 1",
   "jurnal": "Saragih"
  },
  {
   "kode": "K16",
   "nama": "Mainboard",
   "sumber": "Arifin & Norhikmah (2024) Tabel 4 (KL8)",
   "jurnal": "Arifin"
  },
  {
   "kode": "K17",
   "nama": "Processor Overheat",
   "sumber": "Arifin & Norhikmah (2024) Tabel 4 (KL9)",
   "jurnal": "Arifin"
  },
  {
   "kode": "K18",
   "nama": "IC BIOS",
   "sumber": "Hilda dkk. (2023) Tabel 1 (K13)",
   "jurnal": "Hilda"
  }
 ],
 "gejala": [
  {
   "kode": "G1",
   "nama": "Suhu laptop meningkat secara drastis saat pertama kali dihidupkan",
   "m": "0.6",
   "H": [
    "K1",
    "K2"
   ],
   "kategori": "layar",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Hilda G34=0.5",
   "catatan": "",
   "badges": [
    "lintas"
   ]
  },
  {
   "kode": "G2",
   "nama": "Ukuran resolusi layar mengecil atau teks dan icon pada layar laptop membesar",
   "m": "0.5",
   "H": [
    "K1"
   ],
   "kategori": "layar",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G3",
   "nama": "Indikator lampu LED power menyala saat laptop dihidupkan tetapi gambar tidak muncul",
   "m": "0.7",
   "H": [
    "K1"
   ],
   "kategori": "layar",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Arifin f1=0.9",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G4",
   "nama": "Indikator lampu LED power tidak menyala saat laptop dihidupkan",
   "m": "0.7",
   "H": [
    "K2"
   ],
   "kategori": "daya",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Hilda G31=0.7 (relasi berbeda)",
   "catatan": "KONFLIK relasi: Hilda G31 ('mati total, lampu indikator tidak menyala') menunjuk Processor (K17), Saragih menunjuk IC Power (K2). Himpunan Saragih dipertahankan",
   "badges": [
    "konflik"
   ]
  },
  {
   "kode": "G5",
   "nama": "Laptop tidak menampilkan gambar di layar / gelap",
   "m": "0.6",
   "H": [
    "K3",
    "K4",
    "K10"
   ],
   "kategori": "layar",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Arifin e1=0.85; Hilda G01[K4=0.6;K10=0.8;K1=0.5;K18=0.7]",
   "catatan": "Dipakai di Rule 3, 4, dan 10. Di Rule 3 teksnya 'LCD tidak menampilkan gambar/gelap' (dipetakan ke G5 dari kemiripan teks)",
   "badges": [
    "lintas"
   ]
  },
  {
   "kode": "G6",
   "nama": "Cahaya pada layar laptop redup gelap namun menampilkan gambar",
   "m": "0.8",
   "H": [
    "K3"
   ],
   "kategori": "layar",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Hilda G04[K4=0.7;K1=0.3] (relasi berbeda)",
   "catatan": "KONFLIK relasi: Hilda G04 (teks sama) menunjuk LCD/VGA (K4/K1), Saragih menunjuk Inverter (K3). Himpunan Saragih dipertahankan",
   "badges": [
    "konflik"
   ]
  },
  {
   "kode": "G7",
   "nama": "Layar kadang hidup mati dalam menampilkan gambar",
   "m": "0.5",
   "H": [
    "K3"
   ],
   "kategori": "layar",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G8",
   "nama": "Gambar yang ditampilkan bergetar / abnormal",
   "m": "0.6",
   "H": [
    "K3"
   ],
   "kategori": "layar",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G9",
   "nama": "Terdapat garis-garis pada layar/LCD laptop",
   "m": "0.8",
   "H": [
    "K4"
   ],
   "kategori": "layar",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Arifin e2=0.9 (e2 mencakup G9 dan G10); Hilda G03=0.8",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G10",
   "nama": "Terdapat titik-titik pada beberapa area layar/LCD laptop, bagian lainnya memiliki area terang",
   "m": "0.5",
   "H": [
    "K4"
   ],
   "kategori": "layar",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Arifin e2=0.9 (e2 mencakup G9 dan G10)",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G11",
   "nama": "Ketika laptop sedang jalan, tampilan tiba-tiba hilang dan layar jadi gelap",
   "m": "0.6",
   "H": [
    "K4"
   ],
   "kategori": "layar",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Hilda G02[K4=0.3;K1=0.7]",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G12",
   "nama": "Ketika dihubungkan ke LCD eksternal melalui port VGA, bisa menampilkan gambar di layar LCD",
   "m": "0.4",
   "H": [
    "K4"
   ],
   "kategori": "layar",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G13",
   "nama": "Ada sebagian/semua tombol keyboard yang tidak berfungsi",
   "m": "0.7",
   "H": [
    "K5"
   ],
   "kategori": "input",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Arifin a1=0.9; Hilda G06=0.8; Hilda G42=0.75",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G14",
   "nama": "Ketika laptop dinyalakan, bunyi bip yang panjang dan terus menerus",
   "m": "0.6",
   "H": [
    "K5"
   ],
   "kategori": "input",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G15",
   "nama": "Keyboard error, tiba-tiba mengetikkan huruf yang tidak sesuai atau random / terketik sendiri",
   "m": "0.5",
   "H": [
    "K5"
   ],
   "kategori": "input",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Arifin a2=0.9; Hilda G07=0.7",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G16",
   "nama": "Kursor pada laptop melompat-lompat sendiri",
   "m": "0.6",
   "H": [
    "K6"
   ],
   "kategori": "input",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G17",
   "nama": "Kursor bergerak sendiri",
   "m": "0.8",
   "H": [
    "K6"
   ],
   "kategori": "input",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Hilda G09=0.8",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G18",
   "nama": "Sensitivitas mouse/touchpad melambat",
   "m": "0.4",
   "H": [
    "K6"
   ],
   "kategori": "input",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G19",
   "nama": "Touchpad pada laptop tidak berfungsi / kursor tidak mau bergerak",
   "m": "0.7",
   "H": [
    "K6"
   ],
   "kategori": "input",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Arifin b1=0.9; Hilda G08=0.7",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G20",
   "nama": "Ketika klik kanan/kiri pada touchpad tidak berfungsi / kursor hanya diam",
   "m": "0.5",
   "H": [
    "K6"
   ],
   "kategori": "input",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G21",
   "nama": "Instalasi OS pada harddisk selalu gagal",
   "m": "0.6",
   "H": [
    "K7"
   ],
   "kategori": "kinerja",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Hilda G29=0.4",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G22",
   "nama": "Harddisk tidak terbaca di boot menu",
   "m": "0.8",
   "H": [
    "K7"
   ],
   "kategori": "kinerja",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Hilda G26=0.8",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G23",
   "nama": "Menampilkan pesan check harddisk di layar",
   "m": "0.5",
   "H": [
    "K7"
   ],
   "kategori": "kinerja",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G24",
   "nama": "Laptop tidak mau masuk ke OS",
   "m": "0.7",
   "H": [
    "K7"
   ],
   "kategori": "kinerja",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Hilda G22=0.8",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G25",
   "nama": "Laptop lemot/lambat",
   "m": "0.4",
   "H": [
    "K7"
   ],
   "kategori": "kinerja",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Arifin j1=0.75; Hilda G25[K7=0.4;K10=0.55]",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G26",
   "nama": "Terdengar suara crash saat harddisk bekerja",
   "m": "0.9",
   "H": [
    "K7"
   ],
   "kategori": "kinerja",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Hilda G28=0.7",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G27",
   "nama": "Indikasi lampu yang terhubung pada charger tidak hidup",
   "m": "0.7",
   "H": [
    "K8"
   ],
   "kategori": "daya",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G28",
   "nama": "Ketika charger dihubungkan ke laptop, charger tidak mau mengisi daya ke laptop",
   "m": "0.6",
   "H": [
    "K8"
   ],
   "kategori": "daya",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Hilda G14[K8=0.8;K12=0.5]",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G29",
   "nama": "Ketika charger dihubungkan ke laptop, laptop tiba-tiba mati",
   "m": "0.8",
   "H": [
    "K8"
   ],
   "kategori": "daya",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G30",
   "nama": "Ketika charger dihubungkan ke laptop, daya yang terisi lambat mengisi baterai",
   "m": "0.5",
   "H": [
    "K8"
   ],
   "kategori": "daya",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Hilda G15[K8=0.6;K12=0.7]",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G31",
   "nama": "Laptop tidak mengeluarkan suara",
   "m": "0.8",
   "H": [
    "K9"
   ],
   "kategori": "konek",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Hilda G39=0.8",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G32",
   "nama": "Pengaturan volume tidak berfungsi",
   "m": "0.6",
   "H": [
    "K9"
   ],
   "kategori": "konek",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G33",
   "nama": "Muncul notifikasi X pada icon speaker di taskbar",
   "m": "0.7",
   "H": [
    "K9"
   ],
   "kategori": "konek",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Hilda G40=0.7",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G34",
   "nama": "Lampu indikator power dan fan/kipas hidup di layar",
   "m": "0.7",
   "H": [
    "K10"
   ],
   "kategori": "kinerja",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "",
   "catatan": "Teks asli jurnal: 'hidupdilayar' (spasi hilang). Maksud kalimat perlu dicek ke jurnal",
   "badges": [
    "cek"
   ]
  },
  {
   "kode": "G35",
   "nama": "Laptop blue screen atau restart sendiri",
   "m": "0.6",
   "H": [
    "K10"
   ],
   "kategori": "kinerja",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Arifin c1=0.9; Arifin c2=0.8; Hilda G23[K7=0.7;K10=0.7;K17=0.7;K1=0.65]; Hilda G30[K10=0.4;K17=0.6]",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G36",
   "nama": "Tidak bisa menyimpan pengaturan BIOS",
   "m": "0.8",
   "H": [
    "K11"
   ],
   "kategori": "daya",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Hilda G20=0.8",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G37",
   "nama": "Pengaturan tanggal dan waktu selalu kembali ke tanggal yang sama ketika OS dijalankan",
   "m": "0.7",
   "H": [
    "K11"
   ],
   "kategori": "daya",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Hilda G21=0.85",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G38",
   "nama": "Muncul notifikasi baterai CMOS error di BIOS",
   "m": "0.6",
   "H": [
    "K11"
   ],
   "kategori": "daya",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Hilda G19=0.9",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G39",
   "nama": "Baterai tidak bisa terisi penuh walaupun charger sudah dihubungkan ke laptop",
   "m": "0.8",
   "H": [
    "K12"
   ],
   "kategori": "daya",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Arifin g2=0.9",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G40",
   "nama": "Baterai cepat penuh setelah di-charge namun setelah charger dilepas baterai cepat kosong atau laptop segera mati",
   "m": "0.7",
   "H": [
    "K12"
   ],
   "kategori": "daya",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Arifin g1=0.9; Hilda G18=0.75",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G41",
   "nama": "Baterai tidak terdeteksi di laptop walaupun baterai terpasang",
   "m": "0.5",
   "H": [
    "K12"
   ],
   "kategori": "daya",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Hilda G17=0.8",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G42",
   "nama": "Laptop hidup ketika charger terhubung, setelah dilepas laptop langsung mati atau baterai tidak bisa menyimpan daya",
   "m": "0.6",
   "H": [
    "K12"
   ],
   "kategori": "daya",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G43",
   "nama": "Muncul notifikasi consider replacement baterai atau tanda X pada icon baterai di taskbar",
   "m": "0.7",
   "H": [
    "K12"
   ],
   "kategori": "daya",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G44",
   "nama": "Laptop tidak dapat mendeteksi sinyal WiFi",
   "m": "0.8",
   "H": [
    "K13"
   ],
   "kategori": "konek",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Hilda G37=0.6",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G45",
   "nama": "Icon wireless ada tanda seru kuning",
   "m": "0.6",
   "H": [
    "K13"
   ],
   "kategori": "konek",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G46",
   "nama": "Icon wireless ada tanda X",
   "m": "0.7",
   "H": [
    "K13"
   ],
   "kategori": "konek",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G47",
   "nama": "Perangkat eksternal terhubung ke port USB namun tidak bisa bekerja",
   "m": "0.8",
   "H": [
    "K14"
   ],
   "kategori": "konek",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Hilda G11=0.8",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G48",
   "nama": "Muncul notifikasi USB Not Recognized",
   "m": "0.7",
   "H": [
    "K14"
   ],
   "kategori": "konek",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Hilda G10=0.5",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G49",
   "nama": "Laptop tidak bisa membaca CD maupun DVD",
   "m": "0.8",
   "H": [
    "K15"
   ],
   "kategori": "konek",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G50",
   "nama": "Drive DVD tidak muncul di My Computer",
   "m": "0.7",
   "H": [
    "K15"
   ],
   "kategori": "konek",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "Hilda G12=0.5",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G51",
   "nama": "Pemutar CD/DVD lambat membaca data",
   "m": "0.5",
   "H": [
    "K15"
   ],
   "kategori": "konek",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G52",
   "nama": "Pemutar CD/DVD tidak bisa keluar/masuk",
   "m": "0.6",
   "H": [
    "K15"
   ],
   "kategori": "konek",
   "sumber": "Saragih dkk. (2018) Tabel 2",
   "jurnal": "Saragih",
   "pembanding": "",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G53",
   "nama": "Laptop tidak mau menyala meski baterai terisi bahkan ketika dalam posisi mengisi daya",
   "m": "0.85",
   "H": [
    "K2"
   ],
   "kategori": "daya",
   "sumber": "Arifin & Norhikmah (2024) Tabel 2 (kode d1)",
   "jurnal": "Arifin",
   "pembanding": "",
   "catatan": "Mirip G4 (LED power mati), keduanya menunjuk K2: bila dicentang bersama, bukti bisa terhitung ganda",
   "badges": [
    "mirip"
   ]
  },
  {
   "kode": "G54",
   "nama": "Laptop tidak bisa dinyalakan",
   "m": "0.85",
   "H": [
    "K16"
   ],
   "kategori": "daya",
   "sumber": "Arifin & Norhikmah (2024) Tabel 2 (kode h1)",
   "jurnal": "Arifin",
   "pembanding": "",
   "catatan": "Teks hampir sama dengan G53 (d1) tetapi di jurnal asal menunjuk kerusakan lain (K16). PERLU_KEPUTUSAN: pisah atau gabung menjadi satu gejala dengan himpunan {K2,K16}",
   "badges": [
    "keputusan"
   ]
  },
  {
   "kode": "G55",
   "nama": "Laptop macet/hang",
   "m": "0.8",
   "H": [
    "K17"
   ],
   "kategori": "kinerja",
   "sumber": "Arifin & Norhikmah (2024) Tabel 2 (kode i1)",
   "jurnal": "Arifin",
   "pembanding": "Hilda G24[K7=0.7;K10=0.6;K1=0.6] (relasi berbeda)",
   "catatan": "Gejala umum namun m tinggi menurut sumber | KONFLIK relasi: Hilda G24 (hang/freeze) menunjuk Harddisk, RAM, VGA (K7,K10,K1), Arifin menunjuk Processor (K17). Himpunan Arifin dipertahankan",
   "badges": [
    "konflik"
   ]
  },
  {
   "kode": "G56",
   "nama": "Muncul asap atau aroma terbakar dari dalam laptop",
   "m": "0.9",
   "H": [
    "K17"
   ],
   "kategori": "kinerja",
   "sumber": "Arifin & Norhikmah (2024) Tabel 2 (kode i2)",
   "jurnal": "Arifin",
   "pembanding": "",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G57",
   "nama": "Kipas berputar secara tidak normal, biasanya lebih cepat dan laptop mati tiba-tiba",
   "m": "0.85",
   "H": [
    "K17"
   ],
   "kategori": "kinerja",
   "sumber": "Arifin & Norhikmah (2024) Tabel 2 (kode i3)",
   "jurnal": "Arifin",
   "pembanding": "",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G58",
   "nama": "Laptop mengalami hang ketika membuka suatu direktori",
   "m": "0.9",
   "H": [
    "K7"
   ],
   "kategori": "kinerja",
   "sumber": "Arifin & Norhikmah (2024) Tabel 2 (kode j2)",
   "jurnal": "Arifin",
   "pembanding": "",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G59",
   "nama": "DVD Drive tidak terdeteksi pada BIOS",
   "m": "0.8",
   "H": [
    "K15"
   ],
   "kategori": "konek",
   "sumber": "Hilda dkk. (2023) Tabel 2-3 (kode G13)",
   "jurnal": "Hilda",
   "pembanding": "",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G60",
   "nama": "Laptop mati tiba-tiba saat sedang digunakan, baterai belum habis",
   "m": "0.6",
   "H": [
    "K12",
    "K17"
   ],
   "kategori": "daya",
   "sumber": "Hilda dkk. (2023) Tabel 2-3 (kode G16)",
   "jurnal": "Hilda",
   "pembanding": "",
   "catatan": "Hilda memberi nilai 0,6 untuk Baterai Laptop dan 0,6 untuk Processor; karena sama, dipakai sebagai m untuk himpunan {K12,K17}",
   "badges": [
    "lintas"
   ]
  },
  {
   "kode": "G61",
   "nama": "Freeze atau hang saat laptop baru dinyalakan/booting",
   "m": "0.6",
   "H": [
    "K7"
   ],
   "kategori": "kinerja",
   "sumber": "Hilda dkk. (2023) Tabel 2-3 (kode G27)",
   "jurnal": "Hilda",
   "pembanding": "",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G62",
   "nama": "Tidak ada tampilan awal BIOS",
   "m": "0.6",
   "H": [
    "K17"
   ],
   "kategori": "kinerja",
   "sumber": "Hilda dkk. (2023) Tabel 2-3 (kode G32)",
   "jurnal": "Hilda",
   "pembanding": "",
   "catatan": "Mirip G5 (tidak ada tampilan) tetapi khusus pada tampilan awal BIOS",
   "badges": [
    "mirip"
   ]
  },
  {
   "kode": "G63",
   "nama": "Tidak dapat membuka aplikasi/software tertentu",
   "m": "0.7",
   "H": [
    "K17"
   ],
   "kategori": "kinerja",
   "sumber": "Hilda dkk. (2023) Tabel 2-3 (kode G33)",
   "jurnal": "Hilda",
   "pembanding": "",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G64",
   "nama": "Laptop booting berulang-ulang (looping)",
   "m": "0.6",
   "H": [
    "K18"
   ],
   "kategori": "kinerja",
   "sumber": "Hilda dkk. (2023) Tabel 2-3 (kode G35)",
   "jurnal": "Hilda",
   "pembanding": "",
   "catatan": "Mirip G35 (blue screen/restart sendiri), tetapi di Hilda menunjuk IC BIOS",
   "badges": [
    "mirip"
   ]
  },
  {
   "kode": "G65",
   "nama": "Wireless card laptop tidak terbaca di laptop",
   "m": "0.8",
   "H": [
    "K13"
   ],
   "kategori": "konek",
   "sumber": "Hilda dkk. (2023) Tabel 2-3 (kode G36)",
   "jurnal": "Hilda",
   "pembanding": "",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G66",
   "nama": "Jangkauan sinyal WiFi sangat kecil padahal jarak router sangat dekat",
   "m": "0.75",
   "H": [
    "K13"
   ],
   "kategori": "konek",
   "sumber": "Hilda dkk. (2023) Tabel 2-3 (kode G38)",
   "jurnal": "Hilda",
   "pembanding": "",
   "catatan": "",
   "badges": []
  },
  {
   "kode": "G67",
   "nama": "Tidak bisa menginstal driver speaker, tidak terdeteksi pada device manager",
   "m": "0.75",
   "H": [
    "K9"
   ],
   "kategori": "konek",
   "sumber": "Hilda dkk. (2023) Tabel 2-3 (kode G41)",
   "jurnal": "Hilda",
   "pembanding": "",
   "catatan": "",
   "badges": []
  }
 ],
 "rule": [
  {
   "no": "R1",
   "gejala": [
    "G1",
    "G2",
    "G3"
   ],
   "kerusakan": "K1",
   "jumlah": 3,
   "sumber": "Saragih dkk. (2018) Rule 1",
   "jurnal": "Saragih",
   "catatan": ""
  },
  {
   "no": "R2",
   "gejala": [
    "G1",
    "G4"
   ],
   "kerusakan": "K2",
   "jumlah": 2,
   "sumber": "Saragih dkk. (2018) Rule 2",
   "jurnal": "Saragih",
   "catatan": ""
  },
  {
   "no": "R3",
   "gejala": [
    "G5",
    "G6",
    "G7",
    "G8"
   ],
   "kerusakan": "K3",
   "jumlah": 4,
   "sumber": "Saragih dkk. (2018) Rule 3",
   "jurnal": "Saragih",
   "catatan": "Kode gejala dipetakan dari teks rule (jurnal tidak mencantumkan kode)"
  },
  {
   "no": "R4",
   "gejala": [
    "G5",
    "G9",
    "G10",
    "G11",
    "G12"
   ],
   "kerusakan": "K4",
   "jumlah": 5,
   "sumber": "Saragih dkk. (2018) Rule 4",
   "jurnal": "Saragih",
   "catatan": "Kode gejala dipetakan dari teks rule"
  },
  {
   "no": "R5",
   "gejala": [
    "G13",
    "G14",
    "G15"
   ],
   "kerusakan": "K5",
   "jumlah": 3,
   "sumber": "Saragih dkk. (2018) Rule 5",
   "jurnal": "Saragih",
   "catatan": "Kode gejala dipetakan dari teks rule"
  },
  {
   "no": "R6",
   "gejala": [
    "G16",
    "G17",
    "G18",
    "G19",
    "G20"
   ],
   "kerusakan": "K6",
   "jumlah": 5,
   "sumber": "Saragih dkk. (2018) Rule 6",
   "jurnal": "Saragih",
   "catatan": "Kode gejala dipetakan dari teks rule"
  },
  {
   "no": "R7",
   "gejala": [
    "G21",
    "G22",
    "G23",
    "G24",
    "G25",
    "G26"
   ],
   "kerusakan": "K7",
   "jumlah": 6,
   "sumber": "Saragih dkk. (2018) Rule 7",
   "jurnal": "Saragih",
   "catatan": "Kode gejala dipetakan dari teks rule"
  },
  {
   "no": "R8",
   "gejala": [
    "G27",
    "G28",
    "G29",
    "G30"
   ],
   "kerusakan": "K8",
   "jumlah": 4,
   "sumber": "Saragih dkk. (2018) Rule 8",
   "jurnal": "Saragih",
   "catatan": "Kode gejala dipetakan dari teks rule"
  },
  {
   "no": "R9",
   "gejala": [
    "G31",
    "G32",
    "G33"
   ],
   "kerusakan": "K9",
   "jumlah": 3,
   "sumber": "Saragih dkk. (2018) Rule 9",
   "jurnal": "Saragih",
   "catatan": "Kode gejala dipetakan dari teks rule"
  },
  {
   "no": "R10",
   "gejala": [
    "G5",
    "G34",
    "G35"
   ],
   "kerusakan": "K10",
   "jumlah": 3,
   "sumber": "Saragih dkk. (2018) Rule 10",
   "jurnal": "Saragih",
   "catatan": "Kode gejala dipetakan dari teks rule"
  },
  {
   "no": "R11",
   "gejala": [
    "G36",
    "G37",
    "G38"
   ],
   "kerusakan": "K11",
   "jumlah": 3,
   "sumber": "Saragih dkk. (2018) Rule 11",
   "jurnal": "Saragih",
   "catatan": "Kode gejala dipetakan dari teks rule"
  },
  {
   "no": "R12",
   "gejala": [
    "G39",
    "G40",
    "G41",
    "G42",
    "G43"
   ],
   "kerusakan": "K12",
   "jumlah": 5,
   "sumber": "Saragih dkk. (2018) Rule 12",
   "jurnal": "Saragih",
   "catatan": "Kode gejala dipetakan dari teks rule"
  },
  {
   "no": "R13",
   "gejala": [
    "G44",
    "G45",
    "G46"
   ],
   "kerusakan": "K13",
   "jumlah": 3,
   "sumber": "Saragih dkk. (2018) Rule 13",
   "jurnal": "Saragih",
   "catatan": "Kode gejala dipetakan dari teks rule"
  },
  {
   "no": "R14",
   "gejala": [
    "G47",
    "G48"
   ],
   "kerusakan": "K14",
   "jumlah": 2,
   "sumber": "Saragih dkk. (2018) Rule 14",
   "jurnal": "Saragih",
   "catatan": "Kode gejala dipetakan dari teks rule"
  },
  {
   "no": "R15",
   "gejala": [
    "G49",
    "G50",
    "G51",
    "G52"
   ],
   "kerusakan": "K15",
   "jumlah": 4,
   "sumber": "Saragih dkk. (2018) Rule 15",
   "jurnal": "Saragih",
   "catatan": "Kode gejala dipetakan dari teks rule"
  },
  {
   "no": "R16",
   "gejala": [
    "G53"
   ],
   "kerusakan": "K2",
   "jumlah": 1,
   "sumber": "Arifin & Norhikmah (2024) Tabel 6 (d01)",
   "jurnal": "Arifin",
   "catatan": ""
  },
  {
   "no": "R17",
   "gejala": [
    "G54"
   ],
   "kerusakan": "K16",
   "jumlah": 1,
   "sumber": "Arifin & Norhikmah (2024) Tabel 6 (h01)",
   "jurnal": "Arifin",
   "catatan": ""
  },
  {
   "no": "R18",
   "gejala": [
    "G55",
    "G56",
    "G57"
   ],
   "kerusakan": "K17",
   "jumlah": 3,
   "sumber": "Arifin & Norhikmah (2024) Tabel 6 (i01)",
   "jurnal": "Arifin",
   "catatan": ""
  },
  {
   "no": "R19",
   "gejala": [
    "G25",
    "G58"
   ],
   "kerusakan": "K7",
   "jumlah": 2,
   "sumber": "Arifin & Norhikmah (2024) Tabel 6 (j01)",
   "jurnal": "Arifin",
   "catatan": "Jurnal menulis 'g1 AND g2' (salah ketik); dibaca j1;j2 sesuai Tabel 8. Rule a01-g01 tidak ditambahkan karena sudah tercakup rule Saragih; versi OR (a02 dst.) tidak dipakai"
  },
  {
   "no": "R20",
   "gejala": [
    "G50",
    "G59"
   ],
   "kerusakan": "K15",
   "jumlah": 2,
   "sumber": "Hilda dkk. (2023) Tabel 4-3 (Aturan 5)",
   "jurnal": "Hilda",
   "catatan": "Lengkap: kedua gejala Hilda (G12, G13) terpetakan"
  },
  {
   "no": "R21",
   "gejala": [
    "G40",
    "G41",
    "G60"
   ],
   "kerusakan": "K12",
   "jumlah": 3,
   "sumber": "Hilda dkk. (2023) Tabel 4-3 (Aturan 7)",
   "jurnal": "Hilda",
   "catatan": "Hilda G14 dan G15 dikeluarkan karena dipetakan ke gejala charger (G28, G30; K8), bukan baterai"
  },
  {
   "no": "R22",
   "gejala": [
    "G60",
    "G62",
    "G63"
   ],
   "kerusakan": "K17",
   "jumlah": 3,
   "sumber": "Hilda dkk. (2023) Tabel 4-3 (Aturan 11)",
   "jurnal": "Hilda",
   "catatan": "Hilda G23, G30 (dipetakan ke G35, K10) dan G31 (konflik dengan G4, K2) dikeluarkan"
  },
  {
   "no": "R23",
   "gejala": [
    "G21",
    "G22",
    "G24",
    "G25",
    "G26",
    "G61"
   ],
   "kerusakan": "K7",
   "jumlah": 6,
   "sumber": "Hilda dkk. (2023) Tabel 4-3 (Aturan 9)",
   "jurnal": "Hilda",
   "catatan": "Hilda G23 (ke G35, K10) dan G24 (konflik dengan G55) dikeluarkan"
  },
  {
   "no": "R24",
   "gejala": [
    "G31",
    "G33",
    "G67"
   ],
   "kerusakan": "K9",
   "jumlah": 3,
   "sumber": "Hilda dkk. (2023) Tabel 4-3 (Aturan 15)",
   "jurnal": "Hilda",
   "catatan": "Lengkap: ketiga gejala Hilda terpetakan"
  },
  {
   "no": "R25",
   "gejala": [
    "G44",
    "G65",
    "G66"
   ],
   "kerusakan": "K13",
   "jumlah": 3,
   "sumber": "Hilda dkk. (2023) Tabel 4-3 (Aturan 14)",
   "jurnal": "Hilda",
   "catatan": "Lengkap: ketiga gejala Hilda terpetakan"
  },
  {
   "no": "R26",
   "gejala": [
    "G64"
   ],
   "kerusakan": "K18",
   "jumlah": 1,
   "sumber": "Hilda dkk. (2023) Tabel 4-3 (Aturan 13)",
   "jurnal": "Hilda",
   "catatan": "Hilda G01 dikeluarkan karena dipetakan ke G5 (K3,K4,K10), tidak menunjuk IC BIOS di data Saragih"
  }
 ],
 "relasi": [
  {
   "g": "G1",
   "k": "K1",
   "rule": "R1",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G2",
   "k": "K1",
   "rule": "R1",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G3",
   "k": "K1",
   "rule": "R1",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G1",
   "k": "K2",
   "rule": "R2",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G4",
   "k": "K2",
   "rule": "R2",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G5",
   "k": "K3",
   "rule": "R3",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G6",
   "k": "K3",
   "rule": "R3",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G7",
   "k": "K3",
   "rule": "R3",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G8",
   "k": "K3",
   "rule": "R3",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G5",
   "k": "K4",
   "rule": "R4",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G9",
   "k": "K4",
   "rule": "R4",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G10",
   "k": "K4",
   "rule": "R4",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G11",
   "k": "K4",
   "rule": "R4",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G12",
   "k": "K4",
   "rule": "R4",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G13",
   "k": "K5",
   "rule": "R5",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G14",
   "k": "K5",
   "rule": "R5",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G15",
   "k": "K5",
   "rule": "R5",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G16",
   "k": "K6",
   "rule": "R6",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G17",
   "k": "K6",
   "rule": "R6",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G18",
   "k": "K6",
   "rule": "R6",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G19",
   "k": "K6",
   "rule": "R6",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G20",
   "k": "K6",
   "rule": "R6",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G21",
   "k": "K7",
   "rule": "R7",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G22",
   "k": "K7",
   "rule": "R7",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G23",
   "k": "K7",
   "rule": "R7",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G24",
   "k": "K7",
   "rule": "R7",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G25",
   "k": "K7",
   "rule": "R7",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G26",
   "k": "K7",
   "rule": "R7",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G27",
   "k": "K8",
   "rule": "R8",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G28",
   "k": "K8",
   "rule": "R8",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G29",
   "k": "K8",
   "rule": "R8",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G30",
   "k": "K8",
   "rule": "R8",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G31",
   "k": "K9",
   "rule": "R9",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G32",
   "k": "K9",
   "rule": "R9",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G33",
   "k": "K9",
   "rule": "R9",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G5",
   "k": "K10",
   "rule": "R10",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G34",
   "k": "K10",
   "rule": "R10",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G35",
   "k": "K10",
   "rule": "R10",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G36",
   "k": "K11",
   "rule": "R11",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G37",
   "k": "K11",
   "rule": "R11",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G38",
   "k": "K11",
   "rule": "R11",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G39",
   "k": "K12",
   "rule": "R12",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G40",
   "k": "K12",
   "rule": "R12",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G41",
   "k": "K12",
   "rule": "R12",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G42",
   "k": "K12",
   "rule": "R12",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G43",
   "k": "K12",
   "rule": "R12",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G44",
   "k": "K13",
   "rule": "R13",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G45",
   "k": "K13",
   "rule": "R13",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G46",
   "k": "K13",
   "rule": "R13",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G47",
   "k": "K14",
   "rule": "R14",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G48",
   "k": "K14",
   "rule": "R14",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G49",
   "k": "K15",
   "rule": "R15",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G50",
   "k": "K15",
   "rule": "R15",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G51",
   "k": "K15",
   "rule": "R15",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G52",
   "k": "K15",
   "rule": "R15",
   "sumber": "Diturunkan dari rule Saragih dkk. (2018)"
  },
  {
   "g": "G53",
   "k": "K2",
   "rule": "R16",
   "sumber": "Diturunkan dari rule Arifin & Norhikmah (2024)"
  },
  {
   "g": "G54",
   "k": "K16",
   "rule": "R17",
   "sumber": "Diturunkan dari rule Arifin & Norhikmah (2024)"
  },
  {
   "g": "G55",
   "k": "K17",
   "rule": "R18",
   "sumber": "Diturunkan dari rule Arifin & Norhikmah (2024)"
  },
  {
   "g": "G56",
   "k": "K17",
   "rule": "R18",
   "sumber": "Diturunkan dari rule Arifin & Norhikmah (2024)"
  },
  {
   "g": "G57",
   "k": "K17",
   "rule": "R18",
   "sumber": "Diturunkan dari rule Arifin & Norhikmah (2024)"
  },
  {
   "g": "G58",
   "k": "K7",
   "rule": "R19",
   "sumber": "Diturunkan dari rule Arifin & Norhikmah (2024)"
  },
  {
   "g": "G59",
   "k": "K15",
   "rule": "R20",
   "sumber": "Diturunkan dari rule Hilda dkk. (2023)"
  },
  {
   "g": "G60",
   "k": "K12",
   "rule": "R21",
   "sumber": "Diturunkan dari rule Hilda dkk. (2023)"
  },
  {
   "g": "G60",
   "k": "K17",
   "rule": "R22",
   "sumber": "Diturunkan dari rule Hilda dkk. (2023)"
  },
  {
   "g": "G62",
   "k": "K17",
   "rule": "R22",
   "sumber": "Diturunkan dari rule Hilda dkk. (2023)"
  },
  {
   "g": "G63",
   "k": "K17",
   "rule": "R22",
   "sumber": "Diturunkan dari rule Hilda dkk. (2023)"
  },
  {
   "g": "G61",
   "k": "K7",
   "rule": "R23",
   "sumber": "Diturunkan dari rule Hilda dkk. (2023)"
  },
  {
   "g": "G67",
   "k": "K9",
   "rule": "R24",
   "sumber": "Diturunkan dari rule Hilda dkk. (2023)"
  },
  {
   "g": "G65",
   "k": "K13",
   "rule": "R25",
   "sumber": "Diturunkan dari rule Hilda dkk. (2023)"
  },
  {
   "g": "G66",
   "k": "K13",
   "rule": "R25",
   "sumber": "Diturunkan dari rule Hilda dkk. (2023)"
  },
  {
   "g": "G64",
   "k": "K18",
   "rule": "R26",
   "sumber": "Diturunkan dari rule Hilda dkk. (2023)"
  }
 ],
 "solusi": [
  {
   "kode": "K1",
   "nama": "IC VGA",
   "sendiri": [
    "Sambungkan monitor atau TV eksternal; bila gambar tampil normal, masalah ada pada layar atau kabel layar, bukan pada VGA",
    "Perbarui atau instal ulang driver kartu grafis dari situs resmi produsen",
    "Matikan laptop, lepas adaptor (dan baterai bila bisa dilepas), tekan tombol power 30 detik, lalu nyalakan kembali"
   ],
   "teknisi": [
    "Pemeriksaan dan penggantian atau reball IC VGA oleh teknisi; jangan memanaskan papan sendiri"
   ],
   "sumber": "Draf kelompok (pengetahuan umum perbaikan laptop), belum divalidasi pakar atau dokumentasi servis",
   "tingkat": "KEDUANYA"
  },
  {
   "kode": "K2",
   "nama": "IC Power",
   "sendiri": [
    "Coba adaptor lain yang spesifikasinya sama, dan periksa kabel serta colokan",
    "Lepas adaptor dan baterai (bila bisa dilepas), tekan tombol power 30 detik, lalu coba nyalakan"
   ],
   "teknisi": [
    "Pemeriksaan jalur daya dan penggantian IC Power oleh teknisi"
   ],
   "sumber": "Draf kelompok (pengetahuan umum perbaikan laptop), belum divalidasi pakar atau dokumentasi servis",
   "tingkat": "TEKNISI"
  },
  {
   "kode": "K3",
   "nama": "Inverter/gangguan pada kabel fleksibel laptop",
   "sendiri": [
    "Sambungkan monitor eksternal untuk memastikan laptop masih menghasilkan gambar",
    "Sorot layar dengan senter dari samping; bila gambar samar terlihat, kemungkinan lampu latar atau inverter bermasalah",
    "Hindari membuka dan menutup layar berulang kali sampai diperiksa"
   ],
   "teknisi": [
    "Penggantian kabel fleksibel atau inverter oleh teknisi"
   ],
   "sumber": "Draf kelompok (pengetahuan umum perbaikan laptop), belum divalidasi pakar atau dokumentasi servis",
   "tingkat": "TEKNISI"
  },
  {
   "kode": "K4",
   "nama": "LCD",
   "sendiri": [
    "Sambungkan monitor eksternal; bila tampil normal, kerusakan ada pada panel layar",
    "Atur ulang resolusi dan refresh rate, lalu perbarui driver grafis",
    "Jangan menekan atau membersihkan layar dengan cairan secara berlebihan"
   ],
   "teknisi": [
    "Penggantian panel LCD atau kabel layar oleh teknisi"
   ],
   "sumber": "Draf kelompok (pengetahuan umum perbaikan laptop), belum divalidasi pakar atau dokumentasi servis",
   "tingkat": "KEDUANYA"
  },
  {
   "kode": "K5",
   "nama": "Keyboard laptop",
   "sendiri": [
    "Matikan laptop, lalu bersihkan sela tombol dengan sikat lembut atau blower",
    "Periksa pengaturan bahasa atau tata letak keyboard dan perbarui driver",
    "Gunakan keyboard USB eksternal sebagai solusi sementara"
   ],
   "teknisi": [
    "Penggantian keyboard atau pemeriksaan konektor kabelnya oleh teknisi"
   ],
   "sumber": "Draf kelompok (pengetahuan umum perbaikan laptop), belum divalidasi pakar atau dokumentasi servis",
   "tingkat": "KEDUANYA"
  },
  {
   "kode": "K6",
   "nama": "TouchPad laptop",
   "sendiri": [
    "Pastikan touchpad tidak dinonaktifkan (kombinasi tombol Fn atau pengaturan perangkat)",
    "Bersihkan permukaan touchpad dengan kain kering, lalu perbarui atau instal ulang driver",
    "Gunakan mouse eksternal sebagai solusi sementara"
   ],
   "teknisi": [
    "Penggantian touchpad atau kabelnya oleh teknisi"
   ],
   "sumber": "Draf kelompok (pengetahuan umum perbaikan laptop), belum divalidasi pakar atau dokumentasi servis",
   "tingkat": "KEDUANYA"
  },
  {
   "kode": "K7",
   "nama": "Harddisk laptop",
   "sendiri": [
    "Segera cadangkan data penting ke penyimpanan lain",
    "Periksa kesehatan disk dengan alat bawaan sistem atau alat pemeriksa SMART, dan jalankan pemeriksaan kesalahan disk",
    "Kurangi guncangan dan hindari memakai laptop terus-menerus bila kerusakan sektor bertambah"
   ],
   "teknisi": [
    "Penggantian harddisk atau SSD dan pemindahan data oleh teknisi; pemulihan data bila disk sudah gagal dibaca"
   ],
   "sumber": "Draf kelompok (pengetahuan umum perbaikan laptop), belum divalidasi pakar atau dokumentasi servis",
   "tingkat": "KEDUANYA"
  },
  {
   "kode": "K8",
   "nama": "Charger laptop",
   "sendiri": [
    "Pastikan kabel, colokan, dan stop kontak berfungsi; coba stop kontak lain",
    "Gunakan adaptor original atau yang tegangan dan dayanya sesuai dengan laptop",
    "Periksa ujung konektor pada laptop; bila longgar atau bengkok, hentikan pemakaian"
   ],
   "teknisi": [
    "Penggantian adaptor atau perbaikan konektor DC pada laptop oleh teknisi"
   ],
   "sumber": "Draf kelompok (pengetahuan umum perbaikan laptop), belum divalidasi pakar atau dokumentasi servis",
   "tingkat": "KEDUANYA"
  },
  {
   "kode": "K9",
   "nama": "Sound Card",
   "sendiri": [
    "Periksa volume, status bisu, dan perangkat keluaran suara yang dipilih",
    "Perbarui atau instal ulang driver audio, lalu coba headset sebagai pembanding"
   ],
   "teknisi": [
    "Pemeriksaan dan perbaikan atau penggantian komponen audio oleh teknisi"
   ],
   "sumber": "Draf kelompok (pengetahuan umum perbaikan laptop), belum divalidasi pakar atau dokumentasi servis",
   "tingkat": "KEDUANYA"
  },
  {
   "kode": "K10",
   "nama": "RAM",
   "sendiri": [
    "Matikan laptop dan lepas adaptor; lepas lalu pasang kembali modul RAM, dan sentuh logam terlebih dahulu untuk membuang listrik statis",
    "Bersihkan kontak modul dengan kain kering; bila ada dua modul, coba satu per satu",
    "Jalankan alat diagnosis memori bawaan sistem operasi"
   ],
   "teknisi": [
    "Penggantian modul RAM atau pemeriksaan slot RAM oleh teknisi"
   ],
   "sumber": "Draf kelompok (pengetahuan umum perbaikan laptop), belum divalidasi pakar atau dokumentasi servis",
   "tingkat": "KEDUANYA"
  },
  {
   "kode": "K11",
   "nama": "Baterai CMOS",
   "sendiri": [
    "Atur ulang tanggal dan jam, serta periksa pengaturan BIOS bila kembali ke bawaan setiap laptop dimatikan"
   ],
   "teknisi": [
    "Penggantian baterai CMOS yang sesuai model oleh teknisi karena biasanya memerlukan pembongkaran"
   ],
   "sumber": "Draf kelompok (pengetahuan umum perbaikan laptop), belum divalidasi pakar atau dokumentasi servis",
   "tingkat": "TEKNISI"
  },
  {
   "kode": "K12",
   "nama": "Baterai laptop",
   "sendiri": [
    "Periksa kesehatan baterai dengan laporan baterai bawaan sistem operasi",
    "Gunakan adaptor original dan hindari memakai laptop di tempat panas",
    "Bila baterai menggembung, panas berlebihan, atau berbau, hentikan pemakaian dan jangan mengisi daya"
   ],
   "teknisi": [
    "Penggantian baterai yang sesuai model oleh teknisi atau toko resmi"
   ],
   "sumber": "Draf kelompok (pengetahuan umum perbaikan laptop), belum divalidasi pakar atau dokumentasi servis",
   "tingkat": "KEDUANYA"
  },
  {
   "kode": "K13",
   "nama": "Wireless Card",
   "sendiri": [
    "Pastikan Wi-Fi dan mode pesawat tidak aktif, lalu mulai ulang router dan laptop",
    "Perbarui atau instal ulang driver wireless; atur ulang pengaturan jaringan",
    "Coba jaringan atau perangkat lain untuk memastikan masalah ada pada kartu wireless laptop"
   ],
   "teknisi": [
    "Pemeriksaan atau penggantian kartu wireless dan kabel antena oleh teknisi"
   ],
   "sumber": "Draf kelompok (pengetahuan umum perbaikan laptop), belum divalidasi pakar atau dokumentasi servis",
   "tingkat": "KEDUANYA"
  },
  {
   "kode": "K14",
   "nama": "Port USB laptop",
   "sendiri": [
    "Coba port USB lain dan perangkat USB lain untuk memastikan sumber masalah",
    "Matikan laptop, periksa dengan senter, dan bersihkan kotoran pada port dengan sikat kecil yang kering",
    "Perbarui driver USB dan periksa pengaturan hemat daya untuk port USB"
   ],
   "teknisi": [
    "Perbaikan atau penggantian port USB oleh teknisi"
   ],
   "sumber": "Draf kelompok (pengetahuan umum perbaikan laptop), belum divalidasi pakar atau dokumentasi servis",
   "tingkat": "KEDUANYA"
  },
  {
   "kode": "K15",
   "nama": "Pemutar CD/DVD",
   "sendiri": [
    "Coba cakram lain yang bersih dan tidak tergores",
    "Bersihkan lensa dengan cakram pembersih, lalu periksa apakah drive terdeteksi oleh sistem"
   ],
   "teknisi": [
    "Penggantian drive CD/DVD oleh teknisi"
   ],
   "sumber": "Draf kelompok (pengetahuan umum perbaikan laptop), belum divalidasi pakar atau dokumentasi servis",
   "tingkat": "KEDUANYA"
  },
  {
   "kode": "K16",
   "nama": "Mainboard",
   "sendiri": [
    "Singkirkan penyebab yang lebih sederhana terlebih dahulu: coba adaptor lain, lepas semua perangkat eksternal, pasang ulang RAM",
    "Lepas adaptor dan baterai (bila bisa dilepas), tekan tombol power 30 detik, lalu coba nyalakan"
   ],
   "teknisi": [
    "Diagnosis papan utama (mainboard) oleh teknisi; perbaikan komponen atau penggantian papan"
   ],
   "sumber": "Draf kelompok (pengetahuan umum perbaikan laptop), belum divalidasi pakar atau dokumentasi servis",
   "tingkat": "TEKNISI"
  },
  {
   "kode": "K17",
   "nama": "Processor Overheat",
   "sendiri": [
    "Matikan laptop dan bersihkan lubang ventilasi serta kipas dari debu; jangan menyemprotkan cairan",
    "Gunakan laptop di permukaan datar yang keras atau dengan penyangga pendingin, dan tutup program yang berat",
    "Bila muncul asap atau bau terbakar, segera matikan, lepas adaptor, dan jangan dinyalakan kembali"
   ],
   "teknisi": [
    "Penggantian pasta termal serta perbaikan atau penggantian kipas dan heatsink oleh teknisi"
   ],
   "sumber": "Draf kelompok (pengetahuan umum perbaikan laptop), belum divalidasi pakar atau dokumentasi servis",
   "tingkat": "KEDUANYA"
  },
  {
   "kode": "K18",
   "nama": "IC BIOS",
   "sendiri": [
    "Lepas adaptor dan baterai (bila bisa dilepas), tekan tombol power 30 detik, lalu coba nyalakan",
    "Jangan memperbarui BIOS bila daya tidak stabil"
   ],
   "teknisi": [
    "Penulisan ulang BIOS atau penggantian IC BIOS oleh teknisi"
   ],
   "sumber": "Draf kelompok (pengetahuan umum perbaikan laptop), belum divalidasi pakar atau dokumentasi servis",
   "tingkat": "TEKNISI"
  }
 ],
 "kasus": [
  {
   "id": "KU01",
   "gejala": [
    "G1",
    "G2"
   ],
   "massa": "K1=0.5;K1|K2=0.3;THETA=0.2",
   "diagnosis": "K1",
   "sumber": "Saragih dkk. (2018) hlm. 108 (m3)",
   "catatan": "Bel(K1)=0.5, Pl(K1)=1.0; Bel(K2)=0, Pl(K2)=0.5"
  },
  {
   "id": "KU02",
   "gejala": [
    "G1",
    "G2",
    "G3"
   ],
   "massa": "K1=0.85;K1|K2=0.09;THETA=0.06",
   "diagnosis": "K1",
   "sumber": "Saragih dkk. (2018) hlm. 108-109, angka dikoreksi",
   "catatan": "Jurnal menulis 0.3+0.22 (seharusnya 0.3+0.2), label K4 (seharusnya K1), dan kesimpulan 0.87 (tabelnya menghasilkan 0.85)"
  },
  {
   "id": "KU03",
   "gejala": [
    "G9"
   ],
   "massa": "K4=0.8;THETA=0.2",
   "diagnosis": "K4",
   "sumber": "Hitung manual kelompok",
   "catatan": "Satu gejala, himpunan tunggal"
  },
  {
   "id": "KU04",
   "gejala": [
    "G1",
    "G5"
   ],
   "massa": "K1|K2=0.375;K3|K4|K10=0.375;THETA=0.25",
   "diagnosis": "TIDAK_TUNGGAL",
   "sumber": "Hitung manual kelompok",
   "catatan": "Dua gejala berhimpunan berbeda tanpa irisan: konflik K=0.36, penyebut 0.64. Tidak ada kerusakan tunggal dengan Belief > 0"
  },
  {
   "id": "KU05",
   "gejala": [
    "G13",
    "G49"
   ],
   "massa": "K15=6/11;K5=7/22;THETA=3/22",
   "diagnosis": "K15",
   "sumber": "Hitung manual kelompok",
   "catatan": "Konflik K=0.56, penyebut 0.44. Menguji normalisasi"
  },
  {
   "id": "KU06",
   "gejala": [
    "G9",
    "G49"
   ],
   "massa": "K4=4/9;K15=4/9;THETA=1/9",
   "diagnosis": "SERI",
   "sumber": "Hitung manual kelompok",
   "catatan": "Kasus seri: dua kerusakan dengan Belief sama. Perlu aturan pemutus seri"
  }
 ]
};
