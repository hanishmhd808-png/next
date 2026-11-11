import {useEffect, useRef} from 'react';
import {hero} from '../content';
import {useReducedMotion} from '../hooks/useReducedMotion';
import {clamp, easeOutCubic, lerp, pinProgress, range} from '../lib/math';
import {onFrame} from '../lib/scroll';

/**
 * The Kerala Dawn & Sanctuary Horizon.
 * Six photographic layers stacked and pinned; one scroll range moves each at its own rate:
 *
 *   0.00 – 0.18  a veil of morning mist drifts off the lens
 *   0.04 – 0.50  the golden Kerala horizon rises into view
 *   0.10 – 0.50  NESTKERALA resolves with cinematic tracking
 *   0.28 – 0.60  the tropical tree canopy closes in around the view
 *   0.70 – 1.00  everything tilts upward to transition seamlessly to the signature stays
 *
 * A thin telemetry HUD rides on top: live Kerala IST time, Anamudi peak elevation, coordinates.
 */

const STAGE_VH = 440;

type LayerName = 'sky' | 'earth' | 'moonscape' | 'frame' | 'astronaut' | 'ground';
const ORDER: LayerName[] = ['sky', 'earth', 'moonscape', 'frame', 'astronaut', 'ground'];

/** All layers share one crop, so they stay registered at every viewport. */
const FIT = 'absolute inset-0 size-full object-cover object-[58%_50%] md:object-center';

type Mote = {x: number; y: number; r: number; s: number; a: number};

export function Earthrise() {
  const rootRef = useRef<HTMLElement>(null);
  const layerRefs = useRef<Partial<Record<LayerName, HTMLDivElement>>>({});
  const veilRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLParagraphElement>(null);
  const elevRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;

  // Dust canvas size.
  useEffect(() => {
    const c = dustRef.current!;
    const sync = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.round(c.clientWidth * dpr);
      c.height = Math.round(c.clientHeight * dpr);
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(c);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const canvas = dustRef.current!;
    const ctx = canvas.getContext('2d')!;
    let seed = 17;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    // Golden tropical mist and ambient morning particles.
    const motes: Mote[] = Array.from({length: 160}, () => ({
      x: rand(),
      y: rand(),
      r: 0.5 + rand() * 1.8,
      s: 0.3 + rand(),
      a: 0.25 + rand() * 0.65,
    }));
    let lastP = -1;
    let lastTime = 0;

    const set = (name: LayerName, y: number, scale = 1, opacity = 1) => {
      const el = layerRefs.current[name];
      if (!el) return;
      el.style.transform = `translate3d(0, ${y}vh, 0) scale(${scale})`;
      el.style.opacity = String(opacity);
    };

    return onFrame((time) => {
      const dt = lastTime ? Math.min(0.1, (time - lastTime) / 1000) : 1 / 60;
      lastTime = time;
      const root = rootRef.current;
      if (!root) return;
      const {p, rect} = pinProgress(root);
      if (rect.bottom < 0) return;

      // Mist motes drift every frame while visible.
      const veil = 1 - range(p, 0, 0.18);
      if (veil > 0.001) {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        const dpr = canvas.width / Math.max(1, w);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#fef08a';
        for (const m of motes) {
          if (!reducedRef.current) {
            m.x += 0.005 * m.s * dt;
            m.y -= 0.004 * m.s * dt;
            if (m.x > 1) m.x -= 1;
            if (m.y < 0) m.y += 1;
          }
          ctx.globalAlpha = m.a * veil;
          ctx.beginPath();
          ctx.arc(m.x * w, (m.y - p * 0.6) * h, m.r * (1 + p * 3), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      if (Math.abs(p - lastP) < 0.00005) return;
      lastP = p;

      const exit = range(p, 0.7, 1);
      const settle = easeOutCubic(range(p, 0, 0.5));

      // Mist veil clears upward.
      veilRef.current!.style.opacity = String(veil);
      veilRef.current!.style.transform = `translate3d(0, ${-range(p, 0, 0.18) * 24}vh, 0) scale(${1 + range(p, 0, 0.18) * 0.25})`;
      canvas.style.opacity = String(veil);

      // Layer parallax: Far → near, each faster than the one behind it.
      set('sky', lerp(0, -6, p), lerp(1.14, 1, settle));
      const rise = easeOutCubic(range(p, 0.04, 0.5));
      set('earth', lerp(34, 0, rise) - exit * 12, lerp(0.92, 1, rise));
      set('moonscape', lerp(9, 0, settle) - exit * 26);
      const rim = easeOutCubic(range(p, 0.28, 0.58));
      set('frame', -exit * 44, lerp(1.6, 1, rim), rim);
      const up = easeOutCubic(range(p, 0.36, 0.62));
      set('astronaut', lerp(28, 0, up) - exit * 58, 1, clamp(up * 2));
      const ground = easeOutCubic(range(p, 0.34, 0.6));
      set('ground', lerp(36, 0, ground) - exit * 78);

      // Title resolves then yields gently to the scenery.
      const tIn = easeOutCubic(range(p, 0.08, 0.24));
      const tOut = range(p, 0.42, 0.52);
      const title = titleRef.current!;
      title.style.opacity = String(tIn * (1 - tOut));
      title.style.letterSpacing = `${lerp(0.4, 0.18, tIn)}em`;
      title.style.transform = `translate3d(0, ${-p * 6}vh, 0)`;
      title.style.filter = tIn < 0.99 ? `blur(${(1 - tIn) * 10}px)` : '';

      // Telemetry HUD.
      hudRef.current!.style.opacity = String(range(p, 0.02, 0.1) * (1 - range(p, 0.62, 0.72)));
      const now = new Date();
      // Format Indian Standard Time
      const istHours = String(now.getUTCHours() + 5 + Math.floor((now.getUTCMinutes() + 30) / 60) % 24).padStart(2, '0');
      const istMins = String((now.getUTCMinutes() + 30) % 60).padStart(2, '0');
      const istSecs = String(now.getUTCSeconds()).padStart(2, '0');
      clockRef.current!.textContent = `IST ${istHours}:${istMins}:${istSecs}`;
      elevRef.current!.textContent = `${Math.round(lerp(120, 2695, rise))}m`;
    });
  }, []);

  const layer = (name: LayerName, extra = '') => (
    <div
      key={name}
      ref={(el) => {
        if (el) layerRefs.current[name] = el;
      }}
      className={`absolute inset-0 will-change-transform ${extra}`}
    >
      <picture>
        <source media="(max-width: 767px)" srcSet={`/layers/m/${name}.webp`} />
        <img src={`/layers/d/${name}.webp`} alt="" aria-hidden="true" className={FIT} decoding="async" fetchPriority={name === 'sky' ? 'high' : 'auto'} />
      </picture>
      {/* Tropical dawn ambient gradient overlay for lush atmospheric depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest/30 via-transparent to-black/20 mix-blend-overlay pointer-events-none" />
      {/* Black apron below ground to smoothly transition to page */}
      {name === 'ground' && <div className="absolute inset-x-0 top-full h-[110vh] bg-void" />}
    </div>
  );

  return (
    <section id="top" ref={rootRef} aria-label="NestKerala Horizon" className="relative" style={{height: `${STAGE_VH}svh`}}>
      <div className="sticky top-0 h-screen-s overflow-hidden bg-void">
        {ORDER.slice(0, 3).map((n) => layer(n))}

        {/* Title resolves between the horizons. */}
        <div ref={titleRef} className="pointer-events-none absolute inset-x-0 top-[26%] text-center md:top-[28%]" style={{opacity: 0}}>
          <h1 className="font-display text-hero text-white font-bold [text-shadow:0_4px_50px_rgba(0,0,0,0.85)] tracking-[0.18em]">
            {hero.title}
          </h1>
          <p className="mt-3 font-mono text-label text-earth font-medium uppercase tracking-[0.2em]">{hero.kicker}</p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="rounded-full bg-forest/80 px-3 py-1 font-mono text-[0.6875rem] text-cream ring-1 ring-earth/40 backdrop-blur-md">
              🌴 14 Districts Covered
            </span>
            <span className="rounded-full bg-forest/80 px-3 py-1 font-mono text-[0.6875rem] text-cream ring-1 ring-earth/40 backdrop-blur-md">
              ✨ 56+ Curated Stays
            </span>
          </div>
        </div>

        {ORDER.slice(3).map((n) => layer(n))}

        {/* Morning mist veil on the lens. */}
        <div
          ref={veilRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 50% at 30% 40%, rgba(31,77,58,0.5), transparent 70%), radial-gradient(50% 60% at 75% 60%, rgba(229,179,88,0.25), transparent 70%), radial-gradient(80% 80% at 50% 50%, rgba(6,16,11,0.88), rgba(4,10,7,0.98))',
          }}
        >
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center px-4">
            <p className="font-mono text-label text-earth uppercase tracking-[0.25em]">GOD'S OWN COUNTRY</p>
            <h2 className="mt-4 font-display text-[1.5rem] md:text-[2.25rem] text-cream font-medium tracking-[0.08em]">
              Find Your Perfect Rental Home
            </h2>
            <p className="mt-3 font-display text-[0.8125rem] tracking-[0.45em] text-regolith/80 uppercase">
              Scroll to enter the sanctuary
            </p>
            <span aria-hidden="true" className="mt-6 inline-block animate-bounce text-earth motion-reduce:animate-none">
              ↓
            </span>
          </div>
        </div>

        <canvas ref={dustRef} aria-hidden="true" className="pointer-events-none absolute inset-0 size-full" />

        {/* Telemetry HUD */}
        <div
          ref={hudRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4 font-mono text-label text-regolith/75 uppercase md:p-8"
          style={{opacity: 0}}
        >
          <div>
            <p className="text-white/90 font-medium">Kerala, India</p>
            <p ref={clockRef} className="text-earth tabular-nums">
              IST 00:00:00
            </p>
          </div>
          <div className="text-center max-md:hidden">
            <p className="text-white/90">Western Ghats Peak</p>
            <p className="text-earth tabular-nums">
              Elev <span ref={elevRef}>2,695m</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/90">{hero.site.split('·')[0]}</p>
            <p className="text-earth">14 Districts Live</p>
          </div>
        </div>

        {/* Bottom edge gradient to fade into dark background */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void to-transparent" />
      </div>
    </section>
  );
}
