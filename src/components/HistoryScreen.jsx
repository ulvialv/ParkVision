import React from 'react';
import { Clock, Car } from 'lucide-react';

export function HistoryScreen({ activeSession, history, onEndSession, onPickZone }) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden animate-fade-in">
      <div className="px-5 pt-3 pb-2 flex items-center gap-2 bg-az-bg flex-shrink-0">
        <Clock size={20} className="text-az-primary" />
        <div>
          <p className="font-display font-extrabold text-az-ink text-[18px] leading-tight">
            Sessiyalarım
          </p>
          <p className="text-[11px] text-az-ink-soft">Aktiv və keçmiş parklanmalar</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-24 px-4 space-y-3">
        {activeSession ? (
          <div className="rounded-2xl bg-gradient-to-br from-az-available to-az-primary text-white p-4 shadow-lg shadow-az-available/30 relative overflow-hidden">
            <span className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
            <div className="flex items-center gap-2 mb-2 relative">
              <span className="w-2 h-2 rounded-full bg-white animate-soft-pulse" />
              <span className="text-[10px] font-display font-bold tracking-widest opacity-90">
                AKTİV PARKLANMA
              </span>
            </div>
            <p className="font-display font-extrabold text-[17px] relative leading-tight">
              {activeSession.zoneName}
            </p>
            <p className="text-[12px] opacity-90 mb-3 relative">
              Slot {activeSession.slotNumber} · {activeSession.carPlate}
            </p>
            <div className="flex items-center gap-2 text-[12px] mb-4 relative flex-wrap">
              <span className="bg-white/20 rounded-md px-2 py-1 font-display font-bold">
                {activeSession.startedLabel}
              </span>
              <span className="bg-white/20 rounded-md px-2 py-1 font-display font-bold">
                {activeSession.totalAZN.toFixed(2)} AZN
              </span>
              {activeSession.payTiming === 'before' && (
                <span className="bg-white/20 rounded-md px-2 py-1 font-display font-bold">
                  {activeSession.durationLabel}
                </span>
              )}
            </div>
            <button
              onClick={onEndSession}
              className="w-full h-[44px] rounded-xl bg-white text-az-primary font-display font-extrabold text-[13px] hover:bg-white/90 transition relative active:scale-[0.97]"
            >
              SESSİYANI BİTİR
            </button>
          </div>
        ) : (
          <div className="rounded-2xl bg-white shadow-card p-5 text-center">
            <Clock size={32} className="text-az-ink-soft mx-auto mb-2" />
            <p className="font-display font-bold text-az-ink text-[13px]">
              Aktiv parklanma yoxdur
            </p>
            <p className="text-[11px] text-az-ink-soft mt-1 mb-3">
              Yaxınlıqdan park axtarmaq üçün:
            </p>
            <button
              onClick={onPickZone}
              className="h-[40px] px-5 rounded-xl bg-az-primary text-white font-display font-bold text-[12px] hover:bg-az-primary-dark active:scale-[0.97] transition"
            >
              Park axtar
            </button>
          </div>
        )}

        <p className="text-[12px] font-display font-extrabold text-az-ink-soft tracking-widest pt-2 px-1">
          TARİXÇƏ
        </p>
        {history.length === 0 ? (
          <p className="text-[12px] text-az-ink-soft text-center py-8 italic">
            Hələ ki sessiya yoxdur
          </p>
        ) : (
          history.map((h) => (
            <div
              key={h.id}
              className="rounded-xl bg-white shadow-card p-3 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-az-available/10 flex items-center justify-center flex-shrink-0">
                <Car size={18} className="text-az-available" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-extrabold text-az-ink text-[13px] truncate">
                  {h.zoneName}
                </p>
                <p className="text-[11px] text-az-ink-soft">
                  {h.date} · Slot {h.slotNumber} · {h.duration}
                </p>
              </div>
              <p className="font-display font-extrabold text-az-primary text-[13px] whitespace-nowrap">
                {h.totalAZN.toFixed(2)} AZN
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
