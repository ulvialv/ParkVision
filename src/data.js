// AzParking mock data + road geometry helpers — Bakı boyu 16 zona.
// `heading` = compass bearing of the street (deg from north, clockwise).
// `pricePerHour` is in AZN.

export const MOCK_ZONES = [
  // ─── MƏRKƏZ / Səbail ─────────────────────────────────────
  {
    id: 'P10101', code: 'P10101',
    name: 'Fəvvarələr Meydanı - Nizami küç.',
    coordinates: { lat: 40.3725, lng: 49.8389 }, heading: 95,
    totalSlots: 180, availableSlots: 24,
    pricePerHour: 1.5, isAccessible: true, distance: 120,
    sectors: ['A', 'B'],
    visualSlots: 30, visualAvailable: [3, 7, 12, 18, 22, 27],
  },
  {
    id: 'P10208', code: 'P10208',
    name: 'İçərişəhər - Qala divarları',
    coordinates: { lat: 40.3656, lng: 49.8350 }, heading: 70,
    totalSlots: 45, availableSlots: 8,
    pricePerHour: 2.0, isAccessible: false, distance: 340,
    sectors: ['A'],
    visualSlots: 15, visualAvailable: [2, 5, 9, 13],
  },
  {
    id: 'P10312', code: 'P10312',
    name: 'Sahil Bulvarı - Mərkəzi giriş',
    coordinates: { lat: 40.3670, lng: 49.8410 }, heading: 88,
    totalSlots: 320, availableSlots: 95,
    pricePerHour: 1.0, isAccessible: true, distance: 260,
    sectors: ['A', 'B', 'C', 'D'],
    visualSlots: 36, visualAvailable: [1, 4, 8, 12, 15, 19, 22, 26, 29, 32, 35],
  },
  {
    id: 'P10455', code: 'P10455',
    name: '28 May metro - Tbilisi pr.',
    coordinates: { lat: 40.3789, lng: 49.8489 }, heading: 10,
    totalSlots: 95, availableSlots: 22,
    pricePerHour: 1.2, isAccessible: false, distance: 210,
    sectors: ['A', 'B'],
    visualSlots: 22, visualAvailable: [2, 6, 10, 14, 18, 21],
  },
  {
    id: 'P10520', code: 'P10520',
    name: 'Port Baku Mall - Neftçilər pr.',
    coordinates: { lat: 40.3717, lng: 49.8497 }, heading: 90,
    totalSlots: 380, availableSlots: 88,
    pricePerHour: 2.0, isAccessible: true, distance: 380,
    sectors: ['A', 'B', 'C'],
    visualSlots: 30, visualAvailable: [2, 5, 9, 13, 17, 21, 24, 27],
  },

  // ─── ATATÜRK / Yasamal axisi ────────────────────────────
  {
    id: 'P10742', code: 'P10742',
    name: 'Atatürk pr. - Mərkəzi xətt',
    coordinates: { lat: 40.3777, lng: 49.8533 }, heading: 95,
    totalSlots: 267, availableSlots: 61,
    pricePerHour: 1.0, isAccessible: false, distance: 540,
    sectors: ['A', 'B', 'C'],
    visualSlots: 42, visualAvailable: [3, 8, 12, 17, 21, 26, 30, 35, 38],
  },
  {
    id: 'P10808', code: 'P10808',
    name: 'Yasamal - Şərifzadə küç.',
    coordinates: { lat: 40.3917, lng: 49.8200 }, heading: 105,
    totalSlots: 88, availableSlots: 19,
    pricePerHour: 0.8, isAccessible: false, distance: 1820,
    sectors: ['A', 'B'],
    visualSlots: 22, visualAvailable: [2, 5, 9, 12, 15],
  },
  {
    id: 'P10912', code: 'P10912',
    name: 'Memar Əcəmi metro',
    coordinates: { lat: 40.4036, lng: 49.8169 }, heading: 100,
    totalSlots: 130, availableSlots: 40,
    pricePerHour: 0.8, isAccessible: true, distance: 2640,
    sectors: ['A', 'B'],
    visualSlots: 25, visualAvailable: [1, 4, 7, 11, 14, 18, 22],
  },

  // ─── ŞİMAL ─────────────────────────────────────────────
  {
    id: 'P11045', code: 'P11045',
    name: '20 Yanvar metro',
    coordinates: { lat: 40.4083, lng: 49.8194 }, heading: 10,
    totalSlots: 165, availableSlots: 28,
    pricePerHour: 0.8, isAccessible: false, distance: 3010,
    sectors: ['A', 'B'],
    visualSlots: 28, visualAvailable: [3, 7, 11, 16, 20, 24],
  },
  {
    id: 'P11108', code: 'P11108',
    name: 'Genclik Mall - Hüsü Hacıyev',
    coordinates: { lat: 40.4039, lng: 49.8503 }, heading: 70,
    totalSlots: 520, availableSlots: 140,
    pricePerHour: 1.2, isAccessible: true, distance: 2740,
    sectors: ['A', 'B', 'C', 'D'],
    visualSlots: 36, visualAvailable: [1, 4, 7, 11, 14, 17, 20, 23, 26, 29, 32, 35],
  },
  {
    id: 'P11220', code: 'P11220',
    name: 'Koroğlu metro - Zığ şossesi',
    coordinates: { lat: 40.4036, lng: 49.9111 }, heading: 95,
    totalSlots: 95, availableSlots: 35,
    pricePerHour: 0.7, isAccessible: false, distance: 5680,
    sectors: ['A', 'B'],
    visualSlots: 22, visualAvailable: [2, 5, 8, 12, 15, 18, 21],
  },

  // ─── ŞƏRQ / Xətai ──────────────────────────────────────
  {
    id: 'P11354', code: 'P11354',
    name: 'Xətai - 8 Noyabr pr.',
    coordinates: { lat: 40.3911, lng: 49.9019 }, heading: 100,
    totalSlots: 75, availableSlots: 12,
    pricePerHour: 0.7, isAccessible: false, distance: 5210,
    sectors: ['A', 'B'],
    visualSlots: 20, visualAvailable: [3, 7, 11, 15],
  },
  {
    id: 'P11488', code: 'P11488',
    name: 'Heydər Əliyev Sarayı - Nərimanov',
    coordinates: { lat: 40.3939, lng: 49.8775 }, heading: 5,
    totalSlots: 240, availableSlots: 67,
    pricePerHour: 1.0, isAccessible: true, distance: 3580,
    sectors: ['A', 'B', 'C'],
    visualSlots: 32, visualAvailable: [2, 5, 9, 13, 17, 21, 25, 28, 31],
  },

  // ─── CƏNUB / Bayıl ─────────────────────────────────────
  {
    id: 'P11622', code: 'P11622',
    name: 'Bayıl - Bayraq Meydanı',
    coordinates: { lat: 40.3506, lng: 49.8447 }, heading: 85,
    totalSlots: 200, availableSlots: 72,
    pricePerHour: 0.5, isAccessible: false, distance: 2410,
    sectors: ['A', 'B'],
    visualSlots: 28, visualAvailable: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28],
  },
  {
    id: 'P11750', code: 'P11750',
    name: 'Crystal Hall - Milli Park',
    coordinates: { lat: 40.3464, lng: 49.8500 }, heading: 80,
    totalSlots: 150, availableSlots: 50,
    pricePerHour: 0.8, isAccessible: true, distance: 2980,
    sectors: ['A', 'B'],
    visualSlots: 24, visualAvailable: [2, 5, 8, 11, 15, 18, 21, 23],
  },
  {
    id: 'P11890', code: 'P11890',
    name: 'Səbail - Hyatt Regency',
    coordinates: { lat: 40.3917, lng: 49.8156 }, heading: 15,
    totalSlots: 118, availableSlots: 0,
    pricePerHour: 1.5, isAccessible: true, distance: 1990,
    sectors: ['A', 'B'],
    visualSlots: 22, visualAvailable: [],
  },
];

// ─── PARKING DURATIONS (used by PaymentModal) ───────────────
export const DURATIONS = [
  { id: '15m', label: '15 dəq', minutes: 15 },
  { id: '1h',  label: '1 saat', minutes: 60 },
  { id: '2h',  label: '2 saat', minutes: 120 },
  { id: '3h',  label: '3 saat', minutes: 180 },
  { id: '4h',  label: '4 saat', minutes: 240 },
  { id: 'other', label: 'Digər', minutes: 60 },
];

// ─── SLOT GEOMETRY ──────────────────────────────────────────
// ~5 m between adjacent kerb-side stalls is realistic for a sedan.
const SLOT_SPACING_M = 5.2;
const M_PER_DEG_LAT  = 111_111;

export function generateSlots(zoneId, count, availableList, baseLat, baseLng, headingDeg = 90) {
  // Project a centered line of slots along the street's heading vector.
  const headingRad = (headingDeg * Math.PI) / 180;
  const dN_per_step = Math.cos(headingRad) * SLOT_SPACING_M;
  const dE_per_step = Math.sin(headingRad) * SLOT_SPACING_M;
  const mPerDegLng  = M_PER_DEG_LAT * Math.cos((baseLat * Math.PI) / 180);
  const half        = (count - 1) / 2;

  return Array.from({ length: count }, (_, i) => {
    const slotNumber = i + 1;
    const isAvailable = availableList.includes(slotNumber);
    const stepDelta = i - half;
    const dN = stepDelta * dN_per_step;
    const dE = stepDelta * dE_per_step;
    return {
      id: `${zoneId}-S${String(slotNumber).padStart(3, '0')}`,
      zoneId,
      slotNumber,
      sector: zoneId,
      status: isAvailable ? 'available' : 'occupied',
      coordinates: {
        lat: baseLat + dN / M_PER_DEG_LAT,
        lng: baseLng + dE / mPerDegLng,
      },
      isAccessible: [3, 15].includes(slotNumber),
      lastUpdated: new Date().toISOString(),
    };
  });
}

export function buildInitialSlots() {
  const map = {};
  for (const z of MOCK_ZONES) {
    map[z.id] = generateSlots(
      z.id, z.visualSlots, z.visualAvailable,
      z.coordinates.lat, z.coordinates.lng, z.heading ?? 90
    );
  }
  return map;
}

export function refreshSlots(zone) {
  const total = zone.visualSlots;
  if (total === 0) return [];
  const ratio = zone.availableSlots / Math.max(1, zone.totalSlots);
  const targetAvail = Math.max(0, Math.round(total * ratio));
  const set = new Set();
  const seedAvail = [...zone.visualAvailable];
  while (set.size < targetAvail && set.size < total) {
    if (seedAvail.length && Math.random() > 0.45) set.add(seedAvail.shift());
    else set.add(Math.floor(Math.random() * total) + 1);
  }
  const slots = generateSlots(
    zone.id, total, [...set],
    zone.coordinates.lat, zone.coordinates.lng, zone.heading ?? 90
  );
  // If we already pulled the real road geometry for this zone, snap
  // the regenerated slots back onto it so the refresh doesn't undo
  // the kerb-side alignment.
  const cached = ROAD_CACHE.get(zone.id);
  if (cached) {
    const positions = placeSlotsAlongRoad(cached, zone.coordinates, total);
    if (positions) {
      return slots.map((s, i) => positions[i] ? { ...s, coordinates: positions[i] } : s);
    }
  }
  return slots;
}

// ─── ROAD GEOMETRY (Overpass + polyline math) ───────────────
// Pulls real OSM road geometry near each zone so slot pins land on
// the kerb instead of crossing buildings. Cached in-memory.
export const ROAD_CACHE = new Map(); // zoneId -> { points, perpDist }

export function haversineM(a, b) {
  const R = 6371000;
  const lat1 = a.lat * Math.PI / 180;
  const lat2 = b.lat * Math.PI / 180;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

function localMetres(latRef) {
  const mLat = M_PER_DEG_LAT;
  const mLng = M_PER_DEG_LAT * Math.cos(latRef * Math.PI / 180);
  return { mLat, mLng };
}

function distPointToSegment(p, a, b) {
  const { mLat, mLng } = localMetres((a.lat + b.lat) / 2);
  const ax = (a.lng - p.lng) * mLng, ay = (a.lat - p.lat) * mLat;
  const bx = (b.lng - p.lng) * mLng, by = (b.lat - p.lat) * mLat;
  const dx = bx - ax, dy = by - ay;
  const segLenSq = dx * dx + dy * dy;
  if (segLenSq < 1e-6) return Math.hypot(ax, ay);
  let t = -(ax * dx + ay * dy) / segLenSq;
  t = Math.max(0, Math.min(1, t));
  const cx = ax + t * dx, cy = ay + t * dy;
  return Math.hypot(cx, cy);
}

function buildPolyline(points) {
  const segments = [];
  let cum = 0;
  for (let i = 1; i < points.length; i++) {
    const len = haversineM(points[i - 1], points[i]);
    segments.push({ a: points[i - 1], b: points[i], start: cum, end: cum + len, len });
    cum += len;
  }
  return { points, segments, length: cum };
}

function pointAtDistance(poly, dist) {
  if (!poly.segments.length) return null;
  if (dist <= 0) {
    const seg = poly.segments[0];
    return { lat: seg.a.lat, lng: seg.a.lng, seg };
  }
  if (dist >= poly.length) {
    const seg = poly.segments[poly.segments.length - 1];
    return { lat: seg.b.lat, lng: seg.b.lng, seg };
  }
  for (const seg of poly.segments) {
    if (dist >= seg.start && dist <= seg.end) {
      const t = seg.len === 0 ? 0 : (dist - seg.start) / seg.len;
      return {
        lat: seg.a.lat + (seg.b.lat - seg.a.lat) * t,
        lng: seg.a.lng + (seg.b.lng - seg.a.lng) * t,
        seg,
      };
    }
  }
  return null;
}

function projectOnPolyline(poly, p) {
  let bestPerp = Infinity, bestAt = 0;
  for (const seg of poly.segments) {
    const { mLat, mLng } = localMetres(seg.a.lat);
    const bx = (seg.b.lng - seg.a.lng) * mLng;
    const by = (seg.b.lat - seg.a.lat) * mLat;
    const px = (p.lng - seg.a.lng) * mLng;
    const py = (p.lat - seg.a.lat) * mLat;
    const segLenSq = bx * bx + by * by;
    let t = segLenSq < 1e-6 ? 0 : (px * bx + py * by) / segLenSq;
    t = Math.max(0, Math.min(1, t));
    const cx = t * bx, cy = t * by;
    const perp = Math.hypot(px - cx, py - cy);
    if (perp < bestPerp) { bestPerp = perp; bestAt = seg.start + t * seg.len; }
  }
  return { dist: bestAt, perpDist: bestPerp };
}

// Distribute `count` slot positions along the polyline, centered on
// `anchor` (the zone coordinate), offset to the kerb.
export function placeSlotsAlongRoad(road, anchor, count, kerbOffsetM = 3.2, spacingM = 5.2) {
  const poly = buildPolyline(road.points);
  if (poly.length < spacingM) return null;
  const proj = projectOnPolyline(poly, anchor);
  const half = (count - 1) / 2;
  const result = [];
  for (let i = 0; i < count; i++) {
    let d = proj.dist + (i - half) * spacingM;
    if (d < 0) d = 0;
    if (d > poly.length) d = poly.length;
    const p = pointAtDistance(poly, d);
    if (!p) { result.push(null); continue; }
    const { mLat, mLng } = localMetres(p.lat);
    const dx = (p.seg.b.lng - p.seg.a.lng) * mLng;
    const dy = (p.seg.b.lat - p.seg.a.lat) * mLat;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len, uy = dy / len;
    // Right-hand perpendicular (kerb side for right-hand traffic in AZ).
    const offE = uy * kerbOffsetM;
    const offN = -ux * kerbOffsetM;
    result.push({
      lat: p.lat + offN / mLat,
      lng: p.lng + offE / mLng,
    });
  }
  return result;
}

export async function fetchRoadForZone(zone) {
  if (ROAD_CACHE.has(zone.id)) return ROAD_CACHE.get(zone.id);
  const { lat, lng } = zone.coordinates;
  const filter = '[highway~"^(primary|secondary|tertiary|residential|unclassified|trunk|trunk_link|primary_link|secondary_link|tertiary_link|living_street|service|pedestrian)$"]';
  const query = `[out:json][timeout:10];way(around:60,${lat},${lng})${filter};out geom;`;
  const endpoints = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://overpass.private.coffee/api/interpreter',
    'https://overpass.openstreetmap.fr/api/interpreter',
  ];
  for (const ep of endpoints) {
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 9000);
      const res = await fetch(ep, {
        method: 'POST',
        body: 'data=' + encodeURIComponent(query),
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const json = await res.json();
      if (!json.elements || !json.elements.length) throw new Error('no roads');
      let bestPoints = null, bestPerp = Infinity;
      for (const w of json.elements) {
        if (!w.geometry || w.geometry.length < 2) continue;
        const pts = w.geometry.map(g => ({ lat: g.lat, lng: g.lon }));
        let minPerp = Infinity;
        for (let i = 1; i < pts.length; i++) {
          const d = distPointToSegment({ lat, lng }, pts[i - 1], pts[i]);
          if (d < minPerp) minPerp = d;
        }
        if (minPerp < bestPerp) { bestPerp = minPerp; bestPoints = pts; }
      }
      if (!bestPoints) throw new Error('no closest road');
      const data = { points: bestPoints, perpDist: bestPerp };
      ROAD_CACHE.set(zone.id, data);
      return data;
    } catch (_e) {
      // try next endpoint
    }
  }
  return null;
}

// SVG used for the live user-location marker (blue pulsing dot).
export const USER_DOT_HTML = (
  '<div style="position:relative;width:22px;height:22px;">' +
    '<span style="position:absolute;inset:0;border-radius:50%;background:#3B82F6;opacity:.35;animation:azUserPulse 1.6s ease-out infinite;"></span>' +
    '<span style="position:absolute;left:5px;top:5px;width:12px;height:12px;border-radius:50%;background:#3B82F6;border:2px solid #fff;box-shadow:0 0 0 2px rgba(59,130,246,.35),0 2px 6px rgba(0,0,0,.25);"></span>' +
  '</div>'
);

export function fmtDistance(m) {
  if (m >= 1000) return (m / 1000).toFixed(1) + ' km';
  return Math.round(m) + ' m';
}

export function pickGridCols(n) {
  if (n <= 4) return Math.max(1, n);
  if (n <= 12) return 4;
  if (n <= 24) return 5;
  if (n <= 36) return 6;
  return 7;
}
