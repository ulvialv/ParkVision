import React, { useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export function SplashScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2100);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-az-primary via-az-primary-dark to-[#072B20] text-white flex flex-col items-center justify-center overflow-hidden z-30">
      {/* Decorative blobs */}
      <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-az-available/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-10 w-80 h-80 rounded-full bg-az-available-light/10 blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-7 animate-fade-in">
        <div className="relative">
          <span className="absolute inset-0 rounded-3xl bg-az-available animate-halo" />
          <span className="absolute inset-0 rounded-3xl bg-az-available animate-halo" style={{ animationDelay: '0.5s' }} />
          <div className="relative w-24 h-24 rounded-3xl bg-white text-az-primary flex items-center justify-center shadow-2xl">
            <span className="font-display font-extrabold text-[58px] leading-none">P</span>
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-az-available border-[3px] border-white" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="font-display font-extrabold text-3xl tracking-tight">
            AzParking <span className="text-az-available-light">Smart</span>
          </h1>
          <p className="text-white/70 text-sm max-w-[280px] mx-auto">
            AI ilə gücləndirilmiş park sistemi
          </p>
        </div>

        <div className="flex items-center gap-2 text-white/60 text-xs">
          <Sparkles size={14} className="text-az-available-light" />
          <span>Claude AI · Real-vaxt slot xəritəsi</span>
        </div>
      </div>

      <div className="absolute bottom-16 left-10 right-10 h-1 rounded-full bg-white/15 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-az-available-light via-white to-az-available-light animate-progress" />
      </div>
      <p className="absolute bottom-7 text-[11px] text-white/50 tracking-[0.2em] font-medium">
        BAKI · AZƏRBAYCAN
      </p>
    </div>
  );
}
