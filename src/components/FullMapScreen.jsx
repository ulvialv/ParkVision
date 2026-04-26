import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import { Map as MapIconLR, Target } from 'lucide-react';
import { USER_DOT_HTML, fmtDistance } from '../data.js';

export function FullMapScreen({ zones, onSelectZone, userLocation, nearestSlot }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const nearestLineRef = useRef(null);
  const aliveRef = useRef(false);

  // Bounds from the zone list — used for both initial fit and "HAMISI" button.
  const cityBounds = useMemo(() => {
    if (!zones.length) return null;
    const lats = zones.map((z) => z.coordinates.lat);
    const lngs = zones.map((z) => z.coordinates.lng);
    return [
      [Math.min(...lats), Math.min(...lngs)],
      [Math.max(...lats), Math.max(...lngs)],
    ];
  }, [zones]);

  useEffect(() => {
    const L = window.L;
    if (!L || !containerRef.current) return;
    const map = L.map(containerRef.current, {
      zoomControl: false,
      attributionControl: false,
      fadeAnimation: false,
      zoomAnimation: true,
      markerZoomAnimation: false,
    });
    mapRef.current = map;
    aliveRef.current = true;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
    }).addTo(map);
    L.control.zoom({ position: 'topright' }).addTo(map);

    if (cityBounds) {
      map.fitBounds(cityBounds, { padding: [40, 40], maxZoom: 14 });
    } else {
      map.setView([40.378, 49.853], 13);
    }

    const nearestZoneId = nearestSlot ? nearestSlot.zone.id : null;
    zones.forEach((z) => {
      const isNearestZone = z.id === nearestZoneId;
      const colour = isNearestZone
        ? '#3B82F6'
        : z.availableSlots > 0
        ? '#16A34A'
        : '#9CA3AF';
      const ringStyle = isNearestZone
        ? 'box-shadow:0 0 0 3px #fff,0 0 0 6px rgba(59,130,246,.45);animation:azNearestRing 1.4s ease-in-out infinite;'
        : 'box-shadow:0 4px 10px rgba(0,0,0,0.18);';
      const html =
        '<div style="position:relative;">' +
          '<div style="background:' + colour + ';color:#fff;padding:5px 10px;border-radius:14px;font:800 11px Inter,sans-serif;' + ringStyle + 'white-space:nowrap;border:2px solid #fff;">' +
            z.code + ' · ' + z.availableSlots +
          '</div>' +
          '<div style="width:0;height:0;margin:2px auto 0;border:6px solid transparent;border-top-color:' + colour + ';"></div>' +
        '</div>';
      const icon = L.divIcon({
        html,
        className: 'az-zone-marker',
        iconSize: [1, 1],
        iconAnchor: [0, 36],
      });
      L.marker([z.coordinates.lat, z.coordinates.lng], { icon })
        .addTo(map)
        .on('click', () => onSelectZone(z.id));
    });

    return () => {
      aliveRef.current = false;
      try { map.stop(); } catch (_) {}
      try { map.off(); } catch (_) {}
      try { map.remove(); } catch (_) {}
      mapRef.current = null;
      userMarkerRef.current = null;
      nearestLineRef.current = null;
    };
  }, [zones, onSelectZone, nearestSlot, cityBounds]);

  // Live user dot
  useEffect(() => {
    const L = window.L;
    if (!L || !mapRef.current || !aliveRef.current) return;
    if (userMarkerRef.current) {
      try { mapRef.current.removeLayer(userMarkerRef.current); } catch (_) {}
      userMarkerRef.current = null;
    }
    if (!userLocation) return;
    try {
      const icon = L.divIcon({
        html: USER_DOT_HTML,
        className: 'az-user-marker',
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });
      const m = L.marker([userLocation.lat, userLocation.lng], {
        icon,
        zIndexOffset: 900,
        interactive: false,
      });
      m.addTo(mapRef.current);
      userMarkerRef.current = m;
    } catch (_) {}
  }, [userLocation]);

  // Dashed line user → nearest available slot.
  useEffect(() => {
    const L = window.L;
    if (!L || !mapRef.current || !aliveRef.current) return;
    if (nearestLineRef.current) {
      try { mapRef.current.removeLayer(nearestLineRef.current); } catch (_) {}
      nearestLineRef.current = null;
    }
    if (!userLocation || !nearestSlot) return;
    try {
      const line = L.polyline(
        [
          [userLocation.lat, userLocation.lng],
          [nearestSlot.slot.coordinates.lat, nearestSlot.slot.coordinates.lng],
        ],
        { color: '#3B82F6', weight: 3, dashArray: '6, 8', opacity: 0.9 }
      );
      line.addTo(mapRef.current);
      nearestLineRef.current = line;
    } catch (_) {}
  }, [userLocation, nearestSlot]);

  const recenterOnMe = useCallback(() => {
    if (!userLocation || !mapRef.current || !aliveRef.current) return;
    try {
      mapRef.current.flyTo([userLocation.lat, userLocation.lng], 17, {
        duration: 1.0,
      });
    } catch (_) {}
  }, [userLocation]);
  const showAll = useCallback(() => {
    if (!mapRef.current || !aliveRef.current) return;
    try {
      if (cityBounds) {
        mapRef.current.flyToBounds(cityBounds, {
          padding: [40, 40],
          maxZoom: 14,
          duration: 0.8,
        });
      } else {
        mapRef.current.flyTo([40.378, 49.853], 13, { duration: 0.8 });
      }
    } catch (_) {}
  }, [cityBounds]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden animate-fade-in">
      <div className="px-5 pt-3 pb-2 flex items-center gap-2 bg-az-bg flex-shrink-0">
        <MapIconLR size={20} className="text-az-primary" />
        <div className="flex-1 min-w-0">
          <p className="font-display font-extrabold text-az-ink text-[18px] leading-tight">
            Xəritə
          </p>
          <p className="text-[11px] text-az-ink-soft truncate">
            {nearestSlot
              ? `Ən yaxın boş yer: ${nearestSlot.zone.code} · Slot ${nearestSlot.slot.slotNumber} · ${fmtDistance(nearestSlot.distance)}`
              : userLocation
              ? 'Yaxın zona axtarılır…'
              : `${zones.length} zona · pin-ə tap edin`}
          </p>
        </div>
      </div>
      <div
        className="relative flex-1 mx-4 mb-4 rounded-2xl shadow-card overflow-hidden border border-az-primary/5"
        style={{ minHeight: 0 }}
      >
        <div ref={containerRef} className="absolute inset-0" />
        <button
          onClick={showAll}
          aria-label="Bütün zonalar"
          className="absolute top-3 left-3 z-[400] h-8 px-3 rounded-full bg-white shadow-md flex items-center gap-1.5 text-az-primary hover:bg-az-available/10 active:scale-95 transition"
        >
          <MapIconLR size={13} />
          <span className="text-[10px] font-display font-bold tracking-wide">HAMISI</span>
        </button>
        {userLocation && (
          <button
            onClick={recenterOnMe}
            aria-label="Mənim konumum"
            className="absolute bottom-3 right-3 z-[400] w-11 h-11 rounded-xl bg-white shadow-md flex items-center justify-center text-blue-600 hover:bg-blue-50 active:scale-95 transition"
          >
            <Target size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
