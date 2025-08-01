#!/usr/bin/env bun

import Bun from "bun";
import { CONSTANTS } from "./constants";
import { updateGeneralEntries } from "./db/mutations/update-general-entries";
import { updatePhotoAdjustments } from "./db/mutations/update-photo-adjustments";
import { openCatalog } from "./db/open-catalog";
import type { Sidecar } from "./types";
import { usage } from "./usage";
import { getCurrentDirSidecars } from "./utils/get-current-dir-sidecars";
import { getSidecars } from "./utils/get-sidecars";

const { go, catalog, updateCatalog, updateSidecar, all } = usage();
const db = openCatalog(catalog);
const cwd = `${process.cwd()}/`;

console.debug("= lightroom catalog:", catalog);

if (updateSidecar) {
  console.debug(`= syncing: .lrcat → .${CONSTANTS.SIDECAR_EXTENSION}`, all ? "" : `starting from ${cwd}`);
  const sidecars = getSidecars(db);

  Object.entries(sidecars).forEach(async ([sidecar, data]) => {
    if (!all && !sidecar.startsWith(cwd)) {
      console.debug(`- skipping: ${sidecar}`);
      return;
    }

    if (go) {
      console.debug(`- updating: ${sidecar}`);
      await Bun.write(sidecar, JSON.stringify(data, null, 2));
    } else {
      console.debug(`- updating: ${sidecar}`, data);
    }
  });
}

if (updateCatalog) {
  console.debug(`= syncing: .${CONSTANTS.SIDECAR_EXTENSION} → .lrcat → starting from ${cwd}`);
  const sidecars = await getCurrentDirSidecars();

  sidecars.forEach(async (name) => {
    const content = await Bun.file(name).text();
    const data = JSON.parse(content) as Sidecar;
    const { photo, general, adjustments } = data;

    photo.absolutePath = cwd;
    updateGeneralEntries(db, photo, general, go);
    updatePhotoAdjustments(db, photo, adjustments, go);
  });
}
