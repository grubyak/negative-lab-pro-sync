import type { AdjustmentsGroup } from "../types";

const getGroupCategory = (value: string | null): AdjustmentsGroup | undefined => {
  if (
    value?.includes("selectedPreset") ||
    value?.includes("toneProfile") ||
    value?.includes("enginePreset") ||
    value?.includes("saturation")
  ) {
    return "core";
  }

  if (value?.includes("smartColor")) {
    return "smart";
  }

  if (value?.includes("blackPointOrigin")) {
    return "channel";
  }
};

export { getGroupCategory };
