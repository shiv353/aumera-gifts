import {
  BadgeCheck,
  BriefcaseBusiness,
  Camera,
  Gem,
  HeartHandshake,
  Send,
  Sparkles,
} from "lucide-react";

export const brand = {
  name: "THE AUMERA GIFTS",
  shortName: "Aumera",
  tagline: "Curated gifting with a signature finish.",
  colors: {
    darkGreen: "#0A3323",
    mossGreen: "#839958",
    beige: "#F7F4D5",
    rosyBrown: "#D3968C",
    midnightGreen: "#105666"
  }
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "About Us", href: "#about" }
];

export const heroSlides = [
  {
    eyebrow: "Signature gifting",
    heading: "Premium gifts, curated with quiet confidence.",
    description:
      "Thoughtful selections, elegant packaging, and memorable details for clients, celebrations, and corporate milestones.",
    cta: "Explore Products",
    href: "#products",
    image:
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=2200&q=85",
    alt: "Elegant wrapped gifts in premium packaging"
  },
  {
    eyebrow: "Corporate ready",
    heading: "Make every brand gesture feel personal.",
    description:
      "From welcome kits to festive hampers, build gifting moments that feel refined, useful, and unmistakably intentional.",
    cta: "See Collection",
    href: "#products",
    image:
      "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=2200&q=85",
    alt: "Curated products arranged for premium gifting"
  },
  {
    eyebrow: "Elevated presentation",
    heading: "Packaging that feels as special as the gift.",
    description:
      "Layered textures, considered color, and a polished unboxing experience designed to leave a lasting impression.",
    cta: "Learn More",
    href: "#about",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=2200&q=85",
    alt: "Gift box with ribbon and refined wrapping"
  },
  {
    eyebrow: "Made to adapt",
    heading: "A flexible gifting platform for modern teams.",
    description:
      "A premium foundation built to evolve with your brand, product imagery, collections, and seasonal campaigns.",
    cta: "Start Curating",
    href: "#products",
    image:
      "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=2200&q=85",
    alt: "Luxury gift arrangement with soft natural light"
  }
];

export const products = [
  {
    title: "Executive Desk Hamper",
    price: "₹2,499",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    alt: "Premium desk accessories gift set"
  },
  {
    title: "Festive Luxe Box",
    price: "₹3,299",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=80",
    alt: "Festive gift box with wrapped items"
  },
  {
    title: "Wellness Essentials",
    price: "₹1,899",
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80",
    alt: "Wellness gift products with candles and skincare"
  },
  {
    title: "Artisan Treat Crate",
    price: "₹2,799",
    image:
      "https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=900&q=80",
    alt: "Artisan food treats in a gift arrangement"
  },
  {
    title: "New Joiner Kit",
    price: "₹1,599",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
    alt: "Modern workplace kit with notebooks and devices"
  },
  {
    title: "Celebration Keepsake",
    price: "₹2,199",
    image:
      "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=900&q=80",
    alt: "Celebration gift wrapped with premium ribbon"
  },
  {
    title: "Client Appreciation Set",
    price: "₹4,499",
    image:
      "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=900&q=80",
    alt: "Premium client appreciation gift set"
  },
  {
    title: "Minimal Everyday Bundle",
    price: "₹1,299",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80",
    alt: "Minimal gift bundle with neutral packaging"
  }
];

export const about = {
  heading: "Designed for meaningful brand moments.",
  description:
    "THE AUMERA GIFTS creates refined gifting experiences for companies, teams, and celebrations. This placeholder content is intentionally centralized so the final story, logo, photography, and product details can be replaced cleanly.",
  cta: "Explore Our Approach",
  features: [
    {
      title: "Innovation",
      description: "Fresh gifting concepts that adapt to modern brands and seasonal campaigns.",
      icon: Sparkles
    },
    {
      title: "Quality",
      description: "Premium presentation, reliable sourcing, and considered finishing details.",
      icon: BadgeCheck
    },
    {
      title: "Customer Focus",
      description: "Thoughtful service built around recipients, timelines, and brand standards.",
      icon: HeartHandshake
    }
  ]
};

export const footerLinks = navLinks;

export const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com", icon: Camera },
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: BriefcaseBusiness },
  { label: "Twitter", href: "https://www.twitter.com", icon: Send }
];

export const LogoIcon = Gem;
