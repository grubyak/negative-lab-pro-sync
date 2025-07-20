import type { drizzle } from "drizzle-orm/bun-sqlite";

type DB = ReturnType<typeof drizzle>;

type Row = {
  absolutePath: string | null;
  baseName: string | null;
  extension: string | null;
  id_global: string | null;
  internalValue: string | null;
  pathFromRoot: string | null;
  nlpKey: string | null;
  nlpValue: string | null;
};

type Photo = Pick<Row, "baseName" | "extension" | "absolutePath">;

type NegativeLabProKey =
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
  | "nlpDevelopmentNotes"
  | (string & Record<never, never>);

type NegativeLabProProps = Partial<Record<NegativeLabProKey, string | null>>;
type NegativeLabProGroup = "core" | "smart" | "channel" | "unknown";

type NegativeLabProEntry = {
  file: Pick<Row, "baseName" | "extension" | "pathFromRoot">;
} & Record<NegativeLabProGroup, string | null> & { general: NegativeLabProProps };

export { DB, Row, Photo, NegativeLabProKey, NegativeLabProProps, NegativeLabProGroup, NegativeLabProEntry };
