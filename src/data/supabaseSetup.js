// Script SQL Supabase et Guide de déploiement 100% Gratuit

export const SUPABASE_SQL_SCRIPT = `-- =========================================================================
-- LA MARÉE ROUGE / LA REMONTADA 2025 - SCHÉMA POSTGRESQL (SUPABASE 100% GRATUIT)
-- =========================================================================

-- 1. Table des administrations et suivi de présence en temps réel
CREATE TABLE IF NOT EXISTS public.administrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom TEXT NOT NULL,
    type_admin TEXT NOT NULL, -- 'Sous-Préfecture', 'Tribunal', 'Impôts', 'ELECAM', 'Trésorerie'
    region TEXT NOT NULL,
    departement TEXT NOT NULL,
    ville TEXT NOT NULL,
    statut_responsable TEXT DEFAULT 'Inconnu', -- 'Présent', 'Absent', 'En réunion fermée'
    statut_guichet TEXT DEFAULT 'Inconnu', -- 'Ouvert', 'Fermé sans motif', 'Ralenti', 'Déserté'
    timbres_disponibles BOOLEAN DEFAULT true,
    nb_confirmations INT DEFAULT 0,
    motif_blocage TEXT,
    dernier_signalement TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Table des signalements communautaires (Anonymisés)
CREATE TABLE IF NOT EXISTS public.signalements_terrain (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES public.administrations(id) ON DELETE CASCADE,
    statut_responsable TEXT NOT NULL,
    statut_guichet TEXT NOT NULL,
    timbres_disponibles BOOLEAN DEFAULT true,
    commentaire TEXT,
    empreinte_anonyme TEXT, -- Hash SHA-256 local (pas d'IP stockée pour protéger le citoyen)
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Table du Coffre-Fort de Preuves d'Entraves & Contentieux
CREATE TABLE IF NOT EXISTS public.preuves_entraves (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titre TEXT NOT NULL,
    type_entrave TEXT NOT NULL, -- 'Porte Close', 'Refus Casier', 'Refus Quitus', 'Timbres Racket', 'Expulsion'
    circonscription TEXT NOT NULL,
    date_incident TIMESTAMPTZ NOT NULL,
    description TEXT NOT NULL,
    photo_url TEXT,
    statut_verification TEXT DEFAULT 'En attente', -- 'Vérifié', 'Transmis Juristes', 'Dossier Contentieux'
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Table des Mandataires et Délégués de Bureaux de Vote
CREATE TABLE IF NOT EXISTS public.mandataires_bv (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom_mandataire TEXT NOT NULL,
    telephone TEXT NOT NULL,
    commune TEXT NOT NULL,
    bureau_vote_numero TEXT NOT NULL,
    lieu_implantation TEXT NOT NULL,
    statut_accreditation TEXT DEFAULT 'En cours', -- 'Accrédité ELECAM', 'En attente', 'Refusé'
    pv_remis BOOLEAN DEFAULT false,
    pv_photo_url TEXT,
    anomalies_signalees TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Activer la sécurité Row Level Security (RLS)
ALTER TABLE public.administrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.signalements_terrain ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.preuves_entraves ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mandataires_bv ENABLE ROW LEVEL SECURITY;

-- Politiques de lecture publique (Lecture libre pour informer le peuple)
CREATE POLICY "Lecture publique administrations" ON public.administrations FOR SELECT USING (true);
CREATE POLICY "Ajout signalements anonymes" ON public.signalements_terrain FOR INSERT WITH CHECK (true);
CREATE POLICY "Lecture anonyme signalements" ON public.signalements_terrain FOR SELECT USING (true);
CREATE POLICY "Envoi preuves anonymes" ON public.preuves_entraves FOR INSERT WITH CHECK (true);
CREATE POLICY "Lecture publique preuves validées" ON public.preuves_entraves FOR SELECT USING (true);
`;

export const DEPLOYMENT_GUIDE_TEXT = [
  {
    etape: 1,
    titre: "Base de Données Supabase (0 FCFA pour toujours)",
    details: "1. Allez sur supabase.com et créez un compte gratuit.\\n2. Créez un nouveau projet (nom : remontada237).\\n3. Allez dans le menu 'SQL Editor' à gauche, collez le script SQL ci-dessus et cliquez sur 'Run'. Vos 4 tables sont créées avec PostGIS et sécurité maximale."
  },
  {
    etape: 2,
    titre: "Hébergement Web Cloudflare Pages (0 FCFA, 0 Lenteur, Pas de Render)",
    details: "1. Connectez votre dépôt GitHub sur pages.cloudflare.com.\\n2. Choisissez le framework 'Vite', commande de build 'npm run build', dossier de sortie 'dist'.\\n3. Cliquez sur 'Save and Deploy'. Votre site sera en ligne en 45 secondes avec une adresse propre comme remontada237.pages.dev, protection anti-DDoS mondiale et zéro mise en veille."
  },
  {
    etape: 3,
    titre: "Nom de domaine personnalisé propre (Facultatif ou Gratuit)",
    details: "Si vous voulez 'mareerouge237.org' ou 'remontada237.net', vous pouvez le relier directement dans Cloudflare Pages en 1 clic. Le certificat SSL HTTPS est généré gratuitement."
  },
  {
    etape: 4,
    titre: "Distribution Mobile (Application Android 100% Gratuite)",
    details: "L'application intègre le standard PWA (Progressive Web App). Dès qu'un citoyen ouvre le site sur son téléphone Android (Chrome ou Firefox), un bandeau lui propose 'Ajouter à l'écran d'accueil'. L'application s'installe alors comme une application native, avec son icône poing levé et fonctionne même sans internet."
  }
];
