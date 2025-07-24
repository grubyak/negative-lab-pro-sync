#!/usr/bin/env bun

import Bun from "bun";
import { getSidecars } from "./catalog/get-sidecars";
import { updateGeneralEntries } from "./db/mutations/update-general-entries";
import type { GeneralEntries } from "./types";
import { openCatalog } from "./utils/open-catalog";
import { usage } from "./utils/usage";

const { go, updateCatalog, updateSidecar } = usage();
const db = openCatalog();

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
  // todo: iterate sidecars in current folder, take current path (absolutePath)
  const absolutePath = "/Users/artur/Desktop/can-delete/";

  updateGeneralEntries(
    db,
    {
      absolutePath,
      baseName: "aaabbbccc",
      extension: "CR3",
      pathFromRoot: "",
    },
    {
      nlpColor: "custom",
      nlpColorModel: "blackandwhite",
      nlpConverted: "converted",
      nlpLUT: "Frontier",
      nlpPreSaturation: "3",
      nlpSource: "cameraScan",
      nlpTones: "linear",
      nlpVersion: "3.0.2",
    } as GeneralEntries,
    go,
  );

  //   updateNegativeLabProPhotoAdjustments(
  //     db,
  //     {
  //       absolutePath: "/Users/artur/Desktop/can-delete/",
  //       baseName: "aaabbbccc",
  //       extension: "CR3",
  //       pathFromRoot: "",
  //     },
  //     adjustments
  //   );
}

// writing back adjustments to catalog
// - make a query to get 3 uuids, classify { core: 'uuid', ... }
// - if i get full mapping - writing back possible

// test
// - nlp some files
// - adjust nlp
// - create sidecars
// - remove files from catalog
// - move files to another folder
// - nlp again - just defaults
// - apply adjustments from sidecars
// - open nlp and confirm that adjustments are visible
