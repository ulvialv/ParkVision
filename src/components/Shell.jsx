import React from 'react';
import { Clock, Map as MapIconLR, Plus, MoreHorizontal, User } from 'lucide-react';

export function Logo({ size = 36, pulse = false }) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-az-primary to-az-primary-dark text-white shadow-lg ${
        pulse ? 'animate-soft-pulse' : ''
      }`}
      style={{ width: size, height: size }}
    >
      <span
        className="font-display font-extrabold leading-none"
        style={{ fontSize: size * 0.55 }}
      >
        P
      </span>
      <span
        className="absolute -top-1 -right-1 inline-block rounded-full bg-az-available border-2 border-white"
        style={{ width: size * 0.3, height: size * 0.3 }}
      />
    </div>
  );
}

export function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 text-az-ink text-[13px] font-display font-semibold select-none flex-shrink-0">
      <span>17:48</span>
      <div className="flex items-center gap-1.5">
        <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
          <rect x="0" y="7" width="3" height="4" rx="0.5" />
          <rect x="4.5" y="5" width="3" height="6" rx="0.5" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="0.5" />
          <rect x="13.5" y="0" width="3" height="11" rx="0.5" />
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
          <path d="M7.5 2c2.4 0 4.6.9 6.3 2.4l1.2-1.3C13 1.1 10.4 0 7.5 0S2 1.1 0 3.1l1.2 1.3C2.9 2.9 5.1 2 7.5 2z" />
          <path d="M7.5 5c1.5 0 2.9.6 4 1.6l1.2-1.3C11.3 4 9.5 3.2 7.5 3.2S3.7 4 2.3 5.3l1.2 1.3C4.6 5.6 6 5 7.5 5z" />
          <path d="M7.5 8c.7 0 1.4.3 1.9.8l1.1-1.2C9.7 6.9 8.6 6.5 7.5 6.5S5.3 6.9 4.5 7.6l1.1 1.2c.5-.5 1.2-.8 1.9-.8z" />
          <circle cx="7.5" cy="9.5" r="1" />
        </svg>
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
          <rect x="0.5" y="0.5" width="22" height="11" rx="2.5" stroke="currentColor" opacity="0.4" />
          <rect x="2" y="2" width="19" height="8" rx="1.5" fill="currentColor" />
          <rect x="23.5" y="4" width="2" height="4" rx="1" fill="currentColor" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

export function PhoneShell({ children }) {
  return (
    <div className="min-h-screen w-full bg-slate-200 flex items-center justify-center md:py-6">
      <div
        className="relative w-full md:max-w-[430px] bg-az-bg shadow-2xl md:rounded-[36px] overflow-hidden flex flex-col"
        style={{ minHeight: '100vh', height: '100dvh' }}
      >
        <StatusBar />
        {children}
      </div>
    </div>
  );
}

function NavButton({ id, label, icon: Icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition ${
        active ? 'text-az-primary' : 'text-az-ink-soft hover:text-az-primary/70'
      }`}
    >
      <Icon size={22} strokeWidth={active ? 2.4 : 2} />
      <span
        className={`text-[10px] font-display ${
          active ? 'font-extrabold' : 'font-semibold'
        }`}
      >
        {label}
      </span>
    </button>
  );
}

export function BottomNav({ active, onChange }) {
  return (
    <div className="absolute left-0 right-0 bottom-0 z-50 pointer-events-none">
      <div className="relative pointer-events-auto bg-white/95 backdrop-blur-md border-t border-az-primary/5 shadow-[0_-6px_18px_rgba(15,76,58,0.08)]">
        <div className="flex h-[68px] pb-[env(safe-area-inset-bottom)] px-2">
          <NavButton
            id="vaxt"
            label="Vaxt"
            icon={Clock}
            active={active === 'vaxt'}
            onClick={() => onChange('vaxt')}
          />
          <NavButton
            id="xerite"
            label="Xəritə"
            icon={MapIconLR}
            active={active === 'xerite'}
            onClick={() => onChange('xerite')}
          />
          <div className="flex-1 relative">
            <div className="absolute -top-7 left-1/2 -translate-x-1/2">
              <button
                onClick={() => onChange('parking')}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition active:scale-95 ${
                  active === 'parking'
                    ? 'bg-az-available text-white shadow-az-available/40'
                    : 'bg-az-primary text-white shadow-az-primary/30'
                }`}
                aria-label="Parkinq"
              >
                <Plus size={28} strokeWidth={3} />
              </button>
            </div>
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <span
                className={`text-[10px] font-display ${
                  active === 'parking'
                    ? 'font-extrabold text-az-available'
                    : 'font-semibold text-az-ink-soft'
                }`}
              >
                Parkinq
              </span>
            </div>
          </div>
          <NavButton
            id="diger"
            label="Digər"
            icon={MoreHorizontal}
            active={active === 'diger'}
            onClick={() => onChange('diger')}
          />
          <NavButton
            id="profil"
            label="Profil"
            icon={User}
            active={active === 'profil'}
            onClick={() => onChange('profil')}
          />
        </div>
      </div>
    </div>
  );
}
