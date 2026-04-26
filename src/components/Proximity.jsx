import React, { useMemo } from 'react';
import { X, Target, Navigation, Sparkles } from 'lucide-react';

const CONFETTI_COLORS = [
  '#16A34A', '#22C55E', '#FBBF24', '#DC2626',
  '#0F4C3A', '#3B82F6', '#F97316', '#A855F7',
];

export function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2.4 + Math.random() * 1.6,
        color:
          CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        w: 6 + Math.random() * 8,
        h: 8 + Math.random() * 12,
        rotate: Math.random() * 360,
      })),
    []
  );
  return (
    <div className="fixed inset-0 pointer-events-none z-[300] overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            left: p.left + '%',
            top: '-12vh',
            width: p.w + 'px',
            height: p.h + 'px',
            background: p.color,
            transform: `rotate(${p.rotate}deg)`,
            animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards`,
            borderRadius: '2px',
            boxShadow: '0 0 6px rgba(0,0,0,0.08)',
          }}
        />
      ))}
    </div>
  );
}

function MiniSlot({ slot, isCenter }) {
  if (isCenter) {
    return (
      <div className="relative flex flex-col items-center">
        <span className="absolute -top-7 text-az-available text-[10px] font-display font-extrabold tracking-wider whitespace-nowrap">
          ↓ SİZİN SLOT
        </span>
        <div className="relative">
          <span className="absolute inset-0 rounded-2xl bg-az-available/30 animate-halo" />
          <div className="relative w-[88px] h-[112px] rounded-2xl bg-gradient-to-b from-az-available to-az-primary text-white flex flex-col items-center justify-center shadow-glow-green ring-4 ring-white animate-pulse-slot">
            <span className="font-display font-extrabold text-[34px] leading-none">
              {slot.slotNumber}
            </span>
            <span className="text-[10px] mt-2 tracking-widest font-bold opacity-95">
              SİZİN
            </span>
          </div>
        </div>
      </div>
    );
  }

  let cls = '';
  let label = 'BOŞ';
  if (slot.status === 'occupied') {
    cls = 'bg-az-occupied-bg border border-az-occupied/40 text-az-ink-soft';
    label = 'DOLU';
  } else if (slot.status === 'reserved') {
    cls = 'bg-az-reserved/15 border border-az-reserved/50 text-az-reserved';
    label = 'RES';
  } else {
    cls = 'bg-az-available/90 text-white';
  }

  return (
    <div
      className={`w-[52px] h-[68px] rounded-xl flex flex-col items-center justify-center font-display font-extrabold ${cls}`}
    >
      <span className="text-[18px] leading-none">{slot.slotNumber}</span>
      <span className="text-[8px] mt-1 tracking-widest opacity-90">{label}</span>
    </div>
  );
}

export function ProximityModal({ zone, slots, selectedSlot, onClose, onPark }) {
  if (!selectedSlot) return null;

  const idx = slots.findIndex((s) => s.id === selectedSlot.id);
  const offsets = [-3, -2, -1, 0, 1, 2, 3];
  const window7 = offsets.map((d) => slots[idx + d]).filter(Boolean);

  return (
    <div className="fixed inset-0 z-[180] flex items-end justify-center animate-fade-in">
      <div
        className="absolute inset-0 bg-az-ink/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative w-full md:max-w-[430px] bg-white rounded-t-[28px] shadow-2xl animate-slide-up"
        style={{ maxHeight: '85vh' }}
      >
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-az-occupied/40" />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-az-occupied-bg text-az-ink-soft hover:text-az-primary flex items-center justify-center transition z-10"
          aria-label="Bağla"
        >
          <X size={17} />
        </button>

        <div className="px-6 pt-8 pb-6">
          <div className="flex items-center gap-2 mb-1">
            <Target size={18} className="text-az-available" />
            <p className="font-display font-extrabold text-az-primary text-[18px]">
              Parka Yaxınlaşırsınız!
            </p>
          </div>
          <p className="text-[12px] text-az-ink-soft leading-snug mb-6">
            500 metr məsafədəsiniz. Aşağıda parkın daxili görünüşü –{' '}
            <span className="font-bold text-az-primary">
              {zone.code}
            </span>
            . Slot {selectedSlot.slotNumber}-i hazırlayın.
          </p>

          {/* Big slot preview */}
          <div className="relative bg-gradient-to-b from-[#E7F0EA] to-[#F0F4F0] rounded-2xl p-5 pt-8 mb-5 border border-az-primary/10 overflow-hidden">
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 px-2 py-0.5 rounded-full shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-az-available animate-soft-pulse" />
              <span className="text-[9px] font-display font-bold text-az-primary tracking-wide">
                YAXINLAŞMA REJİMİ
              </span>
            </div>

            <div className="flex items-end justify-center gap-1.5 overflow-x-auto scrollbar-hide pt-4 pb-2">
              {window7.map((s, i) => (
                <MiniSlot key={s.id} slot={s} isCenter={s.id === selectedSlot.id} />
              ))}
            </div>

            {/* Lane indicator */}
            <div className="mt-5 flex items-center gap-2 text-[10.5px] text-az-ink-soft">
              <div className="flex-1 h-px border-t border-dashed border-az-primary/30" />
              <span className="font-display font-bold text-az-primary whitespace-nowrap">
                ← {zone.code}
              </span>
              <div className="flex-1 h-px border-t border-dashed border-az-primary/30" />
            </div>
          </div>

          {/* Hint */}
          <div className="flex items-start gap-2.5 bg-az-available/10 border border-az-available/30 rounded-xl p-3 mb-5">
            <Sparkles size={16} className="text-az-available flex-shrink-0 mt-0.5" />
            <p className="text-[12px] leading-snug text-az-ink">
              Parka daxil olduqdan sonra <strong>{zone.code}</strong> sektoruna
              keçin. <strong>Slot {selectedSlot.slotNumber}</strong> sizi gözləyir –
              küçə kənarında {selectedSlot.slotNumber}-ci yer.
            </p>
          </div>

          <button
            onClick={onPark}
            className="w-full h-[56px] rounded-2xl bg-az-available hover:bg-az-available-light active:scale-[0.97] transition text-white font-display font-extrabold text-[15px] flex items-center justify-center gap-2 shadow-lg shadow-az-available/30"
          >
            <Navigation size={18} className="fill-white" />
            PARK ET (Slot {selectedSlot.slotNumber})
          </button>
        </div>
      </div>
    </div>
  );
}
