import { eq } from "drizzle-orm";
import { adobeImages, agLibraryFile, agPhotoProperty } from "../../schema";
import type { AdjustmentsEntries, DB } from "../../types";
import { getGroupCategory } from "../../utils/get-group-category";
import { lua } from "../../utils/lua";

const getPhotoAdjustments = (db: DB, id: number) =>
  db
    .select({ value: agPhotoProperty.internalValue })
    .from(agPhotoProperty)
    .innerJoin(adobeImages, eq(adobeImages.id_local, agPhotoProperty.photo))
    .innerJoin(agLibraryFile, eq(agLibraryFile.id_local, adobeImages.rootFile))
    .where(eq(agPhotoProperty.photo, id))
    .all()
    .reduce(
      (result, { value }) => ({ ...result, [getGroupCategory(value)!]: lua.parse(value!) }),
      {} as AdjustmentsEntries,
    );

export { getPhotoAdjustments };
