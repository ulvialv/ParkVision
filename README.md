# AzParking Smart 🅿️

> AI ilə gücləndirilmiş vizual park slot sistemi – Hackathon Edition

AzParking Smart, Bakı şəhərində mövcud AzParking sisteminə inteqrasiya edilmiş ağıllı park köməkçisidir. Sürücü iki kliklə ən yaxın boş slota yönləndirilir – Claude AI tövsiyə verir, 3D izometrik park sxemi slotu vizuallaşdırır, Leaflet xəritə yer göstərir, Waze isə naviqasiya edir.

## ✨ Əsas Funksiyalar

- **🤖 Claude AI Tövsiyəsi** – `claude-sonnet-4-20250514` modeli ən yaxın slotu seçir; uğursuz olarsa fallback işə düşür.
- **🧊 3D İzometrik Sxem** – SVG ilə qurulan park sxemi, seçilmiş slot parlaq pulse + "🎯 SİZİN SLOT" işarəsi ilə.
- **🗺️ Real Leaflet Xəritəsi** – Bakı küçə şəbəkəsi (OpenStreetMap), `flyTo` animasiyası, slot markerləri.
- **🅿️ Horizontal Slot Strip** – Boş/Dolu/Seçilmiş/Reserved – avtomatik scroll-into-view.
- **🚗 Waze Deep Link** – `https://waze.com/ul?ll=...&navigate=yes` formatı ilə yeni tabda naviqasiya.

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

Yəni hostluq `public/index.html`-i kök URL kimi serve edir, o da `standalone.html`-in tam surətidir.
