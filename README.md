# AzParking Smart 🅿️

> AI ilə gücləndirilmiş vizual park slot sistemi – Hackathon Edition

AzParking Smart, Bakı şəhərində mövcud AzParking sisteminə inteqrasiya edilmiş ağıllı park köməkçisidir. Sürücü iki kliklə ən yaxın boş slota yönləndirilir – Claude AI tövsiyə verir, 3D izometrik park sxemi slotu vizuallaşdırır, Leaflet xəritə yer göstərir, Waze isə naviqasiya edir.

## ✨ Əsas Funksiyalar

- **🤖 Claude AI Tövsiyəsi** – `claude-sonnet-4-20250514` modeli ən yaxın slotu seçir; uğursuz olarsa fallback işə düşür.
- **🧊 3D İzometrik Sxem** – SVG ilə qurulan park sxemi, seçilmiş slot parlaq pulse + "🎯 SİZİN SLOT" işarəsi ilə.
- **🗺️ Real Leaflet Xəritəsi** – Bakı küçə şəbəkəsi (OpenStreetMap), `flyTo` animasiyası, slot markerləri.
- **🅿️ Horizontal Slot Strip** – Boş/Dolu/Seçilmiş/Reserved – avtomatik scroll-into-view.
- **🚗 Waze Deep Link** – `https://waze.com/ul?ll=...&navigate=yes` formatı ilə yeni tabda naviqasiya.
- **📍 Yaxınlaşma Modu** – "500m-dəyəm" simulyasiyası → konfetti animasiya ilə "Park ET".

## 🛠️ Stack

- React 18 + Vite
- Tailwind CSS (CDN) + Plus Jakarta Sans / Inter
- Lucide React iconları
- Leaflet 1.9.4 (CDN, OpenStreetMap tiles)
- Anthropic Claude Messages API

## 🚀 Başlamaq

```bash
npm install
npm run dev
```

Brauzerdə açın: `http://localhost:5173`

### Claude API açarı (opsional)

`localStorage`-də `ANTHROPIC_API_KEY` təyin edin və ya açar olmasa fallback istifadə olunur:

```js
localStorage.setItem('ANTHROPIC_API_KEY', 'sk-ant-...')
```

## 📱 Demo Axışı

`splash` (2s) → `home` (zona siyahısı + AI tövsiyəsi) → `zone_detail` (slot strip + 3D sxem + xəritə + Waze) → `proximity modal` (Park ET → konfetti).

## 📦 Build

```bash
npm run build
npm run preview
```

## 🚢 Deploy (Hackathon — TAM ISLEK VERSIYA)

> **Vacib:** Kanonik versiya `standalone.html`-dadir (CDN ile React+Babel+Tailwind+Leaflet yukleyir, build telebatsizdir). Bu repodaki `vercel.json`, `netlify.toml`, `render.yaml` standalone.html-i kok URL kimi serve edir.

### Vercel (en suretli)
1. https://vercel.com/new → GitHub repo `Fegann/ParkVision` sec
2. Framework Preset: **Other** (avto-detect olunur)
3. Build/Output ayarlarini DEYISME — `vercel.json` hamisini hell edir
4. **Deploy** dugmesi → 30 saniyeye canli

### Netlify
1. https://app.netlify.com/start → GitHub repo `Fegann/ParkVision` sec
2. Build settings avto-detect olunur (`netlify.toml`-dan)
3. **Deploy site** → bitdi

### Render
1. https://dashboard.render.com → New → **Static Site** → GitHub repo
2. `render.yaml` Blueprint kimi taninir
3. **Apply** → deploy

### Build necə işləyir (3-ü də)
```bash
mkdir -p public && cp standalone.html public/index.html
# publish: ./public
```
Yəni hostluq `public/index.html`-i kök URL kimi serve edir, o da `standalone.html`-in tam surətidir.
