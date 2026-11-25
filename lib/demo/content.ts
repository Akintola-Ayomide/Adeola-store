import type {
  Category,
  Collection,
  Product,
  SiteSettings,
} from "../types";
import { demoImages } from "./images";

/**
 * DEMO CATALOGUE
 * --------------
 * This content exists so the storefront can be reviewed end to end without a
 * Sanity project. It is deliberately sample content: product names, prices and
 * contact details are placeholders, not a real inventory. Connect Sanity (see
 * docs/SANITY-SETUP.md) and publish real products to replace it.
 */

export const demoCategories: Category[] = [
  {
    id: "cat-aso-ebi",
    name: "Aso-Ebi",
    slug: "aso-ebi",
    description:
      "Coordinated looks for the family and friends who dress together for a celebration.",
    image: demoImages.asoEbiGroup,
    order: 1,
  },
  {
    id: "cat-lace",
    name: "Lace",
    slug: "lace",
    description:
      "Corded, beaded and French lace gowns for weddings, receptions and evening parties.",
    image: demoImages.beadedPortrait,
    order: 2,
  },
  {
    id: "cat-ankara",
    name: "Ankara",
    slug: "ankara",
    description:
      "Wax-print silhouettes cut for now — fitted midis, relaxed sets and statement gowns.",
    image: demoImages.greenAnkara,
    order: 3,
  },
  {
    id: "cat-aso-oke",
    name: "Aso-Oke",
    slug: "aso-oke",
    description:
      "Handwoven Yoruba cloth, finished with beadwork and made for the most important occasions.",
    image: demoImages.asoOkeHeritage,
    order: 4,
  },
  {
    id: "cat-iro-buba",
    name: "Iro & Buba",
    slug: "iro-buba",
    description:
      "The classic two-piece, reworked in silk, crepe and hand-dyed cloth for a modern fit.",
    image: demoImages.rustIroBuba,
    order: 5,
  },
  {
    id: "cat-bridal",
    name: "Bridal",
    slug: "bridal",
    description:
      "Bridal and reception pieces for the bride who wants tradition in the detail.",
    image: demoImages.bridalGown,
    order: 6,
  },
];

export const demoCollections: Collection[] = [
  {
    id: "col-aso-ebi",
    name: "The Aso-Ebi Edit",
    slug: "aso-ebi-edit",
    description:
      "Dressing a wedding party is its own kind of choreography. Our aso-ebi edit brings the family into one palette without making everyone look the same — coordinated lace, considered beadwork and silhouettes that suit each wearer.",
    coverImage: demoImages.asoEbiGroup,
    featured: true,
    order: 1,
  },
  {
    id: "col-lace",
    name: "Lace & Ceremony",
    slug: "lace-ceremony",
    description:
      "Occasion dressing in corded lace, sequins and metallic thread. These are the pieces for the front row of the church, the reception entrance and the photographs that stay on the wall.",
    coverImage: demoImages.beadedPortrait,
    featured: true,
    order: 2,
  },
  {
    id: "col-aso-oke",
    name: "Aso-Oke Heritage",
    slug: "aso-oke-heritage",
    description:
      "Handwoven cloth from Yorubaland, treated with the patience it deserves. Each piece is finished with hand-beading and cut to be worn for a lifetime of celebrations.",
    coverImage: demoImages.asoOkeHeritage,
    featured: true,
    order: 3,
  },
  {
    id: "col-ankara",
    name: "Ankara, Reimagined",
    slug: "ankara-reimagined",
    description:
      "Wax print, cut with a lighter hand. Clean necklines, modern volume and pieces that move easily from a Lagos lunch to a family celebration.",
    coverImage: demoImages.greenAnkara,
    featured: true,
    order: 4,
  },
  {
    id: "col-iro-buba",
    name: "The Iro & Buba Capsule",
    slug: "iro-buba-capsule",
    description:
      "The two-piece we grew up watching our mothers tie, made easier to wear. Fluid wrappers, softly structured bubas and proportions that feel current.",
    coverImage: demoImages.rustOccasion,
    featured: false,
    order: 5,
  },
  {
    id: "col-bridal",
    name: "Bridal & Reception",
    slug: "bridal-reception",
    description:
      "For the bride, the second look and the mothers of the occasion. Beaded lace, soft ivory and quiet drama, made to your measurements.",
    coverImage: demoImages.bridalReception,
    featured: true,
    order: 6,
  },
];

const [asoEbi, lace, ankara, asoOke, iroBuba, bridal] = demoCategories;
const [colAsoEbi, colLace, colAsoOke, colAnkara, colIroBuba, colBridal] =
  demoCollections;

function summariseCategory(category: Category) {
  return { id: category.id, name: category.name, slug: category.slug };
}

function summariseCollection(collection: Collection) {
  return { id: collection.id, name: collection.name, slug: collection.slug };
}

const inStock = "in_stock" as const;
const lowStock = "low_stock" as const;
const madeToOrder = "made_to_order" as const;
const outOfStock = "out_of_stock" as const;

export const demoProducts: Product[] = [
  {
    id: "product-adesua",
    name: "Adesua Emerald Lace Gown",
    slug: "adesua-emerald-lace-gown",
    image: demoImages.emeraldGown,
    gallery: [demoImages.emeraldGown, demoImages.emeraldDetail],
    shortDescription:
      "A floor-length emerald lace gown with sheer sleeves, a fitted bodice and a confident side slit.",
    description:
      "Cut from deep emerald French lace, Adesua is the kind of gown that carries a room without asking for attention. The bodice is fully lined and lightly boned, with a sheer yoke and bell sleeve that keep the silhouette soft. A high side slit gives movement and a little drama in photographs.\n\nWear it to a wedding reception, an owambe or an evening celebration. Style with gold jewellery and a simple heel — the lace does the rest.\n\nMade in Lagos. This is a sample product in the demo catalogue.",
    price: 285000,
    category: summariseCategory(lace),
    collections: [summariseCollection(colAsoEbi), summariseCollection(colLace)],
    sizes: ["UK 8", "UK 10", "UK 12", "UK 14", "UK 16"],
    colours: [
      { name: "Emerald", hex: "#0f5132" },
      { name: "Ivory", hex: "#efe6d5" },
    ],
    fabric: "French corded lace, satin lining",
    availability: inStock,
    featured: true,
    newArrival: true,
    sortOrder: 1,
    reference: "ARK-LC-014",
  },
  {
    id: "product-tiwa",
    name: "Tiwa Beaded Aso-Oke Gown",
    slug: "tiwa-beaded-aso-oke-gown",
    image: demoImages.asoOkeGown,
    gallery: [demoImages.asoOkeGown, demoImages.goldDetail],
    shortDescription:
      "A hand-beaded mermaid gown in champagne aso-oke, finished with a sculptural gele.",
    description:
      "Tiwa is built around the quiet weight of handwoven aso-oke. The mermaid line is fitted through the waist and hip, then falls into a soft fishtail, with hand-beaded panels catching the light as you move.\n\nBecause each piece is cut and beaded to order, the neckline, sleeve and train can be adjusted. A matching gele is available on request.\n\nMade in Lagos to your measurements.",
    price: 420000,
    category: summariseCategory(asoOke),
    collections: [
      summariseCollection(colAsoOke),
      summariseCollection(colBridal),
    ],
    sizes: ["Made to measure"],
    colours: [
      { name: "Champagne", hex: "#d9c3a0" },
      { name: "Antique gold", hex: "#b08d57" },
    ],
    fabric: "Handwoven aso-oke, glass beadwork",
    availability: madeToOrder,
    featured: true,
    newArrival: false,
    sortOrder: 2,
    reference: "ARK-AO-002",
  },
  {
    id: "product-morayo",
    name: "Morayo Champagne Sequin Gown",
    slug: "morayo-champagne-sequin-gown",
    image: demoImages.champagneGown,
    gallery: [demoImages.champagneGown, demoImages.goldDetail],
    shortDescription:
      "A softly sequinned mermaid gown in warm champagne, with a matching headwrap.",
    description:
      "Morayo catches the light in the best way: a fine sequin ground, a clean strapless line and a fishtail hem that moves beautifully. The internal corsetry gives structure without stiffness, and the matching headwrap completes the look.\n\nA natural choice for a reception, a milestone birthday or a wedding-guest look with presence.\n\nMade in Lagos. Sample product for demonstration.",
    price: 365000,
    category: summariseCategory(lace),
    collections: [summariseCollection(colLace)],
    sizes: ["UK 8", "UK 10", "UK 12", "UK 14"],
    colours: [{ name: "Champagne", hex: "#d9c3a0" }],
    fabric: "Sequinned tulle, satin lining",
    availability: lowStock,
    featured: false,
    newArrival: false,
    sortOrder: 3,
    reference: "ARK-LC-021",
  },
  {
    id: "product-ireti",
    name: "Ireti Royal Blue Lace Gown",
    slug: "ireti-royal-blue-lace-gown",
    image: demoImages.royalBlueGown,
    gallery: [demoImages.royalBlueGown, demoImages.blueDetail],
    shortDescription:
      "A full-skirted royal blue lace gown with a fitted bodice and soft movement.",
    description:
      "Ireti is occasion dressing at its most straightforward: a rich royal blue, a fitted lace bodice and a full skirt that moves when you walk. The lace is layered over a tonal lining so the pattern reads clearly in daylight and in photographs.\n\nPair with pearl or silver jewellery and let the colour lead. Available in a selection of standard sizes, with made-to-measure on request.\n\nMade in Lagos. Sample product for demonstration.",
    price: 245000,
    category: summariseCategory(lace),
    collections: [summariseCollection(colLace), summariseCollection(colAsoEbi)],
    sizes: ["UK 10", "UK 12", "UK 14", "UK 16"],
    colours: [
      { name: "Royal blue", hex: "#1e3a8a" },
      { name: "Emerald", hex: "#0f5132" },
    ],
    fabric: "Corded lace, tulle underskirt",
    availability: inStock,
    featured: true,
    newArrival: true,
    sortOrder: 4,
    reference: "ARK-LC-008",
  },
  {
    id: "product-kemi",
    name: "Kemi Rust Iro & Buba",
    slug: "kemi-rust-iro-buba",
    image: demoImages.rustIroBuba,
    gallery: [demoImages.rustIroBuba, demoImages.rustFabric],
    shortDescription:
      "A fluid rust iro and buba with a softly structured buba and matching gele.",
    description:
      "Kemi takes the classic iro and buba and gives it an easier line. The buba is softly structured through the shoulder, the wrapper is cut to tie cleanly and the matching gele holds its shape without fuss.\n\nWear it to a family celebration, a traditional engagement or an owambe where you want to look composed from arrival to departure.\n\nMade in Lagos. Sample product for demonstration.",
    price: 165000,
    category: summariseCategory(iroBuba),
    collections: [summariseCollection(colIroBuba)],
    sizes: ["One size"],
    colours: [
      { name: "Rust", hex: "#a54b2a" },
      { name: "Bronze", hex: "#8b6b4a" },
    ],
    fabric: "Silk-blend crepe",
    availability: inStock,
    featured: false,
    newArrival: false,
    sortOrder: 5,
    reference: "ARK-IB-004",
  },
  {
    id: "product-beulah",
    name: "Beulah Burgundy Cape Gown",
    slug: "beulah-burgundy-cape-gown",
    image: demoImages.burgundyGown,
    gallery: [demoImages.burgundyGown, demoImages.goldDetail],
    shortDescription:
      "A burgundy beaded lace gown with a dramatic floor-length cape.",
    description:
      "Beulah is built for an entrance. Burgundy lace is hand-beaded in gold, then cut into a fitted column with a sweeping cape that moves behind you. The cape is detachable, so the gown can be worn close to the body for the after-party.\n\nThis is an aso-ebi piece that can be made to a shared palette for a wedding party, with individual measurements for each wearer.\n\nMade to order in Lagos.",
    price: 310000,
    category: summariseCategory(asoEbi),
    collections: [summariseCollection(colAsoEbi), summariseCollection(colLace)],
    sizes: ["UK 8", "UK 10", "UK 12", "UK 14", "UK 16", "UK 18"],
    colours: [
      { name: "Burgundy", hex: "#5e1b2a" },
      { name: "Wine", hex: "#5b1f33" },
    ],
    fabric: "Beaded lace, soft tulle cape",
    availability: madeToOrder,
    featured: true,
    newArrival: false,
    sortOrder: 6,
    reference: "ARK-AE-011",
  },
  {
    id: "product-sade",
    name: "Sade Green Ankara Midi",
    slug: "sade-green-ankara-midi",
    image: demoImages.greenAnkara,
    gallery: [demoImages.greenAnkara],
    shortDescription:
      "A cleanly cut green ankara midi with a defined waist and an easy, walkable skirt.",
    description:
      "Sade is the ankara dress for the woman who wants print without volume. A high neckline, a defined waist and a midi hem keep the shape modern, while the green wax print does the talking.\n\nWear it to a lunch, a gallery opening or a family gathering. It works with flats as easily as heels.\n\nMade in Lagos. Sample product for demonstration.",
    price: 95000,
    category: summariseCategory(ankara),
    collections: [summariseCollection(colAnkara)],
    sizes: ["S", "M", "L", "XL"],
    colours: [{ name: "Green print", hex: "#2f5d3a" }],
    fabric: "Wax-print cotton",
    availability: inStock,
    featured: false,
    newArrival: true,
    sortOrder: 7,
    reference: "ARK-AN-006",
  },
  {
    id: "product-nneka",
    name: "Nneka Indigo Ankara Set",
    slug: "nneka-indigo-ankara-set",
    image: demoImages.indigoAnkara,
    gallery: [demoImages.indigoAnkara],
    shortDescription:
      "A two-piece indigo ankara set with a sculpted top and wide-leg trousers.",
    description:
      "Nneka pairs a sculpted, fitted top with wide-leg trousers in the same indigo wax print. The proportions are deliberate: a close shoulder, a defined waist and a generous leg that moves.\n\nA modern alternative to a dress for a wedding guest, a birthday dinner or a day that runs from studio to celebration.\n\nMade in Lagos. Sample product for demonstration.",
    price: 120000,
    category: summariseCategory(ankara),
    collections: [summariseCollection(colAnkara)],
    sizes: ["S", "M", "L", "XL"],
    colours: [{ name: "Indigo print", hex: "#2c3e63" }],
    fabric: "Wax-print cotton",
    availability: lowStock,
    featured: false,
    newArrival: true,
    sortOrder: 8,
    reference: "ARK-AN-013",
  },
  {
    id: "product-damilola",
    name: "Damilola Bridal Lace Gown",
    slug: "damilola-bridal-lace-gown",
    image: demoImages.bridalGown,
    gallery: [demoImages.bridalGown, demoImages.goldDetail],
    shortDescription:
      "An off-shoulder ivory lace gown with delicate beading and a soft fishtail.",
    description:
      "Damilola is a quiet bridal silhouette: off-shoulder lace, a softly fitted bodice and a fishtail that pools gently at the hem. The beading is kept tonal so the lace pattern stays the focus.\n\nEach gown is made to measure, with a fitting arranged in the Lagos studio or by video for diaspora brides. Neckline and train can be adjusted.\n\nMade to order in Lagos.",
    price: 580000,
    category: summariseCategory(bridal),
    collections: [summariseCollection(colBridal)],
    sizes: ["Made to measure"],
    colours: [{ name: "Ivory", hex: "#efe6d5" }],
    fabric: "Beaded French lace, silk lining",
    availability: madeToOrder,
    featured: true,
    newArrival: false,
    sortOrder: 9,
    reference: "ARK-BR-001",
  },
  {
    id: "product-folasade",
    name: "Folasade Aso-Oke Two-Piece",
    slug: "folasade-aso-oke-two-piece",
    image: demoImages.asoOkeSet,
    gallery: [demoImages.asoOkeSet, demoImages.goldDetail],
    shortDescription:
      "A champagne aso-oke two-piece with a sculptural gele and hand-finished edges.",
    description:
      "Folasade is the softer side of aso-oke: a fitted top and a fluid wrapper in a champagne weave, finished with hand-rolled edges and a sculptural gele. The cloth is selected in the studio so the pattern sits properly across the body.\n\nA considered choice for a mother of the bride, a traditional engagement or a milestone celebration.\n\nMade in Lagos. Sample product for demonstration.",
    price: 185000,
    category: summariseCategory(asoOke),
    collections: [summariseCollection(colAsoOke)],
    sizes: ["Made to measure"],
    colours: [
      { name: "Champagne", hex: "#d9c3a0" },
      { name: "Ivory", hex: "#efe6d5" },
    ],
    fabric: "Handwoven aso-oke",
    availability: inStock,
    featured: false,
    newArrival: false,
    sortOrder: 10,
    reference: "ARK-AO-009",
  },
  {
    id: "product-amara",
    name: "Amara Wine Tulle Gown",
    slug: "amara-wine-tulle-gown",
    image: demoImages.wineGown,
    gallery: [demoImages.wineGown],
    shortDescription:
      "A wine-coloured tulle gown with a fitted bodice and a dramatic, gathered skirt.",
    description:
      "Amara is a deep wine tulle gown with a fitted bodice, a gathered skirt and a matching turban. The volume is concentrated below the hip so the line stays long and elegant.\n\nThis sample piece is currently sold out. Join the waitlist and the studio will let you know when it can be made again.\n\nSample product for demonstration.",
    price: 295000,
    category: summariseCategory(asoEbi),
    collections: [summariseCollection(colAsoEbi)],
    sizes: ["UK 8", "UK 10", "UK 12", "UK 14", "UK 16"],
    colours: [{ name: "Wine", hex: "#5b1f33" }],
    fabric: "Layered tulle, satin bodice",
    availability: outOfStock,
    featured: false,
    newArrival: false,
    sortOrder: 11,
    reference: "ARK-AE-017",
  },
  {
    id: "product-zainab",
    name: "Zainab Ankara Print Gown",
    slug: "zainab-ankara-print-gown",
    image: demoImages.ankaraPrintGown,
    gallery: [demoImages.ankaraPrintGown],
    shortDescription:
      "A relaxed ankara maxi with a matching jacket and a softly gathered waist.",
    description:
      "Zainab is an easy, generous ankara maxi with a matching jacket. The waist is gathered rather than structured, so it works over a long day and still looks considered in the evening.\n\nWear it as a set or separately. The print is selected in small quantities, so each piece has its own placement.\n\nMade in Lagos. Sample product for demonstration.",
    price: 110000,
    category: summariseCategory(ankara),
    collections: [summariseCollection(colAnkara)],
    sizes: ["S", "M", "L", "XL"],
    colours: [{ name: "Multi print", hex: "#7a4b5e" }],
    fabric: "Wax-print cotton",
    availability: inStock,
    featured: false,
    newArrival: false,
    sortOrder: 12,
    reference: "ARK-AN-019",
  },
  {
    id: "product-mide",
    name: "Mide Black & Gold Gown",
    slug: "mide-black-gold-gown",
    image: demoImages.blackGoldGown,
    gallery: [demoImages.blackGoldGown, demoImages.goldDetail],
    shortDescription:
      "A black statement gown with gold metallic lace and a sculptural shoulder.",
    description:
      "Mide is for the evening that calls for drama: black crepe, gold metallic lace and a shoulder line that holds its own in a photograph. The skirt is cut long and clean, with a small train.\n\nMade to order with adjustments to the shoulder, sleeve and hem. Styling advice is available on WhatsApp before you commit.\n\nMade in Lagos.",
    price: 340000,
    category: summariseCategory(lace),
    collections: [summariseCollection(colLace)],
    sizes: ["UK 8", "UK 10", "UK 12", "UK 14"],
    colours: [
      { name: "Black", hex: "#16130f" },
      { name: "Gold", hex: "#b08d57" },
    ],
    fabric: "Metallic lace, crepe",
    availability: madeToOrder,
    featured: false,
    newArrival: false,
    sortOrder: 13,
    reference: "ARK-LC-024",
  },
  {
    id: "product-tolu",
    name: "Tolu Pink Lace Kaftan",
    slug: "tolu-pink-lace-kaftan",
    image: demoImages.pinkKaftan,
    gallery: [demoImages.pinkKaftan],
    shortDescription:
      "A soft pink lace kaftan with a relaxed line and delicate all-over pattern.",
    description:
      "Tolu is a lace kaftan with an easy, forgiving line and a fine all-over pattern. It is designed to be worn loose, with a simple sandal and minimal jewellery.\n\nA good option for a smaller celebration, a family lunch or a wedding where comfort matters as much as presence.\n\nMade in Lagos. Sample product for demonstration.",
    price: 135000,
    category: summariseCategory(lace),
    collections: [summariseCollection(colLace)],
    sizes: ["One size"],
    colours: [
      { name: "Pink", hex: "#d9a6a6" },
      { name: "Ivory", hex: "#efe6d5" },
    ],
    fabric: "Chantilly lace",
    availability: inStock,
    featured: false,
    newArrival: false,
    sortOrder: 14,
    reference: "ARK-LC-027",
  },
  {
    id: "product-ifeoma",
    name: "Ifeoma Bridal Reception Gown",
    slug: "ifeoma-bridal-reception-gown",
    image: demoImages.bridalReception,
    gallery: [demoImages.bridalReception, demoImages.goldDetail],
    shortDescription:
      "A soft ivory reception gown with a full skirt and delicate embellishment.",
    description:
      "Ifeoma is the second-look gown: lighter than a ceremony dress, with a full skirt that moves through a reception and enough embellishment to read across a room.\n\nThe bodice is made to measure, and the skirt can be shortened for dancing. A detachable overskirt is available on request.\n\nMade to order in Lagos.",
    price: 450000,
    category: summariseCategory(bridal),
    collections: [summariseCollection(colBridal)],
    sizes: ["Made to measure"],
    colours: [{ name: "Ivory", hex: "#efe6d5" }],
    fabric: "Silk mikado, beaded lace",
    availability: madeToOrder,
    featured: false,
    newArrival: false,
    sortOrder: 15,
    reference: "ARK-BR-003",
  },
  {
    id: "product-bronze",
    name: "Bronze Minimal Iro & Buba",
    slug: "bronze-minimal-iro-buba",
    image: demoImages.bronzeIroBuba,
    gallery: [demoImages.bronzeIroBuba, demoImages.rustFabric],
    shortDescription:
      "A pared-back bronze iro and buba in fluid crepe, with no beading and no fuss.",
    description:
      "Our most minimal two-piece: a softly draped buba and a clean wrapper in bronze crepe. There are no sizes to choose because it ties and adjusts to the wearer, which also makes it a useful gift.\n\nWear it with coral beads for tradition, or keep it plain with gold hoops and a simple heel.\n\nMade in Lagos. Sample product for demonstration.",
    price: 140000,
    category: summariseCategory(iroBuba),
    collections: [summariseCollection(colIroBuba)],
    sizes: [],
    colours: [],
    fabric: "Fluid crepe",
    availability: inStock,
    featured: false,
    newArrival: false,
    sortOrder: 16,
    reference: "ARK-IB-007",
  },
];

export const demoSiteSettings: SiteSettings = {
  boutiqueName: "ÀRÌKÉ",
  tagline: "Nigerian occasion wear, made in Lagos.",
  whatsappPhone: "+234 800 000 0000",
  contactEmail: "studio@arike.example",
  instagramUrl: "https://www.instagram.com/",
  instagramHandle: "@arike.atelier",
  socialLinks: [
    { label: "Instagram", url: "https://www.instagram.com/" },
    { label: "Pinterest", url: "https://www.pinterest.com/" },
  ],
  address: "Victoria Island, Lagos, Nigeria",
  businessHours: [
    { days: "Monday – Friday", hours: "9:00 – 18:00" },
    { days: "Saturday", hours: "10:00 – 16:00" },
    { days: "Sunday", hours: "Closed" },
  ],
  announcementBar:
    "Complimentary styling on WhatsApp · Nationwide & worldwide delivery",
  description:
    "ÀRÌKÉ is a Lagos-based Nigerian occasion-wear label for aso-ebi, lace, aso-oke, ankara and iro & buba. Shop sample pieces or enquire on WhatsApp for made-to-measure.",
  demoContent: true,
};
