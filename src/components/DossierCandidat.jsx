import React, { useState, useEffect } from 'react';
import { ELECTIONS_DATA, MODELES_JURIDIQUES } from '../data/electoralData';
import { CheckCircle2, Clock, AlertTriangle, FileDown, Copy, Check, Printer, Scale, Sparkles, Building2 } from 'lucide-react';

export function DossierCandidat() {
  const [scrutin, setScrutin] = useState('legislatives'); // 'legislatives' | 'municipales'
  const [candidatInfo, setCandidatInfo] = useState(() => {
    const saved = localStorage.getItem('maree_candidat_info');
    return saved ? JSON.parse(saved) : {
      nom: '',
      parti: 'La Remontada Citoyenne',
      departement: 'Mfoundi',
      arrondissement: 'Yaoundé 1er',
      ville: 'Yaoundé',
      circonscription: 'Centre - Mfoundi'
    };
  });

  // États des pièces (saved in localStorage)
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

  // Calcul du taux de complétude
  const totalPieces = pieces.length;
  const validatedPieces = pieces.filter(p => piecesStatus[p.id] === 'valide').length;
  const blockedPieces = pieces.filter(p => piecesStatus[p.id] === 'bloque').length;
  const percentCompleted = Math.round((validatedPieces / totalPieces) * 100);

  const handleStatusChange = (pieceId, newStatus) => {
    setPiecesStatus(prev => ({
      ...prev,
      [pieceId]: newStatus
    }));
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
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>${currentModeleObj.titre}</title>
          <style>
            body { font-family: monospace; padding: 20px; white-space: pre-wrap; font-size: 13px; line-height: 1.5; }
          </style>
        </head>
        <body>${texteGenere}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="space-y-6">
      {/* Sélecteur de type d'élection */}
      <div className="bg-[#18181F] border border-[#2E2E3A] p-4 rounded-2xl shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-black font-heading text-white flex items-center gap-2">
              <Scale className="text-[#FFD54F]" size={20} />
              CONSTITUTION DU DOSSIER OFFICIEL
            </h2>
            <p className="text-xs text-gray-400">
              Conformité stricte au Code Électoral camerounais (Loi n° 2012/001 du 19 avril 2012)
            </p>
          </div>

          <div className="flex bg-[#101015] p-1 rounded-xl border border-gray-800">
            <button
              onClick={() => setScrutin('legislatives')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                scrutin === 'legislatives'
                  ? 'bg-[#B71C1C] text-white shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🏛️ Législatives (Députés)
            </button>
            <button
              onClick={() => setScrutin('municipales')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                scrutin === 'municipales'
                  ? 'bg-[#B71C1C] text-white shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🏢 Municipales (Maires)
            </button>
          </div>
        </div>

        {/* Détails du scrutin et jauge */}
        <div className="mt-4 pt-4 border-t border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-2">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-gray-300">Niveau de complétude du dossier :</span>
              <span className={`font-mono font-bold ${percentCompleted === 100 ? 'text-emerald-400' : 'text-[#FFD54F]'}`}>
                {validatedPieces} sur {totalPieces} pièces validées ({percentCompleted}%)
              </span>
            </div>
            <div className="w-full bg-[#121217] h-3.5 rounded-full overflow-hidden border border-gray-800">
              <div 
                className="bg-gradient-to-r from-red-600 via-amber-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${percentCompleted}%` }}
              ></div>
            </div>
            {blockedPieces > 0 && (
              <p className="text-xs text-red-400 font-semibold mt-1.5 flex items-center gap-1">
                <AlertTriangle size={13} /> Attention : {blockedPieces} pièce(s) actuellement bloquée(s) ou refusée(s) par l'administration !
              </p>
            )}
          </div>

          <div className="bg-[#121217] p-3 rounded-xl border border-gray-800 text-xs">
            <span className="text-gray-400 block">Cautionnement légal officiel :</span>
            <span className="text-white font-bold text-sm block mt-0.5 text-yellow-300 font-mono">
              {currentElection.cautionnement}
            </span>
          </div>
        </div>
      </div>

      {/* Profil rapide du candidat (utilisé pour pré-remplir les sommations) */}
      <div className="bg-[#18181F] border border-[#2E2E3A] p-4 rounded-2xl">
        <h3 className="text-sm font-bold text-gray-200 mb-3 flex items-center gap-2">
          <Building2 size={16} className="text-red-400" />
          Vos coordonnées (pour le générateur automatique de sommations d'huissier)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-[11px] font-semibold text-gray-400 block mb-1">Nom complet du Candidat / Tête de liste</label>
            <input
              type="text"
              placeholder="Ex: Mono Aristide / Tcheuko Paul"
              value={candidatInfo.nom}
              onChange={(e) => setCandidatInfo({ ...candidatInfo, nom: e.target.value })}
              className="w-full bg-[#101015] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D32F2F]"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-gray-400 block mb-1">Arrondissement / Commune</label>
            <input
              type="text"
              placeholder="Ex: Yaoundé 1er / Douala 5ème / Bafoussam 2"
              value={candidatInfo.arrondissement}
              onChange={(e) => setCandidatInfo({ ...candidatInfo, arrondissement: e.target.value })}
              className="w-full bg-[#101015] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D32F2F]"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-gray-400 block mb-1">Parti Politique / Coalition</label>
            <input
              type="text"
              placeholder="Ex: La Remontada Citoyenne"
              value={candidatInfo.parti}
              onChange={(e) => setCandidatInfo({ ...candidatInfo, parti: e.target.value })}
              className="w-full bg-[#101015] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D32F2F]"
            />
          </div>
        </div>
      </div>

      {/* Grille des pièces obligatoires */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-200">
            Pièces requises pour le scrutin ({pieces.length} documents légaux)
          </h3>
          <span className="text-[11px] text-gray-400">
            Cliquez sur un statut pour mettre à jour
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {pieces.map((piece) => {
            const status = piecesStatus[piece.id] || 'a_faire';
            return (
              <div 
                key={piece.id}
                className={`p-4 rounded-xl border transition-all ${
                  status === 'valide'
                    ? 'bg-emerald-950/20 border-emerald-600/40'
                    : status === 'bloque'
                    ? 'bg-red-950/30 border-red-500/60 shadow-lg'
                    : status === 'en_cours'
                    ? 'bg-amber-950/20 border-amber-600/40'
                    : 'bg-[#18181F] border-[#2A2A35]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-black/40 border border-gray-800 text-[#FFD54F]">
                      {piece.articles}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1.5">{piece.nom}</h4>
                  </div>
                  
                  {/* Badge de priorité */}
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    piece.priorite === 'Critique' ? 'bg-red-900 text-red-200' : 'bg-gray-800 text-gray-300'
                  }`}>
                    {piece.priorite}
                  </span>
                </div>

                <div className="mt-2.5 text-xs text-gray-300 space-y-1">
                  <div><strong className="text-gray-400">Autorité :</strong> {piece.autorite}</div>
                  <div className="flex items-center justify-between">
                    <span><strong className="text-gray-400">Coût légal :</strong> {piece.cout}</span>
                    <span className="text-gray-400">Délai : {piece.delai}</span>
                  </div>
                </div>

                {/* Piège de l'administration */}
                <div className="mt-2.5 p-2 rounded-lg bg-black/40 border border-red-900/40 text-[11px] text-amber-200/90 flex items-start gap-1.5">
                  <AlertTriangle size={13} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Piège courant :</strong> {piece.piege}</span>
                </div>

                {/* Sélecteur de statut */}
                <div className="mt-3 pt-3 border-t border-gray-800 flex items-center justify-between gap-1">
                  <button
                    onClick={() => handleStatusChange(piece.id, 'a_faire')}
                    className={`flex-1 py-1 px-2 rounded text-[11px] font-bold transition ${
                      status === 'a_faire' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800'
                    }`}
                  >
                    À faire
                  </button>
                  <button
                    onClick={() => handleStatusChange(piece.id, 'en_cours')}
                    className={`flex-1 py-1 px-2 rounded text-[11px] font-bold transition ${
                      status === 'en_cours' ? 'bg-amber-600 text-white' : 'text-amber-400 hover:bg-amber-950/40'
                    }`}
                  >
                    En cours
                  </button>
                  <button
                    onClick={() => handleStatusChange(piece.id, 'bloque')}
                    className={`flex-1 py-1 px-2 rounded text-[11px] font-bold transition ${
                      status === 'bloque' ? 'bg-red-700 text-white animate-pulse' : 'text-red-400 hover:bg-red-950/40'
                    }`}
                  >
                    Bloqué / Refus
                  </button>
                  <button
                    onClick={() => handleStatusChange(piece.id, 'valide')}
                    className={`flex-1 py-1 px-2 rounded text-[11px] font-bold transition ${
                      status === 'valide' ? 'bg-emerald-600 text-white' : 'text-emerald-400 hover:bg-emerald-950/40'
                    }`}
                  >
                    Validé ✓
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Générateur d'actes d'urgence et sommations d'huissier */}
      <div className="bg-[#18181F] border-2 border-[#D32F2F]/60 p-5 rounded-2xl shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#B71C1C] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                Bouclier Juridique
              </span>
              <h3 className="text-base font-black font-heading text-white">
                GÉNÉRATEUR D'ACTES D'URGENCE & RECOURS
              </h3>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Si le sous-préfet est absent ou si un guichet refuse un document, faites délivrer cet exploit sans attendre la forclusion.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-xl text-xs font-bold transition border border-gray-700"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? 'Copié !' : 'Copier le texte'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-[#B71C1C] hover:bg-red-700 text-white px-3 py-2 rounded-xl text-xs font-bold transition shadow"
            >
              <Printer size={14} />
              <span>Imprimer l'Acte</span>
            </button>
          </div>
        </div>

        {/* Onglets de sélection du modèle */}
        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-gray-800 mb-3">
          {MODELES_JURIDIQUES.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedModele(m.id)}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition ${
                selectedModele === m.id
                  ? 'bg-[#FFD54F] text-black shadow'
                  : 'bg-[#101015] text-gray-400 hover:text-white'
              }`}
            >
              {m.titre.split('(')[0]}
            </button>
          ))}
        </div>

        {/* Détail du modèle sélectionné */}
        <div className="bg-[#101015] p-3 rounded-xl border border-gray-800 mb-3 text-xs">
          <p className="text-amber-300 font-semibold mb-1">
            📌 Utilisation recommandée : {currentModeleObj.usage}
          </p>
          <p className="text-gray-400 text-[11px]">
            ⏳ Délai d'action : {currentModeleObj.delaiRecommande}
          </p>
        </div>

        {/* Zone de prévisualisation du texte généré */}
        <div className="bg-black/80 rounded-xl p-4 border border-gray-800 font-mono text-xs text-gray-200 overflow-x-auto max-h-80 whitespace-pre-wrap leading-relaxed select-all">
          {texteGenere}
        </div>
      </div>
    </div>
  );
}
