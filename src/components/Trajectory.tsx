import {useEffect, useRef, useState} from 'react';
import {trajectory} from '../content';
import {clamp, easeOutCubic, pinProgress, range} from '../lib/math';
import {onFrame} from '../lib/scroll';

/**
 * The 14-District Grand Route across Kerala, drawn as you scroll.
 * The section pins while the four legs of the journey ink themselves
 * one after another, an expedition compass tracker riding the leg being drawn;
 * the distance explored ticks up to 600 km across God's Own Country.
 */

const SECTION_VH = 380;
const WINDOW = [0.06, 0.92] as const;
const DISTANCE = 600;

// Waypoint coordinates across the 1200x600 SVG map.
const WAYPOINTS = [
  {x: 180, y: 490, name: 'Thiruvananthapuram', tag: 'South Coast'},
  {x: 320, y: 410, name: 'Kollam · Ashtamudi', tag: 'Backwaters'},
  {x: 460, y: 350, name: 'Alappuzha', tag: 'Canals'},
  {x: 580, y: 295, name: 'Kochi · Ernakulam', tag: 'Port City'},
  {x: 730, y: 215, name: 'Munnar · Idukki', tag: 'High Ranges'},
  {x: 840, y: 260, name: 'Palakkad Gap', tag: 'Granary'},
  {x: 950, y: 195, name: 'Kozhikode', tag: 'Malabar'},
  {x: 1070, y: 125, name: 'Wayanad & Kasaragod', tag: 'North Forests'},
];

const LEGS = [
  // Leg 1: South Coast & Travancore
  `M${WAYPOINTS[0].x} ${WAYPOINTS[0].y} C 230 460, 275 435, ${WAYPOINTS[1].x} ${WAYPOINTS[1].y}`,
  // Leg 2: Vembanad & Central Backwaters
  `M${WAYPOINTS[1].x} ${WAYPOINTS[1].y} C 370 380, 470 330, ${WAYPOINTS[3].x} ${WAYPOINTS[3].y}`,
  // Leg 3: Misty High Range & Cultural Heartland
  `M${WAYPOINTS[3].x} ${WAYPOINTS[3].y} C 640 240, 750 200, ${WAYPOINTS[5].x} ${WAYPOINTS[5].y}`,
  // Leg 4: Malabar Coast & Northern Rainforest Canopies
  `M${WAYPOINTS[5].x} ${WAYPOINTS[5].y} C 900 230, 990 165, ${WAYPOINTS[7].x} ${WAYPOINTS[7].y}`,
];

export function Trajectory() {
  const rootRef = useRef<HTMLElement>(null);
  const legRefs = useRef<SVGPathElement[]>([]);
  const trackerRef = useRef<SVGGElement>(null);
  const kmRef = useRef<HTMLSpanElement>(null);
  const [leg, setLeg] = useState(0);

  useEffect(() => {
    let lastP = -1;
    let current = 0;
    return onFrame(() => {
      const root = rootRef.current;
      if (!root) return;
      const {p, rect, vh} = pinProgress(root);
      if (rect.bottom < 0 || rect.top > vh) return;
      if (Math.abs(p - lastP) < 0.00005) return;
      lastP = p;

      const u = range(p, ...WINDOW) * LEGS.length;
      const s = clamp(Math.floor(u), 0, LEGS.length - 1);
      if (s !== current) {
        current = s;
        setLeg(s);
      }
      legRefs.current.forEach((path, i) => {
        if (!path) return;
        const k = easeOutCubic(clamp(u - i));
        path.style.strokeDashoffset = String(1 - k);
        if (i === s && trackerRef.current) {
          const pt = path.getPointAtLength(path.getTotalLength() * k);
          trackerRef.current.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
        }
      });
      const progress = easeOutCubic(clamp(u / LEGS.length));
      if (kmRef.current) {
        kmRef.current.textContent = Math.round(progress * DISTANCE).toLocaleString('en-US');
      }
    });
  }, []);

  const current = trajectory.legs[leg];

  return (
    <section ref={rootRef} id="trajectory" aria-labelledby="trajectory-title" className="relative bg-void" style={{height: `${SECTION_VH}svh`}}>
      <div className="sticky top-0 flex h-screen-s flex-col overflow-hidden px-4 pt-20 pb-8 sm:px-6 md:px-[6vw] md:pt-24">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-label text-earth uppercase tracking-[0.2em]">{trajectory.eyebrow}</p>
            <h2 id="trajectory-title" className="mt-3 max-w-[26ch] font-display text-display text-white font-medium">
              {trajectory.heading}
            </h2>
          </div>
          <div className="font-mono text-label text-regolith/70 uppercase text-right">
            <span className="block text-white/50 text-[0.625rem]">Travancore → Malabar</span>
            <span className="text-white text-[1.125rem] font-bold tabular-nums">
              <span ref={kmRef}>0</span> km
            </span>{' '}
            explored
          </div>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center">
          <svg viewBox="0 0 1200 600" className="h-auto max-h-full w-full" role="img" aria-label="The 14-district route across Kerala, drawn in four progressive legs.">
            <defs>
              <linearGradient id="route-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="50%" stopColor="#E5B358" />
                <stop offset="100%" stopColor="#48bb78" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Subtle terrain contour grid lines */}
            <g opacity="0.08" stroke="#34D399" strokeWidth="1" strokeDasharray="4 8">
              <line x1="100" y1="500" x2="1150" y2="500" />
              <line x1="100" y1="380" x2="1150" y2="380" />
              <line x1="100" y1="260" x2="1150" y2="260" />
              <line x1="100" y1="140" x2="1150" y2="140" />
            </g>

            {/* Background path guidelines (faint trail) */}
            {LEGS.map((d, i) => (
              <path key={`bg-${i}`} d={d} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" />
            ))}

            {/* Active drawn path legs */}
            {LEGS.map((d, i) => (
              <path
                key={`fg-${i}`}
                ref={(el) => {
                  if (el) legRefs.current[i] = el;
                }}
                d={d}
                fill="none"
                stroke="url(#route-gradient)"
                strokeWidth="3.5"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset="1"
                filter="url(#glow)"
                className="will-change-[stroke-dashoffset]"
              />
            ))}

            {/* Waypoint nodes along Kerala */}
            {WAYPOINTS.map((wp, i) => (
              <g key={wp.name} transform={`translate(${wp.x} ${wp.y})`}>
                <circle r="14" fill="#1F4D3A" fillOpacity="0.6" stroke="#34D399" strokeWidth="1.5" strokeOpacity="0.4" />
                <circle r="4.5" fill="#34D399" />
                <text
                  x="0"
                  y={i % 2 === 0 ? 28 : -20}
                  textAnchor="middle"
                  fill="#FAF6EE"
                  fontSize="11"
                  fontFamily="Inter, sans-serif"
                  fontWeight="500"
                  opacity="0.85"
                >
                  {wp.name}
                </text>
                <text
                  x="0"
                  y={i % 2 === 0 ? 42 : -33}
                  textAnchor="middle"
                  fill="#34D399"
                  fontSize="8.5"
                  fontFamily="IBM Plex Mono, monospace"
                  opacity="0.75"
                  letterSpacing="1"
                >
                  {wp.tag.toUpperCase()}
                </text>
              </g>
            ))}

            {/* Moving Compass Tracker */}
            <g ref={trackerRef} transform={`translate(${WAYPOINTS[0].x} ${WAYPOINTS[0].y})`} className="will-change-transform">
              <circle r="18" fill="none" stroke="#34D399" strokeWidth="1.5" opacity="0.6">
                <animate attributeName="r" values="14;24;14" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0.1;0.8" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle r="8" fill="#FAF6EE" stroke="#1F4D3A" strokeWidth="2.5" />
              <circle r="3" fill="#1F4D3A" />
            </g>
          </svg>
        </div>

        {/* Narrative info box for current leg */}
        <div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <span className="rounded-[4px] bg-forest px-2.5 py-1 font-mono text-[0.6875rem] text-earth uppercase ring-1 ring-earth/30">
              {current.day}
            </span>
            <span className="font-display text-[1.125rem] text-white font-medium">{current.title}</span>
          </div>
          <p className="max-w-[48ch] text-[0.875rem] text-regolith/80 leading-relaxed max-md:hidden">
            {current.body}
          </p>
          <div className="flex gap-2 font-mono text-[0.6875rem] text-regolith/60">
            {trajectory.legs.map((_, i) => (
              <span
                key={i}
                className={`size-2 rounded-full transition-colors ${
                  i === leg ? 'bg-earth shadow-[0_0_8px_#34D399]' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
