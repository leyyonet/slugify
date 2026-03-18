import { PCK } from "../internal.js";
import { defineLazy } from "@leyyo/common";

// noinspection JSUnusedGlobalSymbols
export const leyyoSlugifyLazy = defineLazy(PCK)
  .dependency(
    () => import("@leyyo/common").then((m) => m.leyyoCommonLazy),
    () => import("@leyyo/type").then((m) => m.leyyoTypeLazy),
  )
  .add(
    // errors
    () => import("../error/invalid-slug.error.js").then((m) => m.InvalidSlugError),
    // instances
    () => import("../items/slugify-common.js").then((m) => m.slugifyCommon),
  )
  .end();
