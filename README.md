# Landingspagina · Stillwater Apothecary

Statische landingspagina (HTML, CSS, JS) voor de avondtheecampagne. Klaar voor GitHub Pages: alle paden zijn relatief.

## Structuur
```
landingspagina/
├── index.html                    pagina: hero, intro, verhaal, smaken, ritueel, inschrijven, footer
├── css/style.css                 huisstijl (Fraunces, palet uit 05_DESIGN-GUIDELINES.md)
├── js/main.js                    formulier, validatie, bevestiging, smaakvoorkeur
├── assets/img/                   beelden (zie hieronder)
├── EMAILFLOW_bezoekersgedrag.md  voorstel e-mailflow in MailerLite
└── README.md
```

## Beelden in `assets/img/`
Gemaakt van de AI-beelden in `ai-beelden/` (originelen niet aangepast), als JPG voor het web.

| Bestand | Waar | Bron |
|---|---|---|
| `hero.jpg` | hero, rechts (boogvorm) | Stillwater_Chamomile_Lifestyle_01 |
| `verhaal.jpg` | sectie "Ons verhaal" | uitsnede kopje met stoom uit Stillwater_Chamomile_Evening_01 |
| `chamomile.jpg` | smaakkaart Chamomile & Honey | Stillwater_Chamomile_Evening_01 |
| `rooibos.jpg` | smaakkaart Rooibos & Forest Berries | Stillwater_Rooibos_Lifestyle_01, kleine labelregel met tikfouten vervaagd |
| `ritueel.jpg` | bij de nieuwsbrief (enkel desktop) | uitsnede kopje en kamille uit Stillwater_Chamomile_Lifestyle_01 |

De TeaShop-beelden zijn niet gebruikt: daar staan ook Green Tea en Ginger op. Ontbreekt een beeld, dan toont de pagina een plaatshouder met de bestandsnaam.

## Opbouw
Hero → intro → ons verhaal → twee theeblends → nieuwsbrief → avondritueel → afsluitende CTA → footer met privacy.
Kleuren: #C07259, #F4ECE1, #2B211D, #A3AE95 · lettertype Fraunces · subtiele animaties bij het scrollen (uit bij "minder beweging" op het toestel).

## MailerLite-formulier
1. Plak de HTML-embedcode in `index.html` op de plek `<!-- PLAK HIER DE MAILERLITE EMBED-CODE -->`. Het eigen formulier verdwijnt dan vanzelf.
2. Of: laat het eigen formulier staan (naam, e-mail, opt-in, voorkeur) en zet de `action`-URL uit de embedcode in `js/main.js` bij `MAILERLITE_ACTION`. Zonder URL werkt het formulier als demo: de bevestiging verschijnt, maar er wordt niets verstuurd.

## Lokaal bekijken
Dubbelklik `index.html`, of in VS Code met de extensie Live Server.

## Publiceren op GitHub Pages
1. Maak een gratis account op github.com (Sign up).
2. Klik rechtsboven op **+** › **New repository**. Naam: `stillwater-apothecary`, zet op **Public**, vink **Add a README** níet aan › **Create repository**.
3. Klik op **uploading an existing file** en sleep de *inhoud* van deze map erin (index.html, de mappen css, js en assets). `index.html` moet bovenaan in de repo staan, niet in een submap. Klik **Commit changes**.
4. Ga naar **Settings** › **Pages**. Bij *Source* kies je **Deploy from a branch**, branch **main**, map **/ (root)** › **Save**.
5. Na een à twee minuten staat de pagina op `https://<gebruikersnaam>.github.io/stillwater-apothecary/`. Die link verschijnt bovenaan op de Pages-instellingen.
6. Iets aangepast? Upload het bestand opnieuw via **Add file** › **Upload files**; de pagina wordt vanzelf bijgewerkt.
