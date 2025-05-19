import {Fqn} from "@leyyo/core";
import {$descriptor, $is, $repo} from "@leyyo/common";
import {$to, Dict} from "@leyyo/common";

import {FQN_PCK} from "../internal";
import {SlugifyConfigLike} from "./index.types";
import * as mapJson from "../assets/map.json";
import * as specialJson from '../assets/special.json';

@Fqn(FQN_PCK)
class SlugifyConfig implements SlugifyConfigLike {
    //region properties
    protected _charMap: Map<string, Array<string|RegExp>>;
    protected _specials: Map<string, string>;
    //endregion properties

    //region private
    protected _buildRegexp(): void {
        for (const [key, accents] of Object.entries(mapJson)) {
            if (Array.isArray(accents)) {
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
        this._charMap = $repo.newMap($descriptor.sym(FQN_PCK, 'charMap'));
        this._specials = $repo.newMap($descriptor.sym(FQN_PCK, 'specials'));
        this._buildRegexp();
        this.setSpecials(specialJson);
    }
    clearSpecials(): void {
        this._specials.clear();
    }
    setSpecials(specials: Dict<string>): void {
        if ($is.bareObject(specials)) {
            for (const [k, v] of Object.entries(specials)) {
                const item = $to.text(v);
                this._specials.set(k, item ? `-${item}-` : '');
            }
        }
    }
    // endregion methods

    // region getters
    get charMap(): Map<string, Array<string|RegExp>> {
        return this._charMap;
    }
    get specials(): Map<string, string> {
        return this._specials;
    }
    // endregion getters
}
export const slugifyConfig: SlugifyConfigLike = new SlugifyConfig();
