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
 * Heights: 1 1/2", 1 3/4", 2"
 */
const HEIGHT_THRESHOLDS: { maxObjective: number; height: ScopeHeight }[] = [
  { maxObjective: 40, height: "1.5" },   // 1 1/2" - Standard
  { maxObjective: 50, height: "1.75" },  // 1 3/4" - Larger objectives
  { maxObjective: Infinity, height: "2" }, // 2" - Extra-large objectives
];

/**
 * Maps a scope's overall length to the appropriate ScopeSecure guard length
 * 
 * @param scopeLength - The scope's overall length in inches
 * @returns The recommended guard length (longest available for oversized scopes)
 */
export function getGuardLength(scopeLength: number): GuardLength {
  for (const threshold of GUARD_LENGTH_THRESHOLDS) {
    if (scopeLength <= threshold.maxScopeLength) {
      return threshold.guardLength;
    }
  }
  // If scope is longer than 17.5", recommend the longest available
  return "17";
}

/**
 * Maps objective lens diameter to recommended scope height
 * Takes into account the tube diameter for edge cases
 * 
 * @param objectiveDiameter - The objective lens diameter in mm
 * @param tubeDiameter - The tube diameter (affects height calculation for some setups)
 * @returns The recommended scope height (1.5", 1.75", or 2")
 */
export function getScopeHeight(
  objectiveDiameter: number,
  tubeDiameter?: MountDiameter
): ScopeHeight {
  // Large tube diameters (34mm+) may need slightly higher mounts
  const largeTubes: MountDiameter[] = ["34mm", "40mm"];
  const tubeAdjustment = largeTubes.includes(tubeDiameter ?? "30mm") ? 2 : 0;
  const adjustedObjective = objectiveDiameter + tubeAdjustment;

  for (const threshold of HEIGHT_THRESHOLDS) {
    if (adjustedObjective <= threshold.maxObjective) {
      return threshold.height;
    }
  }
  return "2"; // Default to tallest height
}

/**
 * Maps scope tube diameter to ScopeSecure mount diameter
 * Handles legacy tube sizes by mapping to nearest available size
 * 
 * @param tubeDiameter - The scope's tube diameter (may include legacy sizes)
 * @returns The matching mount diameter from available options
 */
export function getMountDiameter(tubeDiameter: string): MountDiameter {
  // Map legacy/uncommon tube sizes to available mount diameters
  const diameterMap: Record<string, MountDiameter> = {
    "1in": "1in",
    "30mm": "30mm",
    "34mm": "34mm",
    "35mm": "34mm", // Map 35mm to nearest (34mm)
    "36mm": "40mm", // Map 36mm to nearest (40mm)
    "40mm": "40mm",
  };
  
  return diameterMap[tubeDiameter] || "30mm"; // Default to 30mm if unknown
}

/**
 * Generates a complete ScopeSecure configuration from a scope's specifications
 * 
 * @param scope - The scope specifications
 * @returns The recommended ScopeSecure configuration
 */
export function getScopeSecureConfig(scope: ScopeSpec): ScopeSecureConfig {
  const mountDiameter = getMountDiameter(scope.tubeDiameter);
  
  return {
    guardLength: getGuardLength(scope.overallLength),
    scopeHeight: getScopeHeight(scope.objectiveDiameter, mountDiameter),
    mountDiameter,
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

  if (config.mountDiameter === "40mm") {
    warnings.push("40mm mounts weigh slightly more than 1 pound.");
  }

  if (config.mountDiameter === "34mm") {
    warnings.push("34mm mounts weigh slightly more than 1 pound.");
  }

  return {
    isValid: true,
    warnings,
    requiresCustomOrder: false,
  };
}

/**
 * Gets a human-readable summary of the configuration
 * 
 * @param config - The ScopeSecure configuration
 * @returns A formatted string describing the configuration
 */
export function getConfigSummary(config: ScopeSecureConfig): string {
  const guardLabel = `${config.guardLength}" Guard`;
  
  const heightLabels: Record<ScopeHeight, string> = {
    "1.5": '1 1/2"',
    "1.75": '1 3/4"',
    "2": '2"',
  };

  const diameterLabels: Record<MountDiameter, string> = {
    "1in": '1"',
    "30mm": "30mm",
    "34mm": "34mm",
    "40mm": "40mm",
  };

  return `${guardLabel}, ${heightLabels[config.scopeHeight]} Height, ${diameterLabels[config.mountDiameter]} Tube`;
}

/**
 * Converts guard length to numeric value in inches
 */
export function guardLengthToNumber(guardLength: GuardLength): number {
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
  return ["1.5", "1.75", "2"];
}

/**
 * Gets the available mount diameter options
 */
export function getAvailableMountDiameters(): MountDiameter[] {
  return ["1in", "30mm", "34mm", "40mm"];
}
