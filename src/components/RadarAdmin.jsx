import React, { useState, useEffect } from 'react';
import { BUREAUX_ADMIN_INITIAUX } from '../data/electoralData';
import { Search, Plus, ThumbsUp, Clock, MapPin, Building2, Check, AlertCircle } from 'lucide-react';

export function RadarAdmin() {
  const [bureaux, setBureaux] = useState(() => {
    const saved = localStorage.getItem('maree_radar_bureaux');
    return saved ? JSON.parse(saved) : BUREAUX_ADMIN_INITIAUX;
  });

  const [selectedRegion, setSelectedRegion] = useState('Toutes');
  const [filterStatut, setFilterStatut] = useState('tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [nouveau, setNouveau] = useState({
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
    setBureaux(prev => prev.map(b => b.id === id ? { ...b, nbConfirmations: (b.nbConfirmations || 0) + 1, dernierSignalement: "À l'instant" } : b));
  };

  const handleAjouter = (e) => {
    e.preventDefault();
    if (!nouveau.nom) return;
    const item = {
      ...nouveau,
      id: `b_${Date.now()}`,
      nbConfirmations: 1,
      dernierSignalement: "À l'instant",
      niveauAlerte: nouveau.statutSousPrefet === 'Absent' ? 'Critique' : 'Faible'
    };
    setBureaux([item, ...bureaux]);
    setShowModal(false);
    setNouveau({
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

  const filtered = bureaux.filter(b => {
    const matchRegion = selectedRegion === 'Toutes' || b.region === selectedRegion;
    const matchSearch = b.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        b.ville.toLowerCase().includes(searchQuery.toLowerCase());
    let matchStatut = true;
    if (filterStatut === 'ferme') matchStatut = b.statutSousPrefet === 'Absent' || b.statutGuichet.includes('Fermé');
    if (filterStatut === 'ouvert') matchStatut = b.statutSousPrefet === 'Présent' && !b.statutGuichet.includes('Fermé');
    return matchRegion && matchSearch && matchStatut;
  });

  const regions = ['Toutes', 'Centre', 'Littoral', 'Ouest', 'Nord', 'Nord-Ouest', 'Sud-Ouest', 'Adamaoua', 'Est', 'Extrême-Nord', 'Sud'];

  return (
    <div className="space-y-4">
      {/* En-tête du Radar */}
      <div className="mr-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              Radar terrain des services publics
            </h2>
            <p className="text-xs text-[var(--muted)] mt-0.5">
              Signalements citoyens en direct : présence des sous-préfets, ouverture des guichets et timbres.
            </p>
          </div>

          <button onClick={() => setShowModal(true)} className="mr-btn mr-btn-primary self-start sm:self-auto">
            <Plus size={16} />
            <span>Signaler un bureau</span>
          </button>
        </div>

        {/* Filtres */}
        <div className="mt-4 pt-3 border-t border-[var(--border)] grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-[var(--muted)]" size={14} />
            <input
              type="text"
              placeholder="Rechercher une sous-préfecture, ville..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mr-input pl-8"
            />
          </div>

          <div>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="mr-input"
            >
              {regions.map(r => <option key={r} value={r}>Région : {r}</option>)}
            </select>
          </div>

          <div className="flex bg-[#101015] p-1 rounded-lg border border-[var(--border)]">
            {[
              { id: 'tous', label: `Tous (${bureaux.length})` },
              { id: 'ferme', label: 'Bureaux fermés' },
              { id: 'ouvert', label: 'Ouverts' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterStatut(f.id)}
                className={`flex-1 py-1 text-xs font-medium rounded transition ${
                  filterStatut === f.id ? 'bg-[var(--brand)] text-white' : 'text-[var(--muted)] hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Liste des administrations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map(b => {
          const isClosed = b.statutSousPrefet === 'Absent' || b.statutGuichet.includes('Fermé');
          return (
            <div key={b.id} className="mr-card flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] text-[var(--muted)] block">
                      {b.region} • {b.ville} ({b.type})
                    </span>
                    <h3 className="text-sm font-bold text-white mt-0.5">{b.nom}</h3>
                  </div>

                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                    isClosed ? 'bg-red-950/70 text-red-300 border border-red-900/60' : 'bg-emerald-950/70 text-emerald-300 border border-emerald-900/60'
                  }`}>
                    {isClosed ? 'Fermé / Absent' : 'Ouvert'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                  <div className="bg-[#111116] p-2 rounded border border-[var(--border)]">
                    <span className="text-[10px] text-[var(--muted)] block">Sous-Préfet</span>
                    <strong className={b.statutSousPrefet === 'Présent' ? 'text-emerald-400' : 'text-red-400'}>
                      {b.statutSousPrefet}
                    </strong>
                  </div>

                  <div className="bg-[#111116] p-2 rounded border border-[var(--border)]">
                    <span className="text-[10px] text-[var(--muted)] block">Guichet</span>
                    <strong className="text-gray-200 truncate block">{b.statutGuichet}</strong>
                  </div>

                  <div className="bg-[#111116] p-2 rounded border border-[var(--border)]">
                    <span className="text-[10px] text-[var(--muted)] block">Timbres</span>
                    <strong className={b.timbresDisponibles ? 'text-emerald-400' : 'text-red-400'}>
                      {b.timbresDisponibles ? 'Disponibles' : 'Pénurie'}
                    </strong>
                  </div>
                </div>

                {b.motifBlocage && (
                  <p className="mt-2 text-xs text-gray-300 bg-[#111116] p-2 rounded border border-[var(--border)]">
                    <span className="text-[var(--muted)]">Observation :</span> {b.motifBlocage}
                  </p>
                )}
              </div>

              <div className="mt-3 pt-2.5 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--muted)]">
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {b.dernierSignalement}
                </span>

                <button
                  onClick={() => handleConfirmer(b.id)}
                  className="mr-btn mr-btn-secondary py-1 text-xs text-[var(--accent)]"
                >
                  <ThumbsUp size={12} />
                  <span>Confirmer ({b.nbConfirmations || 0})</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal nouveau signalement */}
      {showModal && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-3">
          <div className="mr-card max-w-md w-full p-4 space-y-3 bg-[#18181f]">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
              <h3 className="text-sm font-bold text-white">Nouveau signalement terrain</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAjouter} className="space-y-2.5 text-xs">
              <div>
                <label className="block text-[var(--muted)] mb-1">Nom du service</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Sous-préfecture de Yaoundé 1er"
                  className="mr-input"
                  value={nouveau.nom}
                  onChange={(e) => setNouveau({ ...nouveau, nom: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[var(--muted)] mb-1">Région</label>
                  <select
                    className="mr-input"
                    value={nouveau.region}
                    onChange={(e) => setNouveau({ ...nouveau, region: e.target.value })}
                  >
                    {regions.filter(r => r !== 'Toutes').map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[var(--muted)] mb-1">Ville</label>
                  <input
                    type="text"
                    required
                    className="mr-input"
                    value={nouveau.ville}
                    onChange={(e) => setNouveau({ ...nouveau, ville: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[var(--muted)] mb-1">Sous-préfet / Chef</label>
                  <select
                    className="mr-input"
                    value={nouveau.statutSousPrefet}
                    onChange={(e) => setNouveau({ ...nouveau, statutSousPrefet: e.target.value })}
                  >
                    <option value="Absent">Absent</option>
                    <option value="Présent">Présent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[var(--muted)] mb-1">Guichet</label>
                  <select
                    className="mr-input"
                    value={nouveau.statutGuichet}
                    onChange={(e) => setNouveau({ ...nouveau, statutGuichet: e.target.value })}
                  >
                    <option value="Fermé sans motif">Fermé sans motif</option>
                    <option value="Ouvert">Ouvert</option>
                    <option value="Déserté">Déserté</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[var(--muted)] mb-1">Timbres fiscaux</label>
                <select
                  className="mr-input"
                  value={nouveau.timbresDisponibles ? 'oui' : 'non'}
                  onChange={(e) => setNouveau({ ...nouveau, timbresDisponibles: e.target.value === 'oui' })}
                >
                  <option value="oui">Disponibles au tarif légal</option>
                  <option value="non">Pénurie ou surfacturation</option>
                </select>
              </div>

              <div>
                <label className="block text-[var(--muted)] mb-1">Précisions constatées</label>
                <textarea
                  rows={2}
                  className="mr-input"
                  placeholder="Ex: Porte verrouillée depuis ce matin, aucun agent présent..."
                  value={nouveau.motifBlocage}
                  onChange={(e) => setNouveau({ ...nouveau, motifBlocage: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[var(--border)]">
                <button type="button" onClick={() => setShowModal(false)} className="mr-btn mr-btn-secondary">
                  Annuler
                </button>
                <button type="submit" className="mr-btn mr-btn-primary">
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
