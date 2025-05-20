import {Loader} from "@leyyo/injection";
import {Fqn} from "@leyyo/core";
import {FQN_PCK} from "./internal";
import {slugifyConfig} from "./config";
import {IsSlug, Slugify, ToSlug} from "./base";

@Loader(
    slugifyConfig,
    Slugify, IsSlug, ToSlug
)
@Fqn(FQN_PCK)
export class SlugifyLoader {}
