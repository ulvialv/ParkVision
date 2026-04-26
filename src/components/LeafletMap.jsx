import React, { useEffect, useRef, useCallback } from 'react';
import { MapPin, Target } from 'lucide-react';
import { USER_DOT_HTML, fmtDistance } from '../data.js';

export function LeafletMap({
  zone,
  slots,
  selectedSlot,
  onSelectSlot,
  userLocation,
  nearestSlot,
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const slotLayerRef = useRef(null);
  const selectedPinRef = useRef(null);
  const userMarkerRef = useRef(null);
  const aliveRef = useRef(false);
  const selectHandlerRef = useRef(onSelectSlot);

  useEffect(() => {
    selectHandlerRef.current = onSelectSlot;
  }, [onSelectSlot]);

  // Highlight nearest only when it's in the currently displayed zone.
  const nearestId =
    nearestSlot && nearestSlot.zone.id === zone.id ? nearestSlot.slot.id : null;

  // Init the map (when zone changes, fully reinitialize)
  useEffect(() => {
    if (!containerRef.current) return;
    if (typeof window === 'undefined' || !window.L) return;
    const L = window.L;

    const map = L.map(containerRef.current, {
      zoomControl: true,
      attributionControl: true,
      preferCanvas: true,
      fadeAnimation: false,
      zoomAnimation: true,
      markerZoomAnimation: false,
    }).setView([zone.coordinates.lat, zone.coordinates.lng], 19);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '&copy; OpenStreetMap',
    }).addTo(map);

    slotLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;
    aliveRef.current = true;

    const t = setTimeout(() => {
      try { map.invalidateSize(); } catch (_) {}
    }, 250);

    return () => {
      aliveRef.current = false;
      clearTimeout(t);
      // Cancel any in-flight zoom/pan animation before tearing the map down,
      // otherwise an animation-end callback can fire post-remove and throw
      // "Cannot read properties of undefined (reading '_leaflet_pos')".
      try { map.stop(); } catch (_) {}
      try { map.off(); } catch (_) {}
      try { map.remove(); } catch (_) {}
      mapRef.current = null;
      slotLayerRef.current = null;
      selectedPinRef.current = null;
      userMarkerRef.current = null;
    };
  }, [zone.id, zone.coordinates.lat, zone.coordinates.lng]);

  // Slot markers (re-render when slots or nearest change)
  useEffect(() => {
    const L = window.L;
    if (!L || !mapRef.current || !slotLayerRef.current || !aliveRef.current) return;
    slotLayerRef.current.clearLayers();
    slots.forEach((s, idx) => {
      const colorMain =
        s.status === 'available'
          ? '#16A34A'
          : s.status === 'reserved'
          ? '#F59E0B'
          : '#9CA3AF';
      const isNearest = s.id === nearestId;
      const ringStyle = isNearest
        ? 'box-shadow:0 0 0 3px #fff,0 0 0 6px rgba(59,130,246,.45);animation:azNearestRing 1.4s ease-in-out infinite;'
        : 'box-shadow:0 2px 6px rgba(0,0,0,0.25);';
      const html = `
        <div style="position:relative;animation:fadeIn .35s ${idx * 30}ms both;">
          <div style="width:24px;height:24px;border-radius:50%;background:${colorMain};
            border:2px solid #fff;${ringStyle}
            display:flex;align-items:center;justify-content:center;
            color:#fff;font-weight:800;font-size:10px;font-family:Inter,sans-serif;">
            ${s.slotNumber}
          </div>
        </div>`;
      const icon = L.divIcon({
        html,
        className: 'az-marker',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });
      const m = L.marker([s.coordinates.lat, s.coordinates.lng], { icon });
      if (s.status === 'available') {
        m.on('click', () => selectHandlerRef.current?.(s));
      }
      m.addTo(slotLayerRef.current);
    });
  }, [slots, nearestId]);

  // Live user location marker.
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

  // Selected slot: red pin + flyTo
  useEffect(() => {
    const L = window.L;
    if (!L || !mapRef.current || !aliveRef.current) return;
    if (selectedPinRef.current) {
      try { mapRef.current.removeLayer(selectedPinRef.current); } catch (_) {}
      selectedPinRef.current = null;
    }
    if (!selectedSlot) return;
    const html = `
      <div style="position:relative;display:flex;flex-direction:column;align-items:center;transform:translateY(-12px);">
        <div style="background:#fff;border:2px solid #16A34A;border-radius:14px;
          padding:3px 9px;font-size:11px;font-weight:800;color:#0F4C3A;
          font-family:'Plus Jakarta Sans',sans-serif;
          display:flex;align-items:center;gap:5px;
          box-shadow:0 4px 10px rgba(15,76,58,0.25);white-space:nowrap;">
          Slot ${selectedSlot.slotNumber}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l14-9-5 18-3-7-6-2z"/></svg>
        </div>
        <svg width="34" height="44" viewBox="0 0 34 44" style="filter:drop-shadow(0 4px 8px rgba(220,38,38,0.4));margin-top:-2px;">
          <path d="M17 2 C8 2 2 8 2 17 c0 11 15 25 15 25 s15-14 15-25 C32 8 26 2 17 2z" fill="#DC2626" stroke="#fff" stroke-width="2"/>
          <circle cx="17" cy="17" r="6" fill="#fff"/>
          <circle cx="17" cy="17" r="3" fill="#DC2626"/>
        </svg>
      </div>`;
    try {
      const icon = L.divIcon({
        html,
        className: 'az-marker',
        iconSize: [80, 60],
        iconAnchor: [40, 50],
      });
      const pin = L.marker(
        [selectedSlot.coordinates.lat, selectedSlot.coordinates.lng],
        { icon, zIndexOffset: 1000 }
      );
      pin.addTo(mapRef.current);
      selectedPinRef.current = pin;
      mapRef.current.flyTo(
        [selectedSlot.coordinates.lat, selectedSlot.coordinates.lng],
        20,
        { duration: 1.2, animate: true }
      );
    } catch (_) {
      /* swallow rare race when the map is being torn down */
    }
  }, [selectedSlot]);

  const recenterOnMe = useCallback(() => {
    if (!userLocation || !mapRef.current || !aliveRef.current) return;
    try {
      mapRef.current.flyTo([userLocation.lat, userLocation.lng], 18, {
        duration: 1.0,
      });
    } catch (_) {}
  }, [userLocation]);

  return (
    <div className="mx-5 rounded-2xl overflow-hidden shadow-card border border-az-primary/10 relative">
      <div ref={containerRef} className="w-full h-[220px]" />
      <div className="absolute top-2.5 left-2.5 z-[400] bg-white/95 backdrop-blur px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5 pointer-events-none">
        <MapPin size={11} className="text-az-selected" />
        <span className="text-[10px] font-display font-bold text-az-primary">
          XƏRİTƏ · BAKI
        </span>
      </div>
      {userLocation && (
        <button
          onClick={recenterOnMe}
          aria-label="Mənim konumum"
          className="absolute bottom-2.5 right-2.5 z-[400] w-9 h-9 rounded-xl bg-white shadow-md flex items-center justify-center text-blue-600 hover:bg-blue-50 active:scale-95 transition"
        >
          <Target size={15} />
        </button>
      )}
      {nearestSlot && nearestSlot.zone.id === zone.id && (
        <div className="absolute bottom-2.5 left-2.5 z-[400] bg-blue-500 text-white px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5 text-[10px] font-display font-bold pointer-events-none">
          <Target size={11} />
          <span>
            ƏN YAXIN · SLOT {nearestSlot.slot.slotNumber} ·{' '}
            {fmtDistance(nearestSlot.distance)}
          </span>
        </div>
      )}
    </div>
  );
}
