// Données électorales officielles et guides juridiques basés sur le Code Électoral Camerounais (Loi n° 2012/001 du 19 avril 2012 modifiée)

export const ELECTIONS_DATA = {
  legislatives: {
    title: "Élections Législatives (Députés)",
    description: "Scrutin de liste bloquée par circonscription départementale. Cautionnement de 3 000 000 FCFA par liste.",
    cautionnement: "3 000 000 FCFA par liste",
    pieces: [
      {
        id: "leg_nat",
        nom: "Certificat de nationalité camerounaise",
        autorite: "Président du Tribunal de Première Instance (TPI) du lieu de naissance",
        cout: "1 500 à 2 500 FCFA (Timbres fiscaux)",
        delai: "24h à 72h",
        piege: "Tribunaux qui prétextent l'absence du magistrat signataire ou rupture de timbres.",
        priorite: "Critique",
        articles: "Art. 164 & 165 du Code Électoral"
      },
      {
        id: "leg_casier",
        nom: "Extrait de casier judiciaire (Bulletin n°3)",
        autorite: "Greffe du Tribunal de Première Instance du lieu de naissance",
        cout: "1 000 à 1 500 FCFA",
        delai: "24h à 48h (moins de 3 mois de validité)",
        piege: "Refus officieux si le candidat a été interpellé lors de manifestations pacifiques.",
        priorite: "Critique",
        articles: "Art. 164 du Code Électoral"
      },
      {
        id: "leg_quitus",
        nom: "Certificat d'imposition ou de non-imposition (Quitus Fiscal)",
        autorite: "Centre Divisionnaire des Impôts (CDI) compétent",
        cout: "Variable selon la situation fiscale",
        delai: "48h à 5 jours",
        piege: "L'arme n°1 du pouvoir : redressements fiscaux fictifs de dernière minute pour bloquer le quitus.",
        priorite: "Haute",
        articles: "Art. 164 du Code Électoral"
      },
      {
        id: "leg_caution",
        nom: "Reçu de versement du cautionnement",
        autorite: "Caisse des Dépôts et Consignations (CDEC) ou Trésorerie Générale",
        cout: "3 000 000 FCFA par liste de candidats",
        delai: "Immédiat contre quittance",
        piege: "Trésoriers payeurs absents ou refusant d'encaisser les chèques certifiés de l'opposition.",
        priorite: "Critique",
        articles: "Art. 166 du Code Électoral"
      },
      {
        id: "leg_elecam",
        nom: "Attestation d'inscription sur les listes électorales",
        autorite: "Antenne Communale d'ELECAM",
        cout: "Gratuit",
        delai: "Immédiat",
        piege: "Omission délibérée du nom du candidat sur le fichier biométrique communal.",
        priorite: "Haute",
        articles: "Art. 164 du Code Électoral"
      },
      {
        id: "leg_investiture",
        nom: "Acte d'investiture du parti politique",
        autorite: "Président National ou Secrétaire Général du parti habilité",
        cout: "Interne au parti",
        delai: "Selon le parti",
        piege: "Doublons d'investitures suscités par des dissidents manipulés par l'administration.",
        priorite: "Critique",
        articles: "Art. 164 du Code Électoral"
      },
      {
        id: "leg_domicile",
        nom: "Certificat de domicile ou de résidence continue (au moins 6 mois)",
        autorite: "Mairie ou Sous-Préfecture de la circonscription",
        cout: "1 000 à 2 000 FCFA",
        delai: "24h à 48h",
        piege: "Sous-préfet refusant de signer sous prétexte que le candidat vit à Douala ou Yaoundé.",
        priorite: "Moyenne",
        articles: "Art. 165 du Code Électoral"
      },
      {
        id: "leg_declaration",
        nom: "Déclaration sur l'honneur légalisée de non-inéligibilité",
        autorite: "Sous-préfet ou Maire",
        cout: "1 500 FCFA (Timbres fiscaux)",
        delai: "Immédiat",
        piege: "Refus de légalisation physique.",
        priorite: "Moyenne",
        articles: "Art. 164 du Code Électoral"
      }
    ]
  },
  municipales: {
    title: "Élections Municipales (Conseillers Municipaux)",
    description: "Scrutin de liste complète par commune. Cautionnement individuel de 50 000 FCFA par candidat.",
    cautionnement: "50 000 FCFA par candidat",
    pieces: [
      {
        id: "mun_nat",
        nom: "Certificat de nationalité camerounaise",
        autorite: "Président du Tribunal de Première Instance",
        cout: "1 500 à 2 500 FCFA",
        delai: "24h à 72h",
        piege: "Engorgement délibéré des tribunaux à l'approche de la date limite.",
        priorite: "Critique",
        articles: "Art. 181 du Code Électoral"
      },
      {
        id: "mun_casier",
        nom: "Extrait de casier judiciaire (Bulletin n°3)",
        autorite: "Greffe du TPI du lieu de naissance",
        cout: "1 000 à 1 500 FCFA",
        delai: "24h à 48h",
        piege: "Retard de délivrance pour forcer le dossier hors-délai.",
        priorite: "Critique",
        articles: "Art. 181 du Code Électoral"
      },
      {
        id: "mun_caution",
        nom: "Reçu de versement de la caution (50 000 FCFA/candidat)",
        autorite: "Recette Municipale ou Trésorerie Centrale",
        cout: "50 000 FCFA par personne sur la liste (ex: 31 x 50 000 = 1 550 000 FCFA pour une commune type)",
        delai: "Immédiat contre quittance",
        piege: "Refus du receveur municipal d'émettre la quittance collective.",
        priorite: "Critique",
        articles: "Art. 183 du Code Électoral"
      },
      {
        id: "mun_elecam",
        nom: "Attestation d'inscription sur la liste électorale de la commune",
        autorite: "Antenne ELECAM de la commune concernée",
        cout: "Gratuit",
        delai: "Immédiat",
        piege: "Exigence illégale de présence physique du candidat par des chefs d'antenne partisans.",
        priorite: "Haute",
        articles: "Art. 181 du Code Électoral"
      },
      {
        id: "mun_quitus",
        nom: "Quitus fiscal ou attestation de non-redevance locale",
        autorite: "Centre Divisionnaire des Impôts & Recette Municipale",
        cout: "Selon la situation fiscale",
        delai: "48h à 5 jours",
        piege: "Taxes communales abusives imputées à la dernière minute.",
        priorite: "Haute",
        articles: "Art. 181 du Code Électoral"
      },
      {
        id: "mun_investiture",
        nom: "Déclaration de candidature et lettre d'investiture du parti",
        autorite: "Instance dirigeante du parti",
        cout: "Gratuit",
        delai: "Selon calendrier interne",
        piege: "Rejet de la liste complète si un seul candidat est disqualifié ou manque de pièce.",
        priorite: "Critique",
        articles: "Art. 181 du Code Électoral"
      }
    ]
  }
};

// Modèles d'actes juridiques d'urgence générés automatiquement
export const MODELES_JURIDIQUES = [
  {
    id: "sommation_huissier",
    titre: "Sommation Interpellative par Huissier de Justice (Constat de carence administrative)",
    usage: "À faire délivrer d'urgence par un Huissier lorsque le Sous-préfet, le Maire ou le Tribunal est introuvable ou refuse de recevoir/signer un dossier.",
    delaiRecommande: "Au moins 5 jours avant l'expiration du délai légal de dépôt",
    genererTexte: (candidat) => `
EXPLOIT D'HUISSIER DE JUSTICE - SOMMATION INTERPELLATIVE
-----------------------------------------------------------------------------
L'AN DEUX MILLE VINGT-CINQ ET LE ............................................
À LA REQUÊTE DE :
Monsieur/Madame ${candidat?.nom || "[NOM DU CANDIDAT / MANDATAIRE]"},
Demeurant à ${candidat?.ville || "[VILLE/COMMUNE]"},
Candidat(e) investi(e) aux élections ${candidat?.scrutin || "Législatives / Municipales"} pour le compte de [NOM DU PARTI / REGROUPEMENT].

J'AI, MAÎTRE ...................................................., Huissier de Justice près la Cour d'Appel de .........................., y demeurant.

DÉCERNÉ SOMMATION INTERPELLATIVE À :
Monsieur le Sous-Préfet de l'Arrondissement de ${candidat?.arrondissement || "[NOM DE L'ARRONDISSEMENT]"} (ou Monsieur le Président du Tribunal / Chef d'Antenne ELECAM) ;
En son cabinet sis à ........................................................

LUI RAPPELANT QUE :
1. En application des dispositions de la Loi n° 2012/001 du 19 avril 2012 portant Code Électoral du Cameroun, les délais légaux de dépôt des dossiers de candidature sont prescrits à peine de forclusion ;
2. Le requérant s'est présenté à plusieurs reprises, notamment les [DATES ET HEURES], aux fins de [DÉPÔT / LÉGALISATION / DÉLIVRANCE DE PIÈCES], et a constaté la fermeture injustifiée des bureaux ou l'absence prolongée de l'autorité compétente sans délégation de signature légale ;
3. Un tel agissement constitue une voie de fait administrative caractérisée, attentatoire au principe constitutionnel d'égal accès aux fonctions électives et à la liberté de suffrage ;

PAR CES MOTIFS, JE LUI FAIS SOMMATION DE :
- Avoir à recevoir séance tenante la déclaration ou délivrer l'acte requis ;
- À défaut, déclarer expressément le motif juridique du refus ou de l'indisponibilité du service public.

AVEC AVERTISSEMENT que faute par lui d'obtempérer, le présent exploit servira de PREUVE IRRÉFUTABLE DE CARENCE ADMINISTRATIVE devant le Conseil Constitutionnel et les Juridictions Administratives compétentes pour solliciter la prorogation des délais ou l'annulation des actes d'exclusion.

DONT ACTE sous toutes réserves.
`
  },
  {
    id: "recours_gracieux",
    titre: "Recours Gracieux Préalable pour Refus Arbitraire d'Acte Administratif",
    usage: "À déposer avec accusé de réception ou décharge en cas de refus d'un quitus fiscal, casier judiciaire ou certificat de nationalité.",
    delaiRecommande: "Dans les 24h suivant le refus verbal ou écrit",
    genererTexte: (candidat) => `
RECOURS GRACIEUX PRÉALABLE CONTRE REFUS DE DÉLIVRANCE D'ACTE ADMINISTRATIF
-----------------------------------------------------------------------------
À : Monsieur le ${candidat?.autorite || "Chef de Centre Divisionnaire des Impôts / Greffier en Chef / Sous-Préfet"} de ${candidat?.ville || "[VILLE]"}
OBJET : Recours gracieux préalable contre le refus injustifié de délivrance de [INTITULÉ DE LA PIÈCE].

Monsieur l'Administrateur,

J'ai l'honneur de déférer à votre haute censure le refus opposé à ma demande de délivrance de [INTITULÉ DE LA PIÈCE], sollicitée le [DATE] sous la référence [NUMÉRO REÇU OU DOSSIER].

Il convient de souligner que ladite pièce conditionne impérativement la validité de mon dossier de candidature aux élections [LÉGISLATIVES/MUNICIPALES] conformément aux prescriptions du Code Électoral camerounais.

N'étant frappé(e) d'aucune déchéance légale ni d'aucune condamnation définitive, et m'étant acquitté(e) de l'intégralité des droits et timbres légaux exigibles, ce refus porte une atteinte grave et manifestement illégale à mes droits civiques fondamentaux garantis par le Préambule de la Constitution de la République du Cameroun.

En conséquence, je sollicite respectueusement qu'il vous plaise de reconsidérer cette décision et d'ordonner la délivrance immédiate de la pièce sollicitée.

À défaut de suite favorable sous 24 heures, je me réserve le droit de saisir le Tribunal Administratif d'un recours en annulation assorti d'une requête en référé-liberté d'extrême urgence, ainsi que de solliciter des poursuites disciplinaires et pénales pour entrave concertée à l'exercice des droits civiques.

Dans cette attente, je vous prie d'agréer, Monsieur l'Administrateur, l'expression de ma considération citoyenne.

Fait à ${candidat?.ville || "[VILLE]"}, le ............................. 2025.
Signature du Candidat :
`
  },
  {
    id: "guide_mandataire",
    titre: "Mandat Officiel et Ordre de Mission de Délégué de Bureau de Vote",
    usage: "Document officiel habilitant le représentant du parti à surveiller les opérations électorales et à exiger la remise du Procès-Verbal (PV).",
    delaiRecommande: "À déposer auprès d'ELECAM au moins 15 jours avant le scrutin",
    genererTexte: (candidat) => `
MANDAT EXPRÈS DE REPRÉSENTATION ÉLECTORALE
(Application de l'Article 95 du Code Électoral - Loi n° 2012/001)
-----------------------------------------------------------------------------
LE PARTI POLITIQUE : [NOM DU PARTI / COALITION DE LA REMONTADA]
Représenté par : Monsieur/Madame [NOM DU MANDATAIRE DÉPARTEMENTAL]

DONNE POUVOIR ET MANDAT À :
Nom et Prénoms : ${candidat?.nom || "[NOM DU MANDATAIRE]"}
Né(e) le : ................................ à : ................................
CNI N° : ................................... délivrée le : ....................... à : ........................
Téléphone : ...................................

POUR LE REPRÉSENTER EN QUALITÉ DE DÉLÉGUE TITULAIRE (OU SUPPLÉANT)
AU BUREAU DE VOTE N° : ....................................................
Lieu d'implantation : [ÉCOLE / FOYER / PLACE PUBLIQUE]
Commune de : ${candidat?.ville || "[COMMUNE]"}, Département du [DÉPARTEMENT]

POUVOIRS CONFÉRÉS :
1. Assister sans interruption à toutes les opérations de vote, de dépouillement et de proclamation provisoire des résultats (Art. 97) ;
2. Contrôler l'intégrité de l'urne avant le début du vote et vérifier qu'elle est vide et fermée par deux scellés distincts (Art. 101) ;
3. Exiger l'inscription de toutes contestations, irrégularités constatées ou incidents au Procès-Verbal (Art. 107) ;
4. EXIGER ET RECEVOIR IMMÉDIATEMENT, dès la fin du dépouillement, UN EXEMPLAIRE INTÉGRAL DU PROCÈS-VERBAL rédigé et signé par les membres de la commission locale (Art. 113 alinéa 2).

AVERTISSEMENT LÉGAL :
Toute personne qui expulserait arbitrairement le délégué ou refuserait de lui délivrer sa copie de PV tombe sous le coup des sanctions pénales prévues par les articles 122 et suivants du Code Pénal pour fraude et entrave électorale.

Fait pour servir et valoir ce que de droit.
`
  }
];

// Administrations clés avec suivi en temps réel simulé / pré-rempli pour les grandes métropoles
export const BUREAUX_ADMIN_INITIAUX = [
  {
    id: "adm_1",
    nom: "Sous-Préfecture de Yaoundé 1er (Nlongkak)",
    type: "Sous-Préfecture",
    region: "Centre",
    departement: "Mfoundi",
    ville: "Yaoundé",
    statutSousPrefet: "Absent",
    statutGuichet: "Fermé sans motif",
    timbresDisponibles: false,
    dernierSignalement: "Il y a 18 min",
    nbConfirmations: 24,
    motifBlocage: "Bureau fermé à clé dès 11h. Vigile affirme que 'le chef est sur le terrain'.",
    niveauAlerte: "Critique"
  },
  {
    id: "adm_2",
    nom: "Tribunal de Première Instance (TPI) de Douala-Bonanjo",
    type: "Tribunal (Casier & Nationalité)",
    region: "Littoral",
    departement: "Wouri",
    ville: "Douala",
    statutSousPrefet: "Présent",
    statutGuichet: "Ouvert mais ralenti",
    timbresDisponibles: true,
    dernierSignalement: "Il y a 5 min",
    nbConfirmations: 42,
    motifBlocage: "Files d'attente monstres. Délivrance des casiers sélective selon affiliation.",
    niveauAlerte: "Moyen"
  },
  {
    id: "adm_3",
    nom: "Centre Divisionnaire des Impôts (CDI) Bafoussam Urbain",
    type: "Impôts (Quitus)",
    region: "Ouest",
    departement: "Mifi",
    ville: "Bafoussam",
    statutSousPrefet: "Présent",
    statutGuichet: "Bloqué",
    timbresDisponibles: false,
    dernierSignalement: "Il y a 32 min",
    nbConfirmations: 19,
    motifBlocage: "Rupture annoncée de timbres gradués de 25 000 FCFA. Racket au marché noir à 35 000 FCFA.",
    niveauAlerte: "Élevé"
  },
  {
    id: "adm_4",
    nom: "Antenne Régionale ELECAM Garoua",
    type: "ELECAM",
    region: "Nord",
    departement: "Bénoué",
    ville: "Garoua",
    statutSousPrefet: "Présent",
    statutGuichet: "Ouvert",
    timbresDisponibles: true,
    dernierSignalement: "Il y a 45 min",
    nbConfirmations: 15,
    motifBlocage: "Délivrance normale des attestations d'inscription.",
    niveauAlerte: "Faible"
  },
  {
    id: "adm_5",
    nom: "Sous-Préfecture de Douala 5ème (Bonamoussadi)",
    type: "Sous-Préfecture",
    region: "Littoral",
    departement: "Wouri",
    ville: "Douala",
    statutSousPrefet: "Absent",
    statutGuichet: "Déserté",
    timbresDisponibles: false,
    dernierSignalement: "Il y a 10 min",
    nbConfirmations: 38,
    motifBlocage: "Aucun agent habilité à la légalisation des déclarations de candidature.",
    niveauAlerte: "Critique"
  },
  {
    id: "adm_6",
    nom: "Tribunal de Grande Instance de Bamenda",
    type: "Tribunal (Casier & Nationalité)",
    region: "Nord-Ouest",
    departement: "Mezam",
    ville: "Bamenda",
    statutSousPrefet: "Présent",
    statutGuichet: "Ouvert sous tension",
    timbresDisponibles: true,
    dernierSignalement: "Il y a 1 heure",
    nbConfirmations: 11,
    motifBlocage: "Délais administratifs allongés.",
    niveauAlerte: "Moyen"
  }
];

// Guide juridique de poche : Les 7 règles d'or du scrutin
export const COMMANDEMENTS_MANDATAIRE = [
  {
    numero: 1,
    titre: "Ne jamais quitter la salle avant la remise du PV",
    loi: "Art. 113 al. 2 du Code Électoral",
    conseil: "La loi exige formellement la remise immédiate d'une copie du procès-verbal à chaque délégué. Tout refus du président de bureau est un délit pénal. Refusez de sortir sans votre copie."
  },
  {
    numero: 2,
    titre: "Vérifier la transparence et les scellés de l'urne à 7h30",
    loi: "Art. 101 du Code Électoral",
    conseil: "Avant le premier bulletin, l'urne doit être ouverte, constatée vide par tous les scrutateurs, puis verrouillée avec les deux scellés dont vous notez les numéros de série."
  },
  {
    numero: 3,
    titre: "Faire inscrire toute anomalie au Procès-Verbal",
    loi: "Art. 107 du Code Électoral",
    conseil: "Si un électeur vote sans carte ni CNI, si des votes par procuration douteux affluent, exigez immédiatement l'inscription au paragraphe 'Observations' du PV. Un recours sans mention au PV est rejeté par le juge électoral."
  },
  {
    numero: 4,
    titre: "Prendre une photo nette du PV dès signature",
    loi: "Preuve documentaire numérique",
    conseil: "Photographiez le PV avec tous les chiffres clairement lisibles (inscrits, votants, nuls, voix par parti). Envoyez-la immédiatement via WhatsApp/Signal ou dans cette application."
  },
  {
    numero: 5,
    titre: "Participer obligatoirement au dépouillement public",
    loi: "Art. 108 du Code Électoral",
    conseil: "Le dépouillement est public et ininterrompu. Les portes et fenêtres du bureau de vote doivent rester ouvertes. Aucun membre des forces de l'ordre ne doit toucher aux bulletins."
  },
  {
    numero: 6,
    titre: "Défense contre l'expulsion illégale",
    loi: "Art. 97 & 122 du Code Pénal",
    conseil: "Le président du bureau de vote ne peut faire expulser un délégué qu'en cas de trouble caractérisé à l'ordre public, et après sommation consignée au PV. Prévenez immédiatement l'état-major du parti."
  }
];
