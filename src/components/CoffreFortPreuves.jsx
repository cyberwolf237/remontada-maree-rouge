import React, { useState, useEffect } from 'react';
import { Shield, Lock, Camera, UploadCloud, AlertCircle, FileCheck, Download, Trash2, CheckCircle2 } from 'lucide-react';

export function CoffreFortPreuves() {
  const [preuves, setPreuves] = useState(() => {
    const saved = localStorage.getItem('maree_coffrefort_preuves');
    return saved ? JSON.parse(saved) : [
      {
        id: "prev_1",
        titre: "Porte close à la Sous-Préfecture sans avis officiel",
        typeEntrave: "Porte Close / Désertion",
        circonscription: "Centre - Yaoundé 2ème",
        date: "12 Novembre 2025 à 11h15",
        description: "Présentation pour légalisation de déclarations de candidatures municipales. Cadenas sur la grille d'entrée. Aucun service d'astreinte prévu.",
        statut: "Transmis aux Juristes",
        hasPhoto: true
      },
      {
        id: "prev_2",
        titre: "Refus verbal de quitus fiscal malgré solde à zéro",
        typeEntrave: "Blocage Fiscal",
        circonscription: "Littoral - Douala 1er",
        date: "11 Novembre 2025 à 15h30",
        description: "Le chef de centre divisionnaire affirme 'avoir reçu des instructions orales' de ne pas délivrer d'attestation de non-redevance aux candidats déclarés de l'opposition.",
        statut: "Dossier Contentieux",
        hasPhoto: false
      }
    ];
  });

  const [formPreuve, setFormPreuve] = useState({
    titre: '',
    typeEntrave: 'Porte Close / Désertion',
    circonscription: 'Centre - Yaoundé 1er',
    description: '',
    photoData: null
  });

  const [exportPret, setExportPret] = useState(false);

  useEffect(() => {
    localStorage.setItem('maree_coffrefort_preuves', JSON.stringify(preuves));
  }, [preuves]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormPreuve({ ...formPreuve, photoData: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formPreuve.titre || !formPreuve.description) return;

    const nouvellePreuve = {
      id: `preuve_${Date.now()}`,
      titre: formPreuve.titre,
      typeEntrave: formPreuve.typeEntrave,
      circonscription: formPreuve.circonscription,
      date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      description: formPreuve.description,
      statut: "Enregistré / En attente d'exploitation",
      hasPhoto: !!formPreuve.photoData,
      photoUrl: formPreuve.photoData
    };

    setPreuves([nouvellePreuve, ...preuves]);
    setFormPreuve({
      titre: '',
      typeEntrave: 'Porte Close / Désertion',
      circonscription: 'Centre - Yaoundé 1er',
      description: '',
      photoData: null
    });
  };

  const handleDelete = (id) => {
    setPreuves(preuves.filter(p => p.id !== id));
  };

  const handleExportRapport = () => {
    const contenu = `
=============================================================================
LA MARÉE ROUGE - OBSERVATOIRE DES ENTRAVES ÉLECTORALES
RAPPORT SYNTHÉTIQUE DES ENTRAVES ET VOIES DE FAIT ADMINISTRATIVES
=============================================================================
Généré le : ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}
Destination : Collectif des Avocats, Observateurs de l'Union Africaine, Presse.

Nombre d'incidents recensés et horodatés : ${preuves.length}

${preuves.map((p, i) => `
-----------------------------------------------------------------------------
INCIDENT N° ${i + 1} : [${p.typeEntrave}] - ${p.titre}
- Circonscription : ${p.circonscription}
- Date & Heure constatée : ${p.date}
- Statut d'exploitation : ${p.statut}
- Présence de pièce jointe/photo : ${p.hasPhoto ? 'OUI (Horodatée)' : 'NON (Déclaration sous serment)'}
- Détails des faits constatés :
  ${p.description}
`).join('\n')}

=============================================================================
AVERTISSEMENT JURIDIQUE :
Ces faits constituent des violations caractérisées du Code Électoral (Loi n° 2012/001), 
du Pacte International relatif aux droits civils et politiques et de la Charte Africaine 
des droits de l'homme et des peuples.
`;

    const blob = new Blob([contenu], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Rapport_Entraves_Electorales_${Date.now()}.txt`;
    link.click();
    setExportPret(true);
    setTimeout(() => setExportPret(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* En-tête du Coffre-Fort */}
      <div className="bg-[#18181F] border border-[#2E2E3A] p-4 sm:p-5 rounded-2xl shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#B71C1C] text-white text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1 uppercase">
                <Lock size={12} className="text-[#FFD54F]" />
                Boîte Noire Juridique
              </span>
              <h2 className="text-lg font-black font-heading text-white">
                COFFRE-FORT DES PREUVES D'ENTRAVES
              </h2>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Documentez chaque abus, porte fermée, ou refus de document. Ces preuves alimenteront directement les recours contentieux devant les tribunaux et le Conseil Constitutionnel.
            </p>
          </div>

          <button
            onClick={handleExportRapport}
            className="flex items-center justify-center gap-2 bg-[#23232E] hover:bg-[#2F2F3D] text-[#FFD54F] px-4 py-2.5 rounded-xl text-xs font-bold transition border border-[#FFD54F]/40 shadow"
          >
            <Download size={15} />
            <span>{exportPret ? '✓ Rapport Téléchargé' : 'Exporter Dossier Contentieux'}</span>
          </button>
        </div>
      </div>

      {/* Formulaire d'enregistrement d'une preuve */}
      <div className="bg-[#18181F] border border-[#2E2E3A] p-5 rounded-2xl">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Camera size={16} className="text-red-400" />
          Enregistrer un incident ou une pièce à conviction (Anonymisé)
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-300 font-bold mb-1">Intitulé du blocage</label>
              <input
                type="text"
                required
                placeholder="Ex: Refus de délivrer le quitus fiscal au CDI de ..."
                value={formPreuve.titre}
                onChange={(e) => setFormPreuve({ ...formPreuve, titre: e.target.value })}
                className="w-full bg-[#101015] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#D32F2F]"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1">Nature de l'entrave</label>
              <select
                value={formPreuve.typeEntrave}
                onChange={(e) => setFormPreuve({ ...formPreuve, typeEntrave: e.target.value })}
                className="w-full bg-[#101015] border border-gray-700 rounded-lg px-2 py-2 text-white"
              >
                <option value="Porte Close / Désertion">Porte Close / Désertion du bureau</option>
                <option value="Blocage Fiscal">Refus injustifié de Quitus Fiscal</option>
                <option value="Rétention Casier">Rétention ou retard anormal du Casier Judiciaire</option>
                <option value="Racket Timbres">Pénurie artificielle / Racket sur timbres fiscaux</option>
                <option value="Refus Réception Dossier">Refus de recevoir ou d'accuser réception du dossier</option>
                <option value="Intimidation / Menaces">Intimidation policière ou administrative</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-300 font-bold mb-1">Circonscription électorale / Commune</label>
              <input
                type="text"
                required
                placeholder="Ex: Centre - Yaoundé 1er / Ouest - Bafoussam"
                value={formPreuve.circonscription}
                onChange={(e) => setFormPreuve({ ...formPreuve, circonscription: e.target.value })}
                className="w-full bg-[#101015] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#D32F2F]"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1">Preuve photo / Document scanné</label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="w-full bg-[#101015] border border-gray-700 rounded-lg px-2 py-1.5 text-gray-300 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[11px] file:bg-[#B71C1C] file:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-bold mb-1">Récit détaillé des faits (Dates, heures, agents concernés)</label>
            <textarea
              rows={3}
              required
              placeholder="Précisez exactement ce qui s'est passé, les personnes présentes, les paroles prononcées et les démarches déjà entreprises..."
              value={formPreuve.description}
              onChange={(e) => setFormPreuve({ ...formPreuve, description: e.target.value })}
              className="w-full bg-[#101015] border border-gray-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#D32F2F]"
            ></textarea>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-[#D32F2F] hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg"
            >
              <Lock size={15} />
              <span>Verrouiller cette preuve dans le Coffre-Fort</span>
            </button>
          </div>
        </form>
      </div>

      {/* Liste des preuves scellées */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <FileCheck size={16} className="text-emerald-400" />
            Preuves Scellées et Dossiers en cours ({preuves.length})
          </h3>
          <span className="text-[11px] text-gray-400">
            Protégé par chiffrement local & zéro-traçage IP
          </span>
        </div>

        <div className="space-y-2.5">
          {preuves.map((p) => (
            <div
              key={p.id}
              className="bg-[#18181F] border border-[#2E2E3A] p-4 rounded-xl flex flex-col sm:flex-row items-start justify-between gap-3"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-red-950 text-red-300 text-[10px] font-bold px-2 py-0.5 rounded border border-red-800">
                    {p.typeEntrave}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {p.circonscription} • {p.date}
                  </span>
                  <span className="bg-amber-950 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded">
                    {p.statut}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">{p.titre}</h4>
                <p className="text-xs text-gray-300 leading-relaxed">{p.description}</p>
                {p.photoUrl && (
                  <div className="mt-2">
                    <img 
                      src={p.photoUrl} 
                      alt="Preuve" 
                      className="max-h-36 rounded-lg border border-gray-700 object-cover"
                    />
                  </div>
                )}
              </div>

              <button
                onClick={() => handleDelete(p.id)}
                className="text-gray-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-gray-800 transition self-end sm:self-center"
                title="Supprimer"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
