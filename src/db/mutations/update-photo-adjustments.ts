import type { AdjustmentsEntries, DB, Photo } from "../../types";
import { getPhotoId } from "../queries/get-photo-id";

const updatePhotoAdjustments = (db: DB, photo: Photo, adjustments: AdjustmentsEntries, go: boolean) => {
  const photoId = getPhotoId(db, photo);

  if (!photoId) {
    console.log(`- ${photo.baseName}: was not found in catalog!`);
    return;
  }

  console.debug(`- processing adjustments for ${photo.baseName}`);
  console.log(adjustments);

  // const existing = "todo";
};

export { updatePhotoAdjustments };
