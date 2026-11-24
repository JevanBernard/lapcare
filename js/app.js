/* LapCare — antarmuka. Semua perhitungan ada di ds.js; berkas ini hanya menampilkan. */
(function () {
  "use strict";

  const D = window.LAPCARE_DATA;
  const main = document.getElementById("main");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const store = {
    get(k, d) { try { const v = sessionStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* abaikan */ } },
  };

  // ---------- Ikon ----------
  const I = (p, w = 2) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const ICON = {
    monitor: I('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>'),
    battery: I('<rect x="2" y="7" width="17" height="10" rx="2"/><path d="M22 11v2M10 9l-2 3h4l-2 3"/>'),
    keyboard: I('<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>'),
    chip: I('<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>'),
    wifi: I('<path d="M2 8.5a15 15 0 0120 0M5 12a10 10 0 0114 0M8.5 15.5a5 5 0 017 0M12 19h.01"/>'),
    search: I('<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>', 2.2),
    x: I('<path d="M6 6l12 12M18 6L6 18"/>', 2.4),
    chev: I('<path d="M6 9l6 6 6-6"/>', 2.4),
    arrow: I('<path d="M5 12h14M13 6l6 6-6 6"/>', 2.2),
    back: I('<path d="M19 12H5M11 18l-6-6 6-6"/>', 2.2),
    plus: I('<path d="M12 5v14M5 12h14"/>', 2.4),
    alert: I('<path d="M12 3l10 18H2zM12 10v4M12 17.5h.01"/>', 2.2),
    info: I('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5h.01"/>', 2.2),
    printer: I('<path d="M6 9V3h12v6M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="7"/>'),
    wrench: I('<path d="M14.7 6.3a4 4 0 005 5L21 13l-8 8-3-3 8-8-1.3-1.3a4 4 0 01-5-5z" transform="translate(-2 -1)"/>'),
    hand: I('<path d="M8 13V5a1.5 1.5 0 013 0v6M11 11V3.5a1.5 1.5 0 013 0V11M14 11V5a1.5 1.5 0 013 0v8c0 4-2.5 8-7 8-3 0-4.5-1.5-6-4l-2-3.5a1.5 1.5 0 012.6-1.5L8 15"/>'),
    check: I('<path d="M5 12l5 5 9-10"/>', 2.6),
    refresh: I('<path d="M20 11a8 8 0 10-2.3 5.7M20 4v7h-7"/>', 2.2),
    shield: I('<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M12 8v5M12 16h.01"/>', 2.2),
    layers: I('<path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5"/>'),
  };

  // ---------- Format angka (Indonesia) ----------
  const F100 = new DS.Frac(100n);
  const dec = (f, d = 4) => f.toFixed(d).replace(".", ",");
  const pct = f => dec(f.mul(F100), 2) + "%";
  const splitPct = f => { const s = f.mul(F100).toFixed(2).split("."); return { i: s[0], d: "," + s[1] + "%" }; };
  let numMode = store.get("lapcare.num", "desimal");
  const num = f => (numMode === "pecahan" ? f.toString() : dec(f));

  // ---------- Data & mesin ----------
  let E = null;
  try { if (D) E = DS.create(D); } catch (e) { console.error(e); }
  const KAT = D ? Object.fromEntries(D.kategori.map(k => [k.id, k])) : {};
  const G = D ? Object.fromEntries(D.gejala.map(g => [g.kode, g])) : {};
  const KR = D ? Object.fromEntries(D.kerusakan.map(k => [k.kode, k])) : {};
  const SOL = D ? Object.fromEntries(D.solusi.map(s => [s.kode, s])) : {};
  const katOfK = k => D.kategori.find(c => c.kerusakan.includes(k));
  const TINGKAT = { KEDUANYA: "Dicoba sendiri + Teknisi", TEKNISI: "Perlu teknisi", SENDIRI: "Dicoba sendiri", DICOBA_SENDIRI: "Dicoba sendiri" };
  const BADGE = {
    lintas: ["lintas", "Terkait beberapa komponen"],
    konflik: ["konflik", "Konflik relasi"],
    keputusan: ["keputusan", "Perlu keputusan"],
    mirip: ["mirip", "Mirip gejala lain"],
    cek: ["cek", "Teks perlu dicek"],
  };
  const MIRIP = [["G4", "G53", "G54"], ["G5", "G62"], ["G35", "G64"]];
  const CONTOH = [["G1", "G2"], ["G13", "G49"], ["G9", "G6", "G55"]];
  const TIP = {
    bel: "Belief: seberapa besar bukti mendukung kerusakan ini secara pasti (batas bawah keyakinan).",
    pl: "Plausibility: batas atas — seberapa besar kemungkinan kerusakan ini masih terbuka, termasuk bukti yang belum pasti.",
    theta: "θ (theta): seluruh 18 kerusakan. m(θ) adalah massa yang belum bisa ditunjuk ke kerusakan tertentu — ukuran ketidaktahuan.",
    k: "K: konflik, yaitu jumlah massa dari pasangan himpunan yang tidak beririsan. Dipakai sebagai penyebut 1 − K saat normalisasi.",
  };
  const term = (txt, key) => `<span class="term" tabindex="0" data-tip="${esc(TIP[key])}">${txt}</span>`;
  const badges = list => list.map(b => `<span class="badge badge--${BADGE[b][0]}">${esc(BADGE[b][1])}</span>`).join("");
  const SAFETY = `<div class="safety">${ICON.shield}<p><b>Keselamatan dulu.</b> Matikan laptop dan lepas adaptor sebelum membuka atau membersihkan. Bila laptop masih bergaransi, jangan dibongkar sendiri.</p></div>`;

  // ---------- State ----------
  let selected = store.get("lapcare.sel", []).filter(g => G[g]);
  const saveSel = () => store.set("lapcare.sel", selected);
  let openCats = new Set(store.get("lapcare.open", []));
  let query = "";
  let kb = { tab: "gejala", q: "", src: "Semua" };
  let cleanup = [];

  // ---------- Router ----------
  function parseHash() {
    const h = location.hash.replace(/^#/, "") || "/";
    const [path, q = ""] = h.split("?");
    return { path: path || "/", params: new URLSearchParams(q) };
  }
  const ROUTES = {
    "/": { nav: "beranda", title: "Beranda", view: viewHome },
    "/diagnosis": { nav: "diagnosis", title: "Diagnosis", view: viewDiagnosis },
    "/hasil": { nav: "diagnosis", title: "Hasil diagnosis", view: viewHasil },
    "/pengetahuan": { nav: "pengetahuan", title: "Basis pengetahuan", view: viewKB },
    "/pengujian": { nav: "pengujian", title: "Pengujian", view: viewPengujian },
    "/metode": { nav: "metode", title: "Tentang metode", view: viewMetode },
  };
  let lastPath = null;

  function render() {
    cleanup.forEach(fn => fn()); cleanup = [];
    const { path, params } = parseHash();
    const route = ROUTES[path] || { nav: "", title: "Halaman tidak ditemukan", view: viewNotFound };
    const failed = !D || !E || params.get("sim") === "data-gagal";
    $$("[data-nav]").forEach(a => a.dataset.nav === route.nav ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
    document.body.classList.toggle("on-diag", path === "/diagnosis" && !failed);
    document.title = (failed ? "Data gagal dimuat" : route.title) + " · LapCare";
    const out = failed ? viewDataError() : route.view(params);
    main.innerHTML = `<div class="view">${out.html}</div>`;
    if (out.mount) out.mount();
    if (lastPath !== path + (params.get("g") || "")) {
      window.scrollTo(0, 0);
      main.focus({ preventScroll: true });
    }
    lastPath = path + (params.get("g") || "");
    closeDrawer();
  }
  const go = h => { if (location.hash === h) render(); else location.hash = h; };

  // ---------- Komponen bersama ----------
  function ibar(bel, pl, extra = "") {
    const b = Number(bel) * 100, p = Number(pl) * 100;
    return `<div class="ibar ${extra}" role="img" aria-label="Belief ${pct(bel)}, Plausibility ${pct(pl)}">
      <span class="ibar__pl" data-w="${p}"></span><span class="ibar__bel" data-w="${b}"></span></div>`;
  }
  function growBars(root = main) {
    const bars = $$(".ibar__pl, .ibar__bel", root);
    requestAnimationFrame(() => requestAnimationFrame(() => bars.forEach(el => (el.style.width = el.dataset.w + "%"))));
  }
  function bigNum(f, cls = "") {
    const s = splitPct(f);
    return `<span class="belief ${cls}" data-target="${esc(f.toString())}" aria-label="${s.i}${s.d}"><span class="int" aria-hidden="true">${s.i}</span><span class="dec" aria-hidden="true">${s.d}</span></span>`;
  }
  // Momen khas: angka Belief "tumbuh" dari 0 bersamaan dengan batang interval.
  function countUp(root = main) {
    if (reduced) return;
    $$(".belief[data-target]", root).forEach(el => {
      const [n, d] = el.dataset.target.split("/");
      const target = (Number(n) / Number(d || 1)) * 100;
      const iEl = $(".int", el), dEl = $(".dec", el);
      const finalI = iEl.textContent, finalD = dEl.textContent;
      const t0 = performance.now(), dur = 1100;
      let raf;
      const tick = now => {
        const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 4);
        const v = (target * e).toFixed(2).split(".");
        iEl.textContent = v[0]; dEl.textContent = "," + v[1] + "%";
        if (k < 1) raf = requestAnimationFrame(tick); else { iEl.textContent = finalI; dEl.textContent = finalD; }
      };
      raf = requestAnimationFrame(tick);
      cleanup.push(() => cancelAnimationFrame(raf));
    });
  }
  const codeChip = (c, cls = "") => `<span class="code ${cls}">${esc(c)}</span>`;
  const ychips = gs => gs.map((g, i) => `<span class="ychip" title="${esc(G[g].nama)}"><span class="i">${i + 1}</span><b>${g}</b><span class="t">${esc(G[g].nama)}</span></span>`).join("");
  const setNames = mask => E.anggota(mask).map(k => KR[k].nama).join(" · ");

  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.classList.add("is-on");
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("is-on"), 2200);
  }

  // =====================================================================
  // BERANDA
  // =====================================================================
  function liveCard(gs) {
    const r = E.diagnosis(gs);
    let name, val, pl, chip, sub;
    if (r.status === "TUNGGAL") { const u = r.utama[0]; name = KR[u.kode].nama; val = u.bel; pl = u.pl; chip = "TUNGGAL"; sub = `${u.kode} · kerusakan paling mungkin`; }
    else if (r.status === "SERI") { name = r.utama.map(u => KR[u.kode].nama.split("/")[0]).join(" · "); val = r.utama[0].bel; pl = r.utama[0].pl; chip = `SERI · ${r.utama.length}`; sub = `${r.utama.map(u => u.kode).join(", ")} · kandidat setara`; }
    else { name = r.himpunan.map(h => h.label).join(" & "); val = r.himpunan[0].v; pl = r.himpunan[0].v; chip = "TIDAK TUNGGAL"; sub = "himpunan kandidat"; }
    return `<div class="console__top"><span class="console__title"><i class="led" aria-hidden="true"></i>Simulasi · ${gs.join(" + ")}</span><span class="badge badge--status">${chip}</span></div>
      <ol class="ev" aria-label="Bukti yang digabung">${r.langkah.map((l, i) => `<li class="ev__row" style="--d:${i}">
        <span class="ev__n">${i + 1}</span>${codeChip(l.g)}<span class="ev__t">${esc(G[l.g].nama)}</span>
        <span class="ev__m num">m ${dec(l.mg, 2)} <span aria-hidden="true">→</span> <b class="setlbl">${esc(E.label(l.H))}</b></span>
        <span class="ev__k num" title="Konflik pada langkah ini">K ${dec(l.K, 2)}</span></li>`).join("")}</ol>
      <div class="console__res" style="--d:${r.langkah.length}">
        <p class="console__sub">${esc(sub)}</p>
        <p class="live__name">${esc(name)}</p>
        <div class="console__num">${bigNum(val, "belief--md")}<p class="belief-cap"><span>${term("Belief", "bel")}</span><span class="muted">${term("Plausibility", "pl")} ${pct(pl)}</span></p></div>
        ${ibar(val, pl, "ibar--lg")}
      </div>`;
  }

  const SEAL = `<svg viewBox="0 0 120 120" class="seal__ring"><defs><path id="sealPath" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"/></defs>
    <text><textPath href="#sealPath" textLength="274" lengthAdjust="spacing">DEMPSTER · SHAFER · BELIEF · PLAUSIBILITY · </textPath></text></svg><span class="seal__core">θ</span>`;

  function viewHome() {
    const n = { k: D.kerusakan.length, g: D.gejala.length, r: D.rule.length, j: new Set(D.gejala.map(g => g.jurnal)).size };
    const uji = E.ujiKasus(D.kasus), ok = uji.filter(u => u.cocok).length;
    const ticks = D.gejala.filter(g => g.nama.length <= 46).slice(0, 22);
    const tickHTML = ticks.map(g => `<span class="marquee__item"><b>${g.kode}</b>${esc(g.nama)}</span>`).join("");
    const chk = ICON.check.replace("<svg", '<svg width="16" height="16"');
    const arr = ICON.arrow.replace("<svg", '<svg width="20" height="20"');
    const html = `
    <section class="hero hero--home" aria-labelledby="h-home">
      <div class="wrap home-hero">
        <div class="home-hero__copy">
          <span class="eyebrow rise"><span class="dot dot--pulse"></span>Sistem pakar · Dempster-Shafer</span>
          <h1 id="h-home" class="display" aria-label="Tahu apa yang rusak sebelum ke tempat servis.">
            <span class="line" aria-hidden="true"><span style="--i:0">Tahu apa yang</span></span>
            <span class="line" aria-hidden="true"><span style="--i:1">rusak <em class="pill-word">sebelum</em></span></span>
            <span class="line" aria-hidden="true"><span style="--i:2">ke tempat servis.</span></span>
          </h1>
          <p class="lede rise" style="animation-delay:.35s">Centang gejala yang dialami laptopmu. LapCare menggabungkan bukti dari tiap gejala, lalu menunjukkan kerusakan paling mungkin, seberapa yakin, dan langkah yang bisa kamu coba sendiri.</p>
          <div class="home-hero__cta rise" style="animation-delay:.45s">
            <a class="btn btn--ink btn--lg" href="#/diagnosis">Mulai Diagnosis <span class="arrow">${ICON.arrow}</span></a>
            <a class="btn btn--ghost btn--lg" href="#/metode">Cara kerjanya</a>
          </div>
          <ul class="home-hero__meta rise" style="animation-delay:.55s">
            <li>${chk} Tanpa akun</li><li>${chk} Jalan tanpa internet</li><li>${chk} Hasil &lt; 1 detik</li>
          </ul>
        </div>
        <div class="console-wrap rise" style="animation-delay:.25s">
          <div class="seal" aria-hidden="true">${SEAL}</div>
          <div class="console" id="live" aria-live="polite">${liveCard(CONTOH[1])}</div>
          <div class="console__foot">
            <div class="live__dots" role="group" aria-label="Pilih contoh">${CONTOH.map((c, i) => `<button type="button" data-demo="${i}" aria-pressed="${i === 1}" aria-label="Contoh ${c.join(" + ")}"></button>`).join("")}</div>
            <a class="btn btn--ink btn--sm" id="liveOpen" href="#/hasil?g=${CONTOH[1].join(",")}">Buka perhitungannya <span class="arrow">${ICON.arrow}</span></a>
          </div>
        </div>
      </div>
      <div class="wrap"><div class="hero-figs" aria-label="Isi basis pengetahuan">
        <div><b class="num">${n.k}</b><span>kerusakan</span></div>
        <div><b class="num">${n.g}</b><span>gejala</span></div>
        <div><b class="num">${n.r}</b><span>rule</span></div>
        <div><b class="num">${n.j}</b><span>jurnal sumber</span></div>
        <div><b class="num">${ok}/${uji.length}</b><span>kasus uji cocok</span></div>
      </div></div>
    </section>
    <div class="marquee-band" aria-hidden="true"><div class="marquee"><div class="marquee__track">${tickHTML}${tickHTML}</div></div></div>
    <div class="sheet sheet--on-ink"><div class="wrap">
      <section class="section" aria-labelledby="h-how">
        <div class="section__head"><div><span class="idx">01</span><h2 id="h-how">Tiga langkah, dua menit.</h2></div></div>
        <ol class="steps" style="list-style:none;padding:0;margin:0">
          <li class="step"><span class="step__n">1</span><h3>Pilih gejala</h3><p>Cari dengan kata seperti “baterai” atau “layar”, atau buka kelompok komponennya. Urutan centang dicatat.</p></li>
          <li class="step"><span class="step__n">2</span><h3>Lihat hasil</h3><p>Kerusakan paling mungkin dengan Belief dan Plausibility, plus langkah perhitungan yang bisa ditelusuri.</p></li>
          <li class="step"><span class="step__n">3</span><h3>Ikuti solusi</h3><p>Langkah yang aman dicoba sendiri, dan kapan sebaiknya dibawa ke teknisi.</p></li>
        </ol>
      </section>
      <section class="section" aria-labelledby="h-cat">
        <div class="section__head"><div><span class="idx">02</span><h2 id="h-cat">Mulai dari bagian yang bermasalah.</h2><p>Lima kelompok komponen. Pilih satu untuk langsung membuka daftar gejalanya.</p></div></div>
        <div class="tiles">${D.kategori.map(c => {
          const jml = D.gejala.filter(g => g.kategori === c.id).length;
          return `<a class="tile bg-${c.warna}" href="#/diagnosis?kat=${c.id}"><span class="tile__top"><span class="icon-btn" aria-hidden="true">${ICON[c.ikon]}</span><span class="tile__go" aria-hidden="true">${ICON.arrow}</span></span><span><b>${esc(c.nama)}</b><small>${jml} gejala · ${c.kerusakan.length} kerusakan</small></span></a>`;
        }).join("")}</div>
      </section>
      <section class="section" aria-labelledby="h-kb">
        <div class="section__head"><div><span class="idx">03</span><h2 id="h-kb">Dibangun dari tiga jurnal.</h2><p>Satu sumber utama, dua pelengkap. Setiap gejala, rule, dan nilai m bisa ditelusuri ke sumbernya.</p></div>
          <a class="btn btn--sm" href="#/pengetahuan">Lihat basis pengetahuan <span class="arrow">${ICON.arrow}</span></a></div>
        ${srcBar(true)}
      </section>
      <section class="section" aria-labelledby="h-exam">
        <div class="section__head"><div><span class="idx">04</span><h2 id="h-exam">Untuk penguji.</h2><p>Setiap angka bisa ditelusuri sampai tabel irisan, dan hasilnya sama dengan notebook kelompok.</p></div></div>
        <div class="for-examiner">
          <a class="link-card" href="#/pengujian"><span class="big num">${ok}/${uji.length}</span><b>Kasus uji cocok</b><span class="go">Halaman Pengujian ${arr}</span></a>
          <a class="link-card" href="#/hasil?g=G13,G49&tab=langkah"><span class="big num">K = 0,56</span><b>Langkah perhitungan G13 + G49</b><span class="go">Lihat tabel irisan ${arr}</span></a>
          <a class="link-card link-card--ink" href="#/metode"><span class="big">m₁ ⊕ m₂</span><b>Aturan kombinasi Dempster</b><span class="go">Tentang metode ${arr}</span></a>
        </div>
      </section>
    </div></div>`;

    return {
      html, mount() {
        countUp(); growBars();
        let idx = 1, timer = null;
        const live = $("#live");
        const show = i => {
          idx = i;
          live.innerHTML = liveCard(CONTOH[i]);
          $("#liveOpen").href = "#/hasil?g=" + CONTOH[i].join(",");
          $$("[data-demo]").forEach(b => b.setAttribute("aria-pressed", String(+b.dataset.demo === i)));
          countUp(live); growBars(live);
        };
        $$("[data-demo]").forEach(b => b.addEventListener("click", () => { stop(); show(+b.dataset.demo); }));
        const start = () => { if (!reduced && !timer) timer = setInterval(() => show((idx + 1) % CONTOH.length), 6500); };
        const stop = () => { clearInterval(timer); timer = null; };
        const wrapEl = live.parentElement;
        wrapEl.addEventListener("mouseenter", stop); wrapEl.addEventListener("mouseleave", start);
        wrapEl.addEventListener("focusin", stop);
        start();
        cleanup.push(stop);
      },
    };
  }

  /** Batang bertumpuk: porsi gejala per jurnal sumber. */
  function srcBar(full) {
    const SRC = [["Saragih", "Saragih dkk. (2018)", "Sumber utama · K1–K15"], ["Arifin", "Arifin & Norhikmah (2024)", "Pelengkap · Mainboard, Processor"], ["Hilda", "Hilda dkk. (2023)", "Pelengkap · IC BIOS"]];
    const tot = D.gejala.length;
    const c = j => D.gejala.filter(g => g.jurnal === j).length;
    const bar = `<div class="srcbar" role="img" aria-label="${SRC.map(([j, n]) => `${n}: ${c(j)} gejala`).join(", ")}">${SRC.map(([j], i) => `<span class="srcbar__seg s${i}" style="flex:${c(j)}"></span>`).join("")}</div>`;
    if (!full) return `<div class="srccard"><p class="srccard__h"><b class="num">${tot}</b> gejala dari ${SRC.length} jurnal</p>${bar}<ul class="srclegend">${SRC.map(([j, n], i) => `<li><i class="s${i}"></i>${esc(n)}<b class="num">${c(j)}</b></li>`).join("")}</ul></div>`;
    const kr = j => D.kerusakan.filter(k => k.jurnal === j).length, ru = j => D.rule.filter(x => x.jurnal === j).length;
    return `${bar}<div class="srcgrid">${SRC.map(([j, n, d], i) => `<article class="src"><i class="s${i}" aria-hidden="true"></i><b>${esc(n)}</b><span class="muted">${esc(d)}</span>
      <dl><div><dt>Kerusakan</dt><dd class="num">${kr(j)}</dd></div><div><dt>Gejala</dt><dd class="num">${c(j)}</dd></div><div><dt>Rule</dt><dd class="num">${ru(j)}</dd></div></dl></article>`).join("")}</div>`;
  }

  function pageHero({ eyebrow, title, lede = "", extra = "", aside = "", id }) {
    return `<section class="hero hero--page" aria-labelledby="${id}"><div class="wrap page-hero">
      <div><span class="eyebrow rise"><span class="dot"></span>${eyebrow}</span>
        <h1 id="${id}" class="rise" style="animation-delay:.06s">${title}</h1>
        ${lede ? `<p class="lede rise" style="animation-delay:.12s">${lede}</p>` : ""}${extra}</div>
      ${aside ? `<div class="page-hero__aside rise" style="animation-delay:.18s">${aside}</div>` : ""}
    </div></section>`;
  }

  // =====================================================================
  // DIAGNOSIS
  // =====================================================================
  const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  function hl(text, q) {
    if (!q) return esc(text);
    const i = norm(text).indexOf(norm(q));
    if (i < 0) return esc(text);
    return esc(text.slice(0, i)) + "<mark>" + esc(text.slice(i, i + q.length)) + "</mark>" + esc(text.slice(i + q.length));
  }
  function symItem(g, q) {
    const pos = selected.indexOf(g.kode);
    const on = pos >= 0;
    return `<label class="sym${on ? " is-checked" : ""}" data-sym="${g.kode}">
      <input type="checkbox" value="${g.kode}" ${on ? "checked" : ""} aria-describedby="m-${g.kode}">
      <span class="box" aria-hidden="true">${on ? pos + 1 : ""}</span>
      <span class="sym__text"><span class="code">${hl(g.kode, q)}</span><p>${hl(g.nama, q)}</p>
        ${g.badges.length ? `<span class="sym__badges">${badges(g.badges)}</span>` : ""}</span>
      <span class="sym__m" id="m-${g.kode}">m <b>${dec(DS.Frac.parse(g.m), 2)}</b></span>
    </label>`;
  }
  function catList() {
    const q = query.trim();
    const match = g => !q || norm(g.nama).includes(norm(q)) || norm(g.kode) === norm(q) || norm(g.kode).startsWith(norm(q)) && /^g\d*$/i.test(q);
    const groups = D.kategori.map(c => ({ c, items: D.gejala.filter(g => g.kategori === c.id && match(g)) }));
    const total = groups.reduce((s, x) => s + x.items.length, 0);
    if (q && !total) {
      return { total, html: `<div class="empty" role="status"><h3>Tidak ada gejala berisi “${esc(q)}”</h3>
        <p>Coba kata yang lebih umum atau kode gejala seperti G13.</p>
        <div class="row">${["layar", "baterai", "suara", "wifi", "keyboard", "hang"].map(w => `<button class="pill-chip" data-q="${w}">${w}</button>`).join("")}</div></div>` };
    }
    return {
      total, html: groups.filter(x => x.items.length).map(({ c, items }) => {
        const open = !!q || openCats.has(c.id);
        const nSel = items.filter(g => selected.includes(g.kode)).length;
        const all = D.gejala.filter(g => g.kategori === c.id).length;
        return `<section class="cat bg-${c.warna}" data-cat="${c.id}" data-open="${open}">
          <button class="cat__head" aria-expanded="${open}" aria-controls="cb-${c.id}">
            <span class="icon-btn" aria-hidden="true">${ICON[c.ikon]}</span>
            <span class="cat__title"><b>${esc(c.nama)}</b><small>${q ? `${items.length} cocok dari ${all} gejala` : `${all} gejala<span class="kn"> · ${c.kerusakan.map(k => KR[k].nama.split("/")[0]).join(", ")}</span>`}</small></span>
            <span class="cat__count" data-count="${c.id}" ${nSel ? "" : "hidden"}>${nSel} dipilih</span>
            <span class="cat__chev">${ICON.chev}</span>
          </button>
          <div class="cat__body" id="cb-${c.id}">${items.map(g => symItem(g, q)).join("")}</div>
        </section>`;
      }).join(""),
    };
  }
  function miripWarnings() {
    return MIRIP.map(grp => grp.filter(g => selected.includes(g))).filter(x => x.length >= 2);
  }
  function pickedPanel() {
    const n = selected.length;
    const warns = miripWarnings();
    return `<div class="picked__head"><div><h2 id="h-picked">Gejala terpilih</h2></div><span class="picked__n num" aria-label="${n} gejala">${n}</span></div>
      ${n ? `<ol class="picked__list" aria-labelledby="h-picked">${selected.map((g, i) => `<li class="pchip"><span class="pchip__i">${i + 1}</span><span class="code">${g}</span><span class="pchip__t" title="${esc(G[g].nama)}">${esc(G[g].nama)}</span>
        <button class="icon-btn icon-btn--sm" data-remove="${g}" aria-label="Hapus ${g}">${ICON.x}</button></li>`).join("")}</ol>`
        : `<p class="picked__empty"><b>Belum ada gejala.</b><br>Buka kelompok komponen di kiri, atau cari dengan kata seperti “baterai”. Bukti digabung sesuai urutan centang.</p>`}
      ${warns.map(w => `<div class="banner" role="note"><span class="banner__icon">${ICON.alert}</span><div><strong>Gejala mirip: ${w.join(", ")}</strong>Isinya hampir sama, jadi bukti bisa terhitung ganda. Pilih yang paling sesuai saja bila ragu.</div></div>`).join("")}
      <div class="picked__foot">
        <button class="btn btn--ink btn--lg btn--block" data-act="diagnose" ${n ? "" : "disabled"}>Diagnosis ${n ? `<span class="arrow">${ICON.arrow}</span>` : ""}</button>
        ${n ? `<button class="btn btn--ghost btn--sm btn--block" data-act="reset">${ICON.refresh} Reset</button>` : `<p class="picked__hint">Pilih minimal 1 gejala untuk mulai.</p>`}
      </div>`;
  }

  function viewDiagnosis(params) {
    if (params.has("isi")) { selected = params.get("isi").split(",").map(s => s.trim().toUpperCase()).filter(g => G[g]); saveSel(); }
    if (params.get("kat") && KAT[params.get("kat")]) openCats = new Set([params.get("kat")]);
    query = params.get("q") || "";
    const list = catList();
    const html = `
    ${pageHero({ id: "h-diag", eyebrow: "Langkah 1 dari 2", title: "Apa yang dialami laptopmu?",
      lede: "Centang semua gejala yang sesuai. Angka di kotak centang adalah urutan pemilihan — bukti digabung satu per satu sesuai urutan itu.",
      extra: `<div class="hero-examples rise" style="animation-delay:.18s"><span>Isi contoh:</span>${CONTOH.map(c => `<button class="pill-chip" data-fill="${c.join(",")}">${c.join(" + ")}</button>`).join("")}</div>`,
      aside: `<ol class="stepper"><li class="is-on"><b>1</b><span>Pilih gejala<small>${D.gejala.length} gejala · ${D.kategori.length} kelompok</small></span></li><li><b>2</b><span>Lihat hasil<small>Belief, Plausibility, solusi</small></span></li></ol>` })}
    <div class="sheet"><div class="wrap diag">
      <div>
        <div class="search" role="search">
          ${ICON.search.replace("<svg", '<svg class="lead"')}
          <label class="sr-only" for="q">Cari gejala</label>
          <input id="q" type="search" placeholder="Cari gejala, mis. baterai, layar, G13" value="${esc(query)}" autocomplete="off">
          <button class="icon-btn icon-btn--sm" data-act="clearq" aria-label="Hapus pencarian" ${query ? "" : "hidden"}>${ICON.x}</button>
        </div>
        <p class="search-meta" id="qmeta" aria-live="polite">${query ? `${list.total} gejala cocok` : `${D.gejala.length} gejala dalam ${D.kategori.length} kelompok`}</p>
        <div id="cats">${list.html}</div>
      </div>
      <aside class="picked" id="picked" aria-label="Gejala terpilih">${pickedPanel()}</aside>
    </div></div>
    <div class="mbar" id="mbar">
      <button class="mbar__count" data-act="sheet" aria-expanded="false" aria-controls="picked"><b class="num" id="mbarN">${selected.length}</b><span>gejala dipilih<br><u>lihat daftar</u></span></button>
      <button class="btn btn--lg" data-act="diagnose" ${selected.length ? "" : "disabled"}>Diagnosis</button>
    </div>`;

    function refreshAfterToggle() {
      // perbarui nomor urut kotak centang tanpa merender ulang daftar (fokus tetap)
      $$(".sym", main).forEach(el => {
        const pos = selected.indexOf(el.dataset.sym), on = pos >= 0;
        el.classList.toggle("is-checked", on);
        $("input", el).checked = on;
        $(".box", el).textContent = on ? pos + 1 : "";
      });
      D.kategori.forEach(c => {
        const el = $(`[data-count="${c.id}"]`, main); if (!el) return;
        const n = D.gejala.filter(g => g.kategori === c.id && selected.includes(g.kode)).length;
        el.hidden = !n; el.textContent = n + " dipilih";
      });
      $("#picked").innerHTML = pickedPanel();
      $("#mbarN").textContent = selected.length;
      $$("#mbar [data-act=diagnose]").forEach(b => (b.disabled = !selected.length));
      saveSel();
    }
    function rerenderList() {
      const l = catList();
      $("#cats").innerHTML = l.html;
      $("#qmeta").textContent = query ? `${l.total} gejala cocok` : `${D.gejala.length} gejala dalam ${D.kategori.length} kelompok`;
      $("[data-act=clearq]").hidden = !query;
    }

    return {
      html, mount() {
        const root = main;
        const onChange = e => {
          const t = e.target;
          if (t.matches(".sym input")) {
            const g = t.value;
            if (t.checked) { if (!selected.includes(g)) selected.push(g); }
            else selected = selected.filter(x => x !== g);
            refreshAfterToggle();
          }
        };
        const onClick = e => {
          const b = e.target.closest("button"); if (!b) return;
          if (b.matches(".cat__head")) {
            const sec = b.closest(".cat"), id = sec.dataset.cat, open = sec.dataset.open !== "true";
            sec.dataset.open = open; b.setAttribute("aria-expanded", open);
            open ? openCats.add(id) : openCats.delete(id);
            store.set("lapcare.open", [...openCats]);
          } else if (b.dataset.remove) {
            selected = selected.filter(x => x !== b.dataset.remove); refreshAfterToggle();
            toast(b.dataset.remove + " dihapus");
          } else if (b.dataset.act === "reset") { selected = []; refreshAfterToggle(); toast("Pilihan dikosongkan"); }
          else if (b.dataset.act === "diagnose" && selected.length) go("#/hasil?g=" + selected.join(","));
          else if (b.dataset.act === "clearq") { query = ""; $("#q").value = ""; rerenderList(); $("#q").focus(); }
          else if (b.dataset.q) { query = b.dataset.q; $("#q").value = query; rerenderList(); }
          else if (b.dataset.fill) {
            selected = b.dataset.fill.split(","); query = ""; $("#q").value = "";
            const cats = new Set(selected.map(g => G[g].kategori)); cats.forEach(c => openCats.add(c));
            rerenderList(); refreshAfterToggle(); toast("Contoh " + selected.join(" + ") + " dipilih");
          } else if (b.dataset.act === "sheet") {
            const p = $("#picked"), on = !p.classList.contains("is-sheet");
            p.classList.toggle("is-sheet", on); b.setAttribute("aria-expanded", on);
          }
        };
        let tq;
        const onInput = e => { if (e.target.id === "q") { clearTimeout(tq); tq = setTimeout(() => { query = e.target.value; rerenderList(); }, 90); } };
        root.addEventListener("change", onChange); root.addEventListener("click", onClick); root.addEventListener("input", onInput);
        cleanup.push(() => { root.removeEventListener("change", onChange); root.removeEventListener("click", onClick); root.removeEventListener("input", onInput); });
      },
    };
  }

  // =====================================================================
  // HASIL
  // =====================================================================
  function viewHasil(params) {
    const raw = (params.get("g") || "").split(",").map(s => s.trim().toUpperCase()).filter(Boolean);
    const sim = params.get("sim");
    const tab = params.get("tab") || "solusi";
    if (!raw.length) {
      return { html: `<section class="hero hero--page"><div class="wrap"><h1>Belum ada gejala untuk didiagnosis</h1><p class="lede">Pilih minimal satu gejala terlebih dahulu.</p><div class="home-hero__cta"><a class="btn btn--ink btn--lg" href="#/diagnosis">Pilih gejala <span class="arrow">${ICON.arrow}</span></a></div></div></section><div class="sheet"></div>` };
    }
    const unknown = raw.filter(g => !G[g]);
    const gs = raw.filter(g => G[g]);
    selected = gs.slice(); saveSel();
    let r = gs.length ? E.diagnosis(gs) : null;
    if (sim === "konflik-total" && r) r = { status: "KONFLIK_TOTAL", gejala: gs, sim: true };
    const simHigh = sim === "konflik-tinggi";
    const back = `<a class="back" href="#/diagnosis">${ICON.back} Ubah gejala</a>`;
    const chips = `<div class="res-chips"><span class="lbl">Urutan gejala:</span>${ychips(gs)}</div>`;

    if (!r || r.status === "KONFLIK_TOTAL") {
      return {
        html: `<section class="hero"><div class="wrap">${back}
          <span class="badge badge--status" style="background:var(--danger);color:#fff">KONFLIK TOTAL</span>
          <h1 style="margin-top:16px;max-width:18ch">Gejala yang dipilih sepenuhnya bertentangan.</h1>${chips}</div></section>
          <div class="sheet"><div class="wrap">
          ${r && r.sim ? simBanner("Konflik total tidak dapat terjadi dengan data saat ini: setiap gejala menyisakan massa di θ, sehingga K selalu kurang dari 1.") : ""}
          <div class="banner banner--error" role="alert"><span class="banner__icon">${ICON.alert}</span><div><strong>Konflik total (K = 1)</strong>Tidak ada massa tersisa untuk dinormalisasi, sehingga perhitungan dihentikan. ${unknown.length ? `Kode tidak dikenal: ${esc(unknown.join(", "))}.` : "Kemungkinan ada lebih dari satu kerusakan; diagnosis ulang dengan gejala yang paling menonjol saja."}</div></div>
          <div class="actions"><a class="btn btn--ink" href="#/diagnosis">Ubah gejala</a></div></div></div>`,
      };
    }

    const maxK = r.langkah.reduce((m, l) => (l.K.cmp(m) > 0 ? l.K : m), new DS.Frac(0n));
    const warns = miripWarnings();
    let heroInner = "", explain = "";

    if (r.status === "TUNGGAL") {
      const u = r.utama[0];
      explain = `Belief ${pct(u.bel)} berarti bukti dari gejala yang kamu pilih mendukung <b>${esc(KR[u.kode].nama)}</b> secara pasti sebesar ${pct(u.bel)}. Plausibility ${pct(u.pl)} adalah batas atasnya: sejauh itu kemungkinannya masih terbuka.`;
      heroInner = `<div class="res-hero">
        <div><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><span class="badge badge--status">TUNGGAL</span>${codeChip(u.kode)}<span class="badge" style="background:rgba(0,0,0,.08)">${esc(katOfK(u.kode).nama)}</span></div>
          <h1 id="h-res">${esc(KR[u.kode].nama)}</h1><p class="explain">${explain}</p></div>
        <div class="res-hero__num">${bigNum(u.bel)}<p class="belief-cap"><span>${term("Belief", "bel")}</span><span>${term("Plausibility", "pl")} <b>${pct(u.pl)}</b></span></p></div>
        <div class="res-hero__bar">${ibar(u.bel, u.pl, "ibar--lg ibar--on-yellow")}</div>
      </div>`;
    } else if (r.status === "SERI") {
      heroInner = `<span class="badge badge--status">SERI · ${r.utama.length} kandidat setara</span>
        <h1 id="h-res" style="margin-top:16px;max-width:20ch">${r.utama.length} kerusakan sama kuat.</h1>
        <p class="lede">Bukti yang ada mendukung ${r.utama.length} kerusakan dengan Belief yang persis sama (${pct(r.utama[0].bel)}). Sesuai keputusan kelompok, hasil seri tidak diputus — tambahkan gejala pembeda untuk memisahkannya.</p>
        <div class="ties">${r.utama.map(u => `<article class="tie"><div style="display:flex;justify-content:space-between;gap:8px">${codeChip(u.kode)}<span class="badge">${esc(katOfK(u.kode).nama)}</span></div>
          <h3>${esc(KR[u.kode].nama)}</h3><div>${bigNum(u.bel, "belief--sm")}<p class="belief-cap"><span>Belief</span><span class="muted">Plausibility ${pct(u.pl)}</span></p></div>${ibar(u.bel, u.pl)}</article>`).join("")}</div>`;
    } else {
      heroInner = `<span class="badge badge--status">TIDAK TUNGGAL</span>
        <h1 id="h-res" style="margin-top:16px;max-width:20ch">Belum ada satu kerusakan yang menonjol.</h1>
        <p class="lede">Gejala yang dipilih menunjuk ke kelompok kerusakan, bukan ke satu kerusakan. Belief tiap kerusakan tunggal masih 0%. Tambahkan gejala yang lebih spesifik.</p>
        <div class="ties">${r.himpunan.map(h => `<article class="tie"><span class="setlbl" style="font-size:1.25rem">${esc(h.label)}</span>
          <h3 style="font-size:1.125rem">${esc(setNames(h.mask))}</h3><div>${bigNum(h.v, "belief--sm")}<p class="belief-cap"><span>massa m${esc(h.label)}</span></p></div></article>`).join("")}</div>`;
    }

    // ---------- banners ----------
    const bannerList = [];
    if (sim === "konflik-tinggi") bannerList.push(simBanner(`Dengan data saat ini K tidak pernah mencapai 0,9 karena K < m(g) ≤ 0,9. K tertinggi pada kombinasi ini ${dec(maxK)}. Banner di bawah ditampilkan untuk pratinjau.`));
    if (r.konflikTinggi || simHigh) bannerList.push(`<div class="banner banner--warn" role="alert"><span class="banner__icon">${ICON.alert}</span><div><strong>Konflik tinggi (K ≥ 0,9)</strong>Gejala yang dipilih saling bertentangan; kemungkinan ada lebih dari satu kerusakan.</div></div>`);
    if (unknown.length) bannerList.push(`<div class="banner banner--warn"><span class="banner__icon">${ICON.alert}</span><div><strong>Kode tidak dikenal diabaikan</strong>${esc(unknown.join(", "))}</div></div>`);
    warns.forEach(w => bannerList.push(`<div class="banner banner--warn"><span class="banner__icon">${ICON.alert}</span><div><strong>Gejala mirip: ${w.join(", ")}</strong>Bukti bisa terhitung ganda, sehingga Belief tampak lebih tinggi dari seharusnya.</div></div>`));

    // ---------- saran pembeda ----------
    const saran = r.saran.length ? `<section class="section card card--surface" aria-labelledby="h-saran" style="background:var(--sky)">
      <div class="section__head" style="margin-bottom:14px"><div><h2 id="h-saran">Tambahkan gejala untuk membedakan</h2><p style="color:#1d3a3b">Gejala ini belum dipilih dan hanya menunjuk satu kandidat. Pilih yang memang dialami, hasil dihitung ulang langsung.</p></div></div>
      <div class="suggest">${r.saran.map(s => `<div class="suggest__item"><div>${codeChip(s.kode)}<b>${esc(s.nama)}</b><small>menunjuk ${s.untuk} ${esc(KR[s.untuk].nama)} · m ${dec(s.m, 2)}</small></div>
        <button class="btn btn--ink btn--sm" data-add="${s.kode}" aria-label="Tambahkan ${s.kode}">${ICON.plus}<span>Tambah</span></button></div>`).join("")}</div></section>` : "";

    // ---------- kandidat ----------
    const topCodes = new Set(r.utama.map(u => u.kode));
    const cands = `<section class="section" aria-labelledby="h-cand">
      <div class="section__head"><div><h2 id="h-cand">Kandidat kerusakan</h2><p>Kerusakan dengan Plausibility di atas m(θ) = ${dec(r.mTheta)}, maksimal 5, diurutkan menurut Belief lalu Plausibility.</p></div>
        <div class="legend"><span><i class="l-bel"></i>${term("Belief", "bel")}</span><span><i class="l-pl"></i>Ruang ketidakpastian sampai ${term("Plausibility", "pl")}</span></div></div>
      <div class="axis" aria-hidden="true"><div></div><div><span>0%</span><span>50%</span><span>100%</span></div><div></div></div>
      <div class="cands">${r.kandidat.length ? r.kandidat.map(c => `<div class="cand${topCodes.has(c.kode) ? " is-top" : ""}">
        <div class="cand__name">${codeChip(c.kode, topCodes.has(c.kode) ? "" : "code--light")}<span>${esc(c.nama)}<small>${esc(katOfK(c.kode).nama)}</small></span></div>
        ${ibar(c.bel, c.pl)}
        <div class="cand__vals num"><b>${pct(c.bel)}</b> <span class="muted">→ ${pct(c.pl)}</span></div></div>`).join("")
        : `<p class="muted">Tidak ada kerusakan dengan Plausibility di atas m(θ).</p>`}</div>
    </section>`;

    // ---------- jejak konflik ----------
    const trace = `<section class="section" aria-labelledby="h-trace">
      <div class="section__head"><div><h2 id="h-trace">Konflik ${term("K", "k")} tiap langkah</h2><p>Bukti digabung sesuai urutan pemilihan, dimulai dari m(θ) = 1.</p></div></div>
      <div class="trace">${r.langkah.map((l, i) => `<div class="trace__step"><div class="top"><span>Langkah ${i + 1}</span>${codeChip(l.g, "code--soft")}</div>
        <b class="num">K = ${dec(l.K)}</b><div class="kbar"><i style="width:${Number(l.K) * 100}%"></i></div></div>`).join("")}
        <div class="trace__step is-theta"><div class="top"><span>Akhir</span><span>${term("θ", "theta")}</span></div><b class="num">m(θ) = ${dec(r.mTheta)}</b></div></div>
    </section>`;

    // ---------- tab panels ----------
    const solHTML = solusiPanel(r);
    const tabs = [["solusi", "Solusi"], ["langkah", "Langkah Perhitungan"], ["pendukung", "Gejala Pendukung"]];
    const panels = { solusi: solHTML, langkah: `<div id="calcPanel">${calcPanel(r)}</div>`, pendukung: pendukungPanel(r) };
    const tabsHTML = `<section class="section" aria-label="Rincian hasil">
      <div class="tabs" role="tablist">${tabs.map(([id, t]) => `<button role="tab" id="tab-${id}" aria-controls="p-${id}" aria-selected="${tab === id}" tabindex="${tab === id ? 0 : -1}" data-tab="${id}">${t}</button>`).join("")}</div>
      ${tabs.map(([id, t]) => `<details class="acc${tab === id ? " is-active" : ""}" id="p-${id}" role="tabpanel" aria-labelledby="tab-${id}" ${tab === id ? "open" : ""}><summary>${t}</summary><div class="acc__body">${panels[id]}</div></details>`).join("")}
    </section>`;

    const html = `
    <section class="hero" aria-labelledby="h-res"><div class="wrap">${back}${heroInner}${chips}</div></section>
    <div class="sheet"><div class="wrap">
      ${bannerList.length ? `<div class="banners">${bannerList.join("")}</div>` : ""}
      ${saran}${cands}${trace}${tabsHTML}
      <div class="actions">
        <button class="btn btn--ink" data-act="print">${ICON.printer} Cetak / Simpan PDF</button>
        <a class="btn" href="#/diagnosis">Ubah gejala</a>
        <button class="btn btn--ghost" data-act="new">${ICON.refresh} Diagnosis baru</button>
      </div>
    </div></div>`;

    return {
      html, mount() {
        countUp(); growBars();
        const root = main;
        const selectTab = id => {
          $$(".tabs [role=tab]", root).forEach(b => { const on = b.dataset.tab === id; b.setAttribute("aria-selected", on); b.tabIndex = on ? 0 : -1; });
          $$("details.acc", root).forEach(d => { const on = d.id === "p-" + id; d.classList.toggle("is-active", on); if (on) d.open = true; });
          history.replaceState(null, "", "#/hasil?g=" + gs.join(",") + (sim ? "&sim=" + sim : "") + (id !== "solusi" ? "&tab=" + id : ""));
        };
        const onClick = e => {
          const b = e.target.closest("button"); if (!b) return;
          if (b.dataset.tab) selectTab(b.dataset.tab);
          else if (b.dataset.add) { toast(b.dataset.add + " ditambahkan, menghitung ulang…"); go("#/hasil?g=" + [...gs, b.dataset.add].join(",")); }
          else if (b.dataset.act === "print") { $$("details.acc", root).forEach(d => (d.open = true)); window.print(); }
          else if (b.dataset.act === "new") { selected = []; saveSel(); go("#/diagnosis"); }
          else if (b.dataset.num) {
            numMode = b.dataset.num; store.set("lapcare.num", numMode);
            $("#calcPanel").innerHTML = calcPanel(r);
          }
        };
        const onKey = e => {
          if (!e.target.matches(".tabs [role=tab]")) return;
          const list = $$(".tabs [role=tab]", root), i = list.indexOf(e.target);
          let j = null;
          if (e.key === "ArrowRight") j = (i + 1) % list.length; else if (e.key === "ArrowLeft") j = (i - 1 + list.length) % list.length;
          if (j != null) { e.preventDefault(); list[j].focus(); selectTab(list[j].dataset.tab); }
        };
        root.addEventListener("click", onClick); root.addEventListener("keydown", onKey);
        cleanup.push(() => { root.removeEventListener("click", onClick); root.removeEventListener("keydown", onKey); });
        if (params.get("tab")) setTimeout(() => $(".tabs", root)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }), 350);
      },
    };
  }

  function simBanner(text) {
    return `<div class="banner banner--sim"><span class="banner__icon">${ICON.layers}</span><div><strong>Mode pratinjau state</strong>${text}</div></div>`;
  }

  function solusiCard(k) {
    const s = SOL[k];
    return `<article class="sol">
      <div class="sol__head"><div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">${codeChip(k)}<h3>${esc(KR[k].nama)}</h3></div>
        <span class="badge badge--status" style="background:${s.tingkat === "TEKNISI" ? "var(--peach)" : "var(--mint)"}">${esc(TINGKAT[s.tingkat] || s.tingkat)}</span></div>
      <div class="sol__cols">
        <div class="sol__col"><h4><span class="icon-btn" aria-hidden="true">${ICON.hand}</span>Dicoba sendiri</h4>${s.sendiri.length ? `<ol>${s.sendiri.map(x => `<li><span>${esc(x)}</span></li>`).join("")}</ol>` : `<p class="muted">Tidak ada langkah mandiri.</p>`}</div>
        <div class="sol__col"><h4><span class="icon-btn" aria-hidden="true">${ICON.wrench}</span>Oleh teknisi</h4>${s.teknisi.length ? `<ol>${s.teknisi.map(x => `<li><span>${esc(x)}</span></li>`).join("")}</ol>` : `<p class="muted">—</p>`}</div>
      </div>
    </article>`;
  }
  function solusiPanel(r) {
    if (r.status === "TIDAK_TUNGGAL") {
      return `<div class="empty"><h3>Solusi muncul setelah satu kerusakan menonjol</h3><p>Saat ini bukti masih menunjuk kelompok ${r.himpunan.map(h => esc(h.label)).join(" dan ")}. Tambahkan gejala pembeda di atas, lalu solusi akan tampil di sini.</p></div>`;
    }
    return `<div class="sol-grid">${r.utama.map(u => solusiCard(u.kode)).join("")}</div><div style="margin-top:16px">${SAFETY}</div>`;
  }

  function calcPanel(r) {
    const L = E.label;
    const toggle = `<div class="section__head" style="margin-bottom:16px"><p style="margin:0">Setiap langkah menggabungkan massa sebelumnya dengan satu gejala baru. Irisan kosong (∅) adalah konflik.</p>
      <div class="numtoggle" role="group" aria-label="Format angka"><button data-num="desimal" aria-pressed="${numMode === "desimal"}">Desimal 4 digit</button><button data-num="pecahan" aria-pressed="${numMode === "pecahan"}">Pecahan eksak</button></div></div>`;
    const steps = r.langkah.map((l, i) => {
      const hl_ = L(l.H);
      const sorted = m => [...m].sort((a, b) => b[1].cmp(a[1]));
      return `<article class="calc-step">
        <header class="calc-step__head"><span class="calc-step__no">${i + 1}</span><div>
          <h3>Gabungkan ${l.g} — ${esc(G[l.g].nama)}</h3>
          <p><b class="setlbl">m${esc(hl_)} = ${num(l.mg)}</b> &nbsp;·&nbsp; <b class="setlbl">m(θ) = ${num(new DS.Frac(1n).sub(l.mg))}</b></p></div></header>
        <div class="calc-step__body">
          <div class="tscroll"><table class="t">
            <thead><tr><th>Massa sebelumnya</th><th>Gejala ${l.g}</th><th>Irisan</th><th class="r">Hasil kali</th></tr></thead>
            <tbody>${l.sel.map(s => `<tr class="${s.konflik ? "is-conflict" : ""}">
              <td><span class="setlbl">${esc(L(s.A))}</span> = ${num(s.a)}</td>
              <td><span class="setlbl">${esc(L(s.B))}</span> = ${num(s.b)}</td>
              <td>${s.konflik ? `<span class="tag-conf">${ICON.alert}∅ konflik</span>` : `<span class="setlbl">${esc(L(s.C))}</span>`}</td>
              <td class="r num"><b>${num(s.v)}</b></td></tr>`).join("")}</tbody>
          </table></div>
          <div class="kline"><div class="k"><small>Konflik K</small><b class="num">${num(l.K)}</b></div><div><small>Penyebut 1 − K</small><b class="num">${num(l.penyebut)}</b></div></div>
          <div class="masslist">
            <div><h4>Sebelum normalisasi</h4><ul>${[...l.sebelumNorm].map(([A, v]) => `<li><span class="setlbl">${esc(L(A))}</span><b>${num(v)}</b></li>`).join("")}</ul></div>
            <div class="after"><h4>Sesudah normalisasi (÷ ${num(l.penyebut)})</h4><ul>${sorted(l.sesudah).map(([A, v]) => `<li><span class="setlbl">m${A === E.THETA ? "(θ)" : esc(L(A))}</span><b>${num(v)}</b></li>`).join("")}</ul></div>
          </div>
        </div></article>`;
    }).join("");
    return toggle + `<div class="calc"><div class="calc-start">${ICON.info.replace("<svg", '<svg width="22" height="22"')}<span>Mulai: belum ada bukti, seluruh massa pada θ → <b>m(θ) = 1</b></span></div>${steps}</div>`;
  }

  function pendukungPanel(r) {
    const focus = r.status === "TIDAK_TUNGGAL" ? [...new Set(r.himpunan.flatMap(h => h.anggota))] : r.utama.map(u => u.kode);
    const fm = E.maskDari(focus);
    const dukung = r.gejala.filter(g => E.H[g] & fm), lain = r.gejala.filter(g => !(E.H[g] & fm));
    const rules = D.rule.filter(x => focus.includes(x.kerusakan)).map(x => ({ ...x, hit: x.gejala.filter(g => r.gejala.includes(g)) }))
      .filter(x => x.hit.length).sort((a, b) => b.hit.length / b.jumlah - a.hit.length / a.jumlah);
    const li = g => `<li>${codeChip(g)}<div><b>${esc(G[g].nama)}</b><div class="muted" style="font-size:.875rem">m ${dec(E.M[g], 2)} · menunjuk <span class="setlbl">${esc(E.label(E.H[g]))}</span></div></div></li>`;
    return `<div class="support">
      <div class="card"><h3 style="font-size:1.25rem;margin-bottom:14px">Gejala yang mendukung ${focus.length === 1 ? esc(KR[focus[0]].nama) : "kandidat"}</h3>
        ${dukung.length ? `<ul>${dukung.map(li).join("")}</ul>` : `<p class="muted">Tidak ada.</p>`}
        ${lain.length ? `<h4 style="font-size:1rem;margin:20px 0 10px">Gejala lain yang dipilih</h4><ul>${lain.map(li).join("")}</ul>` : ""}</div>
      <div class="card"><h3 style="font-size:1.25rem;margin-bottom:14px">Rule yang terpenuhi</h3>
        ${rules.length ? `<ul>${rules.map(x => `<li style="display:block"><div style="display:flex;justify-content:space-between;gap:12px"><span><b>${x.no}</b> terpenuhi ${x.hit.length} dari ${x.jumlah} gejala → ${x.kerusakan} ${esc(KR[x.kerusakan].nama)}</span><span class="muted num">${Math.round(x.hit.length / x.jumlah * 100)}%</span></div>
          <div class="rulebar"><i style="width:${x.hit.length / x.jumlah * 100}%"></i></div>
          <div class="muted" style="font-size:.8125rem;margin-top:6px">${x.gejala.map(g => r.gejala.includes(g) ? `<b style="color:#000">${g}</b>` : g).join(" · ")} · ${esc(x.sumber)}</div></li>`).join("")}</ul>` : `<p class="muted">Belum ada rule yang terpenuhi.</p>`}</div>
    </div>`;
  }

  // =====================================================================
  // BASIS PENGETAHUAN
  // =====================================================================
  function viewKB(params) {
    if (["kerusakan", "gejala", "rule", "solusi"].includes(params.get("tab"))) kb.tab = params.get("tab");
    const SRC = ["Semua", "Saragih", "Arifin", "Hilda"];
    const per = ["Saragih", "Arifin", "Hilda"];
    const count = (arr, f) => per.map(s => arr.filter(x => f(x) === s).length);
    const rel = D.relasi.map(x => ({ jurnal: /Saragih/.test(x.sumber) ? "Saragih" : /Arifin/.test(x.sumber) ? "Arifin" : "Hilda" }));
    const sumRows = [["Kerusakan", count(D.kerusakan, x => x.jurnal)], ["Gejala", count(D.gejala, x => x.jurnal)], ["Rule", count(D.rule, x => x.jurnal)], ["Relasi gejala–kerusakan", count(rel, x => x.jurnal)]];
    const TABS = [["kerusakan", "Kerusakan", D.kerusakan.length], ["gejala", "Gejala", D.gejala.length], ["rule", "Rule", D.rule.length], ["solusi", "Solusi", D.solusi.length]];

    const html = `
    ${pageHero({ id: "h-kbp", eyebrow: "Basis pengetahuan", title: "Setiap angka punya sumber.",
      lede: "Data dibaca dari 6 berkas CSV yang sama dengan notebook. Gejala dengan catatan konflik relasi atau kemiripan diberi tanda.", aside: srcBar(false) })}
    <div class="sheet"><div class="wrap">
      <section class="section" aria-labelledby="h-sum">
        <div class="section__head"><div><h2 id="h-sum">Jumlah data per sumber</h2></div></div>
        <div class="tscroll sumtab"><table class="t"><thead><tr><th>Jenis data</th><th class="r">Saragih dkk. (2018)</th><th class="r">Arifin &amp; Norhikmah (2024)</th><th class="r">Hilda dkk. (2023)</th><th class="r">Total</th></tr></thead>
          <tbody>${sumRows.map(([n, c]) => `<tr><td><b>${n}</b></td>${c.map(v => `<td class="r num">${v}</td>`).join("")}<td class="r num"><b>${c.reduce((a, b) => a + b, 0)}</b></td></tr>`).join("")}</tbody></table></div>
      </section>
      <section class="section" aria-label="Tabel data">
        <div class="tabs tabs--kb" role="tablist">${TABS.map(([id, t, n]) => `<button role="tab" data-kbtab="${id}" aria-selected="${kb.tab === id}">${t} <span class="muted">${n}</span></button>`).join("")}</div>
        <div class="kb-tools">
          <div class="search" role="search">${ICON.search.replace("<svg", '<svg class="lead"')}<label class="sr-only" for="kbq">Cari data</label><input id="kbq" type="search" placeholder="Cari kode, nama, atau catatan" value="${esc(kb.q)}"></div>
          <div class="seg" role="group" aria-label="Filter sumber">${SRC.map(s => `<button data-src="${s}" aria-pressed="${kb.src === s}">${s}</button>`).join("")}</div>
        </div>
        <p class="kb-count" id="kbcount" aria-live="polite"></p>
        <div id="kbtable"></div>
      </section>
    </div></div>`;

    function table() {
      const q = norm(kb.q.trim());
      const srcOk = x => kb.src === "Semua" || x.jurnal === kb.src || (x.sumber && x.sumber.includes(kb.src));
      const hit = s => !q || norm(s).includes(q);
      let rows, head, body;
      if (kb.tab === "kerusakan") {
        rows = D.kerusakan.filter(k => srcOk(k) && hit(k.kode + " " + k.nama + " " + k.sumber));
        head = ["Kode", "Kerusakan", "Kelompok", "Gejala terkait", "Penanganan", "Sumber"];
        body = rows.map(k => `<tr><td data-l="Kode">${codeChip(k.kode)}</td><td data-l="Kerusakan"><b>${esc(k.nama)}</b></td><td data-l="Kelompok">${esc(katOfK(k.kode).nama)}</td>
          <td data-l="Gejala terkait" class="num">${D.relasi.filter(x => x.k === k.kode).length}</td><td data-l="Penanganan">${esc(TINGKAT[SOL[k.kode].tingkat])}</td><td data-l="Sumber" class="muted">${esc(k.sumber)}</td></tr>`);
      } else if (kb.tab === "gejala") {
        rows = D.gejala.filter(g => srcOk(g) && hit(g.kode + " " + g.nama + " " + g.catatan + " " + g.pembanding));
        head = ["Kode", "Gejala", "m", "Menunjuk", "Pembanding jurnal lain", "Catatan", "Sumber"];
        body = rows.map(g => `<tr><td data-l="Kode">${codeChip(g.kode)}</td><td data-l="Gejala">${esc(g.nama)}</td><td data-l="m" class="num"><b>${dec(E.M[g.kode], 2)}</b></td>
          <td data-l="Menunjuk"><span class="setlbl">${esc(E.label(E.H[g.kode]))}</span></td><td data-l="Pembanding" class="muted">${esc(g.pembanding) || "—"}</td>
          <td data-l="Catatan">${g.badges.length ? `<span class="sym__badges" style="margin:0">${badges(g.badges)}</span>` : ""}${g.catatan ? `<small class="note">${esc(g.catatan)}</small>` : (g.badges.length ? "" : "—")}</td>
          <td data-l="Sumber" class="muted">${esc(g.sumber)}</td></tr>`);
      } else if (kb.tab === "rule") {
        rows = D.rule.filter(x => srcOk(x) && hit(x.no + " " + x.gejala.join(" ") + " " + x.kerusakan + " " + KR[x.kerusakan].nama + " " + x.catatan));
        head = ["Rule", "Jika gejala", "Maka kerusakan", "Sumber", "Catatan"];
        body = rows.map(x => `<tr><td data-l="Rule"><b>${x.no}</b></td><td data-l="Jika gejala"><span style="display:flex;gap:4px;flex-wrap:wrap">${x.gejala.map(g => `<span class="code code--light" title="${esc(G[g].nama)}">${g}</span>`).join("")}</span></td>
          <td data-l="Maka">${codeChip(x.kerusakan)} ${esc(KR[x.kerusakan].nama)}</td><td data-l="Sumber" class="muted">${esc(x.sumber)}</td><td data-l="Catatan" class="muted">${esc(x.catatan) || "—"}</td></tr>`);
      } else {
        rows = D.solusi.filter(s => (kb.src === "Semua" || KR[s.kode].jurnal === kb.src) && hit(s.kode + " " + s.nama + " " + s.sendiri.join(" ") + " " + s.teknisi.join(" ")));
        head = ["Kode", "Kerusakan", "Penanganan", "Dicoba sendiri", "Oleh teknisi", "Sumber"];
        body = rows.map(s => `<tr><td data-l="Kode">${codeChip(s.kode)}</td><td data-l="Kerusakan"><b>${esc(s.nama)}</b></td><td data-l="Penanganan">${esc(TINGKAT[s.tingkat])}</td>
          <td data-l="Dicoba sendiri"><ol style="margin:0;padding-left:18px">${s.sendiri.map(x => `<li>${esc(x)}</li>`).join("")}</ol></td>
          <td data-l="Oleh teknisi"><ol style="margin:0;padding-left:18px">${s.teknisi.map(x => `<li>${esc(x)}</li>`).join("")}</ol></td><td data-l="Sumber" class="muted">${esc(s.sumber)}</td></tr>`);
      }
      $("#kbcount").textContent = `${rows.length} baris ditampilkan`;
      $("#kbtable").innerHTML = rows.length
        ? `<div class="tscroll"><table class="t cards"><thead><tr>${head.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${body.join("")}</tbody></table></div>`
        : `<div class="empty"><h3>Tidak ada data yang cocok</h3><p>Ubah kata pencarian atau filter sumber.</p></div>`;
    }

    return {
      html, mount() {
        table();
        const root = main;
        const onClick = e => {
          const b = e.target.closest("button"); if (!b) return;
          if (b.dataset.kbtab) { kb.tab = b.dataset.kbtab; $$("[data-kbtab]").forEach(x => x.setAttribute("aria-selected", x === b)); table(); }
          if (b.dataset.src) { kb.src = b.dataset.src; $$("[data-src]").forEach(x => x.setAttribute("aria-pressed", x === b)); table(); }
        };
        const onInput = e => { if (e.target.id === "kbq") { kb.q = e.target.value; table(); } };
        root.addEventListener("click", onClick); root.addEventListener("input", onInput);
        cleanup.push(() => { root.removeEventListener("click", onClick); root.removeEventListener("input", onInput); });
      },
    };
  }

  // =====================================================================
  // PENGUJIAN
  // =====================================================================
  function viewPengujian(params) {
    const sim = params.get("sim") === "gagal";
    const kasus = sim ? D.kasus.map(c => (c.id === "KU03" ? { ...c, massa: "K4=0.7;THETA=0.3" } : c)) : D.kasus;
    const t0 = performance.now();
    const hasil = E.ujiKasus(kasus);
    const ms = performance.now() - t0;
    const ok = hasil.filter(h => h.cocok).length, all = hasil.length;
    const massStr = m => [...m].map(([A, v]) => `<span style="white-space:nowrap"><span class="setlbl">${esc(E.label(A))}</span> = ${dec(v)}</span>`).join("<br>");
    const diagLbl = d => d === "TIDAK_TUNGGAL" ? "Tidak tunggal" : d === "SERI" ? "Seri" : `${d} ${esc(KR[d]?.nama || "")}`;

    const ACUAN = [
      { g: ["G1", "G2"], k: ["0", "0"], txt: "K1 IC VGA — Bel 0,5000, Pl 1,0000", check: r => r.status === "TUNGGAL" && r.utama[0].kode === "K1" && dec(r.utama[0].bel) === "0,5000" && dec(r.utama[0].pl) === "1,0000" },
      { g: ["G13", "G49"], k: ["0", "0,56"], txt: "K15 Pemutar CD/DVD — Bel 0,5455, Pl 0,6818", check: r => r.status === "TUNGGAL" && r.utama[0].kode === "K15" && dec(r.utama[0].bel) === "0,5455" && dec(r.utama[0].pl) === "0,6818" },
      { g: ["G9", "G6", "G55"], k: ["0", "0,64", "0,7111"], txt: "SERI K3, K4, K17 — Bel 0,3077", check: r => r.status === "SERI" && r.utama.map(u => u.kode).join() === "K3,K4,K17" && dec(r.utama[0].bel) === "0,3077" },
      { g: ["G1", "G5"], k: ["0", "0,36"], txt: "TIDAK TUNGGAL — {K1, K2} 0,375 dan {K3, K4, K10} 0,375", check: r => r.status === "TIDAK_TUNGGAL" && r.himpunan.length === 2 && r.himpunan.every(h => dec(h.v, 3) === "0,375") },
    ].map(a => {
      const r = E.diagnosis(a.g);
      const kGot = r.langkah.map(l => dec(l.K).replace(/,?0+$/, "") || "0");
      return { ...a, r, kGot, cocok: a.check(r) && kGot.join(";") === a.k.join(";") };
    });

    const states = [
      ["Hasil · TUNGGAL", "G13 + G49", "#/hasil?g=G13,G49"],
      ["Hasil · SERI 2 kandidat", "G9 + G49", "#/hasil?g=G9,G49"],
      ["Hasil · SERI 3 kandidat", "G9 + G6 + G55", "#/hasil?g=G9,G6,G55"],
      ["Hasil · TIDAK TUNGGAL", "G1 + G5", "#/hasil?g=G1,G5"],
      ["Hasil · KONFLIK TINGGI", "pratinjau, K nyata 0,8982", "#/hasil?g=G26,G22,G58,G56&sim=konflik-tinggi"],
      ["Hasil · konflik total", "pratinjau", "#/hasil?g=G13,G49&sim=konflik-total"],
      ["Diagnosis · kosong", "0 gejala, tombol nonaktif", "#/diagnosis?isi="],
      ["Diagnosis · 1 gejala", "G9", "#/diagnosis?isi=G9&kat=layar"],
      ["Diagnosis · banyak gejala", "12 gejala, panel bisa digulir", "#/diagnosis?isi=G21,G22,G23,G24,G25,G26,G58,G61,G35,G55,G56,G57"],
      ["Diagnosis · tanpa hasil cari", "kata “printer”", "#/diagnosis?q=printer"],
      ["Diagnosis · gejala mirip", "G4 + G53 + G54", "#/diagnosis?isi=G4,G53,G54&kat=daya"],
      ["Pengujian · ada yang tidak cocok", "pratinjau", "#/pengujian?sim=gagal"],
      ["Umum · data gagal dimuat", "pratinjau", "#/pengujian?sim=data-gagal"],
    ];

    const html = `
    <section class="hero hero--page" aria-labelledby="h-uji"><div class="wrap page-hero">
      <div><span class="eyebrow rise"><span class="dot"></span>Pengujian otomatis · dijalankan saat halaman dibuka</span>
        <h1 id="h-uji" class="sr-only">Pengujian</h1>
        <div class="score rise ${ok === all ? "" : "is-fail"}" style="animation-delay:.06s"><b class="num">${ok}<span class="dec">/${all}</span></b><span>kasus uji ${ok === all ? "cocok dengan hitungan acuan" : "cocok — periksa baris yang ditandai"}</span></div></div>
      <div class="page-hero__aside rise" style="animation-delay:.14s"><div class="srccard">
        <p class="srccard__h"><b class="num">${ACUAN.filter(a => a.cocok).length}/${ACUAN.length}</b> contoh acuan notebook cocok</p>
        <ul class="srclegend"><li><i class="s0"></i>Waktu menjalankan uji<b class="num">${ms.toFixed(1).replace(".", ",")} ms</b></li><li><i class="s1"></i>Toleransi selisih massa<b class="num">1/200</b></li><li><i class="s2"></i>Aritmetika<b>pecahan eksak</b></li></ul></div></div>
    </div></section>
    <div class="sheet"><div class="wrap">
      ${sim ? simBanner("Ekspektasi KU03 diubah sementara menjadi K4 = 0,7 untuk menampilkan status Tidak cocok. Data asli tidak berubah.") + "<div style='height:24px'></div>" : ""}
      <section class="section" aria-labelledby="h-ku">
        <div class="section__head"><div><h2 id="h-ku">Kasus uji · kasus_uji.csv</h2><p>Massa hasil dianggap cocok bila himpunannya sama dan selisih tiap nilai kurang dari 1/200, sama seperti sel uji di notebook. Diagnosis juga harus sama.</p></div></div>
        <div class="tscroll"><table class="t cards">
          <thead><tr><th>Kasus</th><th>Gejala</th><th>Massa diharapkan</th><th>Massa hasil</th><th>Diagnosis</th><th>Status</th><th></th></tr></thead>
          <tbody>${hasil.map(h => `<tr>
            <td data-l="Kasus"><b>${h.kasus.id}</b><small class="note">${esc(h.kasus.sumber)}</small></td>
            <td data-l="Gejala"><span style="display:flex;gap:4px;flex-wrap:wrap">${h.kasus.gejala.map(g => `<span class="code code--light" title="${esc(G[g].nama)}">${g}</span>`).join("")}</span></td>
            <td data-l="Massa diharapkan" class="num">${massStr(h.harap)}</td>
            <td data-l="Massa hasil" class="num">${h.hasil.massa ? massStr([...h.hasil.massa].sort((a, b) => b[1].cmp(a[1]))) : "—"}</td>
            <td data-l="Diagnosis">${diagLbl(h.diag)}${h.diagOk ? "" : `<small class="note">CSV: ${esc(h.kasus.diagnosis)}</small>`}</td>
            <td data-l="Status">${h.cocok ? `<span class="badge badge--ok">${ICON.check} Cocok</span>` : `<span class="badge badge--fail">${ICON.x} Tidak cocok</span>`}</td>
            <td><a class="btn btn--sm" href="#/hasil?g=${h.kasus.gejala.join(",")}&tab=langkah">Langkah</a></td></tr>`).join("")}</tbody>
        </table></div>
      </section>
      <section class="section" aria-labelledby="h-acuan">
        <div class="section__head"><div><h2 id="h-acuan">Contoh acuan dari notebook</h2><p>Empat contoh di PRD 5.4, termasuk nilai K pada tiap langkah.</p></div></div>
        <div class="tscroll"><table class="t cards">
          <thead><tr><th>Gejala</th><th>K per langkah (acuan)</th><th>K per langkah (web app)</th><th>Hasil yang harus muncul</th><th>Status</th><th></th></tr></thead>
          <tbody>${ACUAN.map(a => `<tr><td data-l="Gejala"><b>${a.g.join(", ")}</b></td><td data-l="K acuan" class="num">${a.k.join("; ")}</td><td data-l="K web app" class="num">${a.kGot.join("; ")}</td>
            <td data-l="Hasil">${esc(a.txt)}</td><td data-l="Status">${a.cocok ? `<span class="badge badge--ok">${ICON.check} Cocok</span>` : `<span class="badge badge--fail">${ICON.x} Tidak cocok</span>`}</td>
            <td><a class="btn btn--sm" href="#/hasil?g=${a.g.join(",")}">Buka</a></td></tr>`).join("")}</tbody>
        </table></div>
      </section>
      <section class="section" aria-labelledby="h-state">
        <div class="section__head"><div><h2 id="h-state">Pratinjau state</h2><p>Semua state di PRD 7.3. Catatan: konflik tinggi (K ≥ 0,9) dan konflik total tidak dapat terjadi dengan data saat ini, karena K selalu lebih kecil dari m gejala baru (maksimal 0,9). Keduanya tetap didesain dan ditampilkan sebagai pratinjau.</p></div></div>
        <div class="preview-grid">${states.map(([t, s, h]) => `<a class="preview" href="${h}"><b>${t}</b><span>${s}</span></a>`).join("")}</div>
      </section>
    </div></div>`;
    return { html };
  }

  // =====================================================================
  // METODE
  // =====================================================================
  function viewMetode() {
    const r = E.diagnosis(["G13", "G49"]);
    const l2 = r.langkah[1];
    const u = r.utama[0];
    const secs = [["konsep", "θ dan fungsi densitas"], ["kombinasi", "Kombinasi Dempster"], ["belpl", "Belief & Plausibility"], ["contoh", "Contoh kecil"], ["keputusan", "Aturan keputusan"], ["batas", "Keterbatasan"], ["pustaka", "Daftar pustaka"]];
    const html = `
    ${pageHero({ id: "h-met", eyebrow: "Tentang metode", title: "Dari gejala sampai keyakinan.",
      lede: "Dempster-Shafer tidak memaksa bukti menunjuk satu jawaban. Bukti boleh menunjuk sekelompok kerusakan, dan bagian yang belum diketahui tetap dicatat sebagai ketidakpastian.",
      aside: `<div class="formula formula--hero">m<sub>3</sub>(Z) = <span class="frac"><span>Σ<sub>X∩Y=Z</sub> m<sub>1</sub>(X)·m<sub>2</sub>(Y)</span><span>1 − K</span></span><small>Aturan kombinasi Dempster</small></div>` })}
    <div class="sheet"><div class="wrap method">
      <nav class="toc" aria-label="Isi halaman">${secs.map(([id, t]) => `<a href="#/metode" data-jump="${id}">${t}</a>`).join("")}</nav>
      <article class="article">
        <h2 id="s-konsep">θ dan fungsi densitas m</h2>
        <p><b>θ (theta)</b> adalah ruang pembicaraan: himpunan seluruh ${D.kerusakan.length} kerusakan. Setiap gejala <i>g</i> memberi massa <b>m(g)</b> pada himpunan kerusakan yang ditunjuknya, H(g), yaitu semua kerusakan yang berelasi dengan gejala itu di tabel relasi. Sisa massanya diberikan ke θ sebagai tanda “belum tahu”.</p>
        <div class="formula">m<sub>g</sub>(H(g)) = m(g) &nbsp;&nbsp;&nbsp; m<sub>g</sub>(θ) = 1 − m(g)<small>Contoh: G1 menunjuk {K1, K2} dengan m = 0,6, sehingga m({K1, K2}) = 0,6 dan m(θ) = 0,4.</small></div>
        <p>Perhitungan dimulai dari m(θ) = 1, artinya belum ada bukti sama sekali, lalu digabung dengan gejala satu per satu sesuai urutan pemilihan.</p>

        <h2 id="s-kombinasi">Aturan kombinasi Dempster</h2>
        <p>Dua fungsi massa digabung dengan mengalikan setiap pasangan himpunan dan menjumlahkan hasil kali yang irisannya sama. Pasangan yang irisannya kosong (∅) disebut <b>konflik</b>, dan jumlahnya adalah <b>K</b>.</p>
        <div class="formula">m<sub>3</sub>(Z) = <span class="frac"><span>Σ<sub>X ∩ Y = Z</sub> m<sub>1</sub>(X) · m<sub>2</sub>(Y)</span><span>1 − K</span></span>
          &nbsp;&nbsp;&nbsp; K = Σ<sub>X ∩ Y = ∅</sub> m<sub>1</sub>(X) · m<sub>2</sub>(Y)<small>Pembagian dengan 1 − K adalah normalisasi: massa konflik dibuang, sisanya diskalakan agar jumlahnya kembali 1.</small></div>
        <p>Aturan ini komutatif dan asosiatif, sehingga hasil akhir tidak bergantung pada urutan gejala. Urutan hanya menentukan langkah perhitungan yang ditampilkan.</p>

        <h2 id="s-belpl">Belief dan Plausibility</h2>
        <div class="formula">Bel(k) = m({k}) &nbsp;&nbsp;&nbsp; Pl(k) = Σ<sub>A ∋ k</sub> m(A)<small>Belief hanya menghitung massa yang menunjuk tepat ke k. Plausibility menjumlahkan semua massa yang masih memuat k, termasuk θ.</small></div>
        <p>Selisih Pl − Bel adalah ruang ketidakpastian. Di halaman hasil, bagian padat batang menunjukkan Belief, dan bagian bergaris sampai Plausibility menunjukkan ketidakpastian itu.</p>

        <h2 id="s-contoh">Contoh kecil: G13 lalu G49</h2>
        <p>G13 (${esc(G.G13.nama.toLowerCase())}) memberi m({K5}) = 0,7. G49 (${esc(G.G49.nama.toLowerCase())}) memberi m({K15}) = 0,8. Kedua himpunan tidak beririsan, sehingga sebagian massa menjadi konflik.</p>
        <div class="tscroll" style="margin:18px 0"><table class="t"><thead><tr><th>Massa sebelumnya</th><th>Gejala G49</th><th>Irisan</th><th class="r">Hasil kali</th></tr></thead>
          <tbody>${l2.sel.map(s => `<tr class="${s.konflik ? "is-conflict" : ""}"><td><span class="setlbl">${esc(E.label(s.A))}</span> = ${dec(s.a, 2)}</td><td><span class="setlbl">${esc(E.label(s.B))}</span> = ${dec(s.b, 2)}</td><td>${s.konflik ? `<span class="tag-conf">${ICON.alert}∅ konflik</span>` : `<span class="setlbl">${esc(E.label(s.C))}</span>`}</td><td class="r num"><b>${dec(s.v, 2)}</b></td></tr>`).join("")}</tbody></table></div>
        <p>K = ${dec(l2.K, 2)}, jadi penyebutnya 1 − K = ${dec(l2.penyebut, 2)}. Setelah normalisasi: m({K15}) = 0,24 / 0,44 = <b>${l2.sesudah.get(E.bit.K15).toString()}</b> ≈ ${dec(u.bel)}, m({K5}) = ${l2.sesudah.get(E.bit.K5).toString()} ≈ ${dec(l2.sesudah.get(E.bit.K5))}, dan m(θ) = ${r.mTheta.toString()} ≈ ${dec(r.mTheta)}.</p>
        <p>Hasilnya: <b>Pemutar CD/DVD</b> dengan Belief ${pct(u.bel)} dan Plausibility ${pct(u.pl)}. <a href="#/hasil?g=G13,G49&tab=langkah">Lihat di halaman hasil →</a></p>

        <h2 id="s-keputusan">Aturan keputusan</h2>
        <div class="tscroll"><table class="t cards"><thead><tr><th>Status</th><th>Kondisi</th><th>Yang ditampilkan</th></tr></thead><tbody>
          <tr><td data-l="Status"><span class="badge badge--status">TUNGGAL</span></td><td data-l="Kondisi">Satu kerusakan memiliki Belief tertinggi dan Belief &gt; 0</td><td data-l="Tampilan">Kartu hasil utama dan solusi</td></tr>
          <tr><td data-l="Status"><span class="badge badge--status">SERI</span></td><td data-l="Kondisi">Dua atau lebih kerusakan memiliki Belief tertinggi yang sama dan &gt; 0</td><td data-l="Tampilan">Kandidat setara, solusi masing-masing, saran gejala pembeda. Seri tidak diputus.</td></tr>
          <tr><td data-l="Status"><span class="badge badge--status">TIDAK TUNGGAL</span></td><td data-l="Kondisi">Tidak ada kerusakan tunggal dengan Belief &gt; 0</td><td data-l="Tampilan">Himpunan kandidat dan saran gejala</td></tr>
          <tr><td data-l="Status"><span class="badge badge--konflik">KONFLIK TINGGI</span></td><td data-l="Kondisi">K ≥ 0,9 di salah satu langkah</td><td data-l="Tampilan">Banner peringatan di atas hasil</td></tr>
        </tbody></table></div>

        <h2 id="s-batas">Keterbatasan</h2>
        <ul>
          <li>Diagnosis belum diuji dengan kasus servis nyata. Pengujian baru membandingkan hasil dengan hitungan manual dan contoh di jurnal.</li>
          <li>Nilai m dan relasi diambil dari tiga jurnal. Untuk G4, G6, dan G55 jurnal-jurnal itu menunjuk kerusakan yang berbeda; himpunan dari sumber utama dipertahankan dan konfliknya dicatat di Basis Pengetahuan.</li>
          <li>Beberapa gejala bermakna mirip (G4, G53, G54). Bila dicentang bersama, bukti bisa terhitung ganda.</li>
          <li>G55 “Laptop macet/hang” dipetakan ke Processor Overheat sesuai rule Arifin &amp; Norhikmah (2024). Hilda dkk. (2023) memetakannya ke Harddisk, RAM, dan VGA; pemetaan {K1, K7, K10, K17} dicatat sebagai pengembangan berikutnya.</li>
          <li>Dengan nilai m maksimal 0,9, K tidak pernah mencapai 0,9, sehingga peringatan konflik tinggi tidak akan muncul pada data saat ini.</li>
          <li>Langkah solusi disusun kelompok dari pengetahuan umum perbaikan laptop.</li>
        </ul>

        <h2 id="s-pustaka">Daftar pustaka dan kelompok</h2>
        <ol class="refs">
          <li><b>Saragih dkk. (2018).</b> Sumber utama: 15 kerusakan (K1–K15), 52 gejala (G1–G52) beserta nilai m, 15 rule, dan contoh perhitungan yang dipakai untuk kasus uji KU01–KU02.</li>
          <li><b>Arifin &amp; Norhikmah (2024).</b> Pelengkap: Mainboard (K16), Processor Overheat (K17), gejala G53–G58, dan rule R16–R19.</li>
          <li><b>Hilda dkk. (2023).</b> Pelengkap: IC BIOS (K18), gejala G59–G67, rule R20–R26, serta nilai pembanding untuk gejala Saragih.</li>
        </ol>
        <div class="team">
          <div><b>Komang Indra Pradnya</b>2308561114</div>
          <div><b>Jevan Bernard Kaloko</b>2308561078</div>
        </div>
        <p style="margin-top:14px" class="muted">Kelompok 2 · Pengantar Komputasi Lunak · Informatika Universitas Udayana</p>
      </article>
    </div></div>`;
    return {
      html, mount() {
        const onClick = e => {
          const a = e.target.closest("[data-jump]"); if (!a) return;
          e.preventDefault();
          $("#s-" + a.dataset.jump).scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
        };
        main.addEventListener("click", onClick);
        const io = new IntersectionObserver(es => es.forEach(en => {
          if (en.isIntersecting) $$(".toc a").forEach(a => a.classList.toggle("is-on", "s-" + a.dataset.jump === en.target.id));
        }), { rootMargin: "-30% 0px -60% 0px" });
        $$(".article h2[id]").forEach(h => io.observe(h));
        cleanup.push(() => { main.removeEventListener("click", onClick); io.disconnect(); });
      },
    };
  }

  function viewNotFound() {
    return { html: `${pageHero({ id: "h-404", eyebrow: "Galat 404", title: "Halaman ini tidak ada di basis pengetahuan.", lede: "Tautannya mungkin salah ketik. Mulai lagi dari beranda atau langsung diagnosis." })}
      <div class="sheet"><div class="wrap"><div class="actions" style="margin-top:0"><a class="btn btn--ink btn--lg" href="#/diagnosis">Mulai Diagnosis <span class="arrow">${ICON.arrow}</span></a><a class="btn btn--lg" href="#/">Ke beranda</a></div></div></div>` };
  }

  // =====================================================================
  // DATA GAGAL DIMUAT
  // =====================================================================
  function viewDataError() {
    return {
      html: `<section class="hero hero--page"><div class="wrap"><span class="eyebrow"><span class="dot"></span>Galat</span><h1 style="margin-top:14px">Data basis pengetahuan gagal dimuat.</h1></div></section>
      <div class="sheet"><div class="wrap">
        <div class="banner banner--error" role="alert"><span class="banner__icon">${ICON.alert}</span><div><strong>Berkas js/data.js tidak ditemukan atau rusak</strong>Diagnosis tidak bisa dijalankan tanpa basis pengetahuan. Jalankan <code>node scripts/build-data.js</code> untuk membuat ulang data dari CSV, lalu muat ulang halaman.</div></div>
        <div class="actions"><button class="btn btn--ink" onclick="location.hash='#/';location.reload()">${ICON.refresh} Muat ulang</button></div>
      </div></div>`,
    };
  }

  // ---------- Global ----------
  const drawer = $("#drawer"), menuBtn = $("#menuBtn");
  function closeDrawer() { drawer.classList.remove("is-open"); menuBtn.setAttribute("aria-expanded", "false"); }
  menuBtn.addEventListener("click", () => { drawer.classList.add("is-open"); menuBtn.setAttribute("aria-expanded", "true"); $("#drawerClose").focus(); });
  $("#drawerClose").addEventListener("click", () => { closeDrawer(); menuBtn.focus(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && drawer.classList.contains("is-open")) { closeDrawer(); menuBtn.focus(); } });
  $(".skip").addEventListener("click", e => { e.preventDefault(); main.focus(); });
  const topbar = $("#topbar");
  addEventListener("scroll", () => topbar.classList.toggle("is-scrolled", scrollY > 8), { passive: true });
  if (D && E) {
    const u = E.ujiKasus(D.kasus), okN = u.filter(x => x.cocok).length;
    $$("[data-f]").forEach(el => {
      const k = el.dataset.f;
      el.textContent = k === "uji" ? `${okN}/${u.length} uji cocok` : k === "k" ? D.kerusakan.length : k === "g" ? D.gejala.length : k === "r" ? D.rule.length : k === "s" ? D.solusi.length
        : k === "data" ? "Data dibangun " + new Date(D.dibuat).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : el.textContent;
    });
  }
  $("#toTop").addEventListener("click", () => { window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }); main.focus({ preventScroll: true }); });
  addEventListener("hashchange", render);
  render();
})();
