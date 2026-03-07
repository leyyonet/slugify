import {definePredictor, errorPool, leyyoCommonPredictor} from "@leyyo/common";
import { PCK } from "../internal.js";
import {leyyoTypePredictor} from "@leyyo/type";

// noinspection JSUnusedGlobalSymbols
export const leyyoSlugifyForetell = definePredictor(PCK)
  .dependency(leyyoCommonPredictor, leyyoTypePredictor)
  //errors
  .add(() =>
    errorPool.lazy(
      PCK,
      "InvalidSlugError",
      import("../error/invalid-slug.error.js").then((m) => m.InvalidSlugError),
    ),
  )
  .end();
