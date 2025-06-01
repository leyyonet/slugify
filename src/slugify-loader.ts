import {Loader} from "@leyyo/injection";
import {Fqn} from "@leyyo/core";
import {FQN} from "./internal";
import {slugifyConfig} from "./config";
import {IsSlug, Slugify, ToSlug} from "./base";

@Loader(
    slugifyConfig,
    Slugify, IsSlug, ToSlug
)
@Fqn(FQN)
export class SlugifyLoader {}
