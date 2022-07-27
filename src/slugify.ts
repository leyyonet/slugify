import {leyyo, RecLike} from "@leyyo/core";
import {Fqn} from "@leyyo/fqn";
import {scalar} from "@leyyo/scalar";
import {SlugifyCast, SlugifyLike, SlugifyOpt} from "./index-types";
import {COMPONENT_NAME, FQN_NAME} from "./internal-component";
import * as mapJson from "./assets/map.json";
import * as specialJson from './assets/special.json';
import {SlugifyDash, SlugifyKeyword, SlugifyPlain} from "./casts";


@Fqn(...FQN_NAME)
export class Slugify implements SlugifyLike {
    //region properties
    protected _charMap: Map<string, Array<string|RegExp>>;
    protected _specials: Map<string, string>;
    protected readonly _dash: SlugifyCast;
    protected readonly _keyword: SlugifyCast;
    protected readonly _plain: SlugifyCast;
    //endregion properties
    //region private
    protected _buildRegexp(): void {
        for (const [key, accents] of Object.entries(mapJson)) {
            if (leyyo.is.array(accents, true)) {
                this._charMap.set(key, []);
                accents.forEach(accent => {
                    try {
                        this._charMap.get(key).push(new RegExp(accent, 'g'));
                    } catch (e) {

                    }
                });
            }
        }
    }
    //endregion private

    // region methods
    constructor() {
        leyyo.component.add(COMPONENT_NAME);
        this._charMap = leyyo.repo.newMap(this, '_charMap');
        this._specials = leyyo.repo.newMap(this, '_specials');
        this._buildRegexp();
        this.setSpecials(specialJson);
        this._dash = new SlugifyDash(this);
        this._keyword = new SlugifyKeyword(this);
        this._plain = new SlugifyPlain(this);
    }
    initialize(): void {
        scalar.initialize();
    }
    clearSpecials(): void {
        this._specials.clear();
    }
    setSpecials(specials: RecLike<string>): void {
        if (leyyo.is.object(specials, true)) {
            for (const [k, v] of Object.entries(specials)) {
                const item = leyyo.primitive.text(v);
                this._specials.set(k, item ? `-${item}-` : '');
            }
        }
    }
    toDash(value: unknown, opt?: SlugifyOpt): string {
        let str = leyyo.primitive.text(value, opt);
        if (!str) {
            return null;
        }
        str = str.replace(/^\s+|\s+$/g, '').trim();
        if (str === '') {
            return null;
        }
        for (const [k, v] of this._specials.entries()) {
            if (str.indexOf(k) >= 0) {
                str = str.replace(k, v as string);
            }
        }
        // remove accents, swap ñ for n, etc
        for (const [key, accents] of this._charMap.entries()) {
            accents.forEach((accent) => {
                str = str.replace(accent, key);
            })
        }
        str = str
            .replace(/[^a-z0-9-]/gi, '-') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/^-+/, '') // trim - from start of text
            .replace(/-+$/, '') // trim - from end of text
            .replace(/-+/g, '-') // collapse dashes
            .toLowerCase()
        ;
        return (str === '' || str === '-') ? null : str;
    }
    isDash(value: unknown, opt?: SlugifyOpt): boolean {
        return typeof value === 'string' && !/[^0-9a-z-]/.test(value);
    }
    // endregion methods

    // region getters
    get dash(): SlugifyCast {
        return this._dash;
    }

    get keyword(): SlugifyCast {
        return this._keyword;
    }

    get plain(): SlugifyCast {
        return this._plain;
    }
    get charMap(): Map<string, Array<string|RegExp>> {
        return this._charMap;
    }
    get specials(): Map<string, string> {
        return this._specials;
    }
    // endregion getters
}