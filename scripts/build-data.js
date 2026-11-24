// Konversi 6 CSV kelompok menjadi data.json + js/data.js, dengan validasi
// yang sama seperti sel konsistensi di notebook. Build gagal bila ada yang tidak lolos.
// Jalankan: node scripts/build-data.js
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");

function parseCSV(text) {
  const rows = [];
  let row = [], field = "", q = false;
  text = text.replace(/^﻿/, "");
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else q = false;
      } else field += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.length > 1 || row[0] !== "") rows.push(row);
      row = [];
    } else field += c;
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  const head = rows.shift();
  return rows.map(r => Object.fromEntries(head.map((h, i) => [h, (r[i] ?? "").trim()])));
}
const baca = n => parseCSV(fs.readFileSync(path.join(DATA_DIR, n + ".csv"), "utf8"));

const kerusakan = baca("kerusakan"), gejala = baca("gejala"), relasi = baca("relasi"),
      rule = baca("rule"), solusiRows = baca("solusi"), kasus = baca("kasus_uji");

const errors = [];
const cek = (ok, msg) => { if (!ok) errors.push(msg); };

const kodeK = new Set(kerusakan.map(r => r.kode_kerusakan));
const kodeG = new Set(gejala.map(r => r.kode_gejala));
cek(kodeK.size === kerusakan.length, "ada kode kerusakan ganda");
cek(kodeG.size === gejala.length, "ada kode gejala ganda");
cek(new Set(rule.map(r => r.no_rule)).size === rule.length, "ada nomor rule ganda");

const pasRule = new Set();
for (const r of rule) {
  cek(kodeK.has(r.kerusakan), `${r.no_rule}: kerusakan ${r.kerusakan} tidak ada`);
  for (const g of r.gejala.split(";")) {
    cek(kodeG.has(g), `${r.no_rule}: gejala ${g} tidak ada`);
    pasRule.add(g + ">" + r.kerusakan);
  }
}
const pasRelasi = new Set(relasi.map(r => r.kode_gejala + ">" + r.kode_kerusakan));
cek(pasRule.size === pasRelasi.size && [...pasRule].every(p => pasRelasi.has(p)),
    "berkas relasi tidak sama dengan pasangan yang diturunkan dari rule");

const H = {};
for (const r of relasi) (H[r.kode_gejala] ||= new Set()).add(r.kode_kerusakan);
for (const g of kodeG) cek(H[g], `gejala ${g} tidak dipakai rule mana pun`);
for (const g of kodeG) cek(!H[g] || H[g].size !== kodeK.size, `gejala ${g} menunjuk seluruh kerusakan`);
const solK = new Set(solusiRows.map(r => r.kode_kerusakan));
cek(solK.size === kodeK.size && [...kodeK].every(k => solK.has(k)), "setiap kerusakan harus memiliki satu baris solusi");
for (const r of gejala) {
  const m = Number(r.nilai_m);
  cek(/^\d*\.?\d+$/.test(r.nilai_m) && m > 0 && m < 1, `${r.kode_gejala}: nilai m harus di antara 0 dan 1`);
}

if (errors.length) {
  console.error("BUILD GAGAL — validasi data tidak lolos:\n  - " + errors.join("\n  - "));
  process.exit(1);
}

// ---- Kategori gejala (field turunan, PRD bagian 6) ----
const KATEGORI = [
  { id: "layar", nama: "Layar & tampilan", kerusakan: ["K1", "K3", "K4"], warna: "lavender", ikon: "monitor" },
  { id: "daya", nama: "Daya, baterai & mainboard", kerusakan: ["K2", "K8", "K11", "K12", "K16"], warna: "peach", ikon: "battery" },
  { id: "input", nama: "Keyboard & touchpad", kerusakan: ["K5", "K6"], warna: "mint", ikon: "keyboard" },
  { id: "kinerja", nama: "Penyimpanan, memori & kinerja", kerusakan: ["K7", "K10", "K17", "K18"], warna: "sky", ikon: "chip" },
  { id: "konek", nama: "Audio, jaringan & port", kerusakan: ["K9", "K13", "K14", "K15"], warna: "lilac", ikon: "wifi" },
];
const katDari = k => KATEGORI.find(c => c.kerusakan.includes(k)).id;
const urutK = a => [...a].sort((x, y) => Number(x.slice(1)) - Number(y.slice(1)));

function badgeDari(catatan) {
  const b = [];
  if (/KONFLIK relasi/.test(catatan)) b.push("konflik");
  if (/PERLU_KEPUTUSAN/.test(catatan)) b.push("keputusan");
  if (/^Mirip/.test(catatan)) b.push("mirip");
  if (/perlu dicek/i.test(catatan)) b.push("cek");
  return b;
}
const sumberDari = t => /Saragih/.test(t) ? "Saragih" : /Arifin/.test(t) ? "Arifin" : "Hilda";

const out = {
  dibuat: new Date().toISOString(),
  kategori: KATEGORI,
  kerusakan: kerusakan.map(r => ({ kode: r.kode_kerusakan, nama: r.nama_kerusakan, sumber: r.sumber, jurnal: sumberDari(r.sumber) })),
  gejala: gejala.map(r => {
    const h = urutK(H[r.kode_gejala]);
    const kats = [...new Set(h.map(katDari))];
    const kategori = KATEGORI.find(c => kats.includes(c.id)).id; // kategori pertama sesuai urutan tabel
    const badges = badgeDari(r.catatan);
    if (kats.length > 1) badges.unshift("lintas");
    return {
      kode: r.kode_gejala, nama: r.nama_gejala, m: r.nilai_m, H: h, kategori,
      sumber: r.sumber, jurnal: sumberDari(r.sumber), pembanding: r.nilai_m_pembanding, catatan: r.catatan, badges,
    };
  }),
  rule: rule.map(r => ({ no: r.no_rule, gejala: r.gejala.split(";"), kerusakan: r.kerusakan,
    jumlah: Number(r.jumlah_gejala), sumber: r.sumber, jurnal: sumberDari(r.sumber), catatan: r.catatan })),
  relasi: relasi.map(r => ({ g: r.kode_gejala, k: r.kode_kerusakan, rule: r.no_rule, sumber: r.sumber })),
  solusi: solusiRows.map(r => {
    const bagian = {};
    for (const part of r.solusi.split("||")) {
      const i = part.indexOf(":");
      const judul = part.slice(0, i).trim();
      bagian[/teknisi/i.test(judul) ? "teknisi" : "sendiri"] = part.slice(i + 1).split("|").map(s => s.trim()).filter(Boolean);
    }
    return { kode: r.kode_kerusakan, nama: r.nama_kerusakan, sendiri: bagian.sendiri || [], teknisi: bagian.teknisi || [],
      sumber: r.sumber_solusi, tingkat: r.tingkat };
  }),
  kasus: kasus.map(r => ({ id: r.id_kasus, gejala: r.gejala_dipilih.split(";"), massa: r.massa_diharapkan,
    diagnosis: r.diagnosis_utama, sumber: r.sumber_ekspektasi, catatan: r.catatan })),
};

const json = JSON.stringify(out, null, 1);
fs.writeFileSync(path.join(ROOT, "data.json"), json);
fs.writeFileSync(path.join(ROOT, "js", "data.js"),
  "// Dibuat otomatis oleh scripts/build-data.js dari data/*.csv — jangan disunting manual.\nwindow.LAPCARE_DATA = " + json + ";\n");

const per = {};
for (const g of out.gejala) per[g.kategori] = (per[g.kategori] || 0) + 1;
console.log(`OK: ${out.kerusakan.length} kerusakan, ${out.gejala.length} gejala, ${out.rule.length} rule, ${out.relasi.length} relasi, ${out.solusi.length} solusi, ${out.kasus.length} kasus uji`);
console.log("Gejala per kategori:", per);
