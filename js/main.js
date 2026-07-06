/* Zahnarztpraxis Dr. Loggen — Interaktionen, Einwilligung, Geräteerkennung */
(function () {
  "use strict";

  /* ============================================================
     GERÄTE- & BROWSER-ERKENNUNG
     Setzt Klassen auf <html>, z. B.:
       device-phone / device-tablet / device-desktop
       os-ios / os-android / os-windows / os-macos / os-linux
       browser-chrome / -safari / -firefox / -edge / -samsung / -opera
       input-touch / input-mouse
     Funktioniert markenübergreifend (Apple, Samsung, Huawei, Xiaomi,
     Google, Microsoft …), da über User-Agent + Bildschirm + Eingabeart
     kombiniert erkannt wird. Das Layout selbst bleibt responsiv
     (CSS-Breakpoints) — die Klassen erlauben gezielte Feinanpassungen.
     ============================================================ */
  var d = document.documentElement;
  var ua = navigator.userAgent || "";
  var touch = ("ontouchstart" in window) || navigator.maxTouchPoints > 0;

  // Betriebssystem
  var os = "other";
  if (/iPhone|iPod/.test(ua)) os = "ios";
  else if (/iPad/.test(ua) || (/Macintosh/.test(ua) && touch)) os = "ios"; // iPadOS meldet sich als Mac
  else if (/Android/.test(ua)) os = "android";
  else if (/Windows/.test(ua)) os = "windows";
  else if (/Macintosh|Mac OS X/.test(ua)) os = "macos";
  else if (/Linux/.test(ua)) os = "linux";

  // Gerätetyp (unabhängig von der Marke)
  var minSide = Math.min(screen.width, screen.height);
  var device;
  if (/iPad/.test(ua) || (/Macintosh/.test(ua) && touch)) device = "tablet";
  else if (/Android/.test(ua) && !/Mobile/.test(ua)) device = "tablet";
  else if (/Tablet|PlayBook|Silk/.test(ua)) device = "tablet";
  else if (/iPhone|iPod|Android.*Mobile|Windows Phone|Mobi/.test(ua)) device = "phone";
  else if (touch && minSide < 600) device = "phone";
  else if (touch && minSide < 1000) device = "tablet";
  else device = "desktop";

  // Browser (Reihenfolge wichtig, da sich Browser gegenseitig imitieren)
  var browser = "other";
  if (/SamsungBrowser/.test(ua)) browser = "samsung";
  else if (/Edg\//.test(ua)) browser = "edge";
  else if (/OPR\/|Opera/.test(ua)) browser = "opera";
  else if (/Firefox\//.test(ua)) browser = "firefox";
  else if (/Chrome\//.test(ua)) browser = "chrome";
  else if (/Safari\//.test(ua)) browser = "safari";

  d.classList.add("device-" + device, "os-" + os, "browser-" + browser,
                  touch ? "input-touch" : "input-mouse");

  /* ============================================================
     EINWILLIGUNG (Cookies & externe Dienste)
     Wird EINMAL gespeichert und gilt für alle Seiten:
     localStorage + Cookie (1 Jahr) als doppelte Absicherung —
     so bleibt die Auswahl auch erhalten, wenn einer der beiden
     Speicher nicht verfügbar ist (z. B. lokales Testen per file://).
     ============================================================ */
  var CONSENT_KEY = "loggen-consent"; // "all" | "essential"
  var externalLoaded = false;

  function readCookie(name) {
    var m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
    return m ? decodeURIComponent(m[1]) : null;
  }
  function getConsent() {
    var v = null;
    try { v = localStorage.getItem(CONSENT_KEY); } catch (e) {}
    if (!v) v = readCookie(CONSENT_KEY);
    return v === "all" || v === "essential" ? v : null;
  }
  function setConsent(v) {
    try { localStorage.setItem(CONSENT_KEY, v); } catch (e) {}
    try {
      document.cookie = CONSENT_KEY + "=" + v +
        "; max-age=31536000; path=/; SameSite=Lax";
    } catch (e) {}
  }

  /* Externe Dienste erst NACH Einwilligung laden:
     Google Fonts (Schriftarten) + Dr. Flex (Terminbuchung) */
  function loadExternal(cb) {
    if (externalLoaded) { if (cb) cb(); return; }
    externalLoaded = true;

    var fonts = document.createElement("link");
    fonts.rel = "stylesheet";
    fonts.href = "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700&family=Instrument+Sans:wght@400;500;600&display=swap";
    document.head.appendChild(fonts);

    var flex = document.createElement("script");
    flex.src = "https://dr-flex.de/embed.js?medicalPracticeId=59903";
    flex.async = true;
    if (cb) flex.onload = cb;
    document.head.appendChild(flex);
  }

  var banner = document.getElementById("consent");
  function showBanner(attention) {
    if (!banner) return;
    banner.hidden = false;
    if (attention) banner.classList.add("attention");
  }
  function hideBanner() {
    if (!banner) return;
    banner.hidden = true;
    banner.classList.remove("attention");
  }
  window.openConsent = function () { showBanner(false); return false; };

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-consent]");
    if (!t) return;
    var mode = t.getAttribute("data-consent");
    setConsent(mode);
    hideBanner();
    if (mode === "all") loadExternal();
  });

  var stored = getConsent();
  if (stored === "all") { loadExternal(); }
  else if (!stored) { showBanner(false); } // nur beim allerersten Besuch

  /* ---------- Mobile Navigation ---------- */
  var burger = document.querySelector(".burger");
  var panel = document.querySelector(".nav-panel");
  function closeNav() {
    if (!panel) return;
    panel.classList.remove("open");
    if (burger) burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  if (burger && panel) {
    burger.addEventListener("click", function () {
      var open = panel.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    panel.addEventListener("click", function (e) {
      if (e.target.closest("a") || e.target.closest(".panel-close")) closeNav();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1080) closeNav();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------- Sanftes Einblenden beim Scrollen ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Dr. Flex Terminbuchung ---------- */
  function openBooking() {
    if (typeof window.toggleDrFlexAppointments === "function") {
      window.toggleDrFlexAppointments();
      return;
    }
    if (getConsent() === "all") {
      loadExternal(function () {
        if (typeof window.toggleDrFlexAppointments === "function") {
          window.toggleDrFlexAppointments();
        }
      });
    } else {
      showBanner(true); // Hinweis: Für Online-Buchung "Alle akzeptieren"
    }
  }
  document.querySelectorAll("[data-booking]").forEach(function (btn) {
    btn.addEventListener("click", function (e) { e.preventDefault(); openBooking(); });
  });

  /* ---------- Google Maps: Zwei-Klick-Lösung (DSGVO) ---------- */
  var mapBtn = document.getElementById("load-map");
  if (mapBtn) {
    mapBtn.addEventListener("click", function () {
      var wrap = document.getElementById("map-wrap");
      var iframe = document.createElement("iframe");
      iframe.src = "https://maps.google.com/maps?q=Zahnarztpraxis+Dr.+Frank+Loggen,+Zur+Rudolfsh%C3%B6he+2,+49143+Bissendorf&output=embed&z=15";
      iframe.title = "Anfahrt Zahnarztpraxis Dr. Frank Loggen";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.allowFullscreen = true;
      wrap.innerHTML = "";
      wrap.appendChild(iframe);
    });
  }

  /* ---------- Lightbox: Galerie-Bilder groß ansehen ----------
     Funktioniert per Klick (PC), Tippen & Wischen (Handy/Tablet)
     und Tastatur (Pfeiltasten, Escape). */
  var gals = Array.prototype.slice.call(document.querySelectorAll(".gal"));
  var items = gals.map(function (g) {
    var img = g.querySelector("img");
    var cap = g.querySelector(".gal-cap");
    return img ? { src: img.getAttribute("src"), alt: img.alt || "", cap: cap ? cap.textContent : "" } : null;
  }).filter(Boolean);

  if (items.length) {
    var lb = document.createElement("div");
    lb.className = "lb";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-label", "Bildansicht");
    lb.innerHTML =
      '<button class="lb-close" aria-label="Schließen">✕</button>' +
      '<button class="lb-prev" aria-label="Vorheriges Bild">‹</button>' +
      '<img alt="">' +
      '<button class="lb-next" aria-label="Nächstes Bild">›</button>' +
      '<div class="lb-cap"></div><div class="lb-count"></div>';
    document.body.appendChild(lb);

    var lbImg = lb.querySelector("img");
    var lbCap = lb.querySelector(".lb-cap");
    var lbCount = lb.querySelector(".lb-count");
    var idx = 0;

    function render() {
      var it = items[idx];
      lbImg.src = it.src; lbImg.alt = it.alt || it.cap;
      lbCap.textContent = it.cap;
      lbCount.textContent = (idx + 1) + " / " + items.length;
    }
    function openLb(i) { idx = i; render(); lb.classList.add("open"); document.body.style.overflow = "hidden"; }
    function closeLb() { lb.classList.remove("open"); document.body.style.overflow = ""; }
    function step(n) { idx = (idx + n + items.length) % items.length; render(); }

    gals.forEach(function (g, i) {
      g.setAttribute("role", "button");
      g.setAttribute("tabindex", "0");
      g.setAttribute("aria-label", "Bild vergrößern");
      g.addEventListener("click", function () { openLb(i); });
      g.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLb(i); }
      });
    });

    lb.querySelector(".lb-close").addEventListener("click", closeLb);
    lb.querySelector(".lb-prev").addEventListener("click", function () { step(-1); });
    lb.querySelector(".lb-next").addEventListener("click", function () { step(1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });

    /* Wischgesten auf Touch-Geräten */
    var sx = null;
    lb.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 45) step(dx > 0 ? -1 : 1);
      sx = null;
    }, { passive: true });
  }
})();
