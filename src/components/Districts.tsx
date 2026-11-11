import {useState} from 'react';
import {allDistricts, brand, type DistrictInfo} from '../content';
import {useReveals} from '../hooks/useReveals';

export function Districts() {
  const ref = useReveals<HTMLElement>();
  const [selected, setSelected] = useState<DistrictInfo | null>(null);
  const [filter, setFilter] = useState('');

  const filtered = allDistricts.filter(
    (d) =>
      d.name.toLowerCase().includes(filter.toLowerCase()) ||
      d.tag.toLowerCase().includes(filter.toLowerCase()) ||
      d.malayalam.includes(filter)
  );

  const openWhatsApp = (districtName: string) => {
    const text = encodeURIComponent(
      `Hello, I am interested in verified rental homes in ${districtName} on NestKerala. Could you please share available properties and details?`
    );
    window.open(`https://wa.me/919846012345?text=${text}`, '_blank');
  };

  return (
    <section ref={ref} id="districts" aria-labelledby="districts-title" className="relative bg-void px-4 py-28 sm:px-6 md:px-[6vw] md:py-36">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between" data-reveal>
        <div>
          <p className="font-mono text-label text-earth uppercase tracking-[0.2em]">All 14 Kerala Districts</p>
          <h2 id="districts-title" className="mt-4 font-display text-display text-white font-medium">
            From Kasaragod to Thiruvananthapuram.
          </h2>
          <p className="mt-3 max-w-[36rem] text-[1rem] text-regolith/80">
            56+ curated rental sanctuaries seeded across every corner of God’s Own Country. Verified owners, zero brokerage.
          </p>
        </div>

        {/* Quick Search Input */}
        <div className="w-full md:w-72">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search district or region..."
            className="w-full rounded-[6px] bg-void-2/80 px-4 py-3 text-[0.875rem] text-white ring-1 ring-white/15 outline-none placeholder:text-regolith/40 focus:ring-earth transition-all"
          />
        </div>
      </div>

      {/* District Cards Grid */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((d, i) => (
          <div
            key={d.name}
            data-reveal
            style={{transitionDelay: `${(i % 4) * 80}ms`}}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[10px] bg-void-2 ring-1 ring-white/10 transition-all duration-500 hover:-translate-y-1.5 hover:ring-earth/50 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]"
          >
            {/* Real District Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-void-2">
              <img
                src={d.image}
                alt={d.name}
                loading="lazy"
                className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void-2 via-void-2/30 to-transparent" />
              
              <span className="absolute top-3 left-3 rounded-full bg-forest/85 px-2.5 py-0.5 font-mono text-[0.625rem] text-earth uppercase tracking-[0.14em] ring-1 ring-earth/30 backdrop-blur-md">
                {d.count}+ Homes
              </span>
              <span className="absolute top-3 right-3 font-mono text-[0.6875rem] text-white/90 bg-void/70 px-2 py-0.5 rounded backdrop-blur-sm">
                {d.rentRange}
              </span>
            </div>

            {/* Content Details */}
            <div className="flex flex-1 flex-col justify-between p-5">
              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-[1.2rem] text-white font-medium group-hover:text-earth transition-colors">
                    {d.name}
                  </h3>
                  <span className="text-[0.75rem] text-regolith/60">{d.malayalam}</span>
                </div>
                <p className="mt-1 font-mono text-[0.6875rem] text-earth uppercase tracking-wider">{d.tag}</p>
                <p className="mt-2 text-[0.8125rem] text-regolith/80 line-clamp-2 leading-relaxed">{d.description}</p>
              </div>

              <div className="mt-5 flex items-center gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setSelected(d)}
                  className="flex-1 rounded-[4px] bg-white/10 py-2 text-center font-mono text-[0.6875rem] text-white uppercase hover:bg-earth hover:text-void transition-colors"
                >
                  Quick View
                </button>
                <button
                  type="button"
                  onClick={() => openWhatsApp(d.name)}
                  className="rounded-[4px] bg-[#25D366]/20 px-3 py-2 text-[0.75rem] text-[#25D366] hover:bg-[#25D366] hover:text-void transition-colors flex items-center justify-center"
                  title="WhatsApp Concierge"
                >
                  💬
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Quick View */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/85 backdrop-blur-xl animate-fade-in"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-xl overflow-hidden rounded-[12px] bg-void-2 ring-1 ring-white/20 p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-regolith/60 hover:text-white font-mono text-sm"
            >
              ✕ Close
            </button>

            <div className="relative aspect-[16/9] overflow-hidden rounded-[8px] mt-2 mb-5">
              <img src={selected.image} alt={selected.name} className="size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3">
                <span className="font-mono text-[0.6875rem] text-earth uppercase bg-forest/90 px-2 py-0.5 rounded">
                  {selected.tag}
                </span>
                <h3 className="font-display text-[1.5rem] text-white font-bold mt-1">
                  {selected.name} <span className="text-sm font-normal text-regolith/70">({selected.malayalam})</span>
                </h3>
              </div>
            </div>

            <p className="text-[0.9375rem] text-regolith/90 leading-relaxed">{selected.description}</p>

            <div className="mt-5 grid grid-cols-2 gap-3 py-3 border-y border-white/10 font-mono text-[0.75rem]">
              <div>
                <span className="text-regolith/60 block uppercase">Curated Listings</span>
                <span className="text-white text-[1rem] font-bold">{selected.count}+ Verified Properties</span>
              </div>
              <div>
                <span className="text-regolith/60 block uppercase">Typical Rent</span>
                <span className="text-earth text-[1rem] font-bold">{selected.rentRange} / month</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => openWhatsApp(selected.name)}
                className="flex-1 rounded-[6px] bg-[#25D366] py-3 text-center font-mono text-[0.75rem] text-void font-bold uppercase transition-transform hover:scale-102 flex items-center justify-center gap-2"
              >
                <span>💬</span> WhatsApp District Concierge
              </button>
              <a
                href={brand.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[6px] bg-white/10 px-5 py-3 text-center font-mono text-[0.75rem] text-white uppercase hover:bg-white hover:text-void transition-colors"
              >
                View on Full Portal →
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
