# Neue Webseite — Zahnarztpraxis Dr. Loggen
## Anleitung: Bilder, Logo, IONOS-Upload

Die Seite ist eine **statische HTML-Webseite** — kein WordPress, keine Datenbank,
keine Plugin-Updates. Sie funktioniert auf jedem IONOS-Webhosting-Paket und passt
sich automatisch an Handy, Tablet, PC und Mac an (iPhone, iPad, Android, Windows, macOS).

---

## 1. Bilder einfügen (wichtig für gute Qualität!)

Im Ordner `img/` liegen bereits **Platzhalter-Bilder in den Praxisfarben** für
jeden Bildplatz — die Seite zeigt also immer vollständige Bilder an. Um die
echten Fotos einzusetzen, einfach die Platzhalter durch eigene Fotos **mit
exakt gleichem Dateinamen** ersetzen (überschreiben). Nichts weiter nötig.

**Bilder von der alten Webseite übernehmen:**
Öffnen Sie `https://www.dr-loggen.de/img/DATEINAME.jpg` im Browser → Rechtsklick →
„Bild speichern unter" → in den Ordner `img/` legen.

| Dateiname                          | Verwendung                         |
|------------------------------------|------------------------------------|
| `praxis-loggen-haus-01.jpg`        | Startseite (großes Hero-Bild)      |
| `praxis-loggen-01.jpg`             | Empfang                            |
| `praxis-loggen-02.jpg`             | Wartebereich                       |
| `praxis-loggen-03.jpg`             | Team / Dr. Loggen (Vita-Seite)     |
| `praxis-loggen-behandlung-01.jpg`  | Behandlungsraum                    |
| `praxis-loggen-behandlung-02a.jpg` | Behandlung                         |
| `praxis-loggen-behandlung-02b.jpg` | Ausstattung                        |
| `praxis-loggen-behandlung-03a.jpg` | Behandlung                         |
| `praxis-loggen-behandlung-03b.jpg` | Technik-Detail                     |
| `praxis-loggen-behandlung-03c.jpg` | Behandlungsraum                    |
| `leistungen-dvt.jpg`               | Leistung: DVT                      |
| `leistungen-scan.jpg`              | **NEU:** Foto des Intraoralscanners (Abdruckfreie Praxis) |

**Tipps für gute Bildqualität:**
- Breite mindestens **1600 px** (Hero-Bild gern 2000 px), Format JPG, Qualität 80–85 %.
- Neue Fotos am besten im Querformat 4:3 oder 3:2 aufnehmen.
- Kostenlos verkleinern/komprimieren: https://squoosh.app
- Keine WhatsApp-Weiterleitungen verwenden (starke Kompression) — Originaldateien nutzen.

## 2. Logo

Ihr echtes Logo ist bereits eingebaut (`img/logo.png`, freigestellt mit
transparentem Hintergrund) — mittig im Kopfbereich und im Footer. Für noch
schärfere Darstellung auf Retina-Displays können Sie eine größere Version
(z. B. 800 px breit) unter demselben Dateinamen ablegen.

## 3. Farben anpassen

Alle Farben stehen zentral ganz oben in `css/style.css` unter `:root`.
Die Palette ist bereits auf das Logo abgestimmt (Logo-Hellblau `#A0C6F3`,
Logo-Dunkel `#1C1B22`, Button-Blau `#3568B8`). Zum Ändern einfach die Hex-Werte
anpassen, z. B. `--blue` (Hauptfarbe) und `--sky` (Logo-Akzent).

## 4. Upload zu IONOS (2 Möglichkeiten)

**A) IONOS Webspace / Datei-Manager (am einfachsten):**
1. Bei IONOS anmelden → „Hosting" → „Webspace" öffnen.
2. Alle Dateien und Ordner aus diesem Paket in das Web-Hauptverzeichnis hochladen
   (dort, wo die Domain dr-loggen.de hinzeigt — meist `/` oder ein Ordner, der der
   Domain zugewiesen ist).
3. Fertig — `index.html` wird automatisch als Startseite erkannt.

**B) Per SFTP (z. B. mit FileZilla):**
1. IONOS → Hosting → „SFTP &amp; SSH" → Zugangsdaten anzeigen.
2. Mit FileZilla verbinden und den kompletten Ordnerinhalt hochladen.

**Wichtig:** SSL/HTTPS in IONOS aktivieren (ist bei IONOS-Paketen enthalten:
Domains &amp; SSL → SSL-Zertifikat der Domain zuweisen).


## 4a. Kostenlos Probetesten über GitHub Pages (vor dem IONOS-Upload)

So können Sie die Seite auf allen Geräten (Handy, Tablet, PC) live testen,
bevor sie auf die echte Domain kommt:

1. Kostenloses Konto auf https://github.com anlegen (falls noch keins vorhanden).
2. Oben rechts **„+" → „New repository"** → Name z. B. `dr-loggen-test` →
   **Public** → „Create repository".
3. Auf der Repository-Seite: **„uploading an existing file"** anklicken und
   **alle Dateien und Ordner** aus diesem Paket per Drag & Drop hochladen
   (inkl. der Ordner `css`, `js`, `img` und der Datei `.nojekyll`) → „Commit changes".
4. **Settings → Pages** → unter „Branch" **`main`** und Ordner **`/ (root)`**
   auswählen → „Save".
5. Nach 1–2 Minuten ist die Seite erreichbar unter:
   `https://IHR-BENUTZERNAME.github.io/dr-loggen-test/`
   — den Link können Sie auf jedem Handy/Tablet öffnen und herumzeigen.

Wichtig: Zum Testen immer diesen GitHub-Link verwenden, nicht die HTML-Dateien
per Doppelklick öffnen. Beim Öffnen als lokale Datei (`file://…`) blockieren
Browser teilweise Speicher & Skripte — dann erscheint z. B. das Cookie-Banner
auf jeder Seite erneut. Über GitHub Pages (und später IONOS) wird die Auswahl
korrekt **einmal** gespeichert und gilt für alle Seiten (localStorage + Cookie,
1 Jahr gültig).

## 5. Dr. Flex & Cookie-Banner

Die Online-Terminbuchung ist eingebunden (Praxis-ID 59903, wie auf der alten
Seite). Beim ersten Besuch erscheint ein Cookie-Banner: Erst nach „Alle
akzeptieren" werden Google Fonts und das Dr.-Flex-Skript geladen (DSGVO).
Wählt jemand „Nur notwendige", zeigt der Termin-Button einen Hinweis mit der
Telefonnummer. Die Auswahl lässt sich über „Cookie-Einstellungen" im Footer
jederzeit ändern.

## 6. Jobs / Karriere

Der Menüpunkt **„Jobs"** verlinkt direkt auf die Karriere-Landingpage:
https://dr-loggen.maxbenedikt-karriereseite.de/

## 7. Noch offen (bitte prüfen)

- **Impressum:** Kammer-/Aufsichtsangaben aus dem alten Impressum übernehmen
  (in `impressum.html` gelb markiert).
- **Datenschutz:** Vorlage in `datenschutz.html` rechtlich prüfen lassen.
- **Optional — Google Fonts lokal einbinden:** Auf https://gwfh.mranftl.com
  „Bricolage Grotesque" und „Instrument Sans" herunterladen und lokal einbinden;
  dann kann der Google-Fonts-Punkt aus dem Cookie-Banner entfernt werden.
  (Aktuell werden die Fonts DSGVO-konform erst nach Einwilligung geladen.)

## Umgesetzte Änderungen (aus den Notizen)

- ✅ Lachgassedierung komplett entfernt (Leistungen, Praxis-Service, Vita)
- ✅ Patienten-Shuttle komplett entfernt (alle Seiten)
- ✅ Freitag 8–14 Uhr in allen Sprechzeiten
- ✅ Echtes Logo eingebaut — mittig im Kopf, nur das Logo ohne Text daneben
- ✅ Farben auf das Logo abgestimmt (Hellblau/Dunkel)
- ✅ Kopfzeile neu: obere Leiste entfernt, Navigation links & rechts vom Logo
     (8 Punkte inkl. Jobs & Termin-Button in einer Reihe) mit Hover-Animationen
- ✅ Mobiles Menü repariert: sauberes Vollbild-Menü mit Animation
- ✅ Cookie-Banner mit Pflicht-Auswahl (Google Fonts, Dr. Flex, Google Maps)
- ✅ Google-Maps zeigt den Unternehmenseintrag „Zahnarztpraxis Dr. Frank Loggen"
     (Link: https://share.google/BpcKm6KDw8pUV2LaH), nicht nur die Adresse
- ✅ Startseite überzeugender: „Warum Dr. Loggen"-Sektion, Zitatband, ISO-Hinweis
- ✅ Platzhalter-Bilder für alle Bildplätze — nichts wirkt mehr leer/kaputt
- ✅ GitHub-Pages-Testanleitung (Punkt 4a) + `.nojekyll` beigelegt
- ✅ Cookie-Auswahl wird einmalig gespeichert (localStorage + Cookie, 1 Jahr)
     und gilt für alle Seiten
- ✅ Menü für alle PC-/Laptop-Breiten optimiert (nichts quetscht oder bricht um)
- ✅ Automatische Geräte-/Browser-Erkennung (PC, Handy, Tablet — alle Marken:
     Apple, Samsung, Huawei, Xiaomi, Google, Microsoft …; Chrome, Safari,
     Firefox, Edge, Samsung Internet, Opera) mit gezielten Anpassungen, z. B.
     größere Tippflächen auf Touch-Geräten
- ✅ Jobs → Landingpage (maxbenedikt-karriereseite.de)
- ✅ Praxis-Impressionen als eigene Seite
- ✅ Neue Leistung: Abdruckfreie Praxis — 3D-Intraoralscan für ZE und Schienen
- ✅ Dr. Flex Integration (Buchungs-Buttons auf allen Seiten)
- ✅ Responsiv für Handy, Tablet, PC (iPhone, iPad, Android, Mac, Windows)
- ✅ DSGVO: Google-Maps-Karte lädt erst nach Klick (Zwei-Klick-Lösung)
