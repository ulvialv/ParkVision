import React, { useEffect, useRef } from 'react';

function SlotCard({ slot, isSelected, onClick }) {
  const base =
    'flex-shrink-0 w-[72px] h-[92px] rounded-2xl flex flex-col items-center justify-center font-display font-extrabold transition-all relative';

  if (slot.status === 'available') {
    return (
      <button
        onClick={onClick}
        className={`${base} ${
          isSelected
            ? 'bg-az-primary text-white scale-[1.12] shadow-glow-green ring-2 ring-white animate-pulse-slot'
            : 'bg-az-available text-white hover:scale-[1.05] shadow-md'
        }`}
      >
        <span className="text-[22px] leading-none">{slot.slotNumber}</span>
        <span className="text-[9px] mt-1.5 tracking-widest opacity-90">
          {isSelected ? 'SİZİN' : 'BOŞ'}
        </span>
        {isSelected && (
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-white text-az-primary text-[8px] font-extrabold shadow whitespace-nowrap">
            🎯 SLOT
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      disabled
      className={`${base} bg-az-occupied-bg border-2 border-az-occupied/40 text-az-ink-soft cursor-not-allowed`}
    >
      <span className="text-[22px] leading-none">{slot.slotNumber}</span>
      <span className="text-[9px] mt-1.5 tracking-widest opacity-80">DOLU</span>
    </button>
  );
}

export function SlotStrip({ slots, selectedId, onSelect }) {
  const refs = useRef({});

  useEffect(() => {
    if (!selectedId) return;
    const el = refs.current[selectedId];
    if (el && el.scrollIntoView) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [selectedId]);

  return (
    <div
      className="overflow-x-auto overflow-y-hidden scrollbar-hide flex gap-2.5 px-5 py-3"
      style={{
        touchAction: 'pan-x',
        WebkitOverflowScrolling: 'touch',
        overscrollBehaviorX: 'contain',
      }}
      onWheel={(e) => {
        // Allow vertical wheel/trackpad to scroll horizontally inside the strip
        if (e.deltaY !== 0 && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.currentTarget.scrollLeft += e.deltaY;
        }
      }}
    >
      {slots.map((s) => (
        <div key={s.id} ref={(el) => (refs.current[s.id] = el)}>
          <SlotCard
            slot={s}
            isSelected={s.id === selectedId}
            onClick={s.status === 'available' ? () => onSelect(s) : undefined}
          />
        </div>
      ))}
    </div>
  );
}
