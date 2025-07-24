import type { drizzle } from "drizzle-orm/bun-sqlite";

type DB = ReturnType<typeof drizzle>;

type Photo = {
  absolutePath: string | null;
  baseName: string | null;
  extension: string | null;
  pathFromRoot: string | null;
};

type GeneralEntriesKey =
  | "nlpConverted"
  | "nlpVersion"
  | "nlpSource"
  | "nlpColorModel"
  | "nlpPreSaturation"
  | "nlpTones"
  | "nlpColor"
  | "nlpLUT"
  | "nlpOriginalCameraMake"
  | "nlpOriginalCameraModel"
  | "nlpOriginalLensMake"
  | "nlpOriginalLens"
  | "nlpFilmStock"
  | "nlpFilmFormatSize"
  | "nlpFilmISO"
  | "nlpGearNotes"
  | "nlpShotAtIso"
  | "nlpAperture"
  | "nlpShutterSpeed"
  | "nlpFocalLength"
  | "nlpDateTaken"
  | "nlpShootingNotes"
  | "nlpScanMethod"
  | "nlpScanEquipment"
  | "nlpLightSource"
  | "nlpFilmHolder"
  | "nlpDigitizationNotes"
  | "nlpFilmPushPull"
  | "nlpDevelopedAt"
  | "nlpDeveloper"
  | "nlpDevDilution"
  | "nlpDevMethod"
  | "nlpDevTimeTemp"
  | "nlpDevelopmentNotes";

type AdjustmentsGroup = "core" | "smart" | "channel";
type GeneralEntries = Record<GeneralEntriesKey, string>;
type AdjustmentsEntries = Record<AdjustmentsGroup, string>;

type Sidecar = {
  photo: Photo;
  general: GeneralEntries;
  adjustments: AdjustmentsEntries;
};

export { DB, Photo, GeneralEntriesKey, GeneralEntries, AdjustmentsEntries, AdjustmentsGroup, Sidecar };
