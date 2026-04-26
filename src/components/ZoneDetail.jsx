import React from 'react';
import { ChevronLeft, RefreshCw, Navigation, Target, Car } from 'lucide-react';
import { SlotStrip } from './SlotStrip.jsx';
import { IsometricScheme } from './IsometricScheme.jsx';
import { LeafletMap } from './LeafletMap.jsx';

function ZoneDetailHeader({ zone, onBack, onRefresh, refreshing, availableCount }) {
  return (
    <div className="px-4 pt-1 pb-2 flex items-start justify-between bg-az-bg flex-shrink-0">
      <div className="flex items-start gap-2">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-az-primary hover:bg-az-primary hover:text-white transition mt-0.5"
          aria-label="Geri"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="leading-tight">
          <p className="font-display font-extrabold text-az-ink text-[18px] tracking-tight">
            {zone.code} Sektoru
          </p>
          <p className="text-[11px] text-az-ink-soft">
            Real-vaxt slot görüntüsü ·{' '}
            <span className="text-az-available font-bold">
              {availableCount} boş slot
            </span>
          </p>
        </div>
      </div>
      <button
        onClick={onRefresh}
        className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-az-primary hover:bg-az-primary hover:text-white transition"
        aria-label="Yenilə"
      >
        <RefreshCw size={17} className={refreshing ? 'animate-spin' : ''} />
      </button>
    </div>
  );
}

// PARK ET — primary action that opens the payment screen.
function ParkEtButton({ slot, onClick }) {
  const disabled = !slot;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`mx-5 mt-3 h-[60px] w-[calc(100%-40px)] rounded-2xl flex items-center justify-center gap-2.5 font-display font-extrabold text-[16px] tracking-tight transition active:scale-[0.97] ${
        disabled
          ? 'bg-az-occupied/40 text-az-ink-soft cursor-not-allowed'
          : 'bg-az-available hover:bg-az-available-light text-white shadow-lg shadow-az-available/30'
      }`}
    >
      <Car size={20} className={disabled ? '' : 'fill-white'} />
      {disabled ? 'Əvvəlcə slot seçin' : `PARK ET (Slot ${slot.slotNumber})`}
    </button>
  );
}

// WAZE — secondary action shown next to Park Et.
function WazeButton({ slot, onClick }) {
  const disabled = !slot;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`mt-2 h-[44px] flex-1 rounded-xl flex items-center justify-center gap-1.5 font-display font-bold text-[13px] tracking-tight transition active:scale-[0.97] ${
        disabled
          ? 'bg-az-occupied/30 text-az-ink-soft/60 cursor-not-allowed'
          : 'bg-az-primary hover:bg-az-primary-dark text-white shadow-md shadow-az-primary/25'
      }`}
    >
      <Navigation size={15} className={disabled ? '' : 'fill-white'} />
      Waze ilə get
    </button>
  );
}

export function ZoneDetailScreen({
  zone,
  slots,
  selectedSlot,
  onBack,
  onSelectSlot,
  onRefresh,
  onProximity,
  onPark,
  refreshing,
  userLocation,
  nearestSlot,
}) {
  const availableCount = slots.filter((s) => s.status === 'available').length;

  const handleWaze = () => {
    if (!selectedSlot) return;
    const url = `https://waze.com/ul?ll=${selectedSlot.coordinates.lat},${selectedSlot.coordinates.lng}&navigate=yes`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden animate-fade-in">
      <ZoneDetailHeader
        zone={zone}
        onBack={onBack}
        onRefresh={onRefresh}
        refreshing={refreshing}
        availableCount={availableCount}
      />

      <div className="flex-1 overflow-y-auto pb-32 scrollbar-hide">
        <div className="bg-white shadow-sm">
          <SlotStrip
            slots={slots}
            selectedId={selectedSlot?.id}
            onSelect={onSelectSlot}
          />
        </div>

        <div className="mt-3">
          <IsometricScheme
            slots={slots}
            selectedId={selectedSlot?.id}
            onSelect={onSelectSlot}
          />
        </div>

        <div className="mt-3">
          <LeafletMap
            zone={zone}
            slots={slots}
            selectedSlot={selectedSlot}
            onSelectSlot={onSelectSlot}
            userLocation={userLocation}
            nearestSlot={nearestSlot}
          />
        </div>

        {/* Primary action — opens payment screen */}
        <ParkEtButton slot={selectedSlot} onClick={onPark} />

        {/* Secondary actions row */}
        <div className="mx-5 flex items-center gap-2">
          <WazeButton slot={selectedSlot} onClick={handleWaze} />
        </div>
      </div>
    </div>
  );
}
