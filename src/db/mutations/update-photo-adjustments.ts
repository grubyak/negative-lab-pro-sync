import { eq } from "drizzle-orm";
import { adobeImages, agLibraryFile, agPhotoProperty } from "../../schema";
import type { AdjustmentsEntries, AdjustmentsGroup, DB, Photo } from "../../types";
import { getGroupCategory } from "../../utils/get-group-category";
import { lua } from "../../utils/lua";
import { getPhotoId } from "../queries/get-photo-id";

const updatePhotoAdjustments = (db: DB, photo: Photo, adjustments: AdjustmentsEntries, go: boolean) => {
  const photoId = getPhotoId(db, photo);

  if (!photoId) {
    console.log(`- ${photo.baseName}: was not found in catalog!`);
    return;
  }

  console.debug(`- processing adjustments for ${photo.baseName}`);

  const existing = db
    .select({
      id_global: agPhotoProperty.id_global,
      value: agPhotoProperty.internalValue,
    })
    .from(agPhotoProperty)
    .innerJoin(adobeImages, eq(adobeImages.id_local, agPhotoProperty.photo))
    .innerJoin(agLibraryFile, eq(agLibraryFile.id_local, adobeImages.rootFile))
    .where(eq(agPhotoProperty.photo, photoId))
    .all();

  const mapping = existing.reduce(
    (result, { id_global, value }) => ({ ...result, [getGroupCategory(value)!]: id_global }),
    {} as AdjustmentsEntries,
  );

  Object.entries(adjustments).forEach(([group, value]) => {
    const id = mapping[group as AdjustmentsGroup];
    const luaValue = lua.stringify(value);

    if (!id) {
      console.log(`  - adjustment group "${group}" not found`);
      return;
    }

    const currentValue = existing.find((item) => item.id_global === id)?.value;
    const currentValueLua = lua.stringify(lua.parse(currentValue!));

    if (currentValueLua === luaValue) {
      console.debug(`  - unchanged "${group}"`);
    } else {
      console.debug(`  - updating "${group}"`);

      if (go) {
        db.update(agPhotoProperty).set({ internalValue: luaValue }).where(eq(agPhotoProperty.id_global, id)).run();
      }
    }
  });
};

export { updatePhotoAdjustments };
