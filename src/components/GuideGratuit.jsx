import React, { useState } from 'react';
import { SUPABASE_SQL_SCRIPT, DEPLOYMENT_GUIDE_TEXT } from '../data/supabaseSetup';
import { Server, Database, Smartphone, Globe, Copy, Check, Terminal, ExternalLink, ShieldAlert } from 'lucide-react';

export function GuideGratuit() {
  const [copiedSql, setCopiedSql] = useState(false);

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCRIPT);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-[#18181F] border border-[#2E2E3A] p-4 sm:p-5 rounded-2xl shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-900 text-emerald-300 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                0 FCFA • Zéro Mise en Veille
              </span>
              <h2 className="text-lg font-black font-heading text-white">
                GUIDE DE DÉPLOIEMENT & HÉBERGEMENT 100% GRATUIT
              </h2>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Comment faire tourner toute cette plateforme (site web pro + base PostgreSQL + application mobile) pour <strong>0 Franc CFA</strong>, sans les lenteurs et sans les adresses de plateformes gratuites instables.
            </p>
          </div>
        </div>
      </div>

      {/* Les 4 Piliers Techniques Gratuits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-[#18181F] border border-[#2E2E3A] p-4 rounded-xl">
          <div className="w-8 h-8 rounded-lg bg-emerald-950 flex items-center justify-center text-emerald-400 mb-2">
            <Database size={18} />
          </div>
          <h3 className="text-sm font-bold text-white">1. Base Supabase</h3>
          <p className="text-[11px] text-gray-400 mt-1">
            PostgreSQL complet (500 Mo gratuits). Ne dort jamais, hébergé sur AWS avec sauvegardes automatiques.
          </p>
        </div>

        <div className="bg-[#18181F] border border-[#2E2E3A] p-4 rounded-xl">
          <div className="w-8 h-8 rounded-lg bg-amber-950 flex items-center justify-center text-amber-400 mb-2">
            <Globe size={18} />
          </div>
          <h3 className="text-sm font-bold text-white">2. Cloudflare Pages</h3>
          <p className="text-[11px] text-gray-400 mt-1">
            Bande passante illimitée, protection anti-DDoS mondiale et URL propre (ex: <code className="text-yellow-300">remontada237.pages.dev</code>).
          </p>
        </div>

        <div className="bg-[#18181F] border border-[#2E2E3A] p-4 rounded-xl">
          <div className="w-8 h-8 rounded-lg bg-red-950 flex items-center justify-center text-red-400 mb-2">
            <Smartphone size={18} />
          </div>
          <h3 className="text-sm font-bold text-white">3. PWA Android</h3>
          <p className="text-[11px] text-gray-400 mt-1">
            Installable en 1 clic sans payer les 25$ de compte développeur Google Play. Fonctionne hors-ligne.
          </p>
        </div>

        <div className="bg-[#18181F] border border-[#2E2E3A] p-4 rounded-xl">
          <div className="w-8 h-8 rounded-lg bg-purple-950 flex items-center justify-center text-purple-400 mb-2">
            <Server size={18} />
          </div>
          <h3 className="text-sm font-bold text-white">4. Zéro Censure</h3>
          <p className="text-[11px] text-gray-400 mt-1">
            L'IP réelle de votre serveur est masquée par Cloudflare, empêchant tout blocage DNS local unilatéral.
          </p>
        </div>
      </div>

      {/* Script SQL Supabase à copier */}
      <div className="bg-[#18181F] border border-[#2E2E3A] p-5 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Terminal size={16} className="text-emerald-400" />
              Script SQL pour Supabase (Base PostgreSQL complète)
            </h3>
            <p className="text-xs text-gray-400">
              Collez ce script dans l'onglet 'SQL Editor' de votre tableau de bord Supabase gratuit.
            </p>
          </div>

          <button
            onClick={handleCopySql}
            className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-2 rounded-xl text-xs font-bold transition shadow"
          >
            {copiedSql ? <Check size={14} /> : <Copy size={14} />}
            <span>{copiedSql ? 'Copié ✓' : 'Copier le script SQL'}</span>
          </button>
        </div>

        <pre className="bg-black/90 p-4 rounded-xl border border-gray-800 text-[11px] font-mono text-emerald-300/90 overflow-x-auto max-h-64 leading-relaxed select-all">
          {SUPABASE_SQL_SCRIPT}
        </pre>
      </div>

      {/* Instructions détaillées étape par étape */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white">Procédure de déploiement en 4 étapes simples</h3>
        
        <div className="space-y-2.5">
          {DEPLOYMENT_GUIDE_TEXT.map((step) => (
            <div key={step.etape} className="bg-[#18181F] border border-[#2E2E3A] p-4 rounded-xl">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#B71C1C] text-white text-xs font-black flex items-center justify-center font-heading flex-shrink-0 mt-0.5">
                  {step.etape}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-white">{step.titre}</h4>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed whitespace-pre-line">
                    {step.details}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
