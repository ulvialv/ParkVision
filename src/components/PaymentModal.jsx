import React, { useState } from 'react';
import {
  ChevronLeft, Plus, Check, Wallet, Car, CreditCard, Target,
} from 'lucide-react';
import { DURATIONS } from '../data.js';

export function PaymentModal({ zone, slot, balance = 0, onClose, onConfirm }) {
  const [carPlate, setCarPlate] = useState('');
  const [editingPlate, setEditing] = useState(false);
  const [payMethod, setPayMethod] = useState('apple'); // 'wallet' | 'apple' | 'other'
  const [payTiming, setPayTiming] = useState('after'); // 'after' | 'before'
  const [durationId, setDurationId] = useState('1h');
  const [favourite, setFavourite] = useState(false);

  const duration = DURATIONS.find((d) => d.id === durationId) || DURATIONS[1];
  const totalAZN =
    payTiming === 'before'
      ? (duration.minutes / 60) * (zone.pricePerHour || 0)
      : 0;

  const handleAddCar = () => setEditing(true);

  return (
    <div className="fixed inset-0 z-[200] flex items-stretch justify-center animate-fade-in">
      <div className="absolute inset-0 bg-az-ink/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full md:max-w-[430px] bg-white animate-slide-up flex flex-col md:rounded-[28px] md:my-2 overflow-hidden">
        {/* Header */}
        <div className="relative flex items-center justify-between px-4 pt-4 pb-3 border-b border-gray-100">
          <button
            onClick={onClose}
            className="text-az-available font-display font-bold text-[14px] flex items-center gap-1 hover:opacity-70"
          >
            <ChevronLeft size={18} /> Geri
          </button>
          <p className="absolute left-1/2 -translate-x-1/2 font-display font-extrabold text-az-primary text-[15px]">
            Parklanma əməliyyatı
          </p>
          <button
            onClick={() => setFavourite(!favourite)}
            aria-label="Sıx istifadə olunan"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-az-available/10 transition"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill={favourite ? '#16A34A' : 'none'}
              stroke="#16A34A"
              strokeWidth={favourite ? 1.5 : 2}
            >
              <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 scrollbar-hide">
          {/* Zone summary */}
          <div>
            <p className="font-display font-extrabold text-az-primary text-[16px]">
              {zone.name}
            </p>
            <p className="text-[12.5px] mt-0.5 flex items-center gap-1">
              <span className="font-display font-extrabold text-az-available">
                {zone.code}
              </span>
              <span className="text-az-occupied">|</span>
              <span className="text-az-ink-soft">{zone.name}</span>
            </p>
          </div>

          {/* Car select */}
          <div>
            <p className="text-[12.5px] font-display font-bold text-az-ink mb-2">
              Nəqliyyat vasitəsini seçin
            </p>
            {!editingPlate && !carPlate && (
              <button
                onClick={handleAddCar}
                className="w-full h-[52px] rounded-xl bg-az-occupied-bg hover:bg-az-occupied/30 text-az-ink font-display font-bold text-[14px] flex items-center justify-center gap-2 transition"
              >
                <Plus size={16} /> Avtomobil əlavə edin
              </button>
            )}
            {editingPlate && (
              <div className="flex items-center gap-2">
                <input
                  autoFocus
                  value={carPlate}
                  onChange={(e) => setCarPlate(e.target.value.toUpperCase())}
                  placeholder="99-AA-999"
                  maxLength={10}
                  className="flex-1 h-[52px] px-4 rounded-xl bg-az-occupied-bg text-az-ink font-display font-extrabold text-[15px] tracking-wider text-center placeholder:text-az-ink-soft/50 focus:outline-none focus:ring-2 focus:ring-az-primary/40"
                />
                <button
                  onClick={() => {
                    if (carPlate.trim()) setEditing(false);
                  }}
                  className="h-[52px] px-4 rounded-xl bg-az-primary text-white font-display font-bold text-[13px] flex items-center gap-1"
                >
                  <Check size={16} /> Yadda saxla
                </button>
              </div>
            )}
            {!editingPlate && carPlate && (
              <button
                onClick={() => setEditing(true)}
                className="w-full h-[52px] rounded-xl bg-az-available text-white font-display font-extrabold text-[15px] tracking-wider flex items-center justify-center gap-2 transition"
              >
                <Car size={16} className="fill-white text-az-available" />{' '}
                {carPlate}
                <span className="ml-1 text-[10px] font-bold opacity-80 uppercase tracking-widest">
                  dəyiş
                </span>
              </button>
            )}
          </div>

          {/* Payment method */}
          <div>
            <p className="text-[12.5px] font-display font-bold text-az-ink mb-2">
              Ödəniş üsulunu seçin
            </p>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setPayMethod('wallet')}
                  className={`h-[52px] rounded-xl font-display font-bold text-[14px] flex items-center justify-center gap-1.5 transition ${
                    payMethod === 'wallet'
                      ? 'bg-az-primary text-white shadow-md'
                      : 'bg-az-occupied-bg text-az-ink hover:bg-az-occupied/30'
                  }`}
                >
                  <Wallet size={15} /> Balans {balance.toFixed(0)} AZN
                </button>
                <button
                  onClick={() => setPayMethod('apple')}
                  className={`h-[52px] rounded-xl font-display font-bold text-[14px] flex items-center justify-center gap-1.5 transition ${
                    payMethod === 'apple'
                      ? 'bg-az-primary text-white shadow-md'
                      : 'bg-az-occupied-bg text-az-ink hover:bg-az-occupied/30'
                  }`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M16.365 1.43c0 1.14-.49 2.27-1.27 3.06-.86.86-2.27 1.53-3.32 1.45-.13-1.13.4-2.27 1.18-3.06.87-.92 2.34-1.6 3.41-1.45zM20.5 17.04c-.55 1.27-.81 1.83-1.51 2.96-.99 1.6-2.39 3.6-4.13 3.61-1.55.02-1.95-1.01-4.06-1-2.11.01-2.55 1.02-4.1 1-1.74-.01-3.07-1.81-4.06-3.41-2.78-4.5-3.07-9.79-1.36-12.6 1.21-1.99 3.12-3.16 4.92-3.16 1.83 0 2.98 1.01 4.49 1.01 1.46 0 2.36-1.01 4.47-1.01 1.6 0 3.3.87 4.51 2.39-3.97 2.18-3.32 7.86.83 10.21z" />
                  </svg>
                  Apple Pay
                </button>
              </div>
              <button
                onClick={() => setPayMethod('other')}
                className={`w-full h-[52px] rounded-xl font-display font-bold text-[14px] flex items-center justify-center gap-1.5 transition ${
                  payMethod === 'other'
                    ? 'bg-az-primary text-white shadow-md'
                    : 'bg-az-occupied-bg text-az-ink hover:bg-az-occupied/30'
                }`}
              >
                <CreditCard size={15} /> Digər
              </button>
            </div>
          </div>

          {/* Payment timing */}
          <div>
            <p className="text-[12.5px] font-display font-bold text-az-ink mb-2">
              Ödəniş vaxtı
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setPayTiming('after')}
                className={`h-[52px] rounded-xl font-display font-bold text-[14px] transition ${
                  payTiming === 'after'
                    ? 'bg-az-primary text-white shadow-md'
                    : 'bg-az-occupied-bg text-az-ink hover:bg-az-occupied/30'
                }`}
              >
                Sonradan ödəniş
              </button>
              <button
                onClick={() => setPayTiming('before')}
                className={`h-[52px] rounded-xl font-display font-bold text-[14px] transition ${
                  payTiming === 'before'
                    ? 'bg-az-primary text-white shadow-md'
                    : 'bg-az-occupied-bg text-az-ink hover:bg-az-occupied/30'
                }`}
              >
                Öncədən ödəniş
              </button>
            </div>
          </div>

          {payTiming === 'before' && (
            <div className="animate-fade-in">
              <p className="text-[12.5px] font-display font-bold text-az-ink mb-2">
                Parklanma müddəti
              </p>
              <div className="grid grid-cols-3 gap-2">
                {DURATIONS.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDurationId(d.id)}
                    className={`h-[52px] rounded-xl font-display font-bold text-[13px] transition ${
                      durationId === d.id
                        ? 'bg-az-primary text-white shadow-md'
                        : 'bg-az-occupied-bg text-az-ink hover:bg-az-occupied/30'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {payTiming === 'before' && (
            <div className="animate-fade-in">
              <p className="text-[12.5px] font-display font-bold text-az-ink mb-2">
                Cəmi
              </p>
              <div className="h-[52px] rounded-xl bg-az-occupied-bg flex items-center px-4 gap-3">
                <span className="w-7 h-7 rounded-md bg-white text-az-primary font-display font-extrabold text-[15px] flex items-center justify-center shadow-sm">
                  Σ
                </span>
                <span className="font-display font-extrabold text-[16px] text-az-ink">
                  {totalAZN.toFixed(2)} AZN
                </span>
                {zone.pricePerHour > 0 && (
                  <span className="ml-auto text-[11px] text-az-ink-soft">
                    {zone.pricePerHour.toFixed(2)} AZN/saat · {duration.label}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="rounded-xl bg-az-available/10 border border-az-available/30 p-3 text-[12px] flex items-start gap-2">
            <Target
              size={15}
              className="text-az-available flex-shrink-0 mt-0.5"
            />
            <p className="text-az-ink leading-snug">
              Slot <strong>{slot.slotNumber}</strong> sizin üçün rezerv olunur.
              Küçə kənarında <strong>{slot.slotNumber}-ci</strong> yerdə
              dayanın.
            </p>
          </div>
        </div>

        {/* Confirm button (sticky) */}
        <div
          className="px-4 py-3 border-t border-gray-100 bg-white"
          style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 12px)' }}
        >
          <button
            onClick={() =>
              onConfirm({
                carPlate: carPlate || 'GUEST',
                payMethod,
                payTiming,
                durationId,
                totalAZN,
              })
            }
            disabled={editingPlate && !carPlate.trim()}
            className={`w-full h-[56px] rounded-2xl font-display font-extrabold text-[16px] flex items-center justify-center gap-2 transition active:scale-[0.97] ${
              editingPlate && !carPlate.trim()
                ? 'bg-az-occupied/40 text-az-ink-soft cursor-not-allowed'
                : 'bg-az-available hover:bg-az-available-light text-white shadow-lg shadow-az-available/30'
            }`}
          >
            Təsdiq edin
            {payTiming === 'before' && totalAZN > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-md bg-white/20 text-[13px]">
                {totalAZN.toFixed(2)} AZN
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
