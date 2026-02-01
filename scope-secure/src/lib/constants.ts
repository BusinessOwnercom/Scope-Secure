import type {
  Testimonial,
  FAQItem,
  ProductFinish,
  ComparisonFeature,
  ScopeOption,
  GuardLengthOption,
  ScopeHeightOption,
  MountDiameterOption,
  Product,
  CaliberOption,
  SubscriptionTier,
  CaseSize,
} from "@/types";

export const PRODUCT_PRICE = 249.99;
export const PRODUCT_NAME = "ScopeSecure";
export const REVIEW_COUNT = 523;
export const REVIEW_RATING = 4.9;

export const NAV_LINKS = [
  { label: "Find Your Fit", href: "#configurator" },
  { label: "Features", href: "#features" },
  { label: "Reviews", href: "#reviews" },
  { label: "Finishes", href: "#finishes" },
  { label: "Ammo Club", href: "/products/bullet-subscription" },
  { label: "Cases", href: "/products/heavy-duty-case" },
  { label: "FAQ", href: "#faq" },
] as const;

export const SCOPE_OPTIONS: ScopeOption[] = [
  { label: "$500", value: 500 },
  { label: "$1,000", value: 1000 },
  { label: "$1,500", value: 1500 },
  { label: "$2,000", value: 2000 },
  { label: "$2,500", value: 2500 },
  { label: "$3,000", value: 3000 },
  { label: "$3,500", value: 3500 },
  { label: "$4,000", value: 4000 },
  { label: "$4,500", value: 4500 },
  { label: "$5,000+", value: 5000 },
];

// ScopeSecure Product Configuration Options
export const GUARD_LENGTH_OPTIONS: GuardLengthOption[] = [
  { value: "9", label: '9"', lengthInches: 9 },
  { value: "11", label: '11"', lengthInches: 11 },
  { value: "13", label: '13"', lengthInches: 13 },
  { value: "14", label: '14"', lengthInches: 14 },
  { value: "15", label: '15"', lengthInches: 15 },
  { value: "17", label: '17"', lengthInches: 17 },
];

export const SCOPE_HEIGHT_OPTIONS: ScopeHeightOption[] = [
  {
    value: "1.5",
    label: '1 1/2"',
    description: "Standard height for most scopes"
  },
  {
    value: "1.75",
    label: '1 3/4"',
    description: "For larger objective lenses"
  },
  {
    value: "2",
    label: '2"',
    description: "For extra-large objectives"
  },
];

export const MOUNT_DIAMETER_OPTIONS: MountDiameterOption[] = [
  { value: "1in", label: '1"' },
  { value: "30mm", label: "30 mm" },
  { value: "34mm", label: "34 mm" },
  { value: "40mm", label: "40 mm" },
];

export const COMPARISON_FEATURES: ComparisonFeature[] = [
  {
    feature: "Lens Protection",
    butlerCreek: true,
    tenebraex: true,
    scopeSecure: true,
  },
  {
    feature: "Impact Absorption",
    butlerCreek: false,
    tenebraex: "Limited",
    scopeSecure: "12-foot drop rated",
  },
  {
    feature: "Zero Retention",
    butlerCreek: false,
    tenebraex: false,
    scopeSecure: "Patented guarantee",
  },
  {
    feature: "Structural Mount",
    butlerCreek: false,
    tenebraex: false,
    scopeSecure: true,
  },
  {
    feature: "Drop Rating",
    butlerCreek: "None",
    tenebraex: "Standard MIL-SPEC",
    scopeSecure: "12 feet",
  },
  {
    feature: "Warranty",
    butlerCreek: "1 Year",
    tenebraex: "Limited",
    scopeSecure: "Lifetime Unconditional",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Mike R.",
    role: "Elk Hunter, Montana",
    category: "hunter",
    quote:
      "My rifle took a nasty fall on a ridge in the Bitterroots. Checked my zero the next morning — dead on. ScopeSecure saved my $8,000 elk hunt.",
    rating: 5,
  },
  {
    id: "2",
    name: "James T.",
    role: "PRS Competitor",
    category: "competition",
    quote:
      "I run a Nightforce ATACR on my competition rig. At $3,200, I'm not taking chances. ScopeSecure is the only product I trust to protect it in transit.",
    rating: 5,
  },
  {
    id: "3",
    name: "Sarah K.",
    role: "Whitetail Hunter, Wisconsin",
    category: "hunter",
    quote:
      "Dropped my rifle climbing into a tree stand. My heart sank. But ScopeSecure held everything in place — still shooting sub-MOA the next day.",
    rating: 5,
  },
  {
    id: "4",
    name: "David L.",
    role: "Law Enforcement Sniper",
    category: "military",
    quote:
      "In our line of work, zero shift isn't an inconvenience — it's a safety issue. We equip every precision rifle with ScopeSecure. Non-negotiable.",
    rating: 5,
  },
  {
    id: "5",
    name: "Chris W.",
    role: "Crossbow Hunter, Ohio",
    category: "hunter",
    quote:
      "People don't realize how fragile crossbow scopes are. One bump and you're shooting feet off target. ScopeSecure gave me peace of mind all season.",
    rating: 5,
  },
  {
    id: "6",
    name: "Robert H.",
    role: "Long Range Shooter",
    category: "competition",
    quote:
      "Protect your $3,000 scope for 8% of its value. That math is a no-brainer. I've recommended ScopeSecure to everyone at my range.",
    rating: 5,
  },
];

export const PRODUCT_FINISHES: ProductFinish[] = [
  {
    id: "bare-zinc",
    name: "Bare Zinc Alloy",
    description:
      "Raw, industrial finish. Showcases the quality of the aerospace-grade zinc alloy construction.",
    colorClass: "bg-zinc-400",
  },
  {
    id: "matte-black",
    name: "Matte Black Oxide",
    description:
      "Stealth-ready black oxide coating. Eliminates glare and blends with any rifle setup.",
    colorClass: "bg-zinc-900",
  },
  {
    id: "camo",
    name: "Camouflage Oxide",
    description:
      "Purpose-built for the field. Multi-terrain pattern for hunters who demand concealment.",
    colorClass: "bg-gradient-to-br from-green-800 via-amber-900 to-green-900",
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How much does ScopeSecure cost?",
    answer:
      "ScopeSecure is priced at $249.99 for all three finishes — Bare Zinc Alloy, Matte Black Oxide, and Camouflage Oxide. This is a one-time investment to protect optics worth $2,000-$5,000+.",
  },
  {
    question: "Will ScopeSecure fit my scope?",
    answer:
      "ScopeSecure is designed to work with most popular rifle and crossbow scope models. We offer multiple size and mount options to ensure compatibility. If you're unsure about your specific setup, contact our team and we'll help you find the right fit.",
  },
  {
    question: "How does ScopeSecure protect my zero?",
    answer:
      "ScopeSecure features a patented precise locator pin and structural mount system that absorbs impact forces while maintaining your scope's position. In drop tests from up to 12 feet, scopes equipped with ScopeSecure maintained zero — something no other scope guard can guarantee.",
  },
  {
    question: "How difficult is installation?",
    answer:
      "ScopeSecure arrives pre-assembled and installs in minutes with no special tools required. It's designed for easy attachment and detachment, so you can install it in the field or at your bench.",
  },
  {
    question: "What is covered under the warranty?",
    answer:
      "ScopeSecure comes with an unconditional lifetime warranty. If your ScopeSecure ever fails for any reason — dropped from a tree stand, run over by an ATV, or anything else — we replace it. No questions asked. No receipt required.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Currently, ScopeSecure ships domestically within the United States. We're working on expanding to international markets. Sign up for our newsletter to be notified when international shipping becomes available.",
  },
  {
    question: "What material is ScopeSecure made from?",
    answer:
      "ScopeSecure is precision-manufactured from automotive and aircraft-grade aluminum alloy, made right here in the USA. The zinc alloy construction provides exceptional strength-to-weight ratio and corrosion resistance.",
  },
  {
    question: "How does ScopeSecure compare to flip-up lens caps?",
    answer:
      "Standard flip-up caps like Butler Creek protect lenses from dust and scratches — but offer zero impact protection and no zero retention. ScopeSecure is a structural mount that absorbs drop forces up to 12 feet while keeping your scope zeroed. It's protection for the entire optic, not just the lens.",
  },
  {
    question: "Can I use ScopeSecure on a crossbow?",
    answer:
      "Yes. ScopeSecure is fully compatible with most crossbow scope setups. Crossbow scopes are particularly vulnerable to impact damage due to the vibration and handling involved, making ScopeSecure an essential addition.",
  },
  {
    question: "What if I'm not satisfied?",
    answer:
      "We offer a hassle-free return policy. If ScopeSecure doesn't meet your expectations, contact us and we'll make it right. Our goal is to protect every serious shooter's investment — and your satisfaction is part of that commitment.",
  },
];

export const WARRANTY_SCENARIOS = [
  {
    icon: "TreePine",
    title: "Dropped from tree stand?",
    description: "Covered.",
  },
  {
    icon: "Truck",
    title: "Run over by ATV?",
    description: "Covered.",
  },
  {
    icon: "Dog",
    title: "Dog chewed it?",
    description: "...Covered.",
  },
];

export const ZERO_SHIFT_DATA = [
  { impact100: '2"', miss300: '6"', miss600: '12"' },
  { impact100: '6"', miss300: '18"', miss600: '36"' },
  { impact100: '12"', miss300: '36"', miss600: "6 feet" },
];

// ─── Product Catalog ───

export const PRODUCTS: Record<string, Product> = {
  "scope-guard": {
    id: "scope-guard",
    name: "ScopeSecure Guard",
    slug: "scope-guard",
    description:
      "Patented scope protection. 12-foot drop rated. Zero retention guaranteed.",
    price: 249.99,
    type: "one-time",
    category: "scope-guard",
  },
  "bullet-subscription": {
    id: "bullet-subscription",
    name: "Ammo Subscription",
    slug: "bullet-subscription",
    description:
      "Premium ammunition delivered to your door on your schedule. Never run low.",
    price: 59.99,
    type: "subscription",
    category: "ammo-subscription",
    interval: "monthly",
  },
  "heavy-duty-case": {
    id: "heavy-duty-case",
    name: "Heavy Duty Rifle Case",
    slug: "heavy-duty-case",
    description:
      "Crushproof, waterproof, dustproof hard case. Pelican-grade protection for transit.",
    price: 349.99,
    type: "one-time",
    category: "case",
  },
};

export const CONTACT_EMAIL = "support@scopesecure.com";
export const CONTACT_URL = "mailto:support@scopesecure.com";

// ─── Ammo Subscription Data ───

export const CALIBER_OPTIONS: CaliberOption[] = [
  {
    id: "223-556",
    name: ".223 Remington / 5.56 NATO",
    shortName: ".223/5.56",
    description: "Most popular AR-15 caliber. Great for range and varmint.",
  },
  {
    id: "308-762",
    name: ".308 Winchester / 7.62 NATO",
    shortName: ".308/7.62",
    description: "Versatile hunting and precision caliber.",
  },
  {
    id: "65-creedmoor",
    name: "6.5 Creedmoor",
    shortName: "6.5 CM",
    description: "Top choice for long-range precision shooting.",
  },
  {
    id: "300-winmag",
    name: ".300 Winchester Magnum",
    shortName: ".300 WM",
    description: "Heavy hitter for elk, moose, and long range.",
  },
  {
    id: "9mm",
    name: "9mm Luger",
    shortName: "9mm",
    description: "World's most popular pistol caliber. Train more, spend less.",
  },
  {
    id: "45-acp",
    name: ".45 ACP",
    shortName: ".45 ACP",
    description: "Classic stopping power. Ideal for range and defense.",
  },
];

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: "starter",
    name: "Range Ready",
    roundsPerShipment: 100,
    monthlyPrice: 59.99,
    quarterlyPrice: 159.99,
    perRoundPrice: "$0.60",
  },
  {
    id: "standard",
    name: "Serious Shooter",
    roundsPerShipment: 250,
    monthlyPrice: 129.99,
    quarterlyPrice: 349.99,
    perRoundPrice: "$0.52",
    savings: "Save 13%",
    popular: true,
  },
  {
    id: "pro",
    name: "Competition Ready",
    roundsPerShipment: 500,
    monthlyPrice: 229.99,
    quarterlyPrice: 619.99,
    perRoundPrice: "$0.46",
    savings: "Save 23%",
  },
];

export const BULLET_SUBSCRIPTION_FAQ: FAQItem[] = [
  {
    question: "How does the ammo subscription work?",
    answer:
      "Choose your caliber, quantity tier, and delivery frequency (monthly or quarterly). We ship premium ammunition directly to your door on your schedule. Modify, pause, or cancel anytime.",
  },
  {
    question: "What brands of ammunition do you ship?",
    answer:
      "We source from top-tier manufacturers including Federal, Hornady, Sig Sauer, and Winchester. Every shipment contains factory-new, brass-cased ammunition.",
  },
  {
    question: "Can I change my caliber or quantity?",
    answer:
      "Yes. Log in to your account to change caliber, adjust quantity, switch frequency, or pause your subscription at any time. Changes take effect on your next shipment.",
  },
  {
    question: "Do you ship to all 50 states?",
    answer:
      "We ship to all states where ammunition delivery is legal. Some states have specific requirements — we handle all compliance for you.",
  },
  {
    question: "Is there a commitment or contract?",
    answer:
      "No contracts, no commitments. Cancel anytime with one click. We believe you'll stay because of the value, not because you're locked in.",
  },
  {
    question: "How much can I save vs. retail?",
    answer:
      "Subscribers save 13-23% compared to retail pricing depending on tier. Plus, shipping is always free. The more you shoot, the more you save.",
  },
];

// ─── Heavy Duty Case Data ───

export const CASE_SIZES: CaseSize[] = [
  {
    id: "compact",
    name: "Compact",
    description: "For rifles up to 36 inches. Ideal for breakdown and bullpup configurations.",
    interiorDimensions: '36" x 13" x 5"',
    exteriorDimensions: '38.5" x 15" x 6.5"',
    weight: "11 lbs",
    price: 299.99,
  },
  {
    id: "single-rifle",
    name: "Single Rifle",
    description: "Fits most standard rifles up to 48 inches with optics mounted.",
    interiorDimensions: '48" x 13" x 6"',
    exteriorDimensions: '50.5" x 15" x 7.5"',
    weight: "15 lbs",
    price: 349.99,
  },
  {
    id: "double-rifle",
    name: "Double Rifle",
    description: "Room for two rifles with optics, plus accessory compartment.",
    interiorDimensions: '52" x 15" x 8"',
    exteriorDimensions: '54.5" x 17" x 9.5"',
    weight: "21 lbs",
    price: 449.99,
  },
];

export const CASE_SPECS = {
  material: "High-impact polymer with stainless steel hardware",
  waterproof: "IP67 rated — submersible to 1 meter for 30 minutes",
  temperatureRange: "-40°F to 210°F",
  foam: "Pick-and-pluck customizable foam with egg-crate lid foam",
  locks: "Dual padlock hasps + integrated TSA-approved locks",
  pressureValve: "Automatic pressure equalization valve for air travel",
  warranty: "Lifetime replacement warranty",
  madeIn: "Engineered in USA",
};

export const HEAVY_DUTY_CASE_FAQ: FAQItem[] = [
  {
    question: "Is this case TSA-approved for air travel?",
    answer:
      "Yes. The Heavy Duty Case features integrated TSA-approved locks and meets all airline requirements for checked firearm cases. The pressure equalization valve ensures safe altitude transitions.",
  },
  {
    question: "How customizable is the foam interior?",
    answer:
      "The case includes pick-and-pluck foam that you tear along pre-scored lines to create a custom fit for your specific rifle and optics. The lid features egg-crate foam for a secure, snug closure.",
  },
  {
    question: "How waterproof is it?",
    answer:
      "IP67 rated — fully submersible to 1 meter for 30 minutes. An O-ring gasket and automatic pressure equalization valve keep water, dust, and debris out in any conditions.",
  },
  {
    question: "Does it come with a warranty?",
    answer:
      "Yes. The Heavy Duty Case is backed by our lifetime replacement warranty. If the case ever fails structurally, we replace it — no questions asked.",
  },
  {
    question: "Can I lock it?",
    answer:
      "Absolutely. The case features dual padlock hasps for your own locks, plus integrated TSA-approved combination locks for air travel convenience.",
  },
  {
    question: "What size case do I need?",
    answer:
      "Measure your rifle with optics mounted. The Compact fits rifles up to 36 inches, Single Rifle up to 48 inches, and Double Rifle up to 52 inches. When in doubt, go one size up.",
  },
];
