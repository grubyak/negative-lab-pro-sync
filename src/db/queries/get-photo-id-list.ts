import { and, eq, like } from "drizzle-orm";
import { CONSTANTS } from "../../constants";
import type { DB } from "../../types";
import { adobeImages, agLibraryFile, agPhotoPropertySpec, agSearchablePhotoProperty } from "../schema";

const getPhotoIdList = (db: DB) =>
  db
    .select({ id: agSearchablePhotoProperty.photo })
    .from(agSearchablePhotoProperty)
    .innerJoin(agPhotoPropertySpec, eq(agPhotoPropertySpec.id_local, agSearchablePhotoProperty.propertySpec))
    .innerJoin(adobeImages, eq(adobeImages.id_local, agSearchablePhotoProperty.photo))
    .innerJoin(agLibraryFile, eq(agLibraryFile.id_local, adobeImages.rootFile))
    .where(
      and(
        like(agPhotoPropertySpec.key, CONSTANTS.NLP_PROPERTY_MATCH),
        eq(agLibraryFile.extension, CONSTANTS.RAW_EXTENSION),
      ),
    )
    .groupBy(agSearchablePhotoProperty.photo)
    .all()
    .map((row) => row.id as number);

export { getPhotoIdList };
