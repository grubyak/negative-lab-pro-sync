import { eq } from "drizzle-orm";
import { CONSTANTS } from "../commons/constants";
import { adobeImages, agLibraryFile, agLibraryFolder, agLibraryRootFolder, agPhotoProperty } from "../schema";
import type { DB } from "../types";

const queryNegativeLabProEntries = (db: DB) =>
  db
    .select({
      absolutePath: agLibraryRootFolder.absolutePath,
      baseName: agLibraryFile.baseName,
      extension: agLibraryFile.extension,
      id_global: agPhotoProperty.id_global,
      internalValue: agPhotoProperty.internalValue,
      pathFromRoot: agLibraryFolder.pathFromRoot,
    })
    .from(agPhotoProperty)
    .innerJoin(adobeImages, eq(adobeImages.id_local, agPhotoProperty.photo))
    .innerJoin(agLibraryFile, eq(agLibraryFile.id_local, adobeImages.rootFile))
    .innerJoin(agLibraryFolder, eq(agLibraryFolder.id_local, agLibraryFile.folder))
    .innerJoin(agLibraryRootFolder, eq(agLibraryRootFolder.id_local, agLibraryFolder.rootFolder))
    .where(eq(agLibraryFile.extension, CONSTANTS.RAW_EXTENSION))
    .all();

export { queryNegativeLabProEntries };
