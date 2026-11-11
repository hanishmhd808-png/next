import type {MouseEvent} from 'react';
import {missions} from '../content';
import {useReveals} from '../hooks/useReveals';
import {scrollToHash} from '../lib/scroll';

const toReserve = (e: MouseEvent<HTMLAnchorElement>, name: string) => {
  e.preventDefault();
  const select = document.querySelector<HTMLSelectElement>('#reserve select[name="collection"]');
  if (select) select.value = name;
  scrollToHash('#reserve');
};

/** Three Curated Rental Collections. */
export function Missions() {
  const ref = useReveals<HTMLElement>();
  return (
    <section ref={ref} id="missions" aria-labelledby="missions-title" className="relative bg-void px-4 py-28 sm:px-6 md:px-[6vw] md:py-36">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between" data-reveal>
        <div>
          <p className="font-mono text-label text-earth uppercase tracking-[0.2em]">{missions.eyebrow}</p>
          <h2 id="missions-title" className="mt-4 font-display text-display text-white font-medium">
            {missions.heading}
          </h2>
        </div>
        <p className="font-mono text-label text-regolith/60 uppercase">{missions.note}</p>
      </div>

      <ol className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3 md:gap-6">
        {missions.items.map((m, i) => (
          <li
            key={m.name}
            data-reveal
            style={{transitionDelay: `${i * 120}ms`}}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-[10px] p-6 ring-1 transition-[transform,box-shadow] duration-500 hover:-translate-y-2 md:p-8 ${
              m.featured
                ? 'bg-gradient-to-b from-void-2 via-forest/20 to-void-2 ring-earth/60 hover:shadow-[0_24px_60px_-15px_rgba(52,211,153,0.35)]'
                : 'bg-void-2/70 ring-white/10 hover:ring-white/25 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]'
            }`}
          >
            {/* Concentric decorative landscape rings */}
            <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute -top-10 -right-10 size-48 text-earth/10 transition-transform duration-[1.4s] group-hover:rotate-45">
              <ellipse cx="100" cy="100" rx="55" ry="24" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(-15 100 100)" />
              <ellipse cx="100" cy="100" rx="75" ry="32" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(10 100 100)" />
              <circle cx="100" cy="100" r="10" fill="currentColor" />
            </svg>

            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-forest px-3 py-1 font-mono text-[0.625rem] tracking-[0.14em] text-earth uppercase ring-1 ring-earth/30">
                  {m.bhk}
                </span>
                {m.featured && (
                  <span className="rounded-full bg-earth px-2.5 py-0.5 font-mono text-[0.625rem] tracking-[0.14em] text-void font-bold uppercase">
                    Most Popular
                  </span>
                )}
              </div>

              <h3 className="mt-5 font-display text-[1.4rem] tracking-wide text-white font-medium">{m.name}</h3>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-display text-[2.5rem] leading-none text-white font-semibold">{m.price}</span>
                <span className="font-mono text-label text-regolith/60 uppercase">min {m.days} days</span>
              </div>

              <ul className="mt-8 space-y-3 border-t border-white/10 pt-6">
                {m.lines.map((l) => (
                  <li key={l} className="flex gap-3 text-[0.875rem] text-regolith/85 leading-relaxed">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-earth" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#reserve"
              onClick={(e) => toReserve(e, m.name)}
              className={`mt-10 rounded-[6px] px-5 py-3.5 text-center font-mono text-label uppercase font-medium transition-all ${
                m.featured
                  ? 'bg-earth text-void hover:bg-cream hover:shadow-[0_0_20px_rgba(52,211,153,0.4)]'
                  : 'text-white ring-1 ring-white/20 hover:bg-white hover:text-void'
              }`}
            >
              {m.cta}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
