import { definePredictor, errorPool } from "@leyyo/common";
import { PCK } from "../internal.js";

// noinspection JSUnusedGlobalSymbols
export const leyyoSlugifyPredictor = definePredictor(PCK)
  .dependency(
    () => import("@leyyo/common").then((m) => m.leyyoCommonPredictor),
    () => import("@leyyo/type").then((m) => m.leyyoTypePredictor),
  )
  //errors
  .add(() =>
    errorPool.lazy(
      PCK,
      "InvalidSlugError",
      import("../error/invalid-slug.error.js").then((m) => m.InvalidSlugError),
    ),
  )
  .end();
