import React, { useState, useEffect } from 'react';
import { ShieldAlert, Wifi, WifiOff, Phone, Flame, Clock } from 'lucide-react';

export function Header({ activeTab, setActiveTab }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [timeLeft, setTimeLeft] = useState({ days: 42, hours: 14, minutes: 28, seconds: 50 });

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Compte à rebours fictif vers la clôture des dépôts de candidatures
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(timer);
    };
  }, []);

  return (
    <header className="bg-gradient-to-b from-[#8B0000] via-[#B71C1C] to-[#800000] text-white border-b-4 border-[#FBC02D] shadow-2xl relative overflow-hidden">
      {/* Ruban tricolore camerounais au sommet */}
      <div className="h-1.5 w-full flex">
        <div className="w-1/3 bg-[#007A3D]"></div>
        <div className="w-1/3 bg-[#CE1126] flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-[#FCD116] rotate-45 transform"></div>
        </div>
        <div className="w-1/3 bg-[#FCD116]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
        {/* Ligne haute : Logos, Statut réseau et Urgence */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src="/logo_maree_rouge.jpg" 
                alt="La Marée Rouge - La Remontada" 
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-[#FBC02D] shadow-lg object-cover bg-black"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute -bottom-1 -right-1 bg-black text-[#FBC02D] text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-[#FBC02D]">
                237
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="bg-black text-[#FFD54F] text-xs font-black px-2 py-0.5 rounded uppercase tracking-wider border border-[#FFD54F]/40 flex items-center gap-1">
                  <Flame size={13} className="text-[#D32F2F] fill-current" />
                  LA MARÉE ROUGE
                </span>
                <span className="bg-[#007A3D] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  Élections Février
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-white drop-shadow-md">
                LA REMONTADA <span className="text-[#FFD54F]">2025</span>
              </h1>
              <p className="text-[11px] sm:text-xs text-red-100 font-medium">
                Mobilisation Électorale des <strong className="text-yellow-300">En-Bas d'En-Bas</strong> • Team Dr. Aristide MONO
              </p>
            </div>
          </div>

          {/* Statut réseau & Contact direct de l'affiche */}
          <div className="flex items-center gap-2 ml-auto text-xs">
            <a 
              href="tel:+237679838582"
              className="hidden md:flex items-center gap-1.5 bg-black/60 hover:bg-black text-yellow-300 px-2.5 py-1.5 rounded-lg border border-yellow-400/30 transition text-xs font-semibold"
            >
              <Phone size={13} className="text-green-400" />
              <span>SOS Hotline : +237 679 83 85 82</span>
            </a>

            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
              isOnline 
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300' 
                : 'bg-amber-950/80 border-amber-500 text-amber-300'
            }`}>
              {isOnline ? (
                <>
                  <Wifi size={13} className="text-emerald-400" />
                  <span className="hidden sm:inline">En Ligne</span>
                </>
              ) : (
                <>
                  <WifiOff size={13} className="text-amber-400" />
                  <span>Mode Hors-Ligne (Actif)</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bandeau d'alerte & Compte à rebours avant clôture des dossiers */}
        <div className="mt-3 pt-2.5 border-t border-red-500/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-yellow-200">
            <ShieldAlert size={15} className="text-yellow-400 flex-shrink-0 animate-pulse" />
            <span>
              <strong>Objectif :</strong> Zéro forclusion administrative, zéro rejet de liste arbitraire.
            </span>
          </div>

          <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-lg border border-yellow-400/20 font-mono">
            <Clock size={13} className="text-[#FFD54F]" />
            <span className="text-gray-300 text-[11px]">Délai estimé :</span>
            <span className="text-[#FFD54F] font-bold text-xs">
              {timeLeft.days}j {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
