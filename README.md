# Eko-Flex.pl

Strona firmowa Eko-Flex E-group s.c. (recykling i skup surowców wtórnych, Szprotawa).

Statyczna witryna wielostronicowa budowana Webpackiem. Na serwer trafia wyłącznie zawartość katalogu `dist/`.

## Wymagania

- [Node.js](https://nodejs.org/) 18+ (zalecane LTS)
- npm (dołączony do Node.js)

## Instalacja

```bash
cd eko-flex.pl
npm install
```

## Polecenia

| Polecenie | Opis |
|-----------|------|
| `npm run build` | Budowa produkcyjna → katalog `dist/` (minifikacja HTML/CSS/JS, hashe w nazwach plików) |
| `npm run dev` | Serwer deweloperski z podglądem na `http://localhost:8080` |
| `npm start` | Alias do `npm run dev` |
| `npm run build:css` | Przebudowa `css/bootstrap.min.css` z motywem kolorów (`scss/bootstrap.scss`) |

## Publikacja

1. Uruchomić `npm run build`.
2. Wgrać **całą zawartość** katalogu `dist/` na serwer WWW (DocumentRoot / public_html).
3. Nie wgrywać `node_modules/`, źródeł HTML z katalogu głównego ani plików konfiguracyjnych Webpacka — tylko wynik z `dist/`.

## Struktura projektu

```
eko-flex.pl/
├── index.html, o-firmie.html, oferta.html, kontakt.html, zapytaj.html, 404.html
├── css/              # style strony + skompilowany Bootstrap
├── scss/             # źródło motywu Bootstrap (kolory Eko-Flex)
├── js/               # skrypty strony (glowny.js)
├── src/app.js        # punkt wejścia Webpacka
├── img/              # obrazy (kopiowane do dist)
├── lib/              # animate, wow, easing
├── webpack.config.js
├── robots.txt
├── sitemap.xml
└── dist/             # wynik buildu (ignorowany przez git)
```

## Edycja treści

- Treść i menu: pliki `*.html` w katalogu głównym.
- Style własne: `css/style.css`.
- Kolory Bootstrap: `scss/bootstrap.scss`, potem `npm run build:css`.
- Skrypty UI: `js/glowny.js` (importowany przez `src/app.js`).

Po zmianach uruchomić ponownie `npm run build` przed publikacją.
