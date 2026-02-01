export interface Testimonial {
  id: string;
  name: string;
  role: string;
  category: "hunter" | "competition" | "military";
  quote: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProductFinish {
  id: string;
  name: string;
  description: string;
  colorClass: string;
}

export interface ComparisonFeature {
  feature: string;
  butlerCreek: string | boolean;
  tenebraex: string | boolean;
  scopeSecure: string | boolean;
}

export interface TrustBadge {
  icon: string;
  title: string;
  description: string;
}

export interface ScopeOption {
  label: string;
  value: number;
}

// Scope Configurator Types
export type GuardLength = "9" | "11" | "13" | "14" | "15" | "17";
export type ScopeHeight = "1.5" | "1.75" | "2"; // Heights in inches: 1 1/2", 1 3/4", 2"
export type MountDiameter = "1in" | "30mm" | "34mm" | "40mm";

// Legacy height values used in scope database (for backward compatibility)
export type LegacyScopeHeight = "low" | "medium" | "high" | "extra-high";

export interface ScopeSpec {
  id: string;
  brand: string;
  model: string;
  fullName: string; // Brand + Model for display
  tubeDiameter: MountDiameter | "35mm" | "36mm"; // Support legacy tube sizes in database
  overallLength: number; // in inches
  objectiveDiameter: number; // in mm
  suggestedHeight?: LegacyScopeHeight; // Legacy - now calculated dynamically
  msrp?: number; // Optional MSRP for reference
}

export interface ScopeSecureConfig {
  guardLength: GuardLength;
  scopeHeight: ScopeHeight;
  mountDiameter: MountDiameter;
}

export interface GuardLengthOption {
  value: GuardLength;
  label: string;
  lengthInches: number;
}

export interface ScopeHeightOption {
  value: ScopeHeight;
  label: string;
  description: string;
}

export interface MountDiameterOption {
  value: MountDiameter;
  label: string;
}

// ─── Cart & E-Commerce Types ───

export type ProductType = "one-time" | "subscription";
export type ProductCategory = "scope-guard" | "ammo-subscription" | "case";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  type: ProductType;
  image?: string;
  category: ProductCategory;
  config?: ScopeSecureConfig;
  finish?: string;
  interval?: "monthly" | "quarterly";
  size?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
}

export type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "OPEN_DRAWER" }
  | { type: "CLOSE_DRAWER" }
  | { type: "HYDRATE"; payload: CartItem[] };

export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone?: string;
}

// ─── New Product Data Types ───

export interface CaliberOption {
  id: string;
  name: string;
  shortName: string;
  description: string;
}

export interface SubscriptionTier {
  id: string;
  name: string;
  roundsPerShipment: number;
  monthlyPrice: number;
  quarterlyPrice: number;
  perRoundPrice: string;
  savings?: string;
  popular?: boolean;
}

export interface CaseSize {
  id: string;
  name: string;
  description: string;
  interiorDimensions: string;
  exteriorDimensions: string;
  weight: string;
  price: number;
}
