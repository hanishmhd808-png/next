import {useEffect, useRef} from 'react';
import {intro, log} from '../content';
import {clamp, pinProgress, range} from '../lib/math';
import {onFrame} from '../lib/scroll';

/**
 * Signature Kerala Stays — horizontal slide film reel.
 * The section pins and the reel slides sideways with the scroll;
 * the frame nearest the middle is in focus, the rest dim back,
 * and each picture drifts against its frame.
 */

const SECTION_VH = 340;

export function MissionLog() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const cardRefs = useRef<HTMLLIElement[]>([]);
  const imgRefs = useRef<HTMLImageElement[]>([]);
  const barRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let lastP = -1;
    return onFrame(() => {
      const root = rootRef.current;
      const track = trackRef.current;
      if (!root || !track) return;
      const {p, rect, vh} = pinProgress(root);
      if (rect.bottom < 0 || rect.top > vh) return;
      if (Math.abs(p - lastP) < 0.00005) return;
      lastP = p;

      const vw = window.innerWidth;
      const k = range(p, 0.04, 0.96);
      const travel = Math.max(0, track.offsetLeft + track.scrollWidth - vw * 0.94);
      track.style.transform = `translate3d(${-k * travel}px, 0, 0)`;

      let nearest = 0;
      let best = Infinity;
      cardRefs.current.forEach((card, i) => {
        const r = card.getBoundingClientRect();
        const off = (r.left + r.width / 2 - vw * 0.62) / vw;
        const a = clamp(Math.abs(off) * 1.6);
        card.style.opacity = String(1 - a * 0.55);
        card.style.transform = `scale(${1 - a * 0.07})`;
        if (imgRefs.current[i]) {
          imgRefs.current[i].style.transform = `translate3d(${off * -60}px, 0, 0) scale(1.15)`;
        }
        if (Math.abs(off) < best) {
          best = Math.abs(off);
          nearest = i;
        }
      });
      barRef.current!.style.transform = `scaleX(${k})`;
      countRef.current!.textContent = `0${nearest + 1}`;
    });
  }, []);

  return (
    <section ref={rootRef} id="log" aria-labelledby="log-title" className="relative bg-void" style={{height: `${SECTION_VH}svh`}}>
      <div className="sticky top-0 flex h-screen-s flex-col justify-center overflow-hidden pt-16 md:flex-row md:items-center md:pt-0">
        <div className="relative z-10 shrink-0 px-4 sm:px-6 md:w-[32vw] md:pl-[6vw] md:pr-10">
          <p className="font-mono text-label text-earth uppercase tracking-[0.2em]">{intro.eyebrow}</p>
          <h2 id="log-title" className="mt-4 font-display text-display text-white font-medium">
            {intro.heading}
          </h2>
          <p className="mt-5 max-w-[26rem] text-body text-regolith/80 max-md:hidden leading-relaxed">{intro.body}</p>
          <div className="mt-8 flex items-center gap-4 font-mono text-label text-regolith/60 uppercase max-md:hidden" aria-hidden="true">
            <span>
              <span ref={countRef} className="text-earth font-bold">
                01
              </span>{' '}
              / 0{log.length}
            </span>
            <span className="relative h-px w-32 bg-white/15">
              <span ref={barRef} className="absolute inset-0 origin-left bg-earth" style={{transform: 'scaleX(0)'}} />
            </span>
          </div>
        </div>

        <ol ref={trackRef} className="mt-8 flex gap-5 pl-4 will-change-transform sm:pl-6 md:mt-0 md:gap-7 md:pl-0">
          {log.map((entry, i) => (
            <li
              key={entry.title}
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
              className="w-[72vw] shrink-0 origin-bottom sm:w-[46vw] md:w-[clamp(17rem,25vw,24rem)]"
            >
              <figure className="group relative rounded-[10px] overflow-hidden bg-void-2 ring-1 ring-white/10 transition-all duration-300 hover:ring-earth/50">
                <div className="relative aspect-[3/4] overflow-hidden bg-void-2">
                  <img
                    ref={(el) => {
                      if (el) imgRefs.current[i] = el;
                    }}
                    src={entry.image}
                    alt={`${entry.title}: ${entry.body}`}
                    width={840}
                    height={1120}
                    loading="lazy"
                    className="size-full object-cover will-change-transform brightness-90 group-hover:brightness-100 transition-[filter]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent opacity-90" />
                  
                  {/* Floating Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-forest/85 px-3 py-1 font-mono text-[0.6875rem] text-earth uppercase tracking-[0.14em] ring-1 ring-earth/30 backdrop-blur-md">
                      {entry.tag}
                    </span>
                  </div>

                  {/* Card Content Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-[1.35rem] leading-snug text-white font-medium">
                      {entry.title}
                    </h3>
                    <p className="mt-2.5 text-[0.875rem] text-regolith/80 line-clamp-3 leading-relaxed">
                      {entry.body}
                    </p>
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[0.6875rem] text-earth">
                      <span>4+ Verified Properties</span>
                      <a href="#districts" className="hover:underline flex items-center gap-1 text-white">
                        Explore District →
                      </a>
                    </div>
                  </div>
                </div>
              </figure>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
