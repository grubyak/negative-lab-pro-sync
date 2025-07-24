import { and, eq } from "drizzle-orm";
import { adobeImages, agLibraryFile, agLibraryFolder, agLibraryRootFolder } from "../../schema";
import type { DB, Photo } from "../../types";

const getPhotoId = (db: DB, photo: Photo) =>
  db
    .select({ photoId: adobeImages.id_local })
    .from(agLibraryFile)
    .innerJoin(adobeImages, eq(adobeImages.rootFile, agLibraryFile.id_local))
    .innerJoin(agLibraryFolder, eq(agLibraryFolder.id_local, agLibraryFile.folder))
    .innerJoin(agLibraryRootFolder, eq(agLibraryRootFolder.id_local, agLibraryFolder.rootFolder))
    .where(
      and(
        eq(agLibraryFile.baseName, photo.baseName!),
        eq(agLibraryFile.extension, photo.extension!),
        eq(agLibraryRootFolder.absolutePath, photo.absolutePath!),
        eq(agLibraryFolder.pathFromRoot, photo.pathFromRoot!),
      ),
    )
    .get()?.photoId;

export { getPhotoId };
