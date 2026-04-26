import React from 'react';
import {
  MoreHorizontal, ChevronRight,
  Bell, Sparkles, CreditCard, Accessibility, Target, MapPin,
} from 'lucide-react';

const ITEMS = [
  { id: 'notif',  label: 'Bildirişlər',         icon: Bell,          hint: '3 yeni' },
  { id: 'lang',   label: 'Dil',                 icon: Sparkles,      hint: 'Azərbaycan' },
  { id: 'tariff', label: 'Tariflər',            icon: CreditCard,    hint: 'Saatlıq · Aylıq' },
  { id: 'access', label: 'Əlçatanlıq',          icon: Accessibility, hint: 'Aktiv' },
  { id: 'help',   label: 'Yardım & Dəstək',     icon: Target,        hint: '24/7' },
  { id: 'about',  label: 'AzParking haqqında',  icon: MapPin,        hint: 'v1.0' },
];

export function MoreScreen({ onAction }) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden animate-fade-in">
      <div className="px-5 pt-3 pb-2 flex items-center gap-2 bg-az-bg flex-shrink-0">
        <MoreHorizontal size={20} className="text-az-primary" />
        <div>
          <p className="font-display font-extrabold text-az-ink text-[18px] leading-tight">
            Digər
          </p>
          <p className="text-[11px] text-az-ink-soft">Tənzimləmələr və əlavələr</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-24 px-4 space-y-2">
        {ITEMS.map((it) => {
          const Icon = it.icon;
          return (
            <button
              key={it.id}
              onClick={() => onAction(it)}
              className="w-full rounded-xl bg-white shadow-card p-3 flex items-center gap-3 hover:bg-az-available/5 active:scale-[0.99] transition text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-az-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-az-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-extrabold text-az-ink text-[14px]">
                  {it.label}
                </p>
                {it.hint && (
                  <p className="text-[11px] text-az-ink-soft">{it.hint}</p>
                )}
              </div>
              <ChevronRight size={18} className="text-az-ink-soft flex-shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
