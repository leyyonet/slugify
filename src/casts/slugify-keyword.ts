import {RecLike} from "@leyyo/core";
import {Fqn} from "@leyyo/fqn";
import {AssignCast, CastApiDocResponse} from "@leyyo/cast";
import {FQN_NAME} from "../internal-component";
import {AbstractSlugify} from "../abstract-slugify";
import {SlugifyCast, SlugifyOpt} from "../index-types";

@Fqn(...FQN_NAME)
@AssignCast('SlugifiedKeyword')
export class SlugifyKeyword extends AbstractSlugify implements SlugifyCast {
    is(value: unknown, opt?: SlugifyOpt): boolean {
        return typeof value === 'string' && !/[^0-9a-z%]/.test(value);
    }
    cast(value: unknown, opt?: SlugifyOpt): string {
        let text = this._slugify.toDash(value, opt);
        if (text) {
            text = text.split('-').join('%').trim();
            if (text === '' || text === '%') {
                text = null;
            }
        }
        return this._scalar.string.ly_validate(text, opt);
    }
    docCast(target: unknown, property: PropertyKey, openApi: RecLike, opt?: SlugifyOpt): CastApiDocResponse {
        return this._scalar.string.ly_apiDoc(target, property, openApi, {}, opt);
    }
}