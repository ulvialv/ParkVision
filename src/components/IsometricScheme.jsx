import React, { useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';

// ── 3D STREET-SIDE PARK SCHEME (linear, kerb-style) ───────────
// Top-down perspective of a city street with parallel parking slots
// arranged side by side along the curb. Single horizontal row,
// horizontally scrollable.

function CarTopShape({ cx, cy, w, h, color = '#475569' }) {
  return (
    <g transform={`translate(${cx - w / 2}, ${cy - h / 2})`} style={{ pointerEvents: 'none' }}>
      <rect x={1.5} y={0} width={w - 3} height={h} rx={5.5} fill={color} />
      <rect x={3} y={h * 0.18} width={w - 6} height={h * 0.28} rx={2} fill="#1F2937" opacity="0.55" />
      <rect x={3} y={h * 0.54} width={w - 6} height={h * 0.28} rx={2} fill="#1F2937" opacity="0.55" />
      <rect x={4} y={h * 0.21} width={w - 8} height={h * 0.05} fill="#94A3B8" opacity="0.7" />
      <rect x={4} y={h * 0.74} width={w - 8} height={h * 0.05} fill="#94A3B8" opacity="0.7" />
      <rect x={-0.5} y={h * 0.36} width={2} height={3} rx={1} fill={color} />
      <rect x={w - 1.5} y={h * 0.36} width={2} height={3} rx={1} fill={color} />
    </g>
  );
}

function StreetSlot({ slot, x, W, H, isSelected, onClick }) {
  const isAvail = slot.status === 'available';
  const fill = isAvail ? (isSelected ? '#16A34A' : '#86EFAC') : '#E5E7EB';
  const stroke = isAvail ? (isSelected ? '#0F4C3A' : '#22C55E') : '#9CA3AF';
  const strokeW = isSelected ? 3 : 1.5;
  const carColor = ['#475569', '#1E40AF', '#7F1D1D', '#0F172A', '#374151'][slot.slotNumber % 5];

  return (
    <g
      transform={`translate(${x}, 0)`}
      style={{ cursor: isAvail ? 'pointer' : 'not-allowed' }}
      onClick={isAvail ? onClick : undefined}
    >
      {isSelected && (
        <rect
          x={-4}
          y={-4}
          width={W + 8}
          height={H + 8}
          rx={9}
          fill="none"
          stroke="#16A34A"
          strokeWidth={2}
          opacity={0.55}
          className="animate-halo"
        />
      )}
      <rect width={W} height={H} rx={5} fill={fill} stroke={stroke} strokeWidth={strokeW} />
      <rect x={1.5} y={3} width={1.5} height={H - 6} fill="#FFFFFF" opacity={0.85} />
      <rect x={W - 3} y={3} width={1.5} height={H - 6} fill="#FFFFFF" opacity={0.85} />
      <rect x={0} y={0} width={W} height={2} fill="#FBBF24" opacity={0.55} />

      {!isAvail && <CarTopShape cx={W / 2} cy={H / 2} w={W * 0.66} h={H * 0.78} color={carColor} />}

      {isAvail && (
        <text
          x={W / 2}
          y={H / 2 + 5}
          textAnchor="middle"
          fontSize={isSelected ? 18 : 16}
          fontWeight={800}
          fill={isSelected ? '#FFFFFF' : '#0F4C3A'}
          style={{ pointerEvents: 'none' }}
        >
          {slot.slotNumber}
        </text>
      )}

      <g transform={`translate(${W / 2 - 11}, ${H + 3})`} style={{ pointerEvents: 'none' }}>
        <rect
          width={22}
          height={12}
          rx={6}
          fill={isSelected ? '#0F4C3A' : isAvail ? '#FFFFFF' : '#F3F4F6'}
          stroke={isAvail ? '#16A34A' : '#9CA3AF'}
          strokeWidth={0.7}
        />
        <text
          x={11}
          y={9}
          textAnchor="middle"
          fontSize={8.5}
          fontWeight={800}
          fill={isSelected ? '#FFFFFF' : isAvail ? '#0F4C3A' : '#6B7280'}
        >
          {slot.slotNumber}
        </text>
      </g>

      {isSelected && (
        <g transform={`translate(${W / 2 - 32}, ${-22})`} style={{ pointerEvents: 'none' }}>
          <rect width={64} height={15} rx={3.5} fill="#0F4C3A" />
          <text
            x={32}
            y={10.4}
            textAnchor="middle"
            fontSize={8.5}
            fontWeight={800}
            fill="#FFFFFF"
            letterSpacing={0.4}
          >
            🎯 SİZİN SLOT
          </text>
          <path d={`M 28 15 L 32 19 L 36 15 Z`} fill="#0F4C3A" />
        </g>
      )}
    </g>
  );
}

// Backwards-compat alias — App still imports `IsometricScheme`.
export function IsometricScheme({ slots, selectedId, onSelect }) {
  // ── Hooks MUST be called unconditionally on every render ─────────
  const containerRef = useRef(null);
  const isEmpty = !slots || slots.length === 0;

  // Layout constants (computed every render, cheap)
  const SW = 56;
  const SH = 92;
  const GAP = 4;
  const ROAD_H = 38;
  const PAD_X = 18;
  const PAD_TOP = 28;
  const PAD_BOT = 30;

  // Auto-scroll selected slot into view
  useEffect(() => {
    if (isEmpty) return;
    if (!selectedId || !containerRef.current) return;
    const idx = slots.findIndex((s) => s.id === selectedId);
    if (idx < 0) return;
    const target = PAD_X + idx * (SW + GAP) + SW / 2;
    const c = containerRef.current;
    const goal = Math.max(0, target - c.clientWidth / 2);
    try {
      c.scrollTo({ left: goal, behavior: 'smooth' });
    } catch (_) {
      c.scrollLeft = goal;
    }
  }, [selectedId, slots, isEmpty]);

  // Native non-passive wheel listener: vertical wheel -> horizontal scroll,
  // and prevent the outer page from scrolling while hovering the scheme.
  useEffect(() => {
    if (isEmpty) return;
    const c = containerRef.current;
    if (!c) return;
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const max = c.scrollWidth - c.clientWidth;
      if (max <= 0) return;
      e.preventDefault();
      c.scrollLeft = Math.max(0, Math.min(max, c.scrollLeft + e.deltaY));
    };
    c.addEventListener('wheel', onWheel, { passive: false });
    return () => c.removeEventListener('wheel', onWheel);
  }, [isEmpty]);

  if (isEmpty) {
    return (
      <div className="mx-5 rounded-2xl shadow-card bg-white p-8 text-center text-az-ink-soft text-sm">
        Bu zonada slot mövcud deyil
      </div>
    );
  }

  const totalSlotsW = slots.length * (SW + GAP) - GAP;
  const w = totalSlotsW + PAD_X * 2;
  const h = PAD_TOP + ROAD_H + 6 + SH + PAD_BOT;
  const ROAD_Y = PAD_TOP;
  const SLOTS_Y = PAD_TOP + ROAD_H + 6;
  const SIDEWALK_Y = SLOTS_Y + SH + 18;
  const dashCount = Math.ceil(w / 36);

  return (
    <div className="relative mx-5 rounded-2xl shadow-card border border-az-primary/5 overflow-hidden bg-gradient-to-b from-[#E7F0EA] to-[#F0F4F0]">
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-az-available animate-soft-pulse" />
        <span className="text-[10px] font-display font-bold text-az-primary tracking-wide">
          KÜÇƏ SXEMİ · 3D
        </span>
      </div>
      <div className="absolute top-3 right-3 z-10 flex items-center gap-2 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full shadow-sm">
        <span className="flex items-center gap-1 text-[10px] font-bold text-az-available">
          <span className="w-2 h-2 rounded-sm bg-az-available" /> Boş
        </span>
        <span className="flex items-center gap-1 text-[10px] font-bold text-az-ink-soft">
          <span className="w-2 h-2 rounded-sm bg-az-occupied" /> Dolu
        </span>
      </div>
      <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 z-10 text-az-primary/40 animate-soft-pulse">
        <ChevronRight size={20} />
      </div>

      <div
        ref={containerRef}
        className="overflow-x-auto overflow-y-hidden scrollbar-hide"
        style={{
          touchAction: 'pan-x',
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
        }}
      >
        <svg
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="xMinYMid meet"
          style={{ display: 'block' }}
        >
          <defs>
            <linearGradient id="asphalt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4B5563" />
              <stop offset="100%" stopColor="#374151" />
            </linearGradient>
            <linearGradient id="sidewalk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E5E7EB" />
              <stop offset="100%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>

          {/* asphalt road */}
          <rect x={0} y={ROAD_Y} width={w} height={ROAD_H} fill="url(#asphalt)" />
          {/* yellow center dashes */}
          {Array.from({ length: dashCount }).map((_, k) => (
            <rect
              key={k}
              x={k * 36 + 6}
              y={ROAD_Y + ROAD_H / 2 - 1.6}
              width={20}
              height={3.2}
              rx={1}
              fill="#FCD34D"
            />
          ))}
          {/* white edge line where road meets parking */}
          <rect x={0} y={ROAD_Y + ROAD_H} width={w} height={2} fill="#FFFFFF" opacity={0.9} />

          {/* parking slots */}
          <g transform={`translate(0, ${SLOTS_Y})`}>
            {slots.map((s, i) => (
              <StreetSlot
                key={s.id}
                slot={s}
                x={PAD_X + i * (SW + GAP)}
                W={SW}
                H={SH}
                isSelected={s.id === selectedId}
                onClick={() => onSelect(s)}
              />
            ))}
          </g>

          {/* sidewalk */}
          <rect x={0} y={SIDEWALK_Y} width={w} height={6} fill="url(#sidewalk)" />
          <rect x={0} y={SIDEWALK_Y + 6} width={w} height={4} fill="#9CA3AF" opacity={0.4} />
          {Array.from({ length: Math.ceil(w / 24) }).map((_, k) => (
            <rect
              key={k}
              x={k * 24}
              y={SIDEWALK_Y}
              width={1}
              height={6}
              fill="#9CA3AF"
              opacity={0.5}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
