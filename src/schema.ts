import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const agPhotoProperty = sqliteTable("AgPhotoProperty", {
  id_global: text("id_global"),
  id_local: integer("id_local").primaryKey(),
  internalValue: text("internalValue"),
  photo: integer("photo"),
});

const adobeImages = sqliteTable("Adobe_images", {
  id_local: integer("id_local").primaryKey(),
  rootFile: integer("rootFile"),
});

const agLibraryFile = sqliteTable("AgLibraryFile", {
  baseName: text("baseName"),
  extension: text("extension"),
  folder: integer("folder"),
  id_local: integer("id_local").primaryKey(),
});

const agLibraryFolder = sqliteTable("AgLibraryFolder", {
  id_local: integer("id_local").primaryKey(),
  pathFromRoot: text("pathFromRoot"),
  rootFolder: integer("rootFolder"),
});

const agLibraryRootFolder = sqliteTable("AgLibraryRootFolder", {
  absolutePath: text("absolutePath"),
  id_local: integer("id_local").primaryKey(),
});

const agSearchablePhotoProperty = sqliteTable("AgSearchablePhotoProperty", {
  id_local: integer("id_local").primaryKey(),
  internalValue: text("internalValue"),
  photo: integer("photo"),
  propertySpec: integer("propertySpec"),
});

const agPhotoPropertySpec = sqliteTable("AgPhotoPropertySpec", {
  id_local: integer("id_local").primaryKey(),
  key: text("key"),
});

export {
  agPhotoProperty,
  adobeImages,
  agLibraryFile,
  agLibraryFolder,
  agLibraryRootFolder,
  agSearchablePhotoProperty,
  agPhotoPropertySpec,
};
