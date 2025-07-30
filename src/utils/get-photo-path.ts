import type { Photo } from "../types";

const getPhotoPath = (photo: Photo) => `${photo.absolutePath}${photo.pathFromRoot}${photo.baseName}`;

export { getPhotoPath };
