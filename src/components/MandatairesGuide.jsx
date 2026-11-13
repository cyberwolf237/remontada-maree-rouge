import React, { useState, useEffect } from 'react';
import { COMMANDEMENTS_MANDATAIRE, MODELES_JURIDIQUES } from '../data/electoralData';
import { Users, BookOpen, Plus, Printer, Check } from 'lucide-react';

export function MandatairesGuide() {
  const [mandataires, setMandataires] = useState(() => {
    const saved = localStorage.getItem('maree_mandataires_list');
    return saved ? JSON.parse(saved) : [
      {
        id: "m_1",
        nom: "Nkouateu Jean-Pierre",
        telephone: "+237 699 12 34 56",
        commune: "Yaoundé 1er",
        bureauVote: "BV 04 - École Publique Bastos",
        pvRecu: false
      },
      {
        id: "m_2",
        nom: "Fokam Marie-Claire",
        telephone: "+237 677 88 99 00",
        commune: "Douala 3ème",
        bureauVote: "BV 12 - Foyer Municipal Logbaba",
        pvRecu: false
      }
    ];
  });

  const [nouveau, setNouveau] = useState({
    nom: '',
    telephone: '',
    commune: 'Yaoundé 1er',
    bureauVote: ''
  });

  const [subTab, setSubTab] = useState('guide');

  useEffect(() => {
    localStorage.setItem('maree_mandataires_list', JSON.stringify(mandataires));
  }, [mandataires]);

  const handleAjouter = (e) => {
    e.preventDefault();
    if (!nouveau.nom || !nouveau.bureauVote) return;
    setMandataires([{
      id: `m_${Date.now()}`,
      nom: nouveau.nom,
      telephone: nouveau.telephone,
      commune: nouveau.commune,
      bureauVote: nouveau.bureauVote,
      pvRecu: false
    }, ...mandataires]);
    setNouveau({ nom: '', telephone: '', commune: 'Yaoundé 1er', bureauVote: '' });
  };

  const togglePv = (id) => {
    setMandataires(mandataires.map(m => m.id === id ? { ...m, pvRecu: !m.pvRecu } : m));
  };

  const imprimerMandat = (mand) => {
    const modele = MODELES_JURIDIQUES.find(m => m.id === 'guide_mandataire');
    const texte = modele.genererTexte({ nom: mand.nom, ville: mand.commune });
    const w = window.open('', '', 'width=800,height=600');
    w.document.write(`<html><head><title>Mandat - ${mand.nom}</title><style>body { font-family: -apple-system, sans-serif; padding: 24px; white-space: pre-wrap; font-size: 13px; line-height: 1.6; }</style></head><body>${texte}</body></html>`);
    w.document.close();
    w.focus();
    w.print();
  };

  return (
    <div className="space-y-4">
      <div className="mr-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Users size={18} className="text-[var(--accent)]" />
              Mandataires & Délégués de bureaux de vote
            </h2>
            <p className="text-xs text-[var(--muted)] mt-0.5">
              Affectation des scrutateurs et règles légales pour la surveillance du scrutin et la remise du Procès-Verbal (PV).
            </p>
          </div>

          <div className="flex bg-[#101015] p-1 rounded-lg border border-[var(--border)] self-start sm:self-auto">
            <button
              onClick={() => setSubTab('guide')}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition ${
                subTab === 'guide' ? 'bg-[var(--brand)] text-white' : 'text-[var(--muted)] hover:text-white'
              }`}
            >
              Guide légal de terrain
            </button>
            <button
              onClick={() => setSubTab('liste')}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition ${
                subTab === 'liste' ? 'bg-[var(--brand)] text-white' : 'text-[var(--muted)] hover:text-white'
              }`}
            >
              Délégués affectés ({mandataires.length})
            </button>
          </div>
        </div>
      </div>

      {subTab === 'guide' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {COMMANDEMENTS_MANDATAIRE.map(cmd => (
            <div key={cmd.numero} className="mr-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-[var(--brand)] text-white text-[11px] font-bold flex items-center justify-center">
                    {cmd.numero}
                  </span>
                  <span className="text-[11px] font-mono text-[var(--accent)]">{cmd.loi}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{cmd.titre}</h3>
                <p className="text-xs text-gray-300 leading-relaxed">{cmd.conseil}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="mr-card">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-3">
              Enregistrer un mandataire
            </h3>
            <form onSubmit={handleAjouter} className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs">
              <input
                type="text"
                required
                className="mr-input"
                placeholder="Nom complet"
                value={nouveau.nom}
                onChange={(e) => setNouveau({ ...nouveau, nom: e.target.value })}
              />
              <input
                type="text"
                required
                className="mr-input"
                placeholder="Téléphone (+237...)"
                value={nouveau.telephone}
                onChange={(e) => setNouveau({ ...nouveau, telephone: e.target.value })}
              />
              <input
                type="text"
                required
                className="mr-input"
                placeholder="Commune"
                value={nouveau.commune}
                onChange={(e) => setNouveau({ ...nouveau, commune: e.target.value })}
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  className="mr-input"
                  placeholder="Bureau de vote ELECAM"
                  value={nouveau.bureauVote}
                  onChange={(e) => setNouveau({ ...nouveau, bureauVote: e.target.value })}
                />
                <button type="submit" className="mr-btn mr-btn-primary">
                  <Plus size={16} />
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-2">
            {mandataires.map(m => (
              <div key={m.id} className="mr-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                <div className="text-xs">
                  <strong className="text-white text-sm block">{m.nom}</strong>
                  <span className="text-[var(--muted)]">
                    {m.bureauVote} ({m.commune}) • 📞 {m.telephone}
                  </span>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => togglePv(m.id)}
                    className={`mr-btn py-1 text-xs ${
                      m.pvRecu ? 'bg-emerald-800 text-white' : 'mr-btn-secondary text-[var(--muted)]'
                    }`}
                  >
                    <Check size={13} />
                    <span>{m.pvRecu ? 'PV récupéré' : 'Attente PV'}</span>
                  </button>
                  <button
                    onClick={() => imprimerMandat(m)}
                    className="mr-btn mr-btn-secondary py-1 text-xs text-[var(--accent)]"
                    title="Imprimer le mandat officiel"
                  >
                    <Printer size={14} />
                    <span>Mandat</span>
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
