/**
 * NestKerala Content & Editorial Architecture
 * Premium Rental Sanctuaries across all 14 Kerala Districts.
 */

export const brand = {
  name: 'NestKerala',
  wordmark: 'NESTKERALA',
  tagline: 'Find Your Perfect Rental Home in Kerala',
  email: 'concierge@nestkerala.com',
  phone: '+91 98460 12345',
  portalUrl: 'http://localhost:3000',
};

export const nav = [
  {label: 'Dawn', href: '#top'},
  {label: 'Sanctuaries', href: '#log'},
  {label: 'The Route', href: '#trajectory'},
  {label: 'Collections', href: '#missions'},
  {label: '14 Districts', href: '#districts'},
  {label: 'Reserve', href: '#reserve'},
];

export const hero = {
  title: 'NESTKERALA',
  kicker: "God's Own Country · Covering All 14 Districts",
  site: '8.5241°N 76.9366°E · 14 Districts Active',
  stats: {
    districts: '14 Districts Active',
    verified: '56+ Curated Homes',
    peak: '2,695m (Anamudi Peak)',
    rating: '4.92 ★ Average Rating',
  },
};

export const intro = {
  eyebrow: 'Signature Sanctuaries',
  heading: 'The first luxury home rental designed for serenity.',
  body: 'Misty tea estates in Munnar, serene backwater manors in Alappuzha, and colonial coastal penthouses in Fort Kochi. Four landscapes, 14 districts, frame by frame.',
};

export const log = [
  {
    tag: 'Highlands',
    title: 'Munnar & Idukki Tea Bungalows',
    body: 'Cloud-crested estates, crisp mountain air, and panoramic valley verandas overlooking endless tea plantations.',
    image: '/images/districts/idukki.jpg',
  },
  {
    tag: 'Backwaters',
    title: 'Alappuzha Waterway Manors',
    body: 'Traditional Kerala teak architecture on the edge of emerald lagoons and swaying coconut palm canals.',
    image: '/images/districts/alappuzha.jpg',
  },
  {
    tag: 'Rainforest',
    title: 'Wayanad Canopy Retreats',
    body: 'Ancient Western Ghats mist, organic cardamom groves, and private cantilevered balconies above the forest canopy.',
    image: '/images/districts/wayanad.jpg',
  },
  {
    tag: 'Heritage',
    title: 'Fort Kochi Colonial Residences',
    body: 'High ceilings, Dutch-Portuguese courtyards, rain-tree verandas, and gentle Arabian sea breezes.',
    image: '/images/districts/ernakulam.jpg',
  },
];

/** Legs of the 14-District Grand Kerala Route, South to North. */
export const trajectory = {
  eyebrow: 'The Grand Route',
  heading: '600 km across God’s Own Country, drawn as you scroll.',
  legs: [
    {
      day: 'Leg 01 · South',
      title: 'Travancore Coastline',
      body: 'Thiruvananthapuram, Kollam & Pathanamthitta — clifftop ocean villas, Ashtamudi lakefronts, and lush sacred groves.',
    },
    {
      day: 'Leg 02 · Backwaters',
      title: 'Vembanad & Central Lagoons',
      body: 'Alappuzha, Kottayam & Ernakulam — serene canals, Dutch colonial streets, and vibrant waterfront residences.',
    },
    {
      day: 'Leg 03 · High Range',
      title: 'Misty Ghats & Cultural Heart',
      body: 'Idukki, Thrissur & Palakkad — mountain tea estates reaching 2,000m, historic temple corridors, and sweeping valley gap breezes.',
    },
    {
      day: 'Leg 04 · Malabar',
      title: 'Rainforest Canopies & North Coast',
      body: 'Malappuram, Kozhikode, Wayanad, Kannur & Kasaragod — spice coastlines, mist-shrouded rainforests, and historic Bekal fort ramparts.',
    },
  ],
};

export const missions = {
  eyebrow: 'Curated Collections',
  heading: 'Three ways to live in Kerala.',
  note: 'All stays verified · Direct owner contact · Zero brokerage',
  items: [
    {
      name: 'Backwater Sanctuaries',
      days: 30,
      price: '₹35,000/mo',
      bhk: '3 BHK',
      lines: [
        'Vembanad lakefront deck & boat jetty',
        'Traditional Kerala teak courtyards',
        'Organic vegetable & fish gardens',
        'High-speed fiber & uninterrupted solar power',
      ],
      cta: 'Reserve Backwater Stay',
    },
    {
      name: 'Highland Tea Estates',
      days: 90,
      price: '₹48,000/mo',
      bhk: '4 BHK',
      lines: [
        'Panoramic mountain & valley overlook',
        'Stone fireplace & private manicured lawn',
        'Private cardamom estate walking trails',
        'Dedicated resident estate caretaker',
      ],
      cta: 'Reserve Highland Estate',
      featured: true,
    },
    {
      name: 'Coastal Heritage Suites',
      days: 14,
      price: '₹28,000/mo',
      bhk: '2 BHK',
      lines: [
        'Arabian Sea breeze sunset balcony',
        'Colonial archways & 14-foot ceilings',
        'Fort Kochi art district walking distance',
        'Secure covered parking & 24/7 security',
      ],
      cta: 'Reserve Coastal Suite',
    },
  ],
};

export const reserve = {
  eyebrow: 'Guest Manifest',
  heading: 'Put your name on the sanctuary manifest.',
  body: 'Zero brokerage. Direct verified owners. Handpicked homes. Our local concierge will contact you on WhatsApp with verified rental options within 2 hours.',
  window: '2026-12-01T09:00:00Z',
  windowLabel: 'Next Curated Intake Window',
};

export interface DistrictInfo {
  name: string;
  malayalam: string;
  tag: string;
  image: string;
  count: number;
  rentRange: string;
  description: string;
}

export const allDistricts: DistrictInfo[] = [
  {
    name: 'Thiruvananthapuram',
    malayalam: 'തിരുവനന്തപുരം',
    tag: 'Capital & Clifftops',
    image: '/images/districts/thiruvananthapuram.jpg',
    count: 4,
    rentRange: '₹20k – ₹65k',
    description: 'Cliffside villas, Royal Travancore heritage, and pristine Kovalam shoreline living.',
  },
  {
    name: 'Kollam',
    malayalam: 'കൊല്ലം',
    tag: 'Ashtamudi Backwaters',
    image: '/images/districts/kollam.jpg',
    count: 4,
    rentRange: '₹16k – ₹45k',
    description: 'Eight-branched lake panoramas, cashews groves, and historic port city tranquility.',
  },
  {
    name: 'Pathanamthitta',
    malayalam: 'പത്തനംതിട്ട',
    tag: 'Pilgrim & Forest Heart',
    image: '/images/districts/pathanamthitta.jpg',
    count: 4,
    rentRange: '₹14k – ₹38k',
    description: 'Verdant rubber estates, misty river valleys, and peaceful riverbank homes.',
  },
  {
    name: 'Alappuzha',
    malayalam: 'ആലപ്പുഴ',
    tag: 'Venice of the East',
    image: '/images/districts/alappuzha.jpg',
    count: 4,
    rentRange: '₹22k – ₹70k',
    description: 'Waterfront traditional tharavads, canalside living, and endless paddy views.',
  },
  {
    name: 'Kottayam',
    malayalam: 'കോട്ടയം',
    tag: 'Letters, Lakes & Latex',
    image: '/images/districts/kottayam.jpg',
    count: 4,
    rentRange: '₹18k – ₹50k',
    description: 'Sprawling ancestral compounds, rubber plantations, and Kumarakom bird sanctuary.',
  },
  {
    name: 'Idukki',
    malayalam: 'ഇടുക്കി',
    tag: 'Misty High Ranges',
    image: '/images/districts/idukki.jpg',
    count: 4,
    rentRange: '₹25k – ₹85k',
    description: 'Cool mountain air, tea garden bungalows, and dramatic mountain ridge vistas.',
  },
  {
    name: 'Ernakulam',
    malayalam: 'എറണാകുളം',
    tag: 'Commercial & Coastal Hub',
    image: '/images/districts/ernakulam.jpg',
    count: 4,
    rentRange: '₹25k – ₹95k',
    description: 'Fort Kochi colonial verandas, Marine Drive skyline apartments, and metro convenience.',
  },
  {
    name: 'Thrissur',
    malayalam: 'തൃശ്ശൂർ',
    tag: 'Cultural Capital',
    image: '/images/districts/thrissur.jpg',
    count: 4,
    rentRange: '₹18k – ₹52k',
    description: 'Heritage architecture, temple percussion traditions, and spacious suburban villas.',
  },
  {
    name: 'Palakkad',
    malayalam: 'പാലക്കാട്',
    tag: 'Granary & Gap Breezes',
    image: '/images/districts/palakkad.jpg',
    count: 4,
    rentRange: '₹15k – ₹40k',
    description: 'Palakkad gap mountain winds, emerald paddy fields, and traditional agraharam architecture.',
  },
  {
    name: 'Malappuram',
    malayalam: 'മലപ്പുറം',
    tag: 'Hills & Heritage',
    image: '/images/districts/malappuram.jpg',
    count: 4,
    rentRange: '₹16k – ₹42k',
    description: 'Gentle rolling hills, Kadalundi mangrove estuaries, and warm Malabar hospitality.',
  },
  {
    name: 'Kozhikode',
    malayalam: 'കോഴിക്കോട്',
    tag: 'City of Spices & Taste',
    image: '/images/districts/kozhikode.jpg',
    count: 4,
    rentRange: '₹20k – ₹60k',
    description: 'Arabian Sea sunset piers, historic spice alleys, and legendary culinary culture.',
  },
  {
    name: 'Wayanad',
    malayalam: 'വയനാട്',
    tag: 'Cloud Canopies & Peaks',
    image: '/images/districts/wayanad.jpg',
    count: 4,
    rentRange: '₹24k – ₹75k',
    description: 'Rainforest tree villas, coffee & pepper estates, and misty mountain hideaways.',
  },
  {
    name: 'Kannur',
    malayalam: 'കണ്ണൂർ',
    tag: 'Looms, Lores & Beaches',
    image: '/images/districts/kannur.jpg',
    count: 4,
    rentRange: '₹18k – ₹48k',
    description: 'Drive-in beach homes, Theyyam ritual heritage, and quiet coastal retreats.',
  },
  {
    name: 'Kasaragod',
    malayalam: 'കാസർഗോഡ്',
    tag: 'Forts & Rivers',
    image: '/images/districts/kasaragod.jpg',
    count: 4,
    rentRange: '₹16k – ₹45k',
    description: 'Bekal fort ocean ramparts, quiet estuary rivers, and seven-language cultural charm.',
  },
];
