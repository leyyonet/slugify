import path from "node:path";
import fs from "fs";
import {Fqn} from "@leyyo/core";
import {$is, $repo, $to} from "@leyyo/common";

import {FQN} from "../internal";
import {SlugifyConfigLike, SlugifyMap, SlugifySpecials} from "./index.types";

@Fqn(FQN)
class SlugifyConfig implements SlugifyConfigLike {
    //region properties
    protected _charMap: Map<string, Array<string | RegExp>>;
    protected _specials: Map<string, string>;
    //endregion properties

    //region private
    protected _readFile<T>(name: string) {
        const folders = ['src', 'dist'];
        let fullPath: string;
        for (const folder of folders) {
            fullPath = path.normalize(`${process.env.PWD}/${folder}/assets/${name}.json`);
            if (fs.existsSync(fullPath)) {
                return JSON.parse(fs.readFileSync(fullPath, 'utf8')) as T;
            }
        }
        return undefined;
    }
    protected _loadCharMap(): void {
        const mapJson = this._readFile<SlugifyMap>('map');
        if (!$is.bareObject(mapJson)) {
            return;
        }
        for (const [key, accents] of Object.entries(mapJson)) {
            if (Array.isArray(accents)) {
                this._charMap.set(key, []);
                accents.forEach((accent) => {
                    try {
                        this._charMap.get(key).push(new RegExp(accent, 'g'));

                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    } catch (_e) {
                        /* empty */
                    }
                });
            }
        }
    }
    protected _loadSpecials(): void {
        const special = this._readFile<SlugifySpecials>('special');
        if (!$is.bareObject(special)) {
            return;
        }
        this.setSpecials(special);
    }
    //endregion private

    // region methods
    constructor() {
        this._charMap = $repo.newMap(FQN, 'charMap');
        this._specials = $repo.newMap(FQN, 'specials');
        this._loadCharMap();
        this._loadSpecials();
    }
    clearSpecials(): void {
        this._specials.clear();
    }
    setSpecials(specials: SlugifySpecials): void {
        if ($is.bareObject(specials)) {
            for (const [k, v] of Object.entries(specials)) {
                const item = $to.text(v);
                this._specials.set(k, item ? `-${item}-` : '');
            }
        }
    }
    // endregion methods

    // region getters
    get charMap(): Map<string, Array<string | RegExp>> {
        return this._charMap;
    }
    get specials(): Map<string, string> {
        return this._specials;
    }
    // endregion getters
}
export const slugifyConfig: SlugifyConfigLike = new SlugifyConfig();
