import React from 'react';
import { FileText, Radio, Shield, Users, Server } from 'lucide-react';

export function Navigation({ activeTab, setActiveTab }) {
  const tabs = [
    {
      id: 'dossier',
      label: 'Mon Dossier',
      sublabel: 'Checklist & Sommations',
      icon: FileText,
      badge: 'Loi 2012'
    },
    {
      id: 'radar',
      label: 'Radar Terrain',
      sublabel: 'Sous-préfets & Guichets',
      icon: Radio,
      badge: 'En Direct',
      highlight: true
    },
    {
      id: 'preuves',
      label: 'Coffre-Fort',
      sublabel: 'Preuves & Abus',
      icon: Shield,
      badge: 'Sécurisé'
    },
    {
      id: 'mandataires',
      label: 'Mandataires',
      sublabel: 'Délégués BV & Guide',
      icon: Users,
      badge: 'ELECAM'
    },
    {
      id: 'gratuit',
      label: 'Hébergement 0 FCFA',
      sublabel: 'Guide Cloudflare & Supabase',
      icon: Server,
      badge: '100% Gratuit'
    }
  ];

  return (
    <nav className="bg-[#18181F] border-b border-[#2A2A35] sticky top-0 z-40 shadow-lg">
      <div className="max-w-6xl mx-auto px-2">
        <div className="flex items-center overflow-x-auto no-scrollbar gap-1 py-1.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[110px] sm:min-w-fit px-3 py-2 rounded-xl transition-all flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2.5 text-center sm:text-left relative ${
                  isActive
                    ? 'bg-gradient-to-r from-[#B71C1C] to-[#8B0000] text-white shadow-md border-b-2 border-[#FFD54F]'
                    : 'text-gray-400 hover:text-gray-100 hover:bg-[#23232D]'
                }`}
              >
                <div className={`p-1.5 rounded-lg ${isActive ? 'bg-black/30 text-[#FFD54F]' : 'text-gray-400'}`}>
                  <Icon size={18} />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-bold whitespace-nowrap">
                      {tab.label}
                    </span>
                    {tab.badge && (
                      <span className={`text-[9px] px-1 py-0.2 rounded font-black hidden lg:inline ${
                        isActive ? 'bg-[#FFD54F] text-black' : 'bg-gray-800 text-gray-300'
                      }`}>
                        {tab.badge}
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] hidden sm:block ${isActive ? 'text-red-200' : 'text-gray-400'}`}>
                    {tab.sublabel}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
