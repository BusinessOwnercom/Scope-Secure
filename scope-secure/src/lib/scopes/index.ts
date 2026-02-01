import type { ScopeSpec } from "@/types";

// Existing brands
import { VORTEX_SCOPES } from "./brands/vortex";
import { NIGHTFORCE_SCOPES } from "./brands/nightforce";
import { LEUPOLD_SCOPES } from "./brands/leupold";
import { SCHMIDT_BENDER_SCOPES } from "./brands/schmidt-bender";
import { ZEISS_SCOPES } from "./brands/zeiss";
import { BURRIS_SCOPES } from "./brands/burris";
import { PRIMARY_ARMS_SCOPES } from "./brands/primary-arms";
import { ATHLON_SCOPES } from "./brands/athlon";
import { BUSHNELL_SCOPES } from "./brands/bushnell";
import { TRIJICON_SCOPES } from "./brands/trijicon";
import { KAHLES_SCOPES } from "./brands/kahles";
import { SWAROVSKI_SCOPES } from "./brands/swarovski";
import { SIG_SAUER_SCOPES } from "./brands/sig-sauer";
import { RITON_SCOPES } from "./brands/riton";
import { MAVEN_SCOPES } from "./brands/maven";
import { STEINER_SCOPES } from "./brands/steiner";
import { HAWKE_SCOPES } from "./brands/hawke";

// New brands
import { NIKON_SCOPES } from "./brands/nikon";
import { MEOPTA_SCOPES } from "./brands/meopta";
import { US_OPTICS_SCOPES } from "./brands/us-optics";
import { TANGENT_THETA_SCOPES } from "./brands/tangent-theta";
import { MARCH_SCOPES } from "./brands/march";
import { HENSOLDT_SCOPES } from "./brands/hensoldt";
import { ELEMENT_OPTICS_SCOPES } from "./brands/element-optics";
import { ARKEN_SCOPES } from "./brands/arken";
import { DELTA_OPTICAL_SCOPES } from "./brands/delta-optical";
import { REVIC_SCOPES } from "./brands/revic";
import { ZEROTECH_SCOPES } from "./brands/zerotech";
import { GPO_SCOPES } from "./brands/gpo";
import { TRACT_SCOPES } from "./brands/tract";
import { SWFA_SCOPES } from "./brands/swfa";
import { IOR_VALDADA_SCOPES } from "./brands/ior-valdada";
import { HI_LUX_SCOPES } from "./brands/hi-lux";
import { MINOX_SCOPES } from "./brands/minox";
import { CRIMSON_TRACE_SCOPES } from "./brands/crimson-trace";

// Crossbow scopes
import { TENPOINT_CROSSBOW_SCOPES } from "./crossbow/tenpoint";
import { BARNETT_CROSSBOW_SCOPES } from "./crossbow/barnett";
import { EXCALIBUR_CROSSBOW_SCOPES } from "./crossbow/excalibur";
import { KILLER_INSTINCT_CROSSBOW_SCOPES } from "./crossbow/killer-instinct";
import { RAVIN_CROSSBOW_SCOPES } from "./crossbow/ravin";
import { CENTERPOINT_CROSSBOW_SCOPES } from "./crossbow/centerpoint";
import { GARMIN_CROSSBOW_SCOPES } from "./crossbow/garmin";
import { MISSION_CROSSBOW_SCOPES } from "./crossbow/mission";
import { VORTEX_CROSSBOW_SCOPES } from "./crossbow/vortex";
import { HAWKE_CROSSBOW_SCOPES } from "./crossbow/hawke";

/**
 * Combined database of all rifle and crossbow scopes.
 */
export const SCOPE_DATABASE: ScopeSpec[] = [
  // Rifle scopes
  ...VORTEX_SCOPES,
  ...NIGHTFORCE_SCOPES,
  ...LEUPOLD_SCOPES,
  ...SCHMIDT_BENDER_SCOPES,
  ...ZEISS_SCOPES,
  ...BURRIS_SCOPES,
  ...PRIMARY_ARMS_SCOPES,
  ...ATHLON_SCOPES,
  ...BUSHNELL_SCOPES,
  ...TRIJICON_SCOPES,
  ...KAHLES_SCOPES,
  ...SWAROVSKI_SCOPES,
  ...SIG_SAUER_SCOPES,
  ...RITON_SCOPES,
  ...MAVEN_SCOPES,
  ...STEINER_SCOPES,
  ...HAWKE_SCOPES,
  ...NIKON_SCOPES,
  ...MEOPTA_SCOPES,
  ...US_OPTICS_SCOPES,
  ...TANGENT_THETA_SCOPES,
  ...MARCH_SCOPES,
  ...HENSOLDT_SCOPES,
  ...ELEMENT_OPTICS_SCOPES,
  ...ARKEN_SCOPES,
  ...DELTA_OPTICAL_SCOPES,
  ...REVIC_SCOPES,
  ...ZEROTECH_SCOPES,
  ...GPO_SCOPES,
  ...TRACT_SCOPES,
  ...SWFA_SCOPES,
  ...IOR_VALDADA_SCOPES,
  ...HI_LUX_SCOPES,
  ...MINOX_SCOPES,
  ...CRIMSON_TRACE_SCOPES,

  // Crossbow scopes
  ...TENPOINT_CROSSBOW_SCOPES,
  ...BARNETT_CROSSBOW_SCOPES,
  ...EXCALIBUR_CROSSBOW_SCOPES,
  ...KILLER_INSTINCT_CROSSBOW_SCOPES,
  ...RAVIN_CROSSBOW_SCOPES,
  ...CENTERPOINT_CROSSBOW_SCOPES,
  ...GARMIN_CROSSBOW_SCOPES,
  ...MISSION_CROSSBOW_SCOPES,
  ...VORTEX_CROSSBOW_SCOPES,
  ...HAWKE_CROSSBOW_SCOPES,
];

/**
 * Get all unique brands from the database
 */
export function getScopeBrands(): string[] {
  const brands = new Set(SCOPE_DATABASE.map((scope) => scope.brand));
  return Array.from(brands).sort();
}

/**
 * Search scopes by query string.
 * Supports multi-word queries: each word must appear in brand+model.
 * e.g. "Vortex PST" matches "Vortex Viper PST Gen II"
 */
export function searchScopes(query: string): ScopeSpec[] {
  if (!query || query.length < 2) return [];

  const terms = query.toLowerCase().trim().split(/\s+/);

  return SCOPE_DATABASE.filter((scope) => {
    const searchText = `${scope.brand} ${scope.model}`.toLowerCase();
    return terms.every((term) => searchText.includes(term));
  }).slice(0, 20);
}

/**
 * Get a scope by its ID
 */
export function getScopeById(id: string): ScopeSpec | undefined {
  return SCOPE_DATABASE.find((scope) => scope.id === id);
}

/**
 * Get scopes by brand
 */
export function getScopesByBrand(brand: string): ScopeSpec[] {
  return SCOPE_DATABASE.filter(
    (scope) => scope.brand.toLowerCase() === brand.toLowerCase()
  );
}
