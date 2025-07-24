import { eq } from "drizzle-orm";
import { adobeImages, agLibraryFile, agLibraryFolder, agLibraryRootFolder } from "../../schema";
import type { DB, Photo } from "../../types";

const getPhoto = (db: DB, id: number) =>
  db
    .select({
      absolutePath: agLibraryRootFolder.absolutePath,
      baseName: agLibraryFile.baseName,
      extension: agLibraryFile.extension,
      pathFromRoot: agLibraryFolder.pathFromRoot,
    })
    .from(adobeImages)
    .innerJoin(agLibraryFile, eq(agLibraryFile.id_local, adobeImages.rootFile))
    .innerJoin(agLibraryFolder, eq(agLibraryFolder.id_local, agLibraryFile.folder))
    .innerJoin(agLibraryRootFolder, eq(agLibraryRootFolder.id_local, agLibraryFolder.rootFolder))
    .where(eq(adobeImages.id_local, id))
    .get() as Photo;

export { getPhoto };
