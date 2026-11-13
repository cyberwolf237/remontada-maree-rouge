import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { DossierCandidat } from './components/DossierCandidat';
import { RadarAdmin } from './components/RadarAdmin';
import { CoffreFortPreuves } from './components/CoffreFortPreuves';
import { MandatairesGuide } from './components/MandatairesGuide';

export default function App() {
  const [activeTab, setActiveTab] = useState('dossier');

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col font-sans">
      <Header />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="mr-main flex-1 w-full">
        {activeTab === 'dossier' && <DossierCandidat />}
        {activeTab === 'radar' && <RadarAdmin />}
        {activeTab === 'preuves' && <CoffreFortPreuves />}
        {activeTab === 'mandataires' && <MandatairesGuide />}
      </main>

      <footer className="border-t border-[var(--border)] py-6 px-4 text-center text-xs text-[var(--muted)] hidden md:block">
        <div className="max-w-4xl mx-auto space-y-1.5">
          <p className="font-semibold text-gray-300">
            La Marée Rouge • Mobilisation des En-Bas d'En-Bas
          </p>
          <p className="text-[11px] text-[var(--muted)]">
            En mémoire des martyrs de 2025 • Outils conformes à la Loi n° 2012/001 portant Code Électoral du Cameroun.
          </p>
        </div>
      </footer>
    </div>
  );
}
