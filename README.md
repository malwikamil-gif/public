# Planwise — Marketing Budget & ROI Planner

Polska aplikacja SPA zbudowana na podstawie PRD: React, TypeScript, Vite, Recharts, IndexedDB i decimal.js. Dane są lokalne, bez backendu i kont.

## Uruchomienie

Node.js 22+.

```sh
npm ci --cache /workspace/.npm-cache
npm run dev
```

Serwer domyślnie używa portu 5173. `npm run build` tworzy produkcyjną aplikację w `dist`; `npm run preview` służy do lokalnej kontroli buildu.

## Weryfikacja

```sh
npm test
npm run build
npx playwright test
```

Testy przeglądarkowe korzystają z systemowego Chromium w `/usr/bin/chromium`. Inną lokalizację można wskazać przez `CHROMIUM_PATH`.

## Funkcje

- Roczny budżet, waluta PLN/EUR/USD, rok i opis.
- Konfigurowalne kanały, kwoty, ROI i uzasadnienia; natychmiastowe KPI i wykresy.
- Ważony ROI, zaokrąglanie wyniku kanału do najmniejszej jednostki waluty przez decimal.js.
- Walidacja alokacji, ROI ≥ −100%, dodatniego budżetu i kompletności danych.
- Scenariusze w IndexedDB, odczyt ostatniego zapisu, niezależne kopie i porównanie po stabilnych ID kanałów.
- Cofnięcie 30 ostatnich edycji, nowy pusty plan, ochrona niezapisanych zmian.
- CSV oraz eksport/import JSON w wersji 1; odrzucanie nieznanych/uszkodzonych formatów.
- Responsywny układ, etykiety formularzy, obsługa klawiaturą i tabela wartości wykresów.

Dane początkowe są demonstracyjne. Wynik symulacji nie oznacza zysku firmy. Kanały traktowane są addytywnie bez nakładającej się atrybucji. Dane przeglądarki mogą zostać usunięte — eksportuj JSON. Na współdzielonym urządzeniu lokalny zapis nie gwarantuje poufności.

## Publikacja

W Vercel lub Netlify: build `npm run build`, katalog `dist`. Aplikacja nie wymaga sekretów. Publikacja HTTPS wymaga skonfigurowania hostingu; lokalny serwer nie stanowi publikacji.
