import React, { useMemo } from 'react';
import {
  Bell, Accessibility, Search, Sparkles, MapPin, Clock, ArrowRight,
  Car, Wallet, Crown,
} from 'lucide-react';
import { Logo } from './Shell.jsx';
import { fmtDistance } from '../data.js';

function HomeHeader({ accessibilityFilter, setAccessibilityFilter }) {
  return (
    <div className="px-5 pt-2 pb-3 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-3">
        <Logo size={40} />
        <div className="leading-tight">
          <p className="font-display font-extrabold text-az-primary text-[17px]">
            AzParking
          </p>
          <p className="text-[11px] text-az-ink-soft font-medium">
            Smart Parking
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          aria-label="Əlillik filtri"
          onClick={() => setAccessibilityFilter((v) => !v)}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${
            accessibilityFilter
              ? 'bg-az-primary text-white shadow-card'
              : 'bg-white text-az-ink-soft hover:text-az-primary'
          }`}
        >
          <Accessibility size={19} />
        </button>
        <button
          aria-label="Bildirişlər"
          className="relative w-10 h-10 rounded-xl bg-white text-az-ink-soft hover:text-az-primary transition flex items-center justify-center"
        >
          <Bell size={19} />
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-az-selected ring-2 ring-white" />
        </button>
      </div>
    </div>
  );
}

function SearchBar({ value, onChange }) {
  return (
    <div className="px-5 mt-1 flex-shrink-0">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-az-ink-soft"
        />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ünvan axtar..."
          className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white text-az-ink placeholder:text-az-ink-soft/70 text-[14px] font-medium border border-transparent focus:border-az-primary/30 focus:outline-none shadow-card"
        />
      </div>
    </div>
  );
}

function TabBar({ tab, setTab }) {
  const tabs = [
    { id: 'zones', label: 'Məntəqələr' },
    { id: 'recent', label: 'Ən son' },
    { id: 'favs', label: 'Favoritlər' },
  ];
  return (
    <div className="px-5 mt-3 grid grid-cols-3 gap-2 flex-shrink-0">
      {tabs.map((t) => {
        const active = tab === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`relative h-10 rounded-xl text-[13px] font-display font-bold transition ${
              active
                ? 'bg-az-primary text-white shadow-card'
                : 'bg-white text-az-ink-soft hover:text-az-primary'
            }`}
          >
            {t.label}
            {active && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-az-available" />
            )}
          </button>
        );
      })}
    </div>
  );
}

function AISkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl p-4 mt-4 mx-5 bg-gradient-to-br from-emerald-50 via-yellow-50 to-emerald-50 border border-emerald-100">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-emerald-200/80 animate-pulse" />
        <div className="space-y-1.5">
          <div className="h-3 w-28 bg-emerald-200/70 rounded animate-pulse" />
          <div className="h-2 w-40 bg-emerald-100 rounded animate-pulse" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full bg-emerald-100 rounded animate-pulse" />
        <div className="h-3 w-3/4 bg-emerald-100 rounded animate-pulse" />
      </div>
      <div className="mt-3 h-10 w-full bg-emerald-200/60 rounded-xl animate-pulse" />
      <div className="absolute inset-0 shimmer-bg animate-shimmer pointer-events-none" />
    </div>
  );
}

function AIRecommendationCard({ aiRec, loading, onGo }) {
  if (loading) return <AISkeleton />;
  if (!aiRec) return null;
  return (
    <div className="mx-5 mt-4 relative overflow-hidden rounded-2xl shadow-card animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF8E1] via-[#E8F8EE] to-[#DCFCE7]" />
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-30"
        style={{
          background:
            'radial-gradient(circle, rgba(22,163,74,0.5) 0%, transparent 70%)',
        }}
      />
      <div className="relative p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-az-primary text-white flex items-center justify-center">
              <Sparkles size={16} />
            </div>
            <div className="leading-tight">
              <p className="font-display font-extrabold text-az-primary text-[14px] flex items-center gap-1.5">
                AI Tövsiyəsi
                <span className="px-1.5 py-0.5 rounded-md bg-az-primary text-white text-[9px] uppercase tracking-wider">
                  {aiRec.source === 'claude' ? 'Claude' : 'Smart'}
                </span>
              </p>
              <p className="text-[10.5px] text-az-ink-soft">
                Sizə ən optimal slot tapıldı
              </p>
            </div>
          </div>
          <Crown size={18} className="text-az-reserved" />
        </div>

        <p className="text-[13px] leading-snug text-az-ink mb-3 font-medium">
          {aiRec.reason}
        </p>

        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <span className="px-2 py-1 rounded-lg bg-white/80 text-az-primary text-[10px] font-bold flex items-center gap-1">
            <MapPin size={11} />
            {fmtDistance(aiRec.distanceMeters)}
          </span>
          <span className="px-2 py-1 rounded-lg bg-white/80 text-az-primary text-[10px] font-bold flex items-center gap-1">
            <Clock size={11} />
            {aiRec.walkingTimeMinutes} dəq
          </span>
          <span className="px-2 py-1 rounded-lg bg-az-available text-white text-[10px] font-bold">
            Slot {aiRec.slotNumber}
          </span>
        </div>

        <button
          onClick={onGo}
          className="w-full h-11 rounded-xl bg-az-primary hover:bg-az-primary-dark active:scale-[0.98] transition text-white font-display font-bold text-[13px] flex items-center justify-center gap-2 shadow-md"
        >
          Birbaşa Get
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

function AvailabilityBar({ available, total }) {
  const ratio = Math.max(0, Math.min(1, available / total));
  const pct = ratio * 100;
  let color = 'bg-az-available';
  if (ratio < 0.15) color = 'bg-az-selected';
  else if (ratio < 0.35) color = 'bg-az-reserved';
  return (
    <div className="h-1.5 w-full bg-az-occupied-bg rounded-full overflow-hidden">
      <div
        className={`h-full ${color} rounded-full transition-all duration-500`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function ZoneCard({ zone, onClick, highlighted }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-2xl bg-white p-4 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 active:translate-y-0 transition-all border ${
        highlighted
          ? 'border-az-available ring-2 ring-az-available/30'
          : 'border-transparent'
      }`}
    >
      <div className="flex items-start justify-between mb-1">
        <p className="font-display font-extrabold text-az-ink text-[15px] tracking-tight flex items-center gap-1.5">
          {zone.name}
          {zone.isAccessible && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-blue-100 text-blue-600">
              <Accessibility size={12} />
            </span>
          )}
        </p>
        {highlighted && (
          <span className="text-[9px] uppercase tracking-wider font-extrabold text-az-available bg-az-available-bg px-1.5 py-0.5 rounded">
            AI
          </span>
        )}
      </div>

      <p className="text-[11.5px] mb-3 flex items-center gap-1">
        <span className="font-display font-extrabold text-az-available">
          {zone.code}
        </span>
        <span className="text-az-occupied">|</span>
        <span className="text-az-ink-soft truncate">{zone.name}</span>
      </p>

      <div className="flex items-center gap-3 text-[11.5px] font-semibold mb-3 flex-wrap">
        <span className="flex items-center gap-1 text-az-ink">
          <MapPin size={13} className="text-az-available" />
          {fmtDistance(zone.distance)}
        </span>
        <span className="flex items-center gap-1 text-az-ink">
          <Car size={13} className="text-az-ink-soft" />
          {zone.availableSlots}/{zone.totalSlots} slot
        </span>
        <span className="flex items-center gap-1 text-az-ink">
          <Wallet size={13} className="text-az-available" />
          {zone.pricePerHour} AZN /saat
        </span>
      </div>

      <AvailabilityBar
        available={zone.availableSlots}
        total={zone.totalSlots}
      />
    </button>
  );
}

export function HomeScreen({
  zones,
  searchQuery,
  setSearchQuery,
  accessibilityFilter,
  setAccessibilityFilter,
  tab,
  setTab,
  aiRec,
  aiLoading,
  onZoneSelect,
  onAIGo,
}) {
  const filteredZones = useMemo(() => {
    let list = zones;
    if (accessibilityFilter) list = list.filter((z) => z.isAccessible);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (z) =>
          z.name.toLowerCase().includes(q) ||
          z.code.toLowerCase().includes(q)
      );
    }
    if (tab === 'recent') list = [...list].sort((a, b) => a.distance - b.distance);
    if (tab === 'favs')
      list = list.filter((z) => z.isAccessible || z.availableSlots > 5);
    return list;
  }, [zones, accessibilityFilter, searchQuery, tab]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden animate-fade-in">
      <HomeHeader
        accessibilityFilter={accessibilityFilter}
        setAccessibilityFilter={setAccessibilityFilter}
      />
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <TabBar tab={tab} setTab={setTab} />

      <div className="flex-1 overflow-y-auto pb-32 scrollbar-hide">
        <AIRecommendationCard
          aiRec={aiRec}
          loading={aiLoading}
          onGo={onAIGo}
        />

        <div className="mt-4 px-5 space-y-3">
          {filteredZones.length === 0 && (
            <div className="text-center py-10 text-az-ink-soft text-sm">
              Heç bir zona tapılmadı
            </div>
          )}
          {filteredZones.map((z, i) => (
            <div
              key={z.id}
              style={{ animationDelay: `${i * 60}ms` }}
              className="animate-fade-in"
            >
              <ZoneCard
                zone={z}
                highlighted={aiRec?.recommendedZoneId === z.id}
                onClick={() => onZoneSelect(z.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
