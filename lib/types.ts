export type Availability =
  | "in_stock"
  | "low_stock"
  | "out_of_stock"
  | "made_to_order";

export type CmsImage = {
  src: string;
  alt: string;
  blurDataURL?: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: CmsImage;
  order: number;
};

export type Collection = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  coverImage?: CmsImage;
  featured: boolean;
  order: number;
};

export type Colour = {
  name: string;
  hex: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  image: CmsImage;
  gallery: CmsImage[];
  shortDescription: string;
  description: string;
  price: number;
  category: Pick<Category, "id" | "name" | "slug"> | null;
  collections: Pick<Collection, "id" | "name" | "slug">[];
  sizes: string[];
  colours: Colour[];
  fabric?: string;
  availability: Availability;
  featured: boolean;
  newArrival: boolean;
  sortOrder: number;
  reference?: string;
};

export type SocialLink = {
  label: string;
  url: string;
};

export type BusinessHour = {
  days: string;
  hours: string;
};

export type SiteSettings = {
  boutiqueName: string;
  tagline: string;
  logo?: CmsImage;
  whatsappPhone: string;
  contactEmail: string;
  instagramUrl: string;
  instagramHandle: string;
  socialLinks: SocialLink[];
  address: string;
  businessHours: BusinessHour[];
  announcementBar: string;
  description: string;
  demoContent: boolean;
};

export type ProductFilters = {
  query?: string;
  category?: string;
  availability?: string;
  sort?: string;
};
