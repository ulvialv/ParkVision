import React from 'react';
import { User, Wallet, Car, CreditCard, Plus, Check } from 'lucide-react';

export function ProfileScreen({ user, balance, userCar, onTopUp, onAddCar, onLogout }) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden animate-fade-in">
      <div className="px-5 pt-3 pb-2 flex items-center gap-2 bg-az-bg flex-shrink-0">
        <User size={20} className="text-az-primary" />
        <p className="font-display font-extrabold text-az-ink text-[18px] leading-tight">
          Profil
        </p>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-24 px-4 space-y-3">
        {/* User card */}
        <div className="rounded-2xl bg-gradient-to-br from-az-primary to-az-primary-dark text-white p-4 shadow-lg relative overflow-hidden">
          <span className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
          <span className="absolute -bottom-12 -left-8 w-32 h-32 bg-az-available/15 rounded-full" />
          <div className="flex items-center gap-3 relative">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center font-display font-extrabold text-[22px] ring-2 ring-white/30">
              {user.initial}
            </div>
            <div>
              <p className="font-display font-extrabold text-[17px] leading-tight">
                {user.name}
              </p>
              <p className="text-[12px] opacity-90">{user.phone}</p>
            </div>
          </div>
        </div>

        {/* Balance */}
        <div className="rounded-2xl bg-white shadow-card p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-az-available/15 flex items-center justify-center">
            <Wallet size={20} className="text-az-available" />
          </div>
          <div className="flex-1">
            <p className="text-[11px] text-az-ink-soft tracking-widest font-display font-bold">
              BALANS
            </p>
            <p className="font-display font-extrabold text-az-primary text-[20px]">
              {balance.toFixed(2)} AZN
            </p>
          </div>
          <button
            onClick={onTopUp}
            className="h-[40px] px-4 rounded-xl bg-az-primary text-white font-display font-bold text-[12px] hover:bg-az-primary-dark transition active:scale-[0.97]"
          >
            Artır
          </button>
        </div>

        {/* My cars */}
        <div className="rounded-2xl bg-white shadow-card p-4">
          <p className="text-[11px] text-az-ink-soft tracking-widest font-display font-bold mb-2">
            AVTOMOBİLLƏRİM
          </p>
          {userCar ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-az-primary/10 flex items-center justify-center">
                <Car size={18} className="text-az-primary" />
              </div>
              <p className="font-display font-extrabold text-az-ink tracking-wider">
                {userCar}
              </p>
              <button
                onClick={onAddCar}
                aria-label="Dəyiş"
                className="ml-auto h-[34px] px-3 rounded-lg bg-az-occupied-bg text-az-ink font-display font-bold text-[11px]"
              >
                Dəyiş
              </button>
            </div>
          ) : (
            <button
              onClick={onAddCar}
              className="w-full h-[44px] rounded-xl bg-az-occupied-bg text-az-ink font-display font-bold text-[13px] flex items-center justify-center gap-2"
            >
              <Plus size={15} /> Avtomobil əlavə edin
            </button>
          )}
        </div>

        {/* Payment cards */}
        <div className="rounded-2xl bg-white shadow-card p-4">
          <p className="text-[11px] text-az-ink-soft tracking-widest font-display font-bold mb-2">
            ÖDƏNİŞ KARTLARI
          </p>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-az-primary/10 flex items-center justify-center">
              <CreditCard size={18} className="text-az-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-extrabold text-az-ink text-[13px]">
                Visa **** 4242
              </p>
              <p className="text-[11px] text-az-ink-soft">Əsas kart</p>
            </div>
            <Check size={16} className="text-az-available" />
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full h-[48px] rounded-xl bg-white shadow-card text-az-occupied font-display font-extrabold text-[13px] hover:bg-red-50 transition active:scale-[0.97]"
        >
          Hesabdan çıxış
        </button>
      </div>
    </div>
  );
}
