import {$is, $to} from "@leyyo/common";
import {Fqn} from "@leyyo/core";

import {FQN} from "../internal";
import {slugifyConfig} from "../config";
import {CastAlias, CastBasic, CastDocCallback, CastDocResponse} from "@leyyo/cast";

@Fqn(FQN)
@CastBasic()
@CastAlias('Slug')
export class Slugify {
    private static readonly EMPTY = ['', '-'];

    static canBe(value: unknown): boolean {
        return typeof value === 'string';
    }

    static exact(value: unknown): boolean {
        return $is.text(value) && /^[a-z0-9]*(-[a-z0-9]+)*$/g.test(value as string);
    }

    static cast(value: unknown): string {
        let str = $to.text(value);
        if (!str) {
            return undefined;
        }
        str = str.replace(/[.,/#!$%^&*;:{}=_`~()]/g, '');
        if (str === '') {
            return undefined;
        }
        if (this.exact(str)) {
            return str;
        }

        str = str.replace(/^\s+|\s+$/g, '').trim();
        if (str === '') {
            return undefined;
        }
/*
        for (const [k, v] of slugifyConfig.specials.entries()) {
            if (str.indexOf(k) >= 0) {
                str = str.replace(k, v as string);
            }
        }
*/
        const aa = slugifyConfig.charMap;
        // remove accents, swap ñ for n, etc
        for (const [key, accents] of slugifyConfig.charMap.entries()) {
            accents.forEach((accent) => {
                str = str.replace(accent, key);
            });
        }
        str = str
            .replace(/[^a-z0-9-]/gi, '-') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/^-+/, '') // trim - from start of text
            .replace(/-+$/, '') // trim - from end of text
            .replace(/-+/g, '-') // collapse dashes
            .toLowerCase()
        ;
        return this.EMPTY.includes(str) ? str : undefined;
    }

    static doc(openApi: CastDocCallback): CastDocResponse {
        return openApi(this, { type: 'string', format: 'slugify' });
    }
}
export const Slug = Slugify;
