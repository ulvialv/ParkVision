import React, { useState, useEffect, useCallback, useMemo } from 'react';

import {
  MOCK_ZONES,
  DURATIONS,
  buildInitialSlots,
  refreshSlots,
  fetchRoadForZone,
  placeSlotsAlongRoad,
  haversineM,
} from './data.js';
import { fetchAIRecommendation } from './ai.js';
import { SplashScreen } from './components/Splash.jsx';
import { HomeScreen } from './components/Home.jsx';
import { ZoneDetailScreen } from './components/ZoneDetail.jsx';
import { ProximityModal, Confetti } from './components/Proximity.jsx';
import { BottomNav, PhoneShell } from './components/Shell.jsx';
import { FullMapScreen } from './components/FullMapScreen.jsx';
import { HistoryScreen } from './components/HistoryScreen.jsx';
import { ProfileScreen } from './components/ProfileScreen.jsx';
import { MoreScreen } from './components/MoreScreen.jsx';
import { PaymentModal } from './components/PaymentModal.jsx';

const USER = { name: 'Mustafa M.', initial: 'M', phone: '+994 50 *** ** 21' };

export default function App() {
  // ── view + selection ────────────────────────────────────
  const [view, setView] = useState('splash');
  const [selectedZoneId, setSelectedZoneId] = useState(null);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [zoneSlots, setZoneSlots] = useState(buildInitialSlots);

  // ── AI ──────────────────────────────────────────────────
  const [aiRec, setAiRec] = useState(null);
  const [aiLoading, setAiLoading] = useState(true);

  // ── modals + UI state ──────────────────────────────────
  const [proximityOpen, setProximityOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [accessibilityFilter, setAccessibilityFilter] = useState(false);
  const [tab, setTab] = useState('zones');
  const [refreshing, setRefreshing] = useState(false);

  // ── user / wallet / sessions ────────────────────────────
  const [balance, setBalance] = useState(25.0);
  const [userCar, setUserCar] = useState('99-AA-999');
  const [activeSession, setActiveSession] = useState(null);
  const [parkingHistory, setParkingHistory] = useState([
    { id: 'h1', zoneName: 'Atatürk pr. - Mərkəzi xətt',     slotNumber: 31, date: '24 apr 2026', duration: '1 saat', totalAZN: 1.0 },
    { id: 'h2', zoneName: 'Fəvvarələr Meydanı - Nizami küç.', slotNumber: 7,  date: '21 apr 2026', duration: '2 saat', totalAZN: 3.0 },
    { id: 'h3', zoneName: 'Sahil Bulvarı - Mərkəzi giriş',  slotNumber: 14, date: '18 apr 2026', duration: '30 dəq', totalAZN: 0.5 },
  ]);
  const [toast, setToast] = useState(null);
  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  }, []);

  // ── live geolocation watch ──────────────────────────────
  const [userLocation, setUserLocation] = useState(null);
  const [, setGeoError] = useState(null);
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
      setGeoError('unsupported');
      return;
    }
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          ts: pos.timestamp,
        });
        setGeoError(null);
      },
      (err) => {
        setGeoError(err.code === 1 ? 'denied' : err.code === 3 ? 'timeout' : 'error');
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );
    return () => {
      try { navigator.geolocation.clearWatch(watchId); } catch (_) {}
    };
  }, []);

  // ── snap slot coords to real OSM road geometry ──────────
  // Concurrency-limited so Overpass doesn't rate-limit us.
  useEffect(() => {
    let cancelled = false;
    const CONCURRENCY = 3;
    (async () => {
      const queue = [...MOCK_ZONES];
      async function worker() {
        while (!cancelled && queue.length) {
          const z = queue.shift();
          const road = await fetchRoadForZone(z);
          if (cancelled || !road) continue;
          const positions = placeSlotsAlongRoad(road, z.coordinates, z.visualSlots);
          if (!positions) continue;
          setZoneSlots((prev) => {
            if (!prev[z.id]) return prev;
            return {
              ...prev,
              [z.id]: prev[z.id].map((s, i) =>
                positions[i] ? { ...s, coordinates: positions[i] } : s
              ),
            };
          });
        }
      }
      await Promise.all(Array.from({ length: CONCURRENCY }, worker));
    })();
    return () => { cancelled = true; };
  }, []);

  // ── AI recommendation ───────────────────────────────────
  useEffect(() => {
    if (view !== 'home' || aiRec) return;
    let cancelled = false;
    setAiLoading(true);
    fetchAIRecommendation().then((rec) => {
      if (!cancelled) {
        setAiRec(rec);
        setAiLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [view, aiRec]);

  // ── derived ─────────────────────────────────────────────
  const selectedZone = useMemo(
    () => MOCK_ZONES.find((z) => z.id === selectedZoneId) || null,
    [selectedZoneId]
  );
  const slotsForZone = selectedZoneId ? zoneSlots[selectedZoneId] : [];
  const selectedSlot = useMemo(
    () => slotsForZone?.find((s) => s.id === selectedSlotId) || null,
    [slotsForZone, selectedSlotId]
  );

  // Closest available slot across all zones, relative to user.
  const nearestAvailableSlot = useMemo(() => {
    if (!userLocation) return null;
    let best = null, bestDist = Infinity;
    for (const z of MOCK_ZONES) {
      const list = zoneSlots[z.id] || [];
      for (const s of list) {
        if (s.status !== 'available') continue;
        const d = haversineM(userLocation, s.coordinates);
        if (d < bestDist) {
          bestDist = d;
          best = { slot: s, zone: z, distance: d };
        }
      }
    }
    return best;
  }, [userLocation, zoneSlots]);

  const activeNav =
    view === 'home' || view === 'zone_detail' ? 'parking'
    : view === 'vaxt'   ? 'vaxt'
    : view === 'xerite' ? 'xerite'
    : view === 'diger'  ? 'diger'
    : view === 'profil' ? 'profil'
    : 'parking';

  // ── handlers ────────────────────────────────────────────
  const handleZoneSelect = useCallback((zoneId) => {
    setSelectedZoneId(zoneId);
    setSelectedSlotId(null);
    setView('zone_detail');
  }, []);

  const handleAIGo = useCallback(() => {
    if (!aiRec) return;
    setSelectedZoneId(aiRec.recommendedZoneId);
    setSelectedSlotId(aiRec.recommendedSlotId);
    setView('zone_detail');
  }, [aiRec]);

  const handleSelectSlot = useCallback((slot) => {
    if (!slot || slot.status !== 'available') return;
    setSelectedSlotId(slot.id);
  }, []);

  const handleRefresh = useCallback(() => {
    if (!selectedZone) return;
    setRefreshing(true);
    setTimeout(() => {
      setZoneSlots((prev) => ({
        ...prev,
        [selectedZone.id]: refreshSlots(selectedZone),
      }));
      setSelectedSlotId(null);
      setRefreshing(false);
    }, 600);
  }, [selectedZone]);

  const handleBack = useCallback(() => setView('home'), []);

  // Park Et tapped on the zone-detail screen → open payment sheet.
  const handleOpenPayment = useCallback(() => {
    if (!selectedSlot) return;
    setPaymentOpen(true);
  }, [selectedSlot]);

  // Təsdiq edin tapped inside the payment modal → confirm + park.
  const handleConfirmPayment = useCallback(
    (details) => {
      if (!selectedZone || !selectedSlot) return;
      setShowConfetti(true);

      // Mark the slot as occupied on the live board.
      setZoneSlots((prev) => ({
        ...prev,
        [selectedZone.id]: prev[selectedZone.id].map((s) =>
          s.id === selectedSlot.id ? { ...s, status: 'occupied' } : s
        ),
      }));

      // Persist car plate & deduct wallet balance when applicable.
      if (details.carPlate && details.carPlate !== 'GUEST') {
        setUserCar(details.carPlate);
      }
      if (details.payMethod === 'wallet' && details.totalAZN > 0) {
        setBalance((b) => Math.max(0, +(b - details.totalAZN).toFixed(2)));
      }

      // Create / replace the active session.
      const dur =
        DURATIONS.find((d) => d.id === details.durationId) || DURATIONS[1];
      const now = new Date();
      const startedLabel = now.toLocaleTimeString('az-AZ', {
        hour: '2-digit',
        minute: '2-digit',
      });
      setActiveSession({
        id: 'sess-' + now.getTime(),
        zoneId: selectedZone.id,
        zoneName: selectedZone.name,
        slotNumber: selectedSlot.slotNumber,
        carPlate: details.carPlate || userCar,
        payMethod: details.payMethod,
        payTiming: details.payTiming,
        totalAZN: details.totalAZN || 0,
        durationLabel: dur.label,
        durationMinutes: dur.minutes,
        startedAt: now.toISOString(),
        startedLabel,
      });

      setTimeout(() => {
        setPaymentOpen(false);
        setProximityOpen(false);
        setSelectedSlotId(null);
        showToast('Parklanma təsdiq edildi ✅');
      }, 1100);
      setTimeout(() => setShowConfetti(false), 3200);
    },
    [selectedZone, selectedSlot, userCar, showToast]
  );

  // Bottom-nav tap → switch top-level view.
  const handleNavChange = useCallback((id) => {
    if (id === 'parking') setView('home');
    else if (id === 'vaxt')   setView('vaxt');
    else if (id === 'xerite') setView('xerite');
    else if (id === 'diger')  setView('diger');
    else if (id === 'profil') setView('profil');
  }, []);

  // ── Vaxt screen handlers ────────────────────────────────
  const handleEndSession = useCallback(() => {
    if (!activeSession) return;
    setZoneSlots((prev) => {
      const list = prev[activeSession.zoneId];
      if (!list) return prev;
      return {
        ...prev,
        [activeSession.zoneId]: list.map((s) =>
          s.slotNumber === activeSession.slotNumber
            ? { ...s, status: 'available' }
            : s
        ),
      };
    });
    setParkingHistory((h) =>
      [
        {
          id: activeSession.id,
          zoneName: activeSession.zoneName,
          slotNumber: activeSession.slotNumber,
          date: new Date().toLocaleDateString('az-AZ', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
          duration: activeSession.durationLabel,
          totalAZN: activeSession.totalAZN,
        },
        ...h,
      ].slice(0, 12)
    );
    setActiveSession(null);
    showToast('Sessiya bitirildi');
  }, [activeSession, showToast]);

  // ── Profile / More handlers ─────────────────────────────
  const handleTopUp = useCallback(() => {
    setBalance((b) => +(b + 10).toFixed(2));
    showToast('+10 AZN balansa əlavə olundu');
  }, [showToast]);
  const handleAddCar = useCallback(() => {
    const next = window.prompt('Avtomobil nömrəsini daxil edin:', userCar || '');
    if (next && next.trim()) {
      setUserCar(next.trim().toUpperCase());
      showToast('Avtomobil yeniləndi');
    }
  }, [userCar, showToast]);
  const handleLogout = useCallback(() => {
    showToast('Demo rejimində çıxış deaktivdir');
  }, [showToast]);
  const handleMoreAction = useCallback(
    (item) => {
      showToast(item.label + ' — demo rejimində');
    },
    [showToast]
  );

  // The proximity modal's "PARK ET" CTA → close proximity, open payment.
  const handlePark = useCallback(() => {
    setProximityOpen(false);
    if (selectedSlot) setPaymentOpen(true);
  }, [selectedSlot]);

  return (
    <PhoneShell>
      {view === 'splash' && <SplashScreen onDone={() => setView('home')} />}

      {view === 'home' && (
        <HomeScreen
          zones={MOCK_ZONES}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          accessibilityFilter={accessibilityFilter}
          setAccessibilityFilter={setAccessibilityFilter}
          tab={tab}
          setTab={setTab}
          aiRec={aiRec}
          aiLoading={aiLoading}
          onZoneSelect={handleZoneSelect}
          onAIGo={handleAIGo}
        />
      )}

      {view === 'zone_detail' && selectedZone && (
        <ZoneDetailScreen
          zone={selectedZone}
          slots={slotsForZone}
          selectedSlot={selectedSlot}
          onBack={handleBack}
          onSelectSlot={handleSelectSlot}
          onRefresh={handleRefresh}
          onProximity={() => setProximityOpen(true)}
          onPark={handleOpenPayment}
          refreshing={refreshing}
          userLocation={userLocation}
          nearestSlot={nearestAvailableSlot}
        />
      )}

      {view === 'vaxt' && (
        <HistoryScreen
          activeSession={activeSession}
          history={parkingHistory}
          onEndSession={handleEndSession}
          onPickZone={() => setView('home')}
        />
      )}

      {view === 'xerite' && (
        <FullMapScreen
          zones={MOCK_ZONES}
          onSelectZone={handleZoneSelect}
          userLocation={userLocation}
          nearestSlot={nearestAvailableSlot}
        />
      )}

      {view === 'diger' && <MoreScreen onAction={handleMoreAction} />}

      {view === 'profil' && (
        <ProfileScreen
          user={USER}
          balance={balance}
          userCar={userCar}
          onTopUp={handleTopUp}
          onAddCar={handleAddCar}
          onLogout={handleLogout}
        />
      )}

      {view !== 'splash' && (
        <BottomNav active={activeNav} onChange={handleNavChange} />
      )}

      {proximityOpen && selectedZone && selectedSlot && (
        <ProximityModal
          zone={selectedZone}
          slots={slotsForZone}
          selectedSlot={selectedSlot}
          onClose={() => setProximityOpen(false)}
          onPark={handlePark}
        />
      )}

      {paymentOpen && selectedZone && selectedSlot && (
        <PaymentModal
          zone={selectedZone}
          slot={selectedSlot}
          balance={balance}
          onClose={() => setPaymentOpen(false)}
          onConfirm={handleConfirmPayment}
        />
      )}

      {showConfetti && <Confetti />}

      {toast && (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-24 z-[400] animate-fade-in pointer-events-none">
          <div className="bg-az-ink text-white text-[12px] font-display font-bold px-4 py-2.5 rounded-full shadow-lg shadow-black/20">
            {toast}
          </div>
        </div>
      )}
    </PhoneShell>
  );
}
