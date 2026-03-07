import { PCK } from "./internal.js";
import { defineLazy, leyyoCommonLazy } from "@leyyo/common";
import { leyyoTypeLazy } from "@leyyo/type";

// noinspection JSUnusedGlobalSymbols
export const leyyoSlugifyLazy = defineLazy(PCK)
  .dependency(leyyoCommonLazy, leyyoTypeLazy)
  .add(
    // errors
    () => import("./error/invalid-slug.error.js").then((m) => m.InvalidSlugError),
    // instances
    () => import("./items/slugify-common.js").then((m) => m.slugifyCommon),
  )
  .end();
