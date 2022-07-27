import {AbstractScalar, scalar} from "@leyyo/scalar";
import {SlugifyLike, SlugifyOpt} from "./index-types";

export abstract class AbstractSlugify extends AbstractScalar<string, SlugifyOpt> {
    protected readonly _slugify: SlugifyLike;
    constructor(slugify: SlugifyLike) {
        super(scalar);
        this._slugify = slugify;
    }
}