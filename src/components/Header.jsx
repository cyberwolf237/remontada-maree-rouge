import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { APP } from '../config';

function useOnline() {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);
  return online;
}

// Retourne les millisecondes restantes, ou null si aucune date n'est configurée.
function useTimeLeft(iso) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!iso) return undefined;
    const t = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(t);
  }, [iso]);
  if (!iso) return null;
  const ms = new Date(iso).getTime() - now;
  return Number.isNaN(ms) ? null : ms;
}

function formatLeft(ms) {
  if (ms <= 0) return null;
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  return days > 0 ? `${days} j ${hours} h` : `${hours} h`;
}

export function Header() {
  const online = useOnline();
  const msLeft = useTimeLeft(APP.depositDeadline);
  const left = msLeft === null ? null : formatLeft(msLeft);

  return (
    <header className="mr-header">
      <div className="mr-ribbon" aria-hidden="true"><i /><i /><i /></div>

      <div className="mr-header__inner">
        <img
          className="mr-header__logo"
          src={`${import.meta.env.BASE_URL}logo_maree_rouge.jpg`}
          alt=""
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div>
          <h1 className="mr-header__title">{APP.name}</h1>
          <p className="mr-header__tagline">{APP.tagline}</p>
        </div>
        <a className="mr-sos" href={`tel:${APP.hotline}`} aria-label={`Appeler la hotline ${APP.hotlineDisplay}`}>
          <Phone size={16} aria-hidden="true" />
          <span className="mr-sos__word">Hotline</span>
          <span className="mr-sos__num">{APP.hotlineDisplay}</span>
        </a>
      </div>

      {msLeft !== null && (
        <div className="mr-deadline">
          {left ? <>{APP.deadlineLabel} <strong>{left}</strong></> : 'La date limite est dépassée'}
        </div>
      )}

      {!online && (
        <div className="mr-offline" role="status">
          Hors ligne : vos données restent sur cet appareil.
        </div>
      )}
    </header>
  );
}
