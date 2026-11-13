import React, { useState, useEffect } from 'react';
import { Shield, Camera, Download, Trash2, FileCheck } from 'lucide-react';

export function CoffreFortPreuves() {
  const [preuves, setPreuves] = useState(() => {
    const saved = localStorage.getItem('maree_coffrefort_preuves');
    return saved ? JSON.parse(saved) : [
      {
        id: "prev_1",
        titre: "Porte close à la sous-préfecture sans avis officiel",
        typeEntrave: "Porte close / Désertion",
        circonscription: "Centre - Yaoundé 2ème",
        date: "12 Novembre à 11h15",
        description: "Présentation pour légalisation de déclarations de candidatures. Cadenas sur la grille, aucun agent présent.",
        statut: "Transmis aux juristes"
      },
      {
        id: "prev_2",
        titre: "Refus verbal de quitus fiscal",
        typeEntrave: "Blocage fiscal",
        circonscription: "Littoral - Douala 1er",
        date: "11 Novembre à 15h30",
        description: "Refus catégorique de délivrance de l'attestation de non-redevance malgré un dossier fiscal régulier.",
        statut: "Dossier contentieux"
      }
    ];
  });

  const [form, setForm] = useState({
    titre: '',
    typeEntrave: 'Porte close / Désertion',
    circonscription: 'Centre - Yaoundé 1er',
    description: '',
    photoData: null
  });

  useEffect(() => {
    localStorage.setItem('maree_coffrefort_preuves', JSON.stringify(preuves));
  }, [preuves]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm({ ...form, photoData: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.titre || !form.description) return;
    const item = {
      id: `prev_${Date.now()}`,
      titre: form.titre,
      typeEntrave: form.typeEntrave,
      circonscription: form.circonscription,
      date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
      description: form.description,
      statut: "Enregistré",
      photoUrl: form.photoData
    };
    setPreuves([item, ...preuves]);
    setForm({
      titre: '',
      typeEntrave: 'Porte close / Désertion',
      circonscription: 'Centre - Yaoundé 1er',
      description: '',
      photoData: null
    });
  };

  const handleDelete = (id) => setPreuves(preuves.filter(p => p.id !== id));

  const handleExport = () => {
    const contenu = `RAPPORT D'ENTRAVES ÉLECTORALES - LA MARÉE ROUGE
Date : ${new Date().toLocaleString('fr-FR')}
Incidents répertoriés : ${preuves.length}

${preuves.map((p, i) => `
#${i + 1} - [${p.typeEntrave}] ${p.titre}
Lieu : ${p.circonscription}
Date constatée : ${p.date}
Statut : ${p.statut}
Détails :
${p.description}
--------------------------------------------------
`).join('\n')}`;

    const blob = new Blob([contenu], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Preuves_Entraves_${Date.now()}.txt`;
    a.click();
  };

  return (
    <div className="space-y-4">
      <div className="mr-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Shield size={18} className="text-[var(--accent)]" />
              Coffre-fort des preuves d'entraves
            </h2>
            <p className="text-xs text-[var(--muted)] mt-0.5">
              Consignez les blocages (portes fermées, refus de quitus). Ces éléments alimentent les recours juridiques.
            </p>
          </div>

          <button onClick={handleExport} className="mr-btn mr-btn-secondary self-start sm:self-auto">
            <Download size={15} />
            <span>Exporter le rapport</span>
          </button>
        </div>
      </div>

      {/* Formulaire */}
      <div className="mr-card">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-3 flex items-center gap-2">
          <Camera size={15} />
          Ajouter un constat d'incident
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[var(--muted)] mb-1">Motif de l'entrave</label>
              <input
                type="text"
                required
                placeholder="Ex: Refus de délivrer le casier judiciaire"
                className="mr-input"
                value={form.titre}
                onChange={(e) => setForm({ ...form, titre: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-[var(--muted)] mb-1">Type d'entrave</label>
              <select
                className="mr-input"
                value={form.typeEntrave}
                onChange={(e) => setForm({ ...form, typeEntrave: e.target.value })}
              >
                <option value="Porte close / Désertion">Porte close / Désertion</option>
                <option value="Blocage fiscal">Refus de quitus fiscal</option>
                <option value="Rétention casier">Retard anormal du casier judiciaire</option>
                <option value="Racket timbres">Pénurie artificielle de timbres</option>
                <option value="Refus de dépôt">Refus de recevoir le dossier</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[var(--muted)] mb-1">Circonscription / Commune</label>
              <input
                type="text"
                required
                className="mr-input"
                placeholder="Ex: Mfoundi - Yaoundé 1er"
                value={form.circonscription}
                onChange={(e) => setForm({ ...form, circonscription: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-[var(--muted)] mb-1">Photo ou document (facultatif)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mr-input file:mr-2 file:py-0.5 file:px-2 file:rounded file:border-0 file:text-xs file:bg-[#23232d] file:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[var(--muted)] mb-1">Faits constatés (dates, heures, déclarations)</label>
            <textarea
              rows={2}
              required
              className="mr-input"
              placeholder="Décrivez avec précision ce qui a été dit et constaté sur place..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="flex justify-end pt-1">
            <button type="submit" className="mr-btn mr-btn-primary">
              Enregistrer dans le coffre-fort
            </button>
          </div>
        </form>
      </div>

      {/* Liste */}
      <div className="space-y-2.5">
        {preuves.map(p => (
          <div key={p.id} className="mr-card flex flex-col sm:flex-row items-start justify-between gap-3">
            <div className="space-y-1 text-xs flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-white">{p.titre}</span>
                <span className="text-[var(--muted)]">• {p.circonscription} ({p.date})</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#23232d] text-gray-300">
                  {p.statut}
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed">{p.description}</p>
              {p.photoUrl && (
                <div className="pt-2">
                  <img src={p.photoUrl} alt="Justificatif" className="max-h-32 rounded border border-[var(--border)]" />
                </div>
              )}
            </div>

            <button
              onClick={() => handleDelete(p.id)}
              className="text-[var(--muted)] hover:text-red-400 p-1 transition"
              title="Supprimer"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
