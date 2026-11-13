import React, { useState, useEffect } from 'react';
import { COMMANDEMENTS_MANDATAIRE, MODELES_JURIDIQUES } from '../data/electoralData';
import { Users, BookOpen, UserPlus, CheckCircle, AlertTriangle, Printer, Phone, ShieldCheck } from 'lucide-react';

export function MandatairesGuide() {
  const [mandataires, setMandataires] = useState(() => {
    const saved = localStorage.getItem('maree_mandataires_list');
    return saved ? JSON.parse(saved) : [
      {
        id: "mand_1",
        nom: "Nkouateu Jean-Pierre",
        telephone: "+237 699 12 34 56",
        commune: "Yaoundé 1er",
        bureauVote: "BV 04 - École Publique Bastos",
        statut: "Accrédité ELECAM",
        pvRecu: false
      },
      {
        id: "mand_2",
        nom: "Fokam Marie-Claire",
        telephone: "+237 677 88 99 00",
        commune: "Douala 3ème",
        bureauVote: "BV 12 - Foyer Municipal Logbaba",
        statut: "En attente badge",
        pvRecu: false
      }
    ];
  });

  const [nouveauMandataire, setNouveauMandataire] = useState({
    nom: '',
    telephone: '',
    commune: 'Yaoundé 1er',
    bureauVote: ''
  });

  const [activeSubTab, setActiveSubTab] = useState('guide'); // 'guide' | 'liste'

  useEffect(() => {
    localStorage.setItem('maree_mandataires_list', JSON.stringify(mandataires));
  }, [mandataires]);

  const handleAjouterMandataire = (e) => {
    e.preventDefault();
    if (!nouveauMandataire.nom || !nouveauMandataire.bureauVote) return;

    setMandataires([
      {
        id: `mand_${Date.now()}`,
        nom: nouveauMandataire.nom,
        telephone: nouveauMandataire.telephone,
        commune: nouveauMandataire.commune,
        bureauVote: nouveauMandataire.bureauVote,
        statut: "En cours d'enregistrement",
        pvRecu: false
      },
      ...mandataires
    ]);

    setNouveauMandataire({
      nom: '',
      telephone: '',
      commune: 'Yaoundé 1er',
      bureauVote: ''
    });
  };

  const handleTogglePv = (id) => {
    setMandataires(mandataires.map(m => m.id === id ? { ...m, pvRecu: !m.pvRecu } : m));
  };

  const modeleMandat = MODELES_JURIDIQUES.find(m => m.id === 'guide_mandataire');

  const imprimerMandat = (mand) => {
    const texte = modeleMandat.genererTexte({
      nom: mand.nom,
      ville: mand.commune
    });

    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Mandat ELECAM - ${mand.nom}</title>
          <style>body { font-family: monospace; padding: 25px; white-space: pre-wrap; font-size: 13px; line-height: 1.5; }</style>
        </head>
        <body>${texte}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-[#18181F] border border-[#2E2E3A] p-4 sm:p-5 rounded-2xl shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#B71C1C] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                ELECAM & Terrain
              </span>
              <h2 className="text-lg font-black font-heading text-white">
                ARMÉE DES MANDATAIRES & SÉCURISATION DU VOTE
              </h2>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              La victoire se joue dans l'urne et se protège sur le Procès-Verbal (PV). Guide légal et gestion des délégués.
            </p>
          </div>

          <div className="flex bg-[#101015] p-1 rounded-xl border border-gray-800">
            <button
              onClick={() => setActiveSubTab('guide')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeSubTab === 'guide' ? 'bg-[#B71C1C] text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              <BookOpen size={14} />
              <span>Guide Légal de Poche</span>
            </button>
            <button
              onClick={() => setActiveSubTab('liste')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeSubTab === 'liste' ? 'bg-[#B71C1C] text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Users size={14} />
              <span>Délégués Affectés ({mandataires.length})</span>
            </button>
          </div>
        </div>
      </div>

      {activeSubTab === 'guide' ? (
        /* Guide juridique de poche */
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-red-950/60 to-black p-4 rounded-xl border border-red-900/60 text-xs">
            <h3 className="font-bold text-[#FFD54F] text-sm flex items-center gap-2 mb-1">
              <ShieldCheck size={16} />
              LES DROITS INALIÉNABLES DU DÉLÉGUÉ DANS LE BUREAU DE VOTE
            </h3>
            <p className="text-gray-300">
              Chaque délégué légalement mandaté dispose d'une immunité fonctionnelle pendant les opérations électorales. Apprenez par cœur ces 6 règles d'or tirées de la Loi n° 2012/001 :
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {COMMANDEMENTS_MANDATAIRE.map((cmd) => (
              <div 
                key={cmd.numero}
                className="bg-[#18181F] border border-[#2E2E3A] p-4 rounded-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-[#B71C1C] text-white text-xs font-black flex items-center justify-center font-heading">
                      {cmd.numero}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black text-[#FFD54F] border border-gray-800">
                      {cmd.loi}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">{cmd.titre}</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">{cmd.conseil}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Gestion des délégués de vote */
        <div className="space-y-4">
          {/* Formulaire ajout délégué */}
          <div className="bg-[#18181F] border border-[#2E2E3A] p-4 rounded-2xl">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <UserPlus size={16} className="text-red-400" />
              Affecter un nouveau délégué à un bureau de vote
            </h3>

            <form onSubmit={handleAjouterMandataire} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-gray-400 font-semibold mb-1">Nom du Délégué</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Tcheutchoua Hervé"
                  value={nouveauMandataire.nom}
                  onChange={(e) => setNouveauMandataire({ ...nouveauMandataire, nom: e.target.value })}
                  className="w-full bg-[#101015] border border-gray-700 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-400 font-semibold mb-1">Téléphone Direct</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: +237 6..."
                  value={nouveauMandataire.telephone}
                  onChange={(e) => setNouveauMandataire({ ...nouveauMandataire, telephone: e.target.value })}
                  className="w-full bg-[#101015] border border-gray-700 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-400 font-semibold mb-1">Commune / Ville</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Bafoussam 1er"
                  value={nouveauMandataire.commune}
                  onChange={(e) => setNouveauMandataire({ ...nouveauMandataire, commune: e.target.value })}
                  className="w-full bg-[#101015] border border-gray-700 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-400 font-semibold mb-1">Bureau de Vote ELECAM</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Ex: BV 02 École Camp..."
                    value={nouveauMandataire.bureauVote}
                    onChange={(e) => setNouveauMandataire({ ...nouveauMandataire, bureauVote: e.target.value })}
                    className="w-full bg-[#101015] border border-gray-700 rounded-lg px-3 py-2 text-white"
                  />
                  <button
                    type="submit"
                    className="bg-[#D32F2F] hover:bg-red-700 text-white px-3 py-2 rounded-lg font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Liste des délégués enregistrés */}
          <div className="space-y-2.5">
            {mandataires.map((m) => (
              <div 
                key={m.id}
                className="bg-[#18181F] border border-[#2E2E3A] p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{m.nom}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {m.statut}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    📍 {m.bureauVote} ({m.commune}) • 📞 {m.telephone}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleTogglePv(m.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      m.pvRecu 
                        ? 'bg-emerald-700 text-white shadow' 
                        : 'bg-gray-800 text-gray-300 hover:text-white'
                    }`}
                  >
                    <CheckCircle size={14} />
                    <span>{m.pvRecu ? '✓ PV Sécurisé' : 'Attente Copie PV'}</span>
                  </button>

                  <button
                    onClick={() => imprimerMandat(m)}
                    className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-[#FFD54F] border border-gray-700 transition"
                    title="Imprimer le mandat officiel"
                  >
                    <Printer size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
