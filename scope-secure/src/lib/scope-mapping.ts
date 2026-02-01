import type {
  ScopeSpec,
  GuardLength,
  ScopeHeight,
  MountDiameter,
  ScopeSecureConfig,
} from "@/types";

/**
 * Guard length thresholds in inches
 * Maps scope overall length to the appropriate guard length
 * 
 * Available guard lengths: 9", 11", 13", 14", 15", 17"
 * Rule: Select the smallest guard length that is >= scope length
 */
const GUARD_LENGTH_THRESHOLDS: { maxScopeLength: number; guardLength: GuardLength }[] = [
  { maxScopeLength: 9.5, guardLength: "9" },
  { maxScopeLength: 11.5, guardLength: "11" },
  { maxScopeLength: 13.5, guardLength: "13" },
  { maxScopeLength: 14.5, guardLength: "14" },
  { maxScopeLength: 15.5, guardLength: "15" },
  { maxScopeLength: 17.5, guardLength: "17" },
];

/**
 * Scope height recommendations based on objective lens diameter
 * Larger objectives require higher mounts to clear the barrel/rail
 */
const HEIGHT_THRESHOLDS: { maxObjective: number; height: ScopeHeight }[] = [
  { maxObjective: 28, height: "low" },
  { maxObjective: 44, height: "medium" },
  { maxObjective: 52, height: "high" },
  { maxObjective: Infinity, height: "extra-high" },
];

/**
 * Maps a scope's overall length to the appropriate ScopeSecure guard length
 * 
 * @param scopeLength - The scope's overall length in inches
 * @returns The recommended guard length, or "custom" if scope is too long
 */
export function getGuardLength(scopeLength: number): GuardLength {
  for (const threshold of GUARD_LENGTH_THRESHOLDS) {
    if (scopeLength <= threshold.maxScopeLength) {
      return threshold.guardLength;
    }
  }
  // If scope is longer than 17.5", needs custom order
  return "custom";
}

/**
 * Maps objective lens diameter to recommended scope height
 * Takes into account the tube diameter for edge cases
 * 
 * @param objectiveDiameter - The objective lens diameter in mm
 * @param tubeDiameter - The tube diameter (affects height calculation for some setups)
 * @returns The recommended scope height
 */
export function getScopeHeight(
  objectiveDiameter: number,
  tubeDiameter?: MountDiameter
): ScopeHeight {
  // Large tube diameters (34mm+) may need slightly higher mounts
  const largeTubes: MountDiameter[] = ["34mm", "35mm", "36mm", "40mm"];
  const tubeAdjustment = largeTubes.includes(tubeDiameter ?? "30mm") ? 2 : 0;
  const adjustedObjective = objectiveDiameter + tubeAdjustment;

  for (const threshold of HEIGHT_THRESHOLDS) {
    if (adjustedObjective <= threshold.maxObjective) {
      return threshold.height;
    }
  }
  return "extra-high";
}

/**
 * Maps scope tube diameter to ScopeSecure mount diameter
 * Direct 1:1 mapping for standard sizes
 * 
 * @param tubeDiameter - The scope's tube diameter
 * @returns The matching mount diameter
 */
export function getMountDiameter(tubeDiameter: MountDiameter): MountDiameter {
  // Direct mapping - ScopeSecure offers all standard tube sizes
  return tubeDiameter;
}

/**
 * Generates a complete ScopeSecure configuration from a scope's specifications
 * 
 * @param scope - The scope specifications
 * @returns The recommended ScopeSecure configuration
 */
export function getScopeSecureConfig(scope: ScopeSpec): ScopeSecureConfig {
  return {
    guardLength: getGuardLength(scope.overallLength),
    scopeHeight: scope.suggestedHeight ?? getScopeHeight(scope.objectiveDiameter, scope.tubeDiameter),
    mountDiameter: getMountDiameter(scope.tubeDiameter),
  };
}

/**
 * Validates if a configuration is valid for ordering
 * 
 * @param config - The ScopeSecure configuration
 * @returns Object with validity status and any warnings
 */
export function validateConfig(config: ScopeSecureConfig): {
  isValid: boolean;
  warnings: string[];
  requiresCustomOrder: boolean;
} {
  const warnings: string[] = [];
  let requiresCustomOrder = false;

  if (config.guardLength === "custom") {
    warnings.push("This scope requires a custom-length guard. Please contact us for special orders.");
    requiresCustomOrder = true;
  }

  if (config.mountDiameter === "40mm") {
    warnings.push("40mm mounts weigh slightly more than 1 pound.");
  }

  if (config.mountDiameter === "34mm") {
    warnings.push("34mm mounts weigh slightly more than 1 pound.");
  }

  return {
    isValid: !requiresCustomOrder,
    warnings,
    requiresCustomOrder,
  };
}

/**
 * Gets a human-readable summary of the configuration
 * 
 * @param config - The ScopeSecure configuration
 * @returns A formatted string describing the configuration
 */
export function getConfigSummary(config: ScopeSecureConfig): string {
  const guardLabel = config.guardLength === "custom" 
    ? "Custom Length" 
    : `${config.guardLength}" Guard`;
  
  const heightLabels: Record<ScopeHeight, string> = {
    low: "Low",
    medium: "Medium",
    high: "High",
    "extra-high": "Extra High",
  };

  const diameterLabels: Record<MountDiameter, string> = {
    "1in": "1 inch",
    "30mm": "30mm",
    "34mm": "34mm",
    "35mm": "35mm",
    "36mm": "36mm",
    "40mm": "40mm",
  };

  return `${guardLabel}, ${heightLabels[config.scopeHeight]} Height, ${diameterLabels[config.mountDiameter]} Mount`;
}

/**
 * Converts guard length to numeric value in inches
 */
export function guardLengthToNumber(guardLength: GuardLength): number | null {
  if (guardLength === "custom") return null;
  return parseInt(guardLength, 10);
}

/**
 * Gets the available guard length options
 */
export function getAvailableGuardLengths(): GuardLength[] {
  return ["9", "11", "13", "14", "15", "17"];
}

/**
 * Gets the available scope height options
 */
export function getAvailableScopeHeights(): ScopeHeight[] {
  return ["low", "medium", "high", "extra-high"];
}

/**
 * Gets the available mount diameter options
 */
export function getAvailableMountDiameters(): MountDiameter[] {
  return ["1in", "30mm", "34mm", "35mm", "36mm", "40mm"];
}
