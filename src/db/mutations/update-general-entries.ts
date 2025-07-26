import { and, eq } from "drizzle-orm";
import { agPhotoPropertySpec, agSearchablePhotoProperty } from "../../schema";
import type { DB, GeneralEntries, Photo } from "../../types";
import { getPhotoId } from "../queries/get-photo-id";

const updateGeneralEntries = (db: DB, photo: Photo, general: GeneralEntries, go: boolean) => {
  const photoId = getPhotoId(db, photo);

  if (!photoId) {
    console.log(`- ${photo.baseName}: was not found in catalog!`);
    return;
  }

  console.debug(`- processing general entries for ${photo.baseName}`);

  Object.entries(general).forEach(([key, value]) => {
    const spec = db
      .select({ id: agPhotoPropertySpec.id_local })
      .from(agPhotoPropertySpec)
      .where(eq(agPhotoPropertySpec.key, key))
      .get();

    if (!spec) {
      console.log(`- ${photo.baseName}: unknown nlp property "${key}"`);
      return;
    }

    const existing = db
      .select({ id: agSearchablePhotoProperty.id_local, internalValue: agSearchablePhotoProperty.internalValue })
      .from(agSearchablePhotoProperty)
      .where(and(eq(agSearchablePhotoProperty.photo, photoId), eq(agSearchablePhotoProperty.propertySpec, spec.id)))
      .get();

    if (existing) {
      if (existing.internalValue === value) {
        console.debug(`  - unchanged "${key}" (${value})`);
      } else {
        console.debug(`  - updating "${key}": "${existing.internalValue}" -> "${value}"`);

        if (go) {
          db.update(agSearchablePhotoProperty)
            .set({ internalValue: value })
            .where(eq(agSearchablePhotoProperty.id_local, existing.id))
            .run();
        }
      }
    } else {
      console.log(`  - property "${key}" does not exist`);
    }
  });
};

export { updateGeneralEntries };
