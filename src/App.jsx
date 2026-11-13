import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { DossierCandidat } from './components/DossierCandidat';
import { RadarAdmin } from './components/RadarAdmin';
import { CoffreFortPreuves } from './components/CoffreFortPreuves';
import { MandatairesGuide } from './components/MandatairesGuide';
import { GuideGratuit } from './components/GuideGratuit';
import { Flame, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dossier');

  return (
    <div className="min-h-screen bg-[#0D0D11] text-gray-100 flex flex-col font-sans selection:bg-[#B71C1C] selection:text-white">
      {/* En-tête officiel Marée Rouge & Remontada */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Barre de navigation responsive */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Contenu principal */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-4 py-5 sm:py-6">
        {activeTab === 'dossier' && <DossierCandidat />}
        {activeTab === 'radar' && <RadarAdmin />}
        {activeTab === 'preuves' && <CoffreFortPreuves />}
        {activeTab === 'mandataires' && <MandatairesGuide />}
        {activeTab === 'gratuit' && <GuideGratuit />}
      </main>

      {/* Pied de page civique */}
      <footer className="bg-[#121217] border-t border-[#23232C] py-6 px-4 mt-8 text-center text-xs text-gray-400">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-white font-bold text-sm">
            <span className="text-[#D32F2F] font-black">LA MARÉE ROUGE</span>
            <span>•</span>
            <span className="text-yellow-400">LA REMONTADA 2025</span>
          </div>
          
          <p className="text-gray-400 text-[11px] max-w-2xl mx-auto leading-relaxed">
            « Mobilisation électorale des En-Bas d'En-Bas » — Initiative citoyenne pacifique et républicaine pour la transparence électorale et la protection des droits civiques fondamentaux au Cameroun.
          </p>

          <div className="flex items-center justify-center gap-4 text-[11px] text-gray-400 pt-2 border-t border-gray-800/60 flex-wrap">
            <span>En mémoire des martyrs de 2025</span>
            <span>•</span>
            <span>Hotline WhatsApp : +237 679 83 85 82</span>
            <span>•</span>
            <span>Page Facebook : La Remontada de 2025</span>
          </div>

          <div className="text-[10px] text-gray-400 pt-1">
            Conforme à la Loi n° 2012/001 du 19 avril 2012 portant Code Électoral du Cameroun.
          </div>
        </div>
      </footer>
    </div>
  );
}
