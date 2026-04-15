# Fyrir Skagaströnd — Master Project Documentation

> **Developer:** Gunnar Þór Gunnarsson — IcelandAIM  
> **Last Updated:** 2026-04-15  
> **Status:** Production site live. Admin dashboard in planning.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Architecture](#3-architecture)
4. [Pages & Routes](#4-pages--routes)
5. [Component Inventory](#5-component-inventory)
6. [Internationalization (i18n)](#6-internationalization-i18n)
7. [Candidate Data](#7-candidate-data)
8. [Translations Reference](#8-translations-reference)
9. [Assets & Media](#9-assets--media)
10. [Deployment & Hosting](#10-deployment--hosting)
11. [Admin Dashboard Plan](#11-admin-dashboard-plan)
12. [Supabase Database Schema Plan](#12-supabase-database-schema-plan)
13. [Dashboard UX Philosophy](#13-dashboard-ux-philosophy)
14. [Changelog](#14-changelog)

---

## 1. Project Overview

**Fyrir Skagaströnd** (meaning "For Skagaströnd") is a professional political campaign website built for the **2026 Icelandic Municipal Elections** in Skagaströnd, a small fishing village in northern Iceland.

### Mission
The party's core message: **"Fyrir fólkið, fyrir samfélagið, fyrir framtíðina"** — *For the people, for the community, for the future.*  
Campaign voting code: **X við K** (mark an X by K on the ballot).

### What the Site Does
- Introduces the party and its three policy pillars (responsible finance, for the people, for the future)
- Presents all 10 candidates with individual profile pages
- Displays live Facebook post embeds as a news feed
- Provides contact information and links
- Serves content in **7 languages** for the diverse Skagaströnd population
- Complies with Icelandic data protection law (Act No. 90/2018) and GDPR

### Live Domain
`https://fyrirskagastrond.com`  
Facebook: `https://www.facebook.com/profile.php?id=61576485865769`  
Contact email: `xk.fyrirskagastrond@gmail.com`  
Contact phone: `891 7869`

---

## 2. Technology Stack

| Category | Technology | Version |
|---|---|---|
| Build Tool | Vite | ^6.0.5 |
| UI Framework | React | ^18.3.1 |
| Routing | React Router DOM | ^7.14.0 |
| Animation | Framer Motion | ^11.15.0 |
| Icons | Lucide React | ^0.468.0 |
| Styling | Vanilla CSS (custom design system) | — |
| Font | Inter (Google Fonts) | 400–900 |
| Hosting | Netlify | — |
| Node | 20 | — |

### Scripts
```bash
npm run dev      # Local development server
npm run build    # Production build → /dist
npm run preview  # Preview production build locally
```

---

## 3. Architecture

```
d:\Fyrir Skagaströnd\
├── index.html                    # Root HTML, SEO meta tags, font import
├── vite.config.js                # Vite config with React plugin
├── netlify.toml                  # Netlify build config + SPA redirect
├── package.json                  # Dependencies
├── public/                       # Static assets (images served as-is)
│   ├── Vigdís.jpg
│   ├── Ragnar.jpg
│   ├── Ástrós.jpg
│   ├── Jóhann.jpg
│   ├── Halla.jpg
│   ├── Patrik.jpg
│   ├── Eva Dís.jpg
│   ├── Andri.jpg
│   ├── Daniela.jpg
│   ├── Ágúst.jpg
│   ├── F Skagastrond.jpg         # Party logo
│   ├── Frambjódendur.jpg         # Group photo of all candidates
│   ├── Fyrir Skagaströnd.jpg     # General party image
│   ├── Spákonufell.jpg           # Hero background (mountain at sunset)
│   ├── logo.jpg
│   └── favicon.svg
└── src/
    ├── main.jsx                  # React entry point
    ├── App.jsx                   # Router, layout, route definitions
    ├── index.css                 # ENTIRE design system (37KB)
    ├── components/               # All UI components
    │   ├── Header.jsx
    │   ├── Hero.jsx
    │   ├── WaveDivider.jsx
    │   ├── Pillars.jsx
    │   ├── Candidates.jsx
    │   ├── CandidateProfile.jsx
    │   ├── About.jsx
    │   ├── FacebookPosts.jsx
    │   ├── Contact.jsx
    │   ├── Footer.jsx
    │   ├── LanguageSwitcher.jsx
    │   ├── PrivacyPolicy.jsx
    │   └── CookiePolicy.jsx
    ├── data/
    │   └── candidates.js         # Candidate objects (nr, name, roleKey, bioKey, image, slug)
    └── i18n/
        ├── LanguageContext.jsx   # Language provider + LANGUAGES constant
        ├── translations.js       # All 7-language translation strings (55KB)
        └── useTranslation.js     # t() hook
```

### Data Flow
```
LanguageContext (lang state) → useTranslation (t() hook) → All components
candidates.js (static data) → Candidates + CandidateProfile components
translations.js (key → { is, en, es, pl, de, da, no }) → t(key) → rendered text
```

---

## 4. Pages & Routes

| Path | Component | Description |
|---|---|---|
| `/` | `HomePage` (composite) | Full one-page site: Hero → Pillars → Candidates → About → Facebook → Contact |
| `/frambjodandi/:slug` | `CandidateProfile` | Individual candidate detail page |
| `/personuvernd` | `PrivacyPolicy` | Privacy policy (9 sections, GDPR compliant, 7 languages) |
| `/vafrakokur` | `CookiePolicy` | Cookie policy (7 languages) |

### Anchor Sections on `/`
| Anchor `id` | Section | Nav Label Key |
|---|---|---|
| `#heim` | Hero | — |
| `#stefna` | Pillars (policy) | `nav.stefna` |
| `#frambod` | Candidates | `nav.frambod` |
| `#um` | About | `nav.um` |
| `#frettir` | Facebook Posts | `nav.frettir` |
| `#samband` | Contact | `nav.samband` |

---

## 5. Component Inventory

### Header.jsx
- Sticky header with scroll shadow effect (`header--scrolled` class)
- Logo image: `/F Skagastrond.jpg` + text "Fyrir Skagaströnd" + subtitle
- Desktop nav links (anchor hash links)
- Language switcher (desktop and mobile)
- Hamburger menu for mobile with animated spans
- Nav closes on route change

### Hero.jsx
- Full-viewport hero section with animated particles (12 particles)
- Background glow element
- Framer Motion `fadeUp` animation on content entry
- Wordmark: "Fyrir Skagaströnd" with styled prefix
- H1 headline with accent span (middle phrase in different color)
- Description paragraph
- Two CTA buttons: "X við K" (red) + "Skoða framboðslista" (outline)
- Stats strip: **10 candidates · 3 core slogans · 1 shared policy**
- Hero visual card: mountain photo + logo + slogan

### WaveDivider.jsx
- Pure CSS SVG wave divider between Hero and Pillars
- Visual transition element

### Pillars.jsx
- Three pillar cards with Lucide icons (Landmark, Users, Sparkles)
- Framer Motion scroll-triggered entrance
- Policy section (`id="stefna"`)
- Pillars: Ábyrg fjármál · Fyrir fólkið · Fyrir framtíðina

### Candidates.jsx
- Grid of 10 candidate cards (clickable → profile page)
- Photo, number badge (nr 1 = lead candidate styling), name, role
- Framer Motion staggered scroll entrance
- `id="frambod"`

### CandidateProfile.jsx
- Dynamic route via `:slug` param
- Hero section with photo, number badge, name, role
- Bio card with "About the candidate" text
- Party core message/slogan block
- Previous/Next navigation between candidates
- "All candidates" link back

### About.jsx
- Two-column grid layout
- Left: badge, title, two paragraphs, core message block
- Right: three feature cards (Transparency, Infrastructure, Economic Dev)
- `id="um"`

### FacebookPosts.jsx
- `id="frettir"`
- Array of Facebook embed iframes (`FACEBOOK_POSTS` constant)
- Currently 2 posts embedded
- CTA button to full Facebook page

### Contact.jsx
- `id="samband"`
- Dark navy section with background element
- Contact grid: left (text + CTA buttons), right (phone, email, location items)
- Facebook link + email link buttons

### Footer.jsx
- Brand column (logo + tagline)
- Links column (nav anchors)
- Contact column (phone, email, Facebook)
- Legal column (privacy policy, cookie policy)
- Copyright + Developer credit: IcelandAIM — Gunnar Þór Gunnarsson

### LanguageSwitcher.jsx
- Dropdown with flag emoji + language code
- Shows current language, lists all 7 with click-outside close
- Used in both desktop nav and mobile header

### PrivacyPolicy.jsx & CookiePolicy.jsx
- Legal pages fully translated in all 7 languages
- Standalone routes (not anchor sections)

---

## 6. Internationalization (i18n)

### Supported Languages
| Code | Language | Flag |
|---|---|---|
| `is` | Íslenska (Icelandic) | 🇮🇸 |
| `en` | English | 🇬🇧 |
| `es` | Español (Spanish) | 🇪🇸 |
| `pl` | Polski (Polish) | 🇵🇱 |
| `de` | Deutsch (German) | 🇩🇪 |
| `da` | Dansk (Danish) | 🇩🇰 |
| `no` | Norsk (Norwegian) | 🇳🇴 |

> **Why these languages?** Skagaströnd has a diverse population including Icelandic, Spanish, Polish, and Scandinavian residents. The inclusion of 7 languages ensures every voter can read the site in their native language.

### How i18n Works
1. `LanguageContext.jsx` — Creates React context, persists choice to `localStorage` (`fs-lang` key), sets `document.documentElement.lang`
2. `translations.js` — Flat object: `{ 'key': { is: '...', en: '...', ... } }`
3. `useTranslation.js` — Returns `t(key)` function that looks up `translations[key][lang]`, falls back to `'is'`, then to the key itself

### Translation Key Naming Convention
```
section.element[.modifier]

Examples:
nav.stefna          → Nav: Policy link
hero.headline.part1 → Hero: first part of headline
pillar.finance.text → Pillars: finance pillar text
candidate.1.bio     → Candidate 1 biography
footer.developer    → Footer: developer credit label
```

---

## 7. Candidate Data

Located in `src/data/candidates.js`. Each candidate object:

```js
{
  nr: Number,           // List position (1 = lead candidate / oddviti)
  name: String,         // Full Icelandic name
  roleKey: String,      // Translation key → candidate.N.role
  bioKey: String,       // Translation key → candidate.N.bio
  image: String,        // Path to image in /public (e.g. '/Vigdís.jpg')
  slug: String,         // URL-safe slug for /frambjodandi/:slug route
}
```

### Full Candidate List

| Nr | Name | Slug | Role (IS) |
|---|---|---|---|
| 1 | Vigdís Elva Þorgeirsdóttir | `vigdis` | kennari (teacher) — **lead candidate** |
| 2 | Ragnar Rögnvaldsson | `ragnar` | sjálfstætt starfandi athafnamaður |
| 3 | Ástrós Elísdóttir | `astros` | kennari og leikhúsfræðingur |
| 4 | Jóhann Guðbjartur Sigurjónsson | `johann` | athafnamaður |
| 5 | Halla María Þórðardóttir | `halla` | kennari |
| 6 | Patrik Snær Bjarnason | `patrik` | vélstjóri |
| 7 | Eva Dís Gunnarsdóttir | `eva-dis` | stuðningsfulltrúi |
| 8 | Andri Már Welding | `andri` | stýrimaður |
| 9 | Daniela Esmeralda Ortega | `daniela` | yfirmatráður og deildarstjóri frístundar |
| 10 | Ágúst Óðinn Ómarsson | `agust` | skipstjóri |

> **Note:** Candidates 1, 3, 5 are teachers at the local school. This is highly sensitive — translations and descriptions about them must be exceptionally professional and accurate.

---

## 8. Translations Reference

### Translation Key Groups
| Group Prefix | Description | Count |
|---|---|---|
| `nav.*` | Navigation links + subtitle | 6 keys |
| `hero.*` | Hero section (badge, headline parts, desc, CTAs, stats) | 10 keys |
| `pillars.*` | Policy section header | 3 keys |
| `pillar.finance.*` | Finance pillar | 2 keys |
| `pillar.people.*` | People pillar | 2 keys |
| `pillar.future.*` | Future pillar | 2 keys |
| `candidates.*` | Candidates section header | 3 keys |
| `about.*` | About section + feature cards + core message | 9 keys |
| `contact.*` | Contact section | 7 keys |
| `profile.*` | Candidate profile page UI strings | 9 keys |
| `footer.*` | Footer labels | 6 keys |
| `fb.*` | Facebook posts section | 4 keys |
| `candidate.N.role` | Candidate role (N = 1–10) | 10 keys |
| `candidate.N.bio` | Candidate biography (N = 1–10) | 10 keys |
| `legal.*` | Legal pages shared | 1 key |
| `privacy.*` | Privacy policy sections | 8 keys |
| `cookie.*` | Cookie policy sections | 4 keys |

**Total translation keys: ~96**  
**Total translated strings: ~96 × 7 = ~672 strings**

---

## 9. Assets & Media

All images live in `/public/` and are served statically:

| File | Usage |
|---|---|
| `F Skagastrond.jpg` | Party logo (Header, Hero visual, About, Profile, Footer) |
| `Frambjódendur.jpg` | Group photo of all candidates |
| `Spákonufell.jpg` | Hero background image (mountain at golden hour) |
| `Fyrir Skagaströnd.jpg` | General party/campaign image |
| `logo.jpg` | Alternative logo |
| `favicon.svg` | Browser favicon |
| `Vigdís.jpg` | Candidate #1 photo |
| `Ragnar.jpg` | Candidate #2 photo |
| `Ástrós.jpg` | Candidate #3 photo |
| `Jóhann.jpg` | Candidate #4 photo |
| `Halla.jpg` | Candidate #5 photo |
| `Patrik.jpg` | Candidate #6 photo |
| `Eva Dís.jpg` | Candidate #7 photo |
| `Andri.jpg` | Candidate #8 photo |
| `Daniela.jpg` | Candidate #9 photo |
| `Ágúst.jpg` | Candidate #10 photo |

---

## 10. Deployment & Hosting

### Netlify Configuration (`netlify.toml`)
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200          # SPA fallback — all routes serve index.html

[build.environment]
  NODE_VERSION = "20"
```

### Deployment Workflow
1. Push to Git repository
2. Netlify auto-deploys on push
3. `npm run build` → Vite compiles to `/dist`
4. All routes redirect to `/index.html` (React Router handles client-side routing)

---

## 11. Admin Dashboard Plan

### Overview
A secure, **bilingual (Icelandic + English)** admin dashboard that allows non-technical campaign staff to manage all public-facing content without touching any code. Powered by **Supabase** as the backend database and storage solution.

### Core Principle: Zero-Code Content Management
All content editable from the dashboard must be designed so that **any change is safe and cannot break the live public site.** This is achieved through a **draft/publish workflow** — content is saved as a draft first, previewed in a full live-preview panel, and only made public upon explicit confirmation.

### Dashboard Access
- URL: `/admin` (protected route, separate from public site)
- Login: Email + password via Supabase Auth
- Two roles planned: **Admin** (full access) and **Editor** (candidate content only)

### Dashboard Sections

#### 1. Dashboard Home (Overview)
- Live site status indicator
- Quick stats: last updated, number of published changes
- Language: IS 🇮🇸 / EN 🇬🇧 toggle

#### 2. 📝 Page Content Editor
- Edit all translation strings for every section
- Sections: Hero · Pillars · About · Contact · Footer
- Each field shows: current live value | editable draft field
- Language switcher to edit any of the 7 languages
- **Live Preview Panel** (right side): full copy of the public page section, updates in real-time as you type

#### 3. 👥 Candidates Manager
- List view of all 10 candidates with photo thumbnails
- Per-candidate editor:
  - Name (non-translatable)
  - Role — editable per language (7 fields)
  - Biography — editable per language (7 rich text fields)
  - Photo upload → stored in Supabase Storage
  - List order (drag to reorder, if needed)
  - Published/Draft toggle
- **Photo Upload** with crop/preview — replaces image in Supabase Storage

#### 4. 📸 Media Library
- Upload images to Supabase Storage
- View all uploaded images with usage tags
- Copy public URL
- Delete unused images

#### 5. 📱 Facebook Posts Manager
- Add/remove Facebook post embed URLs
- Preview embed (iframe preview)
- Reorder posts (drag handle)
- Currently hardcoded in `FacebookPosts.jsx` → will become database-driven

#### 6. 📞 Contact Details Editor
- Phone number
- Email address
- Facebook page URL
- Location string

#### 7. 🌐 SEO & Meta Editor
- Page title
- Meta description
- OG image (upload or select from media library)
- Canonical URL

#### 8. 🔒 Admin Users
- View admin accounts
- Invite new admin by email (Supabase invite)
- Role management

### Draft / Publish Safety Workflow
```
1. Admin edits content in the dashboard form
2. Changes are saved as a DRAFT in Supabase (not live yet)
3. Live Preview shows exactly how the page will look
4. Admin clicks "Publish Changes" → content goes live
5. Previous version is preserved as a snapshot (rollback available)
```

This ensures that **nothing can break the live site** while editing.

---

## 12. Supabase Database Schema Plan

### Tables

#### `site_content`
Stores all editable text content (replaces `translations.js`)
```sql
CREATE TABLE site_content (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key         TEXT NOT NULL,            -- e.g. 'hero.headline.part1'
  lang        TEXT NOT NULL,            -- 'is' | 'en' | 'es' | 'pl' | 'de' | 'da' | 'no'
  value       TEXT NOT NULL,            -- the translated string
  is_draft    BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(key, lang)
);
```

#### `candidates`
Stores all candidate data (replaces `candidates.js`)
```sql
CREATE TABLE candidates (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nr          INTEGER NOT NULL UNIQUE,  -- list position (1-10)
  name        TEXT NOT NULL,            -- full name (not translated)
  slug        TEXT NOT NULL UNIQUE,     -- URL slug
  image_url   TEXT,                     -- Supabase Storage public URL
  sort_order  INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);
```

#### `candidate_translations`
```sql
CREATE TABLE candidate_translations (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id  UUID REFERENCES candidates(id) ON DELETE CASCADE,
  lang          TEXT NOT NULL,
  role          TEXT DEFAULT '',
  bio           TEXT DEFAULT '',
  is_draft      BOOLEAN DEFAULT false,
  updated_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(candidate_id, lang)
);
```

#### `facebook_posts`
```sql
CREATE TABLE facebook_posts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  embed_url   TEXT NOT NULL,
  height      INTEGER DEFAULT 400,
  sort_order  INTEGER DEFAULT 0,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

#### `contact_info`
```sql
CREATE TABLE contact_info (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key         TEXT NOT NULL UNIQUE,   -- 'phone' | 'email' | 'facebook_url' | 'location'
  value       TEXT NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);
```

#### `content_snapshots`
For rollback capability:
```sql
CREATE TABLE content_snapshots (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name  TEXT NOT NULL,
  snapshot    JSONB NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  created_by  UUID REFERENCES auth.users(id)
);
```

### Supabase Storage Buckets
| Bucket | Contents | Access |
|---|---|---|
| `candidate-photos` | Individual candidate headshots | Public read |
| `site-images` | Hero images, logo variants, background photos | Public read |
| `documents` | Policy PDFs, if any | Public read |

### Row Level Security (RLS)
- `site_content`, `candidates`, `candidate_translations`, etc.: **Public SELECT** allowed (public site reads content)
- All INSERT/UPDATE/DELETE: **Authenticated only** (admin dashboard)

---

## 13. Dashboard UX Philosophy

### Built for Non-Technical Users
The dashboard must be designed as if the user has **never touched a computer form** related to a website before. This means:

1. **Visual labels over abstract keys** — Never show `hero.headline.part1` to a user. Show "Hero Section → Main Headline (Part 1)".
2. **Contextual help text** — Every field has a small tooltip or subtitle explaining what it does and where it appears on the live site.
3. **Inline preview** — Users see exactly what their text looks like on the real page, in real-time.
4. **Confirmation dialogs** — Before publishing: "Are you sure you want to make this change live?" with a summary of what changed.
5. **Success/error states** — Clear green success banners and red error messages in plain Icelandic and English.
6. **Auto-save drafts** — Never lose work. Everything saves to draft every 30 seconds.
7. **Undo last publish** — One-click rollback to previous version.

### Language Philosophy for the Dashboard UI
- Dashboard interface itself: **Icelandic primary, English secondary** (toggle in top bar)
- Content editing: switch between any of the 7 languages

### Professional Translation Standards
Given that several candidates are teachers at the local school and the community is small and watchful:
- All biography texts must be reviewed and approved before publishing
- Translation quality must be **native-level professional** (not machine-translated without review)
- The bio and role fields for teachers especially must be precise and dignified
- Admin should have a "Request translation review" flag per language

---

## 14. Changelog

| Date | Version | Author | Change |
|---|---|---|---|
| 2026-04-15 | 1.0.0 | Gunnar Þór Gunnarsson | Initial codebase read & documentation created |
| — | — | — | Admin dashboard planning phase begins |

---

*This document is the single source of truth for the Fyrir Skagaströnd project. Update it with every significant change.*
