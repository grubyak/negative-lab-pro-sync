import { CONSTANTS } from "../commons/constants";
import { getGeneralEntries } from "../db/queries/get-general-entries";
import { getPhoto } from "../db/queries/get-photo";
import { getPhotoAdjustments } from "../db/queries/get-photo-adjustments";
import { getPhotoIdList } from "../db/queries/get-photo-id-list";
import type { DB, Sidecar } from "../types";
import { getPhotoPath } from "../utils/get-photo-path";

const getSidecars = (db: DB) => {
  const result: Record<string, Sidecar> = {};
  const photoIds = getPhotoIdList(db);

  photoIds.forEach((id) => {
    const photo = getPhoto(db, id);
    const general = getGeneralEntries(db, id);
    const adjustments = getPhotoAdjustments(db, id);
    const sidecar = `${getPhotoPath(photo)}.${CONSTANTS.SIDECAR_EXTENSION}`;

    result[sidecar] = { adjustments, general, photo };
  });

  return result;
};

export { getSidecars };
