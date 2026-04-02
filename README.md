# 🐝 Pasieka Dobra Pszczoła

> **Miody z sercem ze Świętokrzyskiego**

Strona rodzinnej Pasieki Dobra Pszczoła i Wanilii i Migdałów – Małgorzaty i Rafała Zacharskich z Małyszyna Dolnego.

---

## 📁 Struktura projektu

```
pasieka2/
├── index.html              ← Strona główna pasieki
├── sklep.html              ← Sklep z miodem
├── nagrody.html            ← Nagrody i certyfikaty
├── o-nas.html              ← O pasiece
├── galeria.html            ← Galeria zdjęć
├── kontakt.html            ← Kontakt i mapa
├── wanilia/                ← Podstrony Wanilii i Migdałów
│   ├── index.html
│   ├── oferta.html
│   ├── galeria.html
│   ├── nagrody.html
│   └── kontakt.html
├── css/style.css
├── js/
├── images/
├── functions/              ← Netlify Functions
├── netlify.toml
└── package.json
```

---

## 🚀 Jak uruchomić i aktualizować stronę przez GitHub

### KROK 1 – Utwórz konto na GitHub (tylko raz)

1. Wejdź na **[github.com](https://github.com)** → kliknij **Sign up**
2. Podaj adres e-mail → utwórz hasło → wybierz nazwę użytkownika
3. Potwierdź konto klikając link w e-mailu

---

### KROK 2 – Utwórz repozytorium (tylko raz)

1. Po zalogowaniu kliknij **+** (prawy górny róg) → **New repository**
2. W polu **Repository name** wpisz: `pasieka-dobra-pszczola`
3. Wybierz **Private** (prywatne)
4. **NIE** zaznaczaj żadnych checkboxów na dole
5. Kliknij zielony przycisk **Create repository**

---

### KROK 3 – Wgraj pliki na GitHub (tylko raz)

1. Na stronie nowo utworzonego repo kliknij link **uploading an existing file**
2. Otwórz pobrany ZIP i wypakuj go na komputerze
3. Zaznacz WSZYSTKIE pliki i foldery → przeciągnij do okna przeglądarki
4. Poczekaj aż się wgrają (może chwilę potrwać)
5. W polu **Commit changes** napisz: `Pierwsza wersja strony`
6. Kliknij zielony przycisk **Commit changes**

---

### KROK 4 – Połącz GitHub z Netlify (tylko raz)

1. Zaloguj się na **[app.netlify.com](https://app.netlify.com)**
2. Kliknij **Add new site** → **Import an existing project**
3. Kliknij **GitHub** → kliknij **Authorize Netlify**
4. Znajdź repo `pasieka-dobra-pszczola` → kliknij na nie
5. Sprawdź ustawienia:
   - **Branch to deploy:** `main`
   - **Publish directory:** `.` (tylko kropka!)
6. Kliknij **Deploy site**

✅ Strona jest online! Netlify poda adres np. `random-name.netlify.app`

> Możesz później ustawić własną domenę w: Site settings → Domain management

---

### JAK AKTUALIZOWAĆ STRONĘ NA CO DZIEŃ

#### ✏️ Zmiana tekstu lub cen

1. Wejdź na [github.com](https://github.com) → swoje repo
2. Kliknij na plik np. `sklep.html`
3. Kliknij ikonę **ołówka** (Edit this file) w prawym górnym rogu
4. Zmień tekst bezpośrednio w edytorze
5. Na dole kliknij **Commit changes** → **Commit directly to main**
6. Netlify automatycznie zaktualizuje stronę w ciągu ~1 minuty ✅

#### 🖼️ Dodanie nowych zdjęć

1. W repo kliknij folder `images/miody/` lub `wanilia/images/torty/` itp.
2. Kliknij **Add file** → **Upload files**
3. Przeciągnij zdjęcia (najlepiej format **.webp** lub .jpg)
4. Kliknij **Commit changes**
5. W odpowiednim pliku HTML zaktualizuj ścieżkę do zdjęcia

---

### KROK 5 – Ustaw sekrety dla automatycznego deploy z GitHub

1. W repo GitHub kliknij **Settings** (pasek na górze)
2. Lewe menu → **Secrets and variables** → **Actions**
3. Kliknij **New repository secret** i dodaj kolejno:

**Sekret 1:**
- Name: `NETLIFY_AUTH_TOKEN`
- Value: *(patrz niżej jak znaleźć)*

Jak znaleźć token Netlify:
- Netlify → kliknij swój awatar (prawy górny róg) → **User settings**
- Zakładka **Applications** → **Personal access tokens**
- Kliknij **New access token** → wpisz nazwę → **Generate token**
- Skopiuj token (zobaczysz go tylko raz!)

**Sekret 2:**
- Name: `NETLIFY_SITE_ID`
- Value: *(patrz niżej jak znaleźć)*

Jak znaleźć Site ID:
- Netlify → kliknij swoją stronę → **Site configuration**
- Sekcja **Site details** → **Site ID** (np. `abc123-def456-...`)

---

## 🔧 Zmienne środowiskowe na Netlify (dla formularzy i Stripe)

Netlify → kliknij stronę → **Site configuration** → **Environment variables** → **Add a variable**

| Nazwa zmiennej | Co wpisać |
|---------------|-----------|
| `EMAIL_USER` | Twój adres Gmail np. `rafal@gmail.com` |
| `EMAIL_PASS` | Hasło aplikacji Google (16 znaków bez spacji) |
| `OWNER_EMAIL` | `dobrapszczola@o2.pl` |
| `STRIPE_SECRET_KEY` | Klucz tajny Stripe z [dashboard.stripe.com](https://dashboard.stripe.com/apikeys) |

### Jak uzyskać hasło aplikacji Google (EMAIL_PASS):
1. Wejdź na [myaccount.google.com/security](https://myaccount.google.com/security)
2. Włącz **Weryfikacja dwuetapowa** (jeśli jeszcze nie włączona)
3. Wyszukaj **Hasła aplikacji** → kliknij
4. Wpisz nazwę np. `Netlify pasieka` → kliknij **Utwórz**
5. Pojawi się 16-znakowe hasło – skopiuj je i wklej jako `EMAIL_PASS`

---

## 📞 Dane pasieki

| | |
|-|-|
| **Pasieka** | 609 239 345 |
| **Wanilia i Migdały** | 533 863 133 |
| **E-mail** | dobrapszczola@o2.pl |
| **Adres** | Małyszyn Dolny 20, 27-220 Mirzec |
| **Facebook** | [pasiekadobrapszczola](https://www.facebook.com/pasiekadobrapszczola) |

---

*Strona zbudowana z ❤️ dla Pasieki Dobra Pszczoła*
