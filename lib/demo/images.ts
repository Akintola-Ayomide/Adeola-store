import type { CmsImage } from "../types";

/**
 * Local demo imagery. These files live in /public/images and are optimised by
 * next/image at request time. When Sanity is connected, this module is not
 * used for catalogue images.
 */
export function img(src: string, alt: string): CmsImage {
  return { src, alt };
}

export const demoImages = {
  emeraldGown: img(
    "/images/products/emerald-lace-gown.jpg",
    "Model wearing a floor-length emerald green lace gown with sheer sleeves and a thigh slit",
  ),
  emeraldDetail: img(
    "/images/products/emerald-bead-detail.jpg",
    "Close-up of emerald green lace with tonal beading",
  ),
  asoOkeGown: img(
    "/images/products/aso-oke-beaded-gown.jpg",
    "Model in a champagne beaded aso-oke mermaid gown with a matching gele",
  ),
  goldDetail: img(
    "/images/products/gold-bead-detail.jpg",
    "Detail of hand-beaded gold and ivory embellishment",
  ),
  champagneGown: img(
    "/images/products/champagne-sequin-gown.jpg",
    "Model in a champagne sequinned mermaid gown with a matching headwrap",
  ),
  royalBlueGown: img(
    "/images/products/royal-blue-lace-gown.jpg",
    "Model in a full royal blue lace ball gown in a bright hall",
  ),
  blueDetail: img(
    "/images/products/blue-bead-detail.jpg",
    "Close-up of blue and green floral beadwork",
  ),
  rustIroBuba: img(
    "/images/products/rust-iro-buba.jpg",
    "Model wearing a rust-coloured iro and buba with a matching gele",
  ),
  rustFabric: img(
    "/images/products/rust-fabric-detail.jpg",
    "Flatlay of rust and terracotta fabric with coral beads",
  ),
  burgundyGown: img(
    "/images/products/burgundy-cape-gown.jpg",
    "Model in a burgundy and gold beaded gown with a floor-length cape",
  ),
  greenAnkara: img(
    "/images/products/green-ankara-midi.jpg",
    "Model in a green patterned ankara midi dress in a gallery",
  ),
  indigoAnkara: img(
    "/images/products/indigo-ankara-set.jpg",
    "Model in an indigo patterned ankara two-piece on a Lagos street",
  ),
  bridalGown: img(
    "/images/products/bridal-lace-gown.jpg",
    "Model in an off-shoulder ivory beaded lace bridal gown",
  ),
  asoOkeSet: img(
    "/images/products/aso-oke-two-piece.jpg",
    "Model in a champagne aso-oke two-piece with a sculptural gele",
  ),
  wineGown: img(
    "/images/products/wine-tulle-gown.jpg",
    "Model in a wine-coloured tulle gown with a matching turban",
  ),
  ankaraPrintGown: img(
    "/images/products/ankara-print-gown.jpg",
    "Model in a printed ankara maxi gown on a balcony",
  ),
  blackGoldGown: img(
    "/images/products/black-gold-gown.jpg",
    "Model in a black and gold statement gown in a marble corridor",
  ),
  pinkKaftan: img(
    "/images/products/pink-lace-kaftan.jpg",
    "Model in a pink lace kaftan seated in a softly lit room",
  ),
  bridalReception: img(
    "/images/products/bridal-reception-gown.jpg",
    "Bride in an ivory gown in a flower-filled reception hall",
  ),
  bronzeIroBuba: img(
    "/images/products/bronze-iro-buba.jpg",
    "Model in a bronze draped iro and buba in a bright interior",
  ),
  beadedPortrait: img(
    "/images/editorial/beaded-lace-portrait.jpg",
    "Bride in an ivory beaded lace gown seated in an ornate salon",
  ),
  asoEbiParty: img(
    "/images/editorial/aso-ebi-party.jpg",
    "A group of women in coordinated burgundy aso-ebi at an outdoor wedding",
  ),
  atelier: img(
    "/images/editorial/atelier-seamstresses.jpg",
    "Seamstresses working at machines in the ÀRÍKÉ studio",
  ),
  beadwork: img(
    "/images/editorial/beadwork-hands.jpg",
    "Hands attaching gold beads to ivory fabric",
  ),
  handSewing: img(
    "/images/editorial/hand-sewing.jpg",
    "Close-up of hand sewing with coral beads and gold thread",
  ),
  patternTable: img(
    "/images/editorial/pattern-table.jpg",
    "Pattern cutter at work in the ÀRÍKÉ atelier",
  ),
  patternCutting: img(
    "/images/editorial/pattern-cutting.jpg",
    "Pattern pieces and fabric on a cutting table",
  ),
  rustOccasion: img(
    "/images/editorial/rust-occasion.jpg",
    "Model in a rust occasion set on a Lagos balcony",
  ),
  redBeadwork: img(
    "/images/editorial/red-beadwork.jpg",
    "Detail of red and ivory handwoven aso-oke",
  ),
  boutique: img(
    "/images/editorial/boutique-interior.jpg",
    "Two women in ivory outfits inside the ÀRÍKÉ boutique",
  ),
  fitting: img(
    "/images/editorial/atelier-fitting.jpg",
    "A fitting in progress in the ÀRÍKÉ atelier",
  ),
  streetStyle: img(
    "/images/editorial/street-style.jpg",
    "Model in a taupe occasion look in Lagos",
  ),
  asoEbiGroup: img(
    "/images/collections/aso-ebi-group.jpg",
    "Five women in coordinated burgundy and blush aso-ebi dresses",
  ),
  laceCeremony: img(
    "/images/collections/lace-ceremony.jpg",
    "Bride in a beaded ivory lace gown in a traditional salon",
  ),
  asoOkeHeritage: img(
    "/images/collections/aso-oke-heritage.jpg",
    "Model in aso-oke with a sculptural gele in a gallery",
  ),
  bridalReceptionCollection: img(
    "/images/collections/bridal-reception.jpg",
    "Bride in a white gown in a flower-filled reception hall",
  ),
} as const;
