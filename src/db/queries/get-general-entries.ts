import { and, eq, like } from "drizzle-orm";
import { CONSTANTS } from "../../commons/constants";
import { agPhotoPropertySpec, agSearchablePhotoProperty } from "../../schema";
import type { DB, GeneralEntries, GeneralEntriesKey } from "../../types";

const getGeneralEntries = (db: DB, id: number) =>
  db
    .select({
      key: agPhotoPropertySpec.key,
      value: agSearchablePhotoProperty.internalValue,
    })
    .from(agSearchablePhotoProperty)
    .innerJoin(agPhotoPropertySpec, eq(agPhotoPropertySpec.id_local, agSearchablePhotoProperty.propertySpec))
    .where(and(eq(agSearchablePhotoProperty.photo, id), like(agPhotoPropertySpec.key, CONSTANTS.NLP_PROPERTY_MATCH)))
    .all()
    .reduce((result, { key, value }) => ({ ...result, [key as GeneralEntriesKey]: value }), {} as GeneralEntries);

export { getGeneralEntries };
