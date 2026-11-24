// Skrip uji sebelum deploy: 6 kasus uji CSV + 4 contoh acuan PRD 5.4.
// Jalankan: node scripts/test-ds.js   (keluar dengan kode 1 bila ada yang gagal)
"use strict";
const path = require("path");
const fs = require("fs");
const DS = require("../js/ds.js");
const data = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data.json"), "utf8"));
const E = DS.create(data);
const F = DS.Frac.parse;

let gagal = 0;
const ok = (cond, msg) => { console.log((cond ? "  ✓ " : "  ✗ ") + msg); if (!cond) gagal++; };

console.log("Kasus uji (kasus_uji.csv)");
for (const r of E.ujiKasus(data.kasus))
  ok(r.cocok, `${r.kasus.id} ${r.kasus.gejala.join(",")} → ${r.diag} (diharapkan ${r.kasus.diagnosis})`);

console.log("\nContoh acuan PRD 5.4");
const K = r => r.langkah.map(l => l.K.toFixed(4));
let r = E.diagnosis(["G1", "G2"]);
ok(r.status === "TUNGGAL" && r.utama[0].kode === "K1" && r.utama[0].bel.toFixed(4) === "0.5000" && r.utama[0].pl.toFixed(4) === "1.0000"
   && K(r).join() === "0.0000,0.0000", "G1,G2 → K1 Bel 0,5000 Pl 1,0000; K 0;0");
r = E.diagnosis(["G13", "G49"]);
ok(r.status === "TUNGGAL" && r.utama[0].kode === "K15" && r.utama[0].bel.eq(new DS.Frac(6n, 11n)) && r.utama[0].pl.toFixed(4) === "0.6818"
   && K(r).join() === "0.0000,0.5600", "G13,G49 → K15 Bel 0,5455 (6/11) Pl 0,6818; K 0;0,56");
r = E.diagnosis(["G9", "G6", "G55"]);
ok(r.status === "SERI" && r.utama.map(u => u.kode).join() === "K3,K4,K17" && r.utama[0].bel.toFixed(4) === "0.3077"
   && K(r).join() === "0.0000,0.6400,0.7111", "G9,G6,G55 → SERI K3,K4,K17 Bel 0,3077; K 0;0,64;0,7111");
r = E.diagnosis(["G1", "G5"]);
ok(r.status === "TIDAK_TUNGGAL" && r.himpunan.length === 2 && r.himpunan.every(h => h.v.eq(F("0.375")))
   && r.himpunan.map(h => h.label).sort().join() === "{K1, K2},{K3, K4, K10}" && K(r).join() === "0.0000,0.3600",
   "G1,G5 → TIDAK TUNGGAL {K1,K2} 0,375 & {K3,K4,K10} 0,375; K 0;0,36");
r = E.diagnosis(["G9", "G49"]);
ok(r.status === "SERI" && r.utama.length === 2, "G9,G49 → SERI 2 kandidat");
console.log("  saran pembeda G9,G49:", r.saran.map(s => s.kode + "→" + s.untuk).join(" "));

console.log("\nKinerja: 20 gejala");
const t0 = process.hrtime.bigint();
E.diagnosis(data.gejala.slice(0, 20).map(g => g.kode));
const ms = Number(process.hrtime.bigint() - t0) / 1e6;
ok(ms < 100, `diagnosis 20 gejala ${ms.toFixed(1)} ms (< 100 ms)`);

console.log(gagal ? `\n${gagal} uji GAGAL` : "\nSemua uji lulus.");
process.exit(gagal ? 1 : 0);
