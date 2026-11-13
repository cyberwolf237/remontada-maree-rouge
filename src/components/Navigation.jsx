import { FileText, Radio, Shield, Users } from 'lucide-react';

// Le guide d'hébergement n'est plus ici : c'est une doc pour vous, pas pour les utilisateurs.
const TABS = [
  { id: 'dossier', label: 'Mon dossier', short: 'Dossier', icon: FileText },
  { id: 'radar', label: 'Radar terrain', short: 'Radar', icon: Radio },
  { id: 'preuves', label: 'Coffre-fort', short: 'Preuves', icon: Shield },
  { id: 'mandataires', label: 'Mandataires', short: 'Mandataires', icon: Users },
];

export function Navigation({ activeTab, setActiveTab }) {
  const current = (id) => (activeTab === id ? 'page' : undefined);

  return (
    <>
      <nav className="mr-tabs" aria-label="Sections">
        <div className="mr-tabs__inner">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} type="button" aria-current={current(id)} onClick={() => setActiveTab(id)}>
              <Icon size={18} aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
      </nav>

      <nav className="mr-bottom" aria-label="Sections">
        {TABS.map(({ id, short, icon: Icon }) => (
          <button key={id} type="button" aria-current={current(id)} onClick={() => setActiveTab(id)}>
            <span className="mr-bottom__icon"><Icon size={20} aria-hidden="true" /></span>
            {short}
          </button>
        ))}
      </nav>
    </>
  );
}
