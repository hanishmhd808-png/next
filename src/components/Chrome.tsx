import {useState, type MouseEvent} from 'react';
import {brand, nav} from '../content';
import {scrollToHash} from '../lib/scroll';

function go(e: MouseEvent<HTMLAnchorElement>, then?: () => void) {
  const hash = e.currentTarget.getAttribute('href');
  if (!hash?.startsWith('#')) return;
  e.preventDefault();
  then?.();
  scrollToHash(hash);
}

/** Tropical Kerala Palm & Lotus Emblem. */
function KeralaCrest({className = ''}: {className?: string}) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21V10" />
      <path d="M12 10C8.5 7 5 8 3 11c3 1 6.5 0 9-1Z" fill="currentColor" fillOpacity="0.25" />
      <path d="M12 10c3.5-3 7-2 9 1-3 1-6.5 0-9-1Z" fill="currentColor" fillOpacity="0.25" />
      <path d="M12 13c-3-2-5.5-1.5-7 1 2.5.5 5-.5 7-1Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M12 13c3-2 5.5-1.5 7 1-2.5.5-5-.5-7-1Z" fill="currentColor" fillOpacity="0.2" />
      <circle cx="12" cy="5.5" r="2" fill="currentColor" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 text-white">
      <div className="flex items-center justify-between px-4 pt-4 sm:px-6 sm:pt-5 md:px-[3vw]">
        <a href="#top" onClick={(e) => go(e)} className="flex items-center gap-2.5 group" aria-label={`${brand.name} — back to top`}>
          <div className="flex size-7 items-center justify-center rounded-full bg-forest text-earth ring-1 ring-earth/30 transition-transform group-hover:scale-105">
            <KeralaCrest className="size-4" />
          </div>
          <span className="font-display text-[0.9375rem] tracking-[0.28em] font-semibold">{brand.wordmark}</span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={(e) => go(e)} className="font-mono text-label text-white/75 uppercase transition-colors hover:text-earth">
              {item.label}
            </a>
          ))}
          <a
            href="#districts"
            onClick={(e) => go(e)}
            className="rounded-[4px] bg-earth px-4 py-2 font-mono text-label text-void font-semibold uppercase transition-all hover:bg-cream hover:shadow-[0_0_24px_rgba(52,211,153,0.35)]"
          >
            Explore 56 Homes
          </a>
        </nav>
        <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="menu" className="font-mono text-label uppercase md:hidden text-white/90">
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      <div id="menu" inert={!open} className={`fixed inset-0 -z-10 flex flex-col justify-center gap-6 bg-void/98 px-6 backdrop-blur-2xl transition-opacity md:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
        {nav.map((item, i) => (
          <a key={item.href} href={item.href} onClick={(e) => go(e, () => setOpen(false))} className="flex items-baseline gap-4 font-display text-[1.75rem] tracking-[0.14em] uppercase text-white">
            <span className="font-mono text-label text-earth">0{i + 1}</span>
            {item.label}
          </a>
        ))}
        <a
          href="#districts"
          onClick={(e) => go(e, () => setOpen(false))}
          className="mt-4 rounded-[4px] bg-earth px-5 py-3.5 text-center font-mono text-label text-void font-semibold uppercase"
        >
          Explore All 14 Districts
        </a>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-void px-4 py-10 sm:px-6 md:px-[6vw]">
      <div className="flex flex-col gap-6 font-mono text-label text-regolith/60 uppercase md:flex-row md:items-center md:justify-between">
        <span className="flex items-center gap-2.5 text-white/90">
          <KeralaCrest className="size-4 text-earth" />
          {brand.wordmark} · God’s Own Country Luxury Rentals
        </span>
        <span className="max-md:text-[0.625rem]">Covering all 14 Kerala districts · Verified owners · Zero brokerage</span>
        <div className="flex items-center gap-6">
          <a href={brand.portalUrl} target="_blank" rel="noopener noreferrer" className="text-earth hover:underline">
            Member Portal →
          </a>
          <a href="#top" onClick={(e) => go(e)} className="hover:text-white">
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
