/* LapCare — mesin Dempster-Shafer.
 * Padanan langsung fungsi notebook: gabung, kombinasi, bel_pl, diagnosis.
 * Semua angka pecahan eksak (BigInt), dibulatkan hanya saat ditampilkan.
 * Dipakai di browser (window.DS) dan Node (require) untuk skrip uji. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.DS = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  // ---------- Pecahan eksak ----------
  const babs = x => (x < 0n ? -x : x);
  const gcd = (a, b) => { a = babs(a); b = babs(b); while (b) [a, b] = [b, a % b]; return a; };

  class Frac {
    constructor(n, d = 1n) {
      n = BigInt(n); d = BigInt(d);
      if (d === 0n) throw new Error("penyebut nol");
      if (d < 0n) { n = -n; d = -d; }
      const g = gcd(n, d) || 1n;
      this.n = n / g; this.d = d / g;
    }
    static parse(s) {
      s = String(s).trim();
      if (s.includes("/")) { const [a, b] = s.split("/"); return new Frac(BigInt(a), BigInt(b)); }
      const neg = s.startsWith("-"); if (neg) s = s.slice(1);
      const [i, f = ""] = s.split(".");
      const fr = new Frac(BigInt((i || "0") + f), 10n ** BigInt(f.length));
      return neg ? fr.neg() : fr;
    }
    add(o) { return new Frac(this.n * o.d + o.n * this.d, this.d * o.d); }
    sub(o) { return new Frac(this.n * o.d - o.n * this.d, this.d * o.d); }
    mul(o) { return new Frac(this.n * o.n, this.d * o.d); }
    div(o) { return new Frac(this.n * o.d, this.d * o.n); }
    neg() { return new Frac(-this.n, this.d); }
    cmp(o) { const a = this.n * o.d, b = o.n * this.d; return a < b ? -1 : a > b ? 1 : 0; }
    eq(o) { return this.n === o.n && this.d === o.d; }
    isZero() { return this.n === 0n; }
    valueOf() { return Number(this.n) / Number(this.d); }
    toString() { return this.d === 1n ? String(this.n) : `${this.n}/${this.d}`; }
    /** Desimal dengan pembulatan setengah ke atas, tanpa galat floating point. */
    toFixed(digits) {
      const scale = 10n ** BigInt(digits);
      const neg = this.n < 0n;
      let q = (babs(this.n) * scale * 2n + this.d) / (this.d * 2n);
      let s = q.toString().padStart(digits + 1, "0");
      if (digits > 0) s = s.slice(0, -digits) + "." + s.slice(-digits);
      return (neg && q !== 0n ? "-" : "") + s;
    }
  }
  const ZERO = new Frac(0n), ONE = new Frac(1n);

  // ---------- Mesin ----------
  function create(data) {
    const kodeK = data.kerusakan.map(k => k.kode);
    const bit = {}; kodeK.forEach((k, i) => (bit[k] = 1 << i));
    const THETA = (1 << kodeK.length) - 1;
    const NAMA_K = Object.fromEntries(data.kerusakan.map(k => [k.kode, k.nama]));
    const G = Object.fromEntries(data.gejala.map(g => [g.kode, g]));
    const M = Object.fromEntries(data.gejala.map(g => [g.kode, Frac.parse(g.m)]));
    const H = {};
    for (const r of data.relasi) H[r.g] = (H[r.g] || 0) | bit[r.k];

    const anggota = mask => kodeK.filter(k => mask & bit[k]);
    const label = mask => (mask === THETA ? "θ" : mask === 0 ? "∅" : "{" + anggota(mask).join(", ") + "}");
    const maskDari = list => list.reduce((m, k) => m | bit[k], 0);

    /** gabung(massa, g) → { massa baru, K, sel tabel irisan, sebelum normalisasi } */
    function gabung(massa, g) {
      const baru = new Map(), sel = [];
      let K = ZERO;
      const mg = M[g], pasangan = [[H[g], mg], [THETA, ONE.sub(mg)]];
      for (const [A, a] of massa) {
        for (const [B, b] of pasangan) {
          const C = A & B, v = a.mul(b);
          sel.push({ A, a, B, b, C, v, konflik: C === 0 });
          if (C) baru.set(C, (baru.get(C) || ZERO).add(v));
          else K = K.add(v);
        }
      }
      if (K.cmp(ONE) >= 0) {
        const e = new Error("Konflik total: gejala yang dipilih sepenuhnya bertentangan");
        e.konflikTotal = true; e.gejala = g; e.sel = sel; e.K = K;
        throw e;
      }
      const penyebut = ONE.sub(K);
      const hasil = new Map();
      for (const [C, v] of baru) hasil.set(C, v.div(penyebut));
      return { massa: hasil, K, sel, sebelum: baru, penyebut };
    }

    /** kombinasi(daftar) → { massa, langkah[] } ; mulai dari m(θ) = 1 */
    function kombinasi(daftar) {
      let massa = new Map([[THETA, ONE]]);
      const langkah = [];
      for (const g of daftar) {
        const prev = massa;
        const r = gabung(massa, g);
        massa = r.massa;
        langkah.push({ g, mg: M[g], H: H[g], K: r.K, penyebut: r.penyebut, sel: r.sel, sebelumMassa: prev, sebelumNorm: r.sebelum, sesudah: massa });
      }
      return { massa, langkah };
    }

    function belPl(massa, k) {
      const b = bit[k];
      let pl = ZERO;
      for (const [A, v] of massa) if (A & b) pl = pl.add(v);
      return { bel: massa.get(b) || ZERO, pl };
    }

    const KONFLIK_TINGGI = new Frac(9n, 10n);

    /** diagnosis(daftar) → objek hasil lengkap untuk UI */
    function diagnosis(daftar) {
      daftar = daftar.map(g => g.trim().toUpperCase());
      const takDikenal = daftar.filter(g => !M[g]);
      if (takDikenal.length) throw new Error("Kode gejala tidak ada dalam dataset: " + takDikenal.join(", "));
      let komb;
      try { komb = kombinasi(daftar); }
      catch (e) { if (e.konflikTotal) return { status: "KONFLIK_TOTAL", gejala: daftar, error: e }; throw e; }
      const { massa, langkah } = komb;
      const mTheta = massa.get(THETA) || ZERO;

      const baris = [];
      for (const k of kodeK) {
        const { bel, pl } = belPl(massa, k);
        if (!pl.isZero()) baris.push({ kode: k, nama: NAMA_K[k], bel, pl });
      }
      baris.sort((x, y) => y.bel.cmp(x.bel) || y.pl.cmp(x.pl) || Number(x.kode.slice(1)) - Number(y.kode.slice(1)));

      const tunggal = baris.filter(r => !r.bel.isZero());
      let status, utama = [];
      if (!tunggal.length) status = "TIDAK_TUNGGAL";
      else {
        const top = tunggal[0].bel;
        utama = tunggal.filter(r => r.bel.eq(top));
        status = utama.length === 1 ? "TUNGGAL" : "SERI";
      }
      const kandidat = baris.filter(r => r.pl.cmp(mTheta) > 0).slice(0, 5);
      const himpunan = [...massa].filter(([A]) => A !== THETA).sort((a, b) => b[1].cmp(a[1]))
        .map(([A, v]) => ({ mask: A, label: label(A), anggota: anggota(A), v }));
      const konflikTinggi = langkah.some(l => l.K.cmp(KONFLIK_TINGGI) >= 0);

      // Kerusakan yang masih diperebutkan → dasar saran gejala pembeda
      let pesaing = [];
      if (status === "SERI") pesaing = utama.map(r => r.kode);
      else if (status === "TIDAK_TUNGGAL") pesaing = [...new Set(himpunan.flatMap(h => h.anggota))];

      return { status, gejala: daftar, massa, langkah, mTheta, baris, kandidat, utama, himpunan, konflikTinggi,
        saran: pesaing.length > 1 ? saranPembeda(daftar, pesaing) : [] };
    }

    /** Gejala belum dipilih yang hanya menunjuk satu kandidat; maks 5, dibagi rata antar kandidat. */
    function saranPembeda(dipilih, pesaing, maks = 5) {
      const pm = maskDari(pesaing), sudah = new Set(dipilih);
      const per = pesaing.map(k => data.gejala
        .filter(g => !sudah.has(g.kode) && (H[g.kode] & pm) === bit[k])
        .sort((a, b) => {
          const sa = H[a.kode] === bit[k] ? 0 : 1, sb = H[b.kode] === bit[k] ? 0 : 1;
          return sa - sb || M[b.kode].cmp(M[a.kode]) || Number(a.kode.slice(1)) - Number(b.kode.slice(1));
        })
        .map(g => ({ kode: g.kode, nama: g.nama, m: M[g.kode], untuk: k })));
      const out = [];
      for (let i = 0; out.length < maks && per.some(p => p[i]); i++)
        for (const p of per) if (p[i] && out.length < maks) out.push(p[i]);
      return out;
    }

    /** Uraikan massa_diharapkan, mis. "K1|K2=0.3;THETA=0.2" */
    function urai(teks) {
      const out = new Map();
      for (const p of teks.split(";")) {
        const [k, v] = p.split("=");
        out.set(k === "THETA" ? THETA : maskDari(k.split("|")), Frac.parse(v));
      }
      return out;
    }
    const TOLERANSI = new Frac(1n, 200n);
    function cocokMassa(massa, harap) {
      if (massa.size !== harap.size) return false;
      for (const [A, v] of harap) {
        if (!massa.has(A)) return false;
        const d = massa.get(A).sub(v);
        if ((d.n < 0n ? d.neg() : d).cmp(TOLERANSI) >= 0) return false;
      }
      return true;
    }
    function ujiKasus(kasus) {
      return kasus.map(c => {
        const hasil = diagnosis(c.gejala);
        const harap = urai(c.massa);
        const diag = hasil.status === "TUNGGAL" ? hasil.utama[0].kode : hasil.status;
        const massaOk = hasil.massa ? cocokMassa(hasil.massa, harap) : false;
        return { kasus: c, hasil, harap, diag, massaOk, diagOk: diag === c.diagnosis, cocok: massaOk && diag === c.diagnosis };
      });
    }

    return { THETA, kodeK, bit, NAMA_K, G, M, H, label, anggota, maskDari, gabung, kombinasi, belPl, diagnosis, saranPembeda, urai, ujiKasus };
  }

  return { Frac, create };
});
