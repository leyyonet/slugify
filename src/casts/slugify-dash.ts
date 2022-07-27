import {RecLike} from "@leyyo/core";
import {Fqn} from "@leyyo/fqn";
import {AssignCast, CastApiDocResponse} from "@leyyo/cast";
import {FQN_NAME} from "../internal-component";
import {AbstractSlugify} from "../abstract-slugify";
import {SlugifyCast, SlugifyOpt} from "../index-types";

@Fqn(...FQN_NAME)
@AssignCast('Slugify', 'SlugifiedDash', 'Slugified')
export class SlugifyDash extends AbstractSlugify implements SlugifyCast {
    is(value: unknown, opt?: SlugifyOpt): boolean {
        return this._slugify.isDash(value, opt);
    }
    cast(value: unknown, opt?: SlugifyOpt): string {
        return this._scalar.string.ly_validate(this._slugify.toDash(value, opt), opt);
    }
    docCast(target: unknown, property: PropertyKey, openApi: RecLike, opt?: SlugifyOpt): CastApiDocResponse {
        return this._scalar.string.ly_apiDoc(target, property, openApi, {}, opt);
    }
}