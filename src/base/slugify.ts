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

    private static _replaceChars(str: string): string {
        // eslint-disable-next-line no-control-regex
        if (/^[\x00-\x7F]+$/g.test(str)) {
            return str; // is ascii
        }
        try {
            for (const [key, accents] of slugifyConfig.charMap.entries()) {
                accents.forEach((accent) => {
                    str = str.replace(accent, key);
                });
            }
        } catch (e) {
            console.log(e.message);
        }
        return str;
    }
    private static _replaceSpecials(str: string): string {
        try {
            for (const [k, v] of slugifyConfig.specials.entries()) {
                if (str.indexOf(k) >= 0) {
                    str = str.replace(k, v as string);
                }
            }
        }
        catch (e) {
            console.log(e.message);
        }
        return str;
    }
    static _finalize(str: string): string {
        return str
            .replace(/[^a-z0-9-]/gi, '-') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/^-+/, '') // trim - from start of text
            .replace(/-+$/, '') // trim - from end of text
            .replace(/-+/g, '-') // collapse dashes
            .toLowerCase()
        ;
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
        str = replaceAccents(str);
        str = replaceSpecials(str);
        str = finalize(str);
        return this.EMPTY.includes(str) ? undefined : str;
    }

    static doc(openApi: CastDocCallback): CastDocResponse {
        return openApi(this, { type: 'string', format: 'slugify' });
    }
}
export const Slug = Slugify;

const finalize = (str: string): string => str
    .replace(/[^a-z0-9-]/gi, '-') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/^-+/, '') // trim - from start of text
    .replace(/-+$/, '') // trim - from end of text
    .replace(/-+/g, '-') // collapse dashes
    .toLowerCase();

const replaceAccents = (str: string): string => {
    // eslint-disable-next-line no-control-regex
    if (/^[\x00-\x7F]+$/g.test(str)) {
        return str; // is ascii
    }
    try {
        for (const [k, v] of slugifyConfig.specials.entries()) {
            if (str.indexOf(k) >= 0) {
                str = str.replace(k, v as string);
            }
        }
    }
    catch (e) {
        console.log(e.message);
    }
    return str;
};
const replaceSpecials = (str: string): string => {
    // eslint-disable-next-line no-control-regex
    if (/^[\x00-\x7F]+$/g.test(str)) {
        return str; // is ascii
    }
    try {
        for (const [key, accents] of slugifyConfig.charMap.entries()) {
            accents.forEach((accent) => {
                str = str.replace(accent, key);
            });
        }
    } catch (e) {
        console.log(e.message);
    }
    return str;
};
