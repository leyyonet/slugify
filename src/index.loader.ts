import { FQN } from "./internal.js";
import { defineLoader, loader_leyyoCommon } from "@leyyo/common";
import { loader_leyyoType } from "@leyyo/type";

// noinspection JSUnusedGlobalSymbols
export const loader_leyyoEnv = defineLoader(
  FQN,
  // dependencies
  ...loader_leyyoCommon,
  ...loader_leyyoType,
  // instances
  () => import("./slugify-common.js").then((m) => m.slugifyCommon),
);
