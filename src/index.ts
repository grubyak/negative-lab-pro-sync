#!/usr/bin/env bun

import Bun from "bun";
import { getSidecars } from "./catalog/get-sidecars";
import { updateGeneralEntries } from "./db/mutations/update-general-entries";
import { updatePhotoAdjustments } from "./db/mutations/update-photo-adjustments";
import type { Sidecar } from "./types";
import { getCurrentDirSidecars } from "./utils/get-current-dir-sidecars";
import { openCatalog } from "./utils/open-catalog";
import { usage } from "./utils/usage";

const { go, catalog, updateCatalog, updateSidecar } = usage();
const db = openCatalog(catalog);

console.debug("= lightroom catalog", catalog);

if (updateSidecar) {
  const sidecars = getSidecars(db);

  Object.entries(sidecars).forEach(async ([sidecar, data]) => {
    if (go) {
      console.debug(`- updating: ${sidecar}`);
      await Bun.write(sidecar, JSON.stringify(data, null, 2));
    } else {
      console.debug(`- updating: ${sidecar}`, data);
    }
  });
}

if (updateCatalog) {
  const absolutePath = process.cwd();
  const sidecars = await getCurrentDirSidecars();

  sidecars.forEach(async (name) => {
    const content = await Bun.file(name).text();
    const data = JSON.parse(content) as Sidecar;
    const { photo, general, adjustments } = data;

    photo.absolutePath = absolutePath;
    updateGeneralEntries(db, photo, general, go);
    updatePhotoAdjustments(db, photo, adjustments, go);
  });
}
