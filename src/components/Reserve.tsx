import {useEffect, useState, type FormEvent} from 'react';
import {allDistricts, brand, missions, reserve} from '../content';
import {useReveals} from '../hooks/useReveals';

type Status = 'idle' | 'invalid' | 'sent';

function useCountdown(target: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const ms = Math.max(0, new Date(target).getTime() - now);
  const s = Math.floor(ms / 1000);
  return {d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60};
}

export function Reserve() {
  const ref = useReveals<HTMLElement>();
  const t = useCountdown(reserve.window);
  const [status, setStatus] = useState<Status>('idle');
  const [selectedDistrict, setSelectedDistrict] = useState('Ernakulam');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setStatus('invalid');
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const subject = encodeURIComponent(`Sanctuary Reservation: ${String(data.get('district'))} (${String(data.get('collection'))})`);
    const body = encodeURIComponent(
      `Name: ${String(data.get('name'))}\nEmail: ${String(data.get('email'))}\nPhone/WhatsApp: ${String(data.get('phone'))}\nDistrict: ${String(data.get('district'))}\nCollection: ${String(data.get('collection'))}\nNotes: ${String(data.get('notes') || 'None')}`
    );
    window.location.href = `mailto:${brand.email}?subject=${subject}&body=${body}`;
    setStatus('sent');
  };

  const openDirectWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello NestKerala, I am interested in reserving a luxury rental home in ${selectedDistrict}. Could you please share verified listings?`
    );
    window.open(`https://wa.me/919846012345?text=${text}`, '_blank');
  };

  const field =
    'w-full rounded-[6px] bg-white/[0.04] px-4 py-3.5 text-body text-white ring-1 ring-white/15 outline-none placeholder:text-regolith/40 focus:ring-earth user-invalid:ring-red-400/70 transition-colors';
  const units: [string, number][] = [
    ['Days', t.d],
    ['Hrs', t.h],
    ['Min', t.m],
    ['Sec', t.s],
  ];

  return (
    <section ref={ref} id="reserve" aria-labelledby="reserve-title" className="relative overflow-hidden bg-void px-4 pb-28 sm:px-6 md:px-[6vw] md:pb-40">
      {/* Subtle tropical emerald glow at bottom */}
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-[62vw] left-1/2 size-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_30%,rgba(52,211,153,0.2),rgba(31,77,58,0.06)_55%,transparent_70%)]" />

      <div className="relative grid gap-12 border-t border-white/10 pt-20 md:grid-cols-2 md:gap-16 md:pt-28">
        <div data-reveal>
          <p className="font-mono text-label text-earth uppercase tracking-[0.2em]">{reserve.eyebrow}</p>
          <h2 id="reserve-title" className="mt-4 font-display text-display text-white font-medium">
            {reserve.heading}
          </h2>
          <p className="mt-5 max-w-[28rem] text-body text-regolith/80 leading-relaxed">{reserve.body}</p>

          <div className="mt-10">
            <p className="font-mono text-label text-regolith/60 uppercase">{reserve.windowLabel}</p>
            <div className="mt-3 flex gap-2 md:gap-3" role="timer" aria-label={`${t.d} days until the next intake window`}>
              {units.map(([label, v]) => (
                <div key={label} className="brackets min-w-[4.25rem] px-3 py-3 text-center text-white/30 md:min-w-[5.5rem]">
                  <span className="block font-display text-[1.5rem] text-white tabular-nums font-semibold md:text-[2.25rem]">
                    {String(v).padStart(2, '0')}
                  </span>
                  <span className="mt-1 block font-mono text-[0.625rem] tracking-[0.14em] text-earth uppercase">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-[8px] bg-forest/40 p-5 ring-1 ring-earth/30">
            <p className="font-mono text-[0.6875rem] text-earth uppercase tracking-wider">Fast Concierge Access</p>
            <p className="mt-1 text-[0.875rem] text-white">Prefer instant responses? Connect with our Kerala concierge directly on WhatsApp.</p>
            <button
              type="button"
              onClick={openDirectWhatsApp}
              className="mt-3 inline-flex items-center gap-2 rounded-[4px] bg-[#25D366] px-4 py-2 font-mono text-[0.75rem] text-void font-bold uppercase transition-all hover:brightness-110"
            >
              <span>💬</span> Chat on WhatsApp Now
            </button>
          </div>
        </div>

        <form noValidate onSubmit={onSubmit} aria-describedby="reserve-status" className="space-y-3.5" data-reveal>
          <label className="block">
            <span className="mb-1.5 block font-mono text-label text-regolith/70 uppercase">Full Name</span>
            <input name="name" required autoComplete="name" placeholder="E.g. Siddharth Menon" className={field} onInput={() => setStatus('idle')} />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1.5 block font-mono text-label text-regolith/70 uppercase">Email</span>
              <input name="email" type="email" required autoComplete="email" placeholder="you@domain.com" className={field} onInput={() => setStatus('idle')} />
            </label>
            <label className="block">
              <span className="mb-1.5 block font-mono text-label text-regolith/70 uppercase">WhatsApp Phone</span>
              <input name="phone" type="tel" required placeholder="+91 98765 43210" className={field} onInput={() => setStatus('idle')} />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1.5 block font-mono text-label text-regolith/70 uppercase">District</span>
              <select
                name="district"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className={`${field} appearance-none bg-void-2`}
              >
                {allDistricts.map((d) => (
                  <option key={d.name} value={d.name} className="bg-void text-white">
                    {d.name} ({d.malayalam})
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block font-mono text-label text-regolith/70 uppercase">Collection Type</span>
              <select name="collection" defaultValue="Highland Tea Estates" className={`${field} appearance-none bg-void-2`}>
                {missions.items.map((m) => (
                  <option key={m.name} value={m.name} className="bg-void text-white">
                    {m.name} ({m.price})
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="block">
            <span className="mb-1.5 block font-mono text-label text-regolith/70 uppercase">Specific Preferences / Requirements</span>
            <textarea
              name="notes"
              rows={3}
              placeholder="E.g. Lakefront view, minimum 3 BHK, dedicated parking, high-speed fiber..."
              className={field}
            />
          </label>

          <button
            type="submit"
            className="mt-2 w-full rounded-[6px] bg-earth px-5 py-4 font-mono text-label text-void font-bold uppercase transition-all hover:bg-cream hover:shadow-[0_0_24px_rgba(52,211,153,0.35)]"
          >
            Submit Sanctuary Manifest
          </button>

          <p id="reserve-status" role="status" className="min-h-[1.25rem] text-[0.8125rem] text-regolith/80">
            {status === 'invalid' && 'Please provide your name, valid email, and contact number.'}
            {status === 'sent' && `Your mail app should be open with your reservation request. Our concierge will review it shortly!`}
          </p>
        </form>
      </div>
    </section>
  );
}
