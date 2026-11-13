import React, { useState, useEffect } from 'react';
import { ELECTIONS_DATA, MODELES_JURIDIQUES } from '../data/electoralData';
import { Copy, Check, Printer, Scale, Building2, AlertTriangle, FileText } from 'lucide-react';

export function DossierCandidat() {
  const [scrutin, setScrutin] = useState('legislatives');
  const [candidatInfo, setCandidatInfo] = useState(() => {
    const saved = localStorage.getItem('maree_candidat_info');
    return saved ? JSON.parse(saved) : {
      nom: '',
      parti: 'La Remontada Citoyenne',
      departement: 'Mfoundi',
      arrondissement: 'Yaoundé 1er',
      ville: 'Yaoundé'
    };
  });

  const [piecesStatus, setPiecesStatus] = useState(() => {
    const saved = localStorage.getItem('maree_pieces_status');
    return saved ? JSON.parse(saved) : {};
  });

  const [selectedModele, setSelectedModele] = useState(MODELES_JURIDIQUES[0].id);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    localStorage.setItem('maree_candidat_info', JSON.stringify(candidatInfo));
  }, [candidatInfo]);

  useEffect(() => {
    localStorage.setItem('maree_pieces_status', JSON.stringify(piecesStatus));
  }, [piecesStatus]);

  const currentElection = ELECTIONS_DATA[scrutin];
  const pieces = currentElection.pieces;

  const totalPieces = pieces.length;
  const validatedPieces = pieces.filter(p => piecesStatus[p.id] === 'valide').length;
  const blockedPieces = pieces.filter(p => piecesStatus[p.id] === 'bloque').length;
  const percentCompleted = Math.round((validatedPieces / totalPieces) * 100);

  const handleStatusChange = (pieceId, newStatus) => {
    setPiecesStatus(prev => ({ ...prev, [pieceId]: newStatus }));
  };

  const currentModeleObj = MODELES_JURIDIQUES.find(m => m.id === selectedModele) || MODELES_JURIDIQUES[0];
  const texteGenere = currentModeleObj.genererTexte({
    nom: candidatInfo.nom || '[VOTRE NOM]',
    ville: candidatInfo.ville || 'Yaoundé',
    arrondissement: candidatInfo.arrondissement || 'Yaoundé 1er',
    scrutin: scrutin === 'legislatives' ? 'Législatives' : 'Municipales',
    autorite: 'Monsieur le Sous-Préfet'
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(texteGenere);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>${currentModeleObj.titre}</title>
          <style>body { font-family: -apple-system, system-ui, sans-serif; padding: 24px; white-space: pre-wrap; font-size: 13px; line-height: 1.6; color: #111; }</style>
        </head>
        <body>${texteGenere}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="space-y-5">
      {/* Sélecteur & Avancement */}
      <div className="mr-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Scale size={18} className="text-[var(--accent)]" />
              Constitution du dossier officiel
            </h2>
            <p className="text-xs text-[var(--muted)] mt-0.5">
              Code Électoral camerounais (Loi n° 2012/001 du 19 avril 2012).
            </p>
          </div>

          <div className="flex bg-[#101015] p-1 rounded-lg border border-[var(--border)] self-start sm:self-auto">
            <button
              onClick={() => setScrutin('legislatives')}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition ${
                scrutin === 'legislatives' ? 'bg-[var(--brand)] text-white' : 'text-[var(--muted)] hover:text-white'
              }`}
            >
              Législatives (Députés)
            </button>
            <button
              onClick={() => setScrutin('municipales')}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition ${
                scrutin === 'municipales' ? 'bg-[var(--brand)] text-white' : 'text-[var(--muted)] hover:text-white'
              }`}
            >
              Municipales (Maires)
            </button>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[var(--border)] grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
          <div className="md:col-span-2">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[var(--muted)]">Pièces complétées</span>
              <span className="font-semibold text-white">
                {validatedPieces}/{totalPieces} ({percentCompleted}%)
              </span>
            </div>
            <div className="w-full bg-[#101015] h-2.5 rounded-full overflow-hidden border border-[var(--border)]">
              <div
                className="bg-[var(--accent)] h-full transition-all duration-300"
                style={{ width: `${percentCompleted}%` }}
              />
            </div>
            {blockedPieces > 0 && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                <AlertTriangle size={13} /> {blockedPieces} pièce(s) signalée(s) comme bloquée(s) ou refusée(s).
              </p>
            )}
          </div>

          <div className="text-xs bg-[#101015] p-2.5 rounded-lg border border-[var(--border)]">
            <span className="text-[var(--muted)] block">Cautionnement légal officiel :</span>
            <strong className="text-white block mt-0.5">{currentElection.cautionnement}</strong>
          </div>
        </div>
      </div>

      {/* Renseignements rapides */}
      <div className="mr-card">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-3 flex items-center gap-2">
          <Building2 size={15} />
          Informations du candidat (pour les actes juridiques)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-[11px] text-[var(--muted)] block mb-1">Nom du candidat</label>
            <input
              type="text"
              className="mr-input"
              placeholder="Ex: Mono Aristide"
              value={candidatInfo.nom}
              onChange={(e) => setCandidatInfo({ ...candidatInfo, nom: e.target.value })}
            />
          </div>
          <div>
            <label className="text-[11px] text-[var(--muted)] block mb-1">Arrondissement / Ville</label>
            <input
              type="text"
              className="mr-input"
              placeholder="Ex: Yaoundé 1er"
              value={candidatInfo.arrondissement}
              onChange={(e) => setCandidatInfo({ ...candidatInfo, arrondissement: e.target.value })}
            />
          </div>
          <div>
            <label className="text-[11px] text-[var(--muted)] block mb-1">Parti / Regroupement</label>
            <input
              type="text"
              className="mr-input"
              placeholder="Ex: La Remontada Citoyenne"
              value={candidatInfo.parti}
              onChange={(e) => setCandidatInfo({ ...candidatInfo, parti: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Liste des pièces requises */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">
            Documents obligatoires ({pieces.length})
          </h3>
          <span className="text-xs text-[var(--muted)]">
            Cochez l'état d'avancement
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {pieces.map((piece) => {
            const status = piecesStatus[piece.id] || 'a_faire';
            return (
              <div key={piece.id} className="mr-card flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-mono text-[var(--accent)]">
                      {piece.articles}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      piece.priorite === 'Critique' ? 'bg-red-950/80 text-red-300 border border-red-900' : 'bg-[#23232d] text-gray-300'
                    }`}>
                      {piece.priorite}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1">{piece.nom}</h4>
                  
                  <div className="text-xs text-[var(--muted)] mt-2 space-y-0.5">
                    <p><strong className="text-gray-300">Lieu :</strong> {piece.autorite}</p>
                    <p><strong className="text-gray-300">Coût officiel :</strong> {piece.cout} • Délai : {piece.delai}</p>
                  </div>

                  <div className="mt-2 text-[11px] bg-[#121217] p-2 rounded border border-[var(--border)] text-gray-300">
                    <strong className="text-amber-400">Point de vigilance :</strong> {piece.piege}
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[var(--border)] grid grid-cols-4 gap-1">
                  {[
                    { id: 'a_faire', label: 'À faire' },
                    { id: 'en_cours', label: 'En cours' },
                    { id: 'bloque', label: 'Bloqué' },
                    { id: 'valide', label: 'Validé' }
                  ].map(s => (
                    <button
                      key={s.id}
                      onClick={() => handleStatusChange(piece.id, s.id)}
                      className={`py-1 text-[11px] font-medium rounded transition ${
                        status === s.id
                          ? s.id === 'valide' ? 'bg-emerald-700 text-white font-bold'
                            : s.id === 'bloque' ? 'bg-red-800 text-white font-bold'
                            : s.id === 'en_cours' ? 'bg-amber-600 text-white font-bold'
                            : 'bg-gray-700 text-white font-bold'
                          : 'text-[var(--muted)] hover:bg-[#23232d]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Générateur d'actes d'urgence */}
      <div className="mr-card border-[var(--border)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText size={16} className="text-[var(--accent)]" />
              Modèles de sommations d'huissier & recours administratifs
            </h3>
            <p className="text-xs text-[var(--muted)]">
              En cas de désertion ou de refus de signature, ces exploits servent de preuve légale d'entrave.
            </p>
          </div>

          <div className="flex gap-2">
            <button onClick={handleCopy} className="mr-btn mr-btn-secondary">
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Copié' : 'Copier'}</span>
            </button>
            <button onClick={handlePrint} className="mr-btn mr-btn-primary">
              <Printer size={14} />
              <span>Imprimer</span>
            </button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-[var(--border)] mb-3">
          {MODELES_JURIDIQUES.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedModele(m.id)}
              className={`text-xs px-3 py-1.5 rounded font-medium whitespace-nowrap transition ${
                selectedModele === m.id
                  ? 'bg-[var(--accent)] text-black font-semibold'
                  : 'text-[var(--muted)] hover:text-white bg-[#101015]'
              }`}
            >
              {m.titre.split('(')[0]}
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-400 mb-2">
          {currentModeleObj.usage} • <em>{currentModeleObj.delaiRecommande}</em>
        </p>

        <div className="bg-[#101015] rounded p-3 border border-[var(--border)] font-mono text-xs text-gray-300 max-h-72 overflow-y-auto whitespace-pre-wrap leading-relaxed select-all">
          {texteGenere}
        </div>
      </div>
    </div>
  );
}
