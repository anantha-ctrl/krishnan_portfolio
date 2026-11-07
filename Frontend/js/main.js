/* Shared script for all pages. Each block runs only if its elements exist on the page. */
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];

/* theme */
try { document.documentElement.dataset.theme = localStorage.getItem("theme") || THEME; } catch(e) { document.documentElement.dataset.theme = THEME; }
$("#th").onclick = () => { const t = document.documentElement.dataset.theme === "dark" ? "light" : "dark"; document.documentElement.dataset.theme = t; try { localStorage.setItem("theme", t); } catch(e){} };

/* nav: mobile menu + active page */
$("#mb").onclick = e => { const o = $("#nl").classList.toggle("o"); e.currentTarget.setAttribute("aria-expanded", o); };
const page = location.pathname.split("/").pop() || "index.html";
$$("#nl a").forEach(a => { if (a.getAttribute("href") === page) a.setAttribute("aria-current", "page"); a.onclick = () => $("#nl").classList.remove("o"); });

/* generated content */
if ($("#facts")) $("#facts").innerHTML = FACTS.map(f => `<div class="rv"><b>${f[0]}</b><span>${f[1]}</span></div>`).join("");
if ($("#mq")) $("#mq").innerHTML = Array(2).fill(MARQUEE.map(m => m + "<i>•</i>").join("").repeat(3)).join("");
if ($("#tg")) $("#tg").innerHTML = TOOLS.map(t => `<div class="tl rv"><header><i>${t[0]}</i><h3>${t[1]}</h3><span class="pc">${t[2]}%</span></header><div class="bar" role="progressbar" aria-valuenow="${t[2]}" aria-valuemin="0" aria-valuemax="100" aria-label="${t[1]} skill level"><u data-w="${t[2]}"></u></div></div>`).join("");
if ($("#sv2")) $("#sv2").innerHTML = SERVICES.map((s,i) => `<article class="sc2 rv"><b>0${i+1}</b><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="${s[2]}"/></svg><h3>${s[0]}</h3><p>${s[1]}</p></article>`).join("");

/* reveal */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); e.target.querySelectorAll("[data-w]").forEach(u => u.style.width = u.dataset.w + "%"); io.unobserve(e.target); } }), {threshold:.15});
$$(".rv").forEach(el => io.observe(el));

/* cursor */
const cu = $("#cu"), fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
function hov() { if (!fine) return; $$("a,button,.card").forEach(el => { if (el.dataset.hv) return; el.dataset.hv = 1;
  el.addEventListener("mouseenter", () => { cu.classList.add("h"); cu.textContent = el.classList.contains("card") ? "PLAY" : ""; });
  el.addEventListener("mouseleave", () => { cu.classList.remove("h"); cu.textContent = ""; }); }); }
if (fine) addEventListener("mousemove", e => { cu.style.transform = `translate(${e.clientX - 6}px,${e.clientY - 6}px)`; });

/* hero parallax */
if (fine && $("#pn")) $("#pn").addEventListener("mousemove", e => { const r = e.currentTarget.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5; e.currentTarget.querySelector("img").style.transform = `translateX(${x * 14}px)`; });

/* link helper: turns YouTube / Drive / Vimeo / Instagram links into embeds; anything else is treated as a video file */
function media(url) {
  if (!url) return null;
  url = url.trim(); let m;
  if (m = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/)) return {iframe:`https://www.youtube.com/embed/${m[1]}?rel=0&modestbranding=1`};
  if (m = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:.*&)?id=)([\w-]+)/)) return {iframe:`https://drive.google.com/file/d/${m[1]}/preview`};
  if (m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)) return {iframe:`https://player.vimeo.com/video/${m[1]}`};
  if (m = url.match(/instagram\.com\/(?:[\w.]+\/)?(?:reel|reels|p|tv)\/([\w-]+)/)) return {iframe:`https://www.instagram.com/reel/${m[1]}/embed`};
  return {video:url};
}
const IFR_ALLOW = "autoplay; encrypted-media; picture-in-picture; fullscreen";

/* showreel */
const SR = media(SHOWREEL_SRC);
const YT_ID = SR && SR.iframe && (SR.iframe.match(/youtube\.com\/embed\/([\w-]{11})/) || [])[1];
const P_START = Math.max(0, +PREVIEW_START || 0), P_LEN = Math.max(1, +PREVIEW_LENGTH || 3);
const fullIframe = src => `<iframe src="${src}" title="Showreel" allow="${IFR_ALLOW}" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe>`;
if ($("#vp") && YT_ID) {
  /* YouTube: muted 2-3 sec preview loop; click = full video with sound */
  const vp = $("#vp");
  vp.innerHTML = `<iframe class="ytp" id="ytp" src="https://www.youtube.com/embed/${YT_ID}?autoplay=1&mute=1&controls=0&disablekb=1&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&start=${P_START}" title="Showreel preview" allow="autoplay; encrypted-media" tabindex="-1" aria-hidden="true"></iframe>
    <button class="bp" id="bp" aria-label="Play full showreel"><svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4v16l14-8z"/></svg></button>
    <span class="pvt">Click to watch full video</span>`;
  vp.classList.add("prev");
  const yt = $("#ytp"), cmd = (func, args = []) => yt.contentWindow && yt.contentWindow.postMessage(JSON.stringify({event:"command", func, args}), "*");
  yt.onload = () => { cmd("mute"); cmd("playVideo"); };
  const loop = setInterval(() => { cmd("seekTo", [P_START, true]); cmd("playVideo"); }, P_LEN * 1000);
  vp.onclick = () => { clearInterval(loop); vp.classList.remove("prev");
    vp.innerHTML = fullIframe(`https://www.youtube.com/embed/${YT_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`); vp.onclick = null; };
  fine && vp.addEventListener("mouseenter", () => { cu.classList.add("h"); cu.textContent = "PLAY"; });
  fine && vp.addEventListener("mouseleave", () => { cu.classList.remove("h"); cu.textContent = ""; });
} else if ($("#vp") && SR && SR.iframe) {
  $("#vp").innerHTML = fullIframe(SR.iframe);
} else if ($("#vp")) {
  const SHOWREEL_SRC = SR ? SR.video : "";
  if (!SHOWREEL_SRC) $("#vp").classList.add("empty");
  const v = $("#sv"), vp = $("#vp"), fmt = s => isFinite(s) ? Math.floor(s/60) + ":" + String(Math.floor(s%60)).padStart(2,"0") : "0:00";
  if (SHOWREEL_SRC) { v.src = SHOWREEL_SRC; if (SHOWREEL_POSTER) v.poster = SHOWREEL_POSTER; $("#shph").style.display = "none";
    new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) v.pause(); else if (v.muted && v.paused && !v.dataset.user && !matchMedia("(prefers-reduced-motion:reduce)").matches) v.play().catch(()=>{}); }), {threshold:.5}).observe(vp); }
  const tgl = () => { if (!SHOWREEL_SRC) return; v.dataset.user = 1; v.paused ? v.play() : v.pause(); };
  $("#bp").onclick = () => { if (SHOWREEL_SRC) { v.muted = false; $("#mu").textContent = "🔊"; } tgl(); }; $("#pp").onclick = tgl;
  v.onplay = () => { vp.classList.add("pl"); $("#pp").textContent = "❚❚"; }; v.onpause = () => { vp.classList.remove("pl"); $("#pp").textContent = "▶"; };
  v.ontimeupdate = () => { if (!v.dataset.user && (v.currentTime < P_START || v.currentTime >= P_START + P_LEN)) v.currentTime = P_START; $("#sk").value = v.duration ? v.currentTime / v.duration * 100 : 0; $("#tm").textContent = fmt(v.currentTime) + " / " + fmt(v.duration); };
  $("#sk").oninput = e => { if (v.duration) v.currentTime = e.target.value / 100 * v.duration; };
  $("#mu").onclick = e => { v.muted = !v.muted; e.currentTarget.textContent = v.muted ? "🔇" : "🔊"; };
  $("#fs").onclick = () => document.fullscreenElement ? document.exitFullscreen() : (vp.requestFullscreen || vp.webkitRequestFullscreen).call(vp);
  v.onclick = tgl;
  vp.addEventListener("keydown", e => { if (e.target.tagName === "INPUT") return; if (e.key === " " || e.key === "k") { e.preventDefault(); tgl(); } if (e.key === "m") $("#mu").click(); if (e.key === "f") $("#fs").click(); });
}

/* projects + modal */
if ($("#pg")) {
  let cur = new URLSearchParams(location.search).get("f") || "all";
  if (!FILTERS.some(f => f[0] === cur)) cur = "all";
  /* convert links to embeds + find an automatic cover image for each */
  P.forEach(p => { const m = media(p.embed || p.src); if (!m || !m.iframe) return; p.embed = m.iframe; p.src = "";
    let x;
    if (x = m.iframe.match(/youtube\.com\/embed\/([\w-]{11})/)) p.autoCover = `https://img.youtube.com/vi/${x[1]}/hqdefault.jpg`;
    else if (x = m.iframe.match(/drive\.google\.com\/file\/d\/([\w-]+)/)) p.autoCover = `https://drive.google.com/thumbnail?id=${x[1]}&sz=w800`;
    else if (x = m.iframe.match(/player\.vimeo\.com\/video\/(\d+)/)) p.autoCover = `https://vumbnail.com/${x[1]}.jpg`;
    else if (/instagram\.com/.test(m.iframe)) p.ig = true; });
  /* if a cover image fails to load, fall back to a neat placeholder */
  window.coverFail = img => { img.outerHTML = `<div class="em" style="border-style:solid">▶ Play</div>`; };
  const live = p => p.src || p.embed || (p.type === "thumb" && p.poster);
  const play = '<span class="pb"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4v16l14-8z"/></svg></span>';
  const lz = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.preload = "metadata"; e.target.src = e.target.dataset.src; lz.unobserve(e.target); } }), {rootMargin:"200px"});
  const render = () => {
    const list = P.map((p,i) => [p,i]).filter(([p]) => !p.hidden && (cur === "all" || p.type === cur) && (SHOW_EMPTY_PLACEHOLDERS || live(p)));
    $("#pg").innerHTML = list.length ? list.map(([p,i]) => {
      const r = p.type === "youtube" || p.type === "thumb" ? "r169" : "r916";
      const media = !live(p) ? '<div class="em">Coming soon</div>'
        : (p.poster || p.autoCover) ? `<img src="${p.poster || p.autoCover}" alt="${p.title}" loading="lazy" referrerpolicy="no-referrer" onerror="coverFail(this)">`
        : p.src ? `<video data-src="${p.src}#t=0.5" muted playsinline preload="none" aria-hidden="true"></video>`
        : p.ig ? `<iframe class="igp" src="${p.embed}" loading="lazy" scrolling="no" tabindex="-1" aria-hidden="true" title="${p.title} preview"></iframe>`
      : `<div class="em" style="border-style:solid">▶ Play</div>`;
      return `<${live(p) ? "button" : "div"} class="card ${r}" ${live(p) ? `data-i="${i}" aria-label="Play ${p.title}"` : ""}><div class="th">${media}${live(p) && p.type !== "thumb" ? play : ""}</div><h3>${p.title}</h3><small>${p.cat}</small>${p.desc && live(p) ? `<p>${p.desc}</p>` : ""}</${live(p) ? "button" : "div"}>`;
    }).join("") : '<p class="none">Nothing here yet.</p>';
    $$("#pg video[data-src]").forEach(el => lz.observe(el));
    $$("#pg [data-i]").forEach(c => { c.onclick = () => openM(P[c.dataset.i]);
      const vd = c.querySelector("video"); if (vd) { c.addEventListener("mouseenter", () => { vd.src ||= vd.dataset.src; vd.play().catch(()=>{}); }); c.addEventListener("mouseleave", () => vd.pause()); } });
    hov();
  };
  $("#fb").innerHTML = FILTERS.map(f => `<button data-f="${f[0]}" aria-pressed="${f[0] === cur}">${f[1]}</button>`).join("");
  $$("#fb button").forEach(b => b.onclick = () => { cur = b.dataset.f; $$("#fb button").forEach(x => x.setAttribute("aria-pressed", x === b)); render(); });

  let last;
  const openM = p => {
    last = document.activeElement;
    const cls = p.type === "reel" || p.type === "short" ? "v916" : "v169";
    $("#mc").innerHTML = p.type === "thumb" ? `<img src="${p.poster}" alt="${p.title}">`
      : p.embed ? `<iframe class="${cls}" src="${p.embed}" title="${p.title}" allow="${IFR_ALLOW}" allowfullscreen></iframe>`
      : `<video class="${cls}" src="${p.src}" poster="${p.poster || ""}" controls autoplay playsinline></video>`;
    $("#md").classList.add("o"); document.body.style.overflow = "hidden"; $("#cl").focus();
  };
  const closeM = () => { $("#md").classList.remove("o"); $("#mc").innerHTML = ""; document.body.style.overflow = ""; last && last.focus(); };
  $("#cl").onclick = closeM; $("#md").onclick = e => { if (e.target.id === "md") closeM(); };
  document.addEventListener("keydown", e => { if (!$("#md").classList.contains("o")) return; if (e.key === "Escape") closeM(); if (e.key === "Tab") { e.preventDefault(); $("#cl").focus(); } });
  render();
}

/* copy email */
const toast = m => { const t = $("#toast"); t.textContent = m; t.classList.add("o"); setTimeout(() => t.classList.remove("o"), 2200); };
if ($("#cp")) $("#cp").onclick = async () => { try { await navigator.clipboard.writeText(EMAIL); toast("Email copied!"); } catch(e) { prompt("Copy this email:", EMAIL); } };

hov();
