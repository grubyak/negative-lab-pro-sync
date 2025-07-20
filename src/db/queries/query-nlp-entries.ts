import { and, eq, like } from "drizzle-orm";
import { CONSTANTS } from "../../commons/constants";
import {
  adobeImages,
  agLibraryFile,
  agLibraryFolder,
  agLibraryRootFolder,
  agPhotoProperty,
  agPhotoPropertySpec,
  agSearchablePhotoProperty,
} from "../../schema";
import type { DB, Row } from "../../types";

const queryNegativeLabProEntries = (db: DB): Row[] =>
  db
    .select({
      absolutePath: agLibraryRootFolder.absolutePath,
      baseName: agLibraryFile.baseName,
      extension: agLibraryFile.extension,
      id_global: agPhotoProperty.id_global,
      internalValue: agPhotoProperty.internalValue,
      nlpKey: agPhotoPropertySpec.key,
      nlpValue: agSearchablePhotoProperty.internalValue,
      pathFromRoot: agLibraryFolder.pathFromRoot,
    })
    .from(agPhotoProperty)
    .innerJoin(adobeImages, eq(adobeImages.id_local, agPhotoProperty.photo))
    .innerJoin(agLibraryFile, eq(agLibraryFile.id_local, adobeImages.rootFile))
    .innerJoin(agLibraryFolder, eq(agLibraryFolder.id_local, agLibraryFile.folder))
    .innerJoin(agLibraryRootFolder, eq(agLibraryRootFolder.id_local, agLibraryFolder.rootFolder))
    .innerJoin(agSearchablePhotoProperty, eq(agSearchablePhotoProperty.photo, agPhotoProperty.photo))
    .innerJoin(agPhotoPropertySpec, eq(agPhotoPropertySpec.id_local, agSearchablePhotoProperty.propertySpec))
    .where(
      and(
        like(agPhotoPropertySpec.key, CONSTANTS.NLP_PROPERTY_MATCH),
        eq(agLibraryFile.extension, CONSTANTS.RAW_EXTENSION),
      ),
    )
    .all();

export { queryNegativeLabProEntries };
