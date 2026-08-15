# Webseite Zahnarztpraxis Dr. Loggen — Anleitung (Stand v12)

Statische HTML-Seite: kein WordPress, keine Datenbank. Responsiv für Handy,
Tablet, PC (iPhone, iPad, Android, Mac, Windows) mit automatischer Geräte-/
Browser-Erkennung.

## 1. Bilder — alle lokal in `img/`

Die Seite lädt **ausschließlich Bilder aus dem Ordner `img/`** — keine
externen Quellen, keine Abhängigkeit von der alten Webseite (die bald offline
geht). Aktuell im Paket:

- Echte Fotos: `praxis-loggen-haus-01.jpg` (Praxisschild),
  `praxis-loggen-behandlung-03c.jpg` (3D-Intraoralscan-Station),
  `leistungen-dvt.jpg` (DVT-Gerät), `dr-frank-loggen-portrait.jpg` (Porträt),
  `hero-strahlend3.jpg` (Startmotiv, KI-generiert), `logo.png`.
- **Noch Platzhalter (blaue Kacheln mit Zahn):** `praxis-loggen-01.jpg`
  (Empfang), `praxis-loggen-02.jpg` (Wartebereich), `praxis-loggen-03.jpg`
  (Zertifikate), `praxis-loggen-behandlung-01.jpg`, `-02a.jpg`, `-02b.jpg`,
  `-03a.jpg`, `-03b.jpg` (Kunst).
  → **Bitte die Originalfotos aus dem alten Webseiten-Ordner (oder vom
  Webdesigner / aus dem alten IONOS-Webspace unter /img/) unter genau
  diesen Dateinamen in `img/` ablegen.** Die Seite zeigt sie dann sofort.
- Neue Fotos: mind. 1600 px Breite, JPG 80–85 % (z. B. via squoosh.app).

## 2. Logo & Farben

- Logo eingebaut: `img/logo.png` (freigestellt). Farben zentral in
  `css/style.css` unter `:root` (Logo-Hellblau `--sky: #A0C6F3`,
  Logo-Dunkel `--ink: #1C1B22`).

## 3. Probetest über GitHub Pages

1. github.com → „+" → „New repository" → Name z. B. `dr-loggen-test` → Public.
2. „uploading an existing file" → ALLE Dateien/Ordner hochladen (inkl. `.nojekyll`).
3. Settings → Pages → Branch `main`, Ordner `/ (root)` → Save.
4. Nach 1–2 Min: `https://IHR-NAME.github.io/dr-loggen-test/`
Immer über diesen Link testen (nicht per Doppelklick als Datei öffnen), sonst
blockieren Browser Speicher & Skripte. Nach Updates: Strg+F5 (Cache).

## 4. Upload zu IONOS

- Hosting → Webspace: alle Dateien ins Web-Hauptverzeichnis der Domain laden.
  Oder per SFTP (FileZilla; Zugangsdaten unter „SFTP & SSH").
- SSL/HTTPS unter „Domains & SSL" der Domain zuweisen.

## 5. Dr. Flex & Cookie-Banner

Terminbuchung eingebunden (Praxis-ID 59903). Cookie-Banner beim ersten Besuch:
Erst nach „Alle akzeptieren" laden Google Fonts + Dr.-Flex-Skript. Auswahl wird
EINMAL gespeichert (localStorage + Cookie, 1 Jahr) und gilt für alle Seiten;
änderbar über „Cookie-Einstellungen" im Footer.

## 6. Noch offen

- Impressum: Kammer-/Aufsichtsangaben ergänzen (gelb markiert).
- Datenschutz: Vorlage rechtlich prüfen lassen.
- Optional: Google Fonts lokal einbinden (gwfh.mranftl.com), dann Fonts-Punkt
  aus Banner/Datenschutz entfernen.

## Umgesetzte Punkte (alle Notizen & Wünsche)

- ✅ Lachgassedierung & Patienten-Shuttle komplett entfernt
- ✅ Freitag 8–14 Uhr überall
- ✅ Echtes Logo mittig, Navigation links/rechts (8 Punkte, Jobs in einer
     Reihe) mit Hover-Animationen; obere Leiste entfernt
- ✅ Farben auf das Logo abgestimmt (Hellblau als Hauptfarbe)
- ✅ Jobs → Karriere-Landingpage; Bewerbungslink auch im Footer
- ✅ Praxis-Impressionen als eigene Seite, geordnet in 3 Kategorien,
     Bilder per Lightbox anklickbar (Wischen auf dem Handy)
- ✅ Leistung „Abdruckfreie Praxis — 3D-Intraoralscan für ZE und Schienen"
     als Top-Leistung mit lizenzfreier Illustration
- ✅ Dr. Flex auf allen Seiten; DSGVO-Cookie-Banner (Fonts, Dr. Flex, Maps)
- ✅ Google-Maps zeigt den Unternehmenseintrag (share.google-Link)
- ✅ Startseite: wenig Text, viele Bilder, animiertes Gebiss mit Scan-Linie,
     Fotoband, Lächel-Foto (lizenzfrei, ohne Wasserzeichen)
- ✅ Instagram & Facebook verlinkt (Footer + Banner auf Impressionen)
- ✅ Mobile Schnellleiste „Anrufen / Termin buchen"
- ✅ Safari-Menü-Fix, Cache-Busting (?v=12), Geräteerkennung aller Marken
