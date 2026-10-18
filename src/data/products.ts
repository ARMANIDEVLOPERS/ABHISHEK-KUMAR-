import { Product, Coupon } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'atl-01',
    name: 'Kanso Stoneware Sculptural Vessel',
    subtitle: 'Hand-thrown textured ceramic vase with asymmetric ear handle',
    category: 'ceramics',
    categoryLabel: 'Ceramics & Vessels',
    price: 145,
    originalPrice: 170,
    rating: 4.9,
    reviewCount: 38,
    inStock: true,
    inventoryCount: 12,
    isBestSeller: true,
    origin: 'Kyoto, Japan',
    material: 'Coarse Chamotte Stoneware',
    dimensions: '28cm H × 18cm W × 14cm D',
    description: 'A tactile, hand-formed stoneware vessel inspired by classical Japanese kintsugi silhouettes. Finished in an untreated matte sand glaze that catches natural ambient daylight.',
    story: 'Thrown by master potters using iron-rich wild clay sourced from ancient lakebeds. Each vessel undergoes a 36-hour reduction firing in a wood-burning kiln, lending subtle organic variations to every individual piece.',
    features: [
      'Watertight interior with raw textured exterior',
      'Balanced counter-weighted base for stem stability',
      'Signature artist chop stamp at foot'
    ],
    image: '/src/assets/images/product_ceramic_vase_1792336427157.jpg',
    colors: [
      { name: 'Sand Limestone', hex: '#E6DFD5' },
      { name: 'Volcanic Ash', hex: '#3B3A36' },
      { name: 'Warm Ochre', hex: '#C29869' }
    ],
    reviews: [
      {
        id: 'rev-01',
        author: 'Elena Rostova',
        rating: 5,
        date: 'October 12, 2026',
        comment: 'The tactile texture is stunning in real life. It holds single dried silver dollar branches effortlessly on our credenza.',
        verified: true
      },
      {
        id: 'rev-02',
        author: 'Marcus Vance',
        rating: 5,
        date: 'September 28, 2026',
        comment: 'Exquisite craftsmanship. The subtle matte glaze has a gentle warmth that photographs cannot fully capture.',
        verified: true
      }
    ]
  },
  {
    id: 'atl-02',
    name: 'Dome Brushed Brass Task Lamp',
    subtitle: 'Spun solid brass dome luminaire with dimmable ambient glow',
    category: 'lighting',
    categoryLabel: 'Lighting & Lamps',
    price: 320,
    rating: 4.8,
    reviewCount: 24,
    inStock: true,
    inventoryCount: 8,
    isBestSeller: true,
    origin: 'Milan, Italy',
    material: 'Spun Solid Brass & Opal Glass',
    dimensions: '38cm H × 30cm Diameter',
    description: 'A sculptural table lamp characterized by its gently flared spun brass dome and fluted slender stem. Disperses a soft 2700K downward light through an opal etched diffuser.',
    story: 'Manufactured in a third-generation metalworking atelier in Lombardy. Each dome is hand-turned on a lathe before receiving a fine directional brushing and a micro-thin protective wax coat to age gracefully.',
    features: [
      'Touch-sensitive stepped dimmer switch integrated into base',
      'Warm 2700K high-CRI LED engine included (50,000 hour lifespan)',
      'Fabric-braided 2.2m power cord with brass inline detailing'
    ],
    image: '/src/assets/images/product_brass_lamp_1792336426782.jpg',
    colors: [
      { name: 'Brushed Brass', hex: '#CFAD63' },
      { name: 'Burnished Bronze', hex: '#4E4237' },
      { name: 'Satin Nickel', hex: '#A8A6A1' }
    ],
    reviews: [
      {
        id: 'rev-03',
        author: 'Clara Lindqvist',
        rating: 5,
        date: 'October 2, 2026',
        comment: 'Creates the most inviting warmth on my reading desk. The brass patina is developing beautifully.',
        verified: true
      }
    ]
  },
  {
    id: 'atl-03',
    name: 'Aura Acoustic Oak Soundbox',
    subtitle: 'High-fidelity wireless studio speaker with acoustic woolen grille',
    category: 'audio',
    categoryLabel: 'Audio & Workspace',
    price: 490,
    originalPrice: 540,
    rating: 4.9,
    reviewCount: 42,
    inStock: true,
    inventoryCount: 15,
    isNewArrival: true,
    origin: 'Aarhus, Denmark',
    material: 'Solid White Oak & Kvadrat Wool Textile',
    dimensions: '22cm H × 36cm W × 16cm D',
    description: 'An acoustic masterpiece combining furniture-grade solid white oak with dual neodymium drivers and custom DSP calibration for transparent, room-filling sound.',
    story: 'Engineered in partnership with Danish acoustic researchers. The cabinet features hand-joined finger joints and internal bracing to eliminate unwanted standing waves, wrapped in acoustically transparent wool.',
    features: [
      'Dual 3" mid-bass woofers + 1" silk dome tweeter (90W RMS)',
      'Bluetooth 5.3 aptX HD, AirPlay 2, & lossless AUX input',
      'Top-surface capacitive touch controls inlaid in solid wood'
    ],
    image: '/src/assets/images/product_wireless_speaker_1792336427317.jpg',
    colors: [
      { name: 'Natural Oak', hex: '#C7A275' },
      { name: 'Smoked Walnut', hex: '#4A3728' },
      { name: 'Nordic Ash', hex: '#E2D9CC' }
    ],
    reviews: [
      {
        id: 'rev-04',
        author: 'Henrik S.',
        rating: 5,
        date: 'October 14, 2026',
        comment: 'Incredible vocal separation and low-end definition. It looks like an architectural object rather than tech clutter.',
        verified: true
      }
    ]
  },
  {
    id: 'atl-04',
    name: 'Waffle Linen Heirloom Throw',
    subtitle: 'Pre-washed French flax linen throw with deep honeycomb weave',
    category: 'textiles',
    categoryLabel: 'Textiles & Living',
    price: 180,
    rating: 4.7,
    reviewCount: 31,
    inStock: true,
    inventoryCount: 19,
    origin: 'Normandy, France',
    material: '100% Normandy Certified Flax',
    dimensions: '140cm × 200cm',
    description: 'An oversized waffle throw blanket woven from long-staple European flax. Garment-washed with pumice stones for immediate softness and a relaxed, lived-in drape.',
    story: 'Flax cultivated in Normandy requires zero artificial irrigation and minimal processing. Woven on heritage shuttle looms that preserve the breathability and natural temperature-regulating qualities of the fiber.',
    features: [
      'Naturally hypoallergenic and thermoregulating year-round',
      'Generous 380 GSM heavyweight waffle structure',
      'Pre-shrunk and OEKO-TEX Standard 100 certified'
    ],
    image: '/src/assets/images/product_linen_throw_1792336427650.jpg',
    colors: [
      { name: 'Natural Flax', hex: '#D7CCBC' },
      { name: 'Muted Moss', hex: '#687259' },
      { name: 'Terracotta', hex: '#A85D45' }
    ],
    reviews: [
      {
        id: 'rev-05',
        author: 'Sarah Jenkins',
        rating: 5,
        date: 'October 8, 2026',
        comment: 'Substantial weight without feeling heavy or stifling. We use it across our bed and sofa constantly.',
        verified: true
      }
    ]
  },
  {
    id: 'atl-05',
    name: 'Travertine Low Display Plinth',
    subtitle: 'Monolithic Roman travertine table with bevelled shadow line',
    category: 'ceramics',
    categoryLabel: 'Ceramics & Vessels',
    price: 580,
    rating: 4.9,
    reviewCount: 19,
    inStock: true,
    inventoryCount: 5,
    origin: 'Tivoli, Italy',
    material: 'Unfilled Honed Roman Travertine',
    dimensions: '42cm W × 42cm L × 35cm H',
    description: 'A solid sculptural pedestal carved from Italian Roman travertine stone. Left unfilled to honor the natural porous cavities and ancient sedimentary veining.',
    story: 'Quarried from the same historic Tivoli limestone beds used in classical Roman architecture. Sawn and honed dry by skilled stonemasons to accentuate the buttery beige textures.',
    features: [
      'Solid natural stone with unsealed tactile cavities',
      'Recessed floating wood base protects hardwood flooring',
      'Weight: 26kg with extreme structural stability'
    ],
    image: '/src/assets/images/hero_atelier_living_1792336426964.jpg',
    colors: [
      { name: 'Honed Travertine', hex: '#D8CEBE' },
      { name: 'Pietra Serena Grey', hex: '#878680' }
    ],
    reviews: [
      {
        id: 'rev-06',
        author: 'Julian Thorne',
        rating: 5,
        date: 'September 15, 2026',
        comment: 'Substantial, timeless, and anchoring. An heirloom piece that will outlive us all.',
        verified: true
      }
    ]
  },
  {
    id: 'atl-06',
    name: 'Cast Iron Pour-Over Coffee Station',
    subtitle: 'Architectural dripper stand with solid walnut base & borosilicate glass',
    category: 'workspace',
    categoryLabel: 'Workspace & Objects',
    price: 110,
    originalPrice: 130,
    rating: 4.8,
    reviewCount: 53,
    inStock: true,
    inventoryCount: 22,
    isBestSeller: true,
    origin: 'Morioka, Japan',
    material: 'Nanbu Tekki Cast Iron & Walnut',
    dimensions: '24cm H × 16cm W × 14cm D',
    description: 'A morning ritual anchor constructed from authentic Japanese Nanbu cast iron with an oiled walnut dripper ring and calibrated glass carafe.',
    story: 'Crafted utilizing an 800-year-old iron casting tradition in Iwate prefecture. The heavy cast iron column provides unflinching stability while adding thermal inertia to your pour.',
    features: [
      'Adjustable height ring fits mugs and multi-cup carafes',
      'Food-grade heat-resistant borosilicate glass server (600ml)',
      'Waterproof food-safe wax seal on walnut components'
    ],
    image: '/src/assets/images/product_ceramic_vase_1792336427157.jpg',
    colors: [
      { name: 'Matte Cast Charcoal', hex: '#2A2928' },
      { name: 'Cast Verdigris', hex: '#4B5550' }
    ],
    reviews: [
      {
        id: 'rev-07',
        author: 'David Zhao',
        rating: 5,
        date: 'October 11, 2026',
        comment: 'Transforms coffee making into a slow contemplative art. Build quality is flawless.',
        verified: true
      }
    ]
  }
];

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'WELCOME10',
    discountPercent: 10,
    minSpend: 50,
    description: '10% off your inaugural order'
  },
  {
    code: 'ATELIER20',
    discountPercent: 20,
    minSpend: 250,
    description: '20% off collector orders above $250'
  },
  {
    code: 'FREESHIP',
    discountPercent: 0,
    minSpend: 0,
    description: 'Complimentary white-glove carbon-neutral shipping'
  }
];
