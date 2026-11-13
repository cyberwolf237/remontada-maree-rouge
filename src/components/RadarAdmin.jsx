import React, { useState, useEffect } from 'react';
import { BUREAUX_ADMIN_INITIAUX } from '../data/electoralData';
import { Radio, AlertOctagon, CheckCircle2, Clock, MapPin, ThumbsUp, PlusCircle, Search, Filter, ShieldCheck, Flame } from 'lucide-react';

export function RadarAdmin() {
  const [bureaux, setBureaux] = useState(() => {
    const saved = localStorage.getItem('maree_radar_bureaux');
    return saved ? JSON.parse(saved) : BUREAUX_ADMIN_INITIAUX;
  });

  const [selectedRegion, setSelectedRegion] = useState('Toutes');
  const [filterStatut, setFilterStatut] = useState('tous'); // 'tous' | 'urgent' | 'ouvert'
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Formulaire nouveau signalement
  const [nouveauSignalement, setNouveauSignalement] = useState({
    nom: '',
    type: 'Sous-Préfecture',
    region: 'Centre',
    departement: 'Mfoundi',
    ville: 'Yaoundé',
    statutSousPrefet: 'Absent',
    statutGuichet: 'Fermé sans motif',
    timbresDisponibles: false,
    motifBlocage: ''
  });

  useEffect(() => {
    localStorage.setItem('maree_radar_bureaux', JSON.stringify(bureaux));
  }, [bureaux]);

  const handleConfirmer = (id) => {
    setBureaux(prev => prev.map(b => {
      if (b.id === id) {
        return {
          ...b,
          nbConfirmations: (b.nbConfirmations || 0) + 1,
          dernierSignalement: "À l'instant"
        };
      }
      return b;
    }));
  };

  const handleAjouterSignalement = (e) => {
    e.preventDefault();
    if (!nouveauSignalement.nom) return;

    const newBureau = {
      ...nouveauSignalement,
      id: `bureau_${Date.now()}`,
      nbConfirmations: 1,
      dernierSignalement: "À l'instant",
      niveauAlerte: nouveauSignalement.statutSousPrefet === 'Absent' || nouveauSignalement.statutGuichet === 'Fermé sans motif' ? 'Critique' : 'Faible'
    };

    setBureaux([newBureau, ...bureaux]);
    setShowModal(false);
    setNouveauSignalement({
      nom: '',
      type: 'Sous-Préfecture',
      region: 'Centre',
      departement: 'Mfoundi',
      ville: 'Yaoundé',
      statutSousPrefet: 'Absent',
      statutGuichet: 'Fermé sans motif',
      timbresDisponibles: false,
      motifBlocage: ''
    });
  };

  // Filtrage
  const filteredBureaux = bureaux.filter(b => {
    const matchRegion = selectedRegion === 'Toutes' || b.region === selectedRegion;
    const matchSearch = b.nom.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        b.ville.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        b.departement.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchStatut = true;
    if (filterStatut === 'urgent') {
      matchStatut = b.statutSousPrefet === 'Absent' || b.statutGuichet.includes('Fermé') || b.statutGuichet.includes('Déserté') || !b.timbresDisponibles;
    } else if (filterStatut === 'ouvert') {
      matchStatut = b.statutSousPrefet === 'Présent' && !b.statutGuichet.includes('Fermé');
    }

    return matchRegion && matchSearch && matchStatut;
  });

  const regions = ['Toutes', 'Centre', 'Littoral', 'Ouest', 'Nord', 'Nord-Ouest', 'Sud-Ouest', 'Adamaoua', 'Est', 'Extrême-Nord', 'Sud'];

  return (
    <div className="space-y-6">
      {/* En-tête du Radar */}
      <div className="bg-[#18181F] border border-[#2E2E3A] p-4 sm:p-5 rounded-2xl shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#B71C1C] text-white text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1 uppercase">
                <Flame size={12} className="text-[#FFD54F]" />
                En Direct Terrain
              </span>
              <h2 className="text-lg font-black font-heading text-white">
                RADAR CITOYEN DES SOUS-PRÉFECTURES & GUICHETS
              </h2>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Surveillance participative en direct pour déjouer les tactiques de désertion et les fausses pénuries de timbres.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-lg border border-red-500/40"
          >
            <PlusCircle size={16} />
            <span>Signaler un Bureau Maintenant</span>
          </button>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="mt-4 pt-4 border-t border-gray-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-500" size={15} />
            <input
              type="text"
              placeholder="Rechercher une sous-préfecture, un tribunal ou une ville..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#101015] border border-gray-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#D32F2F]"
            />
          </div>

          <div>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full bg-[#101015] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D32F2F]"
            >
              {regions.map(r => (
                <option key={r} value={r}>Région : {r}</option>
              ))}
            </select>
          </div>

          <div className="flex bg-[#101015] p-1 rounded-xl border border-gray-800">
            <button
              onClick={() => setFilterStatut('tous')}
              className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold transition ${
                filterStatut === 'tous' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Tous ({bureaux.length})
            </button>
            <button
              onClick={() => setFilterStatut('urgent')}
              className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold transition ${
                filterStatut === 'urgent' ? 'bg-[#B71C1C] text-white' : 'text-red-400 hover:text-red-300'
              }`}
            >
              🚨 Bloqués
            </button>
            <button
              onClick={() => setFilterStatut('ouvert')}
              className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold transition ${
                filterStatut === 'ouvert' ? 'bg-emerald-700 text-white' : 'text-emerald-400 hover:text-emerald-300'
              }`}
            >
              🟢 Ouverts
            </button>
          </div>
        </div>
      </div>

      {/* Grille des Administrations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBureaux.length === 0 ? (
          <div className="col-span-2 text-center py-12 bg-[#18181F] rounded-2xl border border-gray-800 text-gray-400 text-xs">
            Aucune administration ne correspond à votre recherche pour le moment.
          </div>
        ) : (
          filteredBureaux.map((b) => {
            const isCritical = b.statutSousPrefet === 'Absent' || b.statutGuichet.includes('Fermé') || b.statutGuichet.includes('Déserté');
            return (
              <div
                key={b.id}
                className={`p-4 rounded-2xl border transition-all relative overflow-hidden ${
                  isCritical 
                    ? 'bg-[#1C1315] border-red-900/60 shadow-lg' 
                    : 'bg-[#18181F] border-[#2A2A35]'
                }`}
              >
                {/* Liseré indicateur d'urgence */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${
                  isCritical ? 'bg-red-600 animate-pulse' : 'bg-emerald-500'
                }`}></div>

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/50 text-[#FFD54F] border border-gray-800">
                        {b.region} • {b.ville}
                      </span>
                      <span className="text-[10px] font-semibold text-gray-400">
                        {b.type}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white mt-1.5">{b.nom}</h3>
                  </div>

                  <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                    isCritical ? 'bg-red-950 text-red-300 border border-red-800' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}>
                    {isCritical ? 'ALERTE BLOCAGE' : 'SERVICE DISPONIBLE'}
                  </span>
                </div>

                {/* Indicateurs clés : Sous-préfet, Guichet, Timbres */}
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-800/80 text-xs text-center">
                  <div className="bg-[#121217] p-2 rounded-xl border border-gray-800">
                    <span className="text-[10px] text-gray-400 block">Sous-Préfet / Chef</span>
                    <span className={`font-bold text-xs mt-0.5 block ${
                      b.statutSousPrefet === 'Présent' ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {b.statutSousPrefet === 'Présent' ? '✓ Présent' : '✗ Absent'}
                    </span>
                  </div>

                  <div className="bg-[#121217] p-2 rounded-xl border border-gray-800">
                    <span className="text-[10px] text-gray-400 block">État Guichet</span>
                    <span className={`font-bold text-xs mt-0.5 block truncate ${
                      b.statutGuichet.includes('Ouvert') ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {b.statutGuichet}
                    </span>
                  </div>

                  <div className="bg-[#121217] p-2 rounded-xl border border-gray-800">
                    <span className="text-[10px] text-gray-400 block">Timbres Fiscaux</span>
                    <span className={`font-bold text-xs mt-0.5 block ${
                      b.timbresDisponibles ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {b.timbresDisponibles ? '✓ En stock' : '✗ Pénurie'}
                    </span>
                  </div>
                </div>

                {/* Motif / Commentaire terrain */}
                {b.motifBlocage && (
                  <div className="mt-2.5 p-2 rounded-xl bg-black/50 border border-gray-800 text-[11px] text-gray-300">
                    <strong className="text-amber-300">Constat de terrain :</strong> {b.motifBlocage}
                  </div>
                )}

                {/* Bas de carte : Horodatage & Bouton de confirmation citoyenne */}
                <div className="mt-3 pt-2 border-t border-gray-800/60 flex items-center justify-between text-[11px] text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>Signalé : {b.dernierSignalement}</span>
                  </div>

                  <button
                    onClick={() => handleConfirmer(b.id)}
                    className="flex items-center gap-1.5 bg-[#23232E] hover:bg-[#2D2D3B] text-yellow-300 px-2.5 py-1 rounded-lg font-semibold transition border border-gray-700"
                  >
                    <ThumbsUp size={12} />
                    <span>Je confirme ({b.nbConfirmations || 0})</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal pour nouveau signalement */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#18181F] border border-[#2E2E3A] rounded-2xl max-w-lg w-full p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div>
                <h3 className="text-base font-black font-heading text-white">
                  ALERTER LA COMMUNAUTÉ SUR UN SERVICE
                </h3>
                <p className="text-xs text-gray-400">
                  Signalement anonyme et instantané pour informer les candidats.
                </p>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAjouterSignalement} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Nom de l'Administration</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Sous-préfecture de Nkongsamba / Tribunal de Ngaoundéré"
                  value={nouveauSignalement.nom}
                  onChange={(e) => setNouveauSignalement({ ...nouveauSignalement, nom: e.target.value })}
                  className="w-full bg-[#101015] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#D32F2F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Région</label>
                  <select
                    value={nouveauSignalement.region}
                    onChange={(e) => setNouveauSignalement({ ...nouveauSignalement, region: e.target.value })}
                    className="w-full bg-[#101015] border border-gray-700 rounded-lg px-2 py-2 text-white"
                  >
                    {regions.filter(r => r !== 'Toutes').map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Ville / Commune</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Yaoundé / Douala"
                    value={nouveauSignalement.ville}
                    onChange={(e) => setNouveauSignalement({ ...nouveauSignalement, ville: e.target.value })}
                    className="w-full bg-[#101015] border border-gray-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Présence du Responsable</label>
                  <select
                    value={nouveauSignalement.statutSousPrefet}
                    onChange={(e) => setNouveauSignalement({ ...nouveauSignalement, statutSousPrefet: e.target.value })}
                    className="w-full bg-[#101015] border border-gray-700 rounded-lg px-2 py-2 text-white"
                  >
                    <option value="Absent">Absent / En fuite</option>
                    <option value="Présent">Présent au bureau</option>
                    <option value="En réunion fermée">En réunion fermée</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 font-bold mb-1">État du Guichet</label>
                  <select
                    value={nouveauSignalement.statutGuichet}
                    onChange={(e) => setNouveauSignalement({ ...nouveauSignalement, statutGuichet: e.target.value })}
                    className="w-full bg-[#101015] border border-gray-700 rounded-lg px-2 py-2 text-white"
                  >
                    <option value="Fermé sans motif">Fermé sans motif</option>
                    <option value="Déserté">Déserté par les agents</option>
                    <option value="Ouvert">Ouvert normalement</option>
                    <option value="Ralenti">Très ralenti</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Disponibilité des Timbres Fiscaux</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer text-gray-200">
                    <input
                      type="radio"
                      name="timbres"
                      checked={nouveauSignalement.timbresDisponibles === true}
                      onChange={() => setNouveauSignalement({ ...nouveauSignalement, timbresDisponibles: true })}
                    />
                    <span>Disponibles aux prix officiels</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer text-red-400">
                    <input
                      type="radio"
                      name="timbres"
                      checked={nouveauSignalement.timbresDisponibles === false}
                      onChange={() => setNouveauSignalement({ ...nouveauSignalement, timbresDisponibles: false })}
                    />
                    <span>Pénurie ou Racket / Marché noir</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Détails / Précisions constatées</label>
                <textarea
                  rows={3}
                  placeholder="Ex: Le sous-préfet a quitté le bureau vers 10h en disant qu'il revient lundi..."
                  value={nouveauSignalement.motifBlocage}
                  onChange={(e) => setNouveauSignalement({ ...nouveauSignalement, motifBlocage: e.target.value })}
                  className="w-full bg-[#101015] border border-gray-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#D32F2F]"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl font-bold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#D32F2F] hover:bg-red-700 text-white rounded-xl font-bold shadow-lg"
                >
                  Publier l'Alerte
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
