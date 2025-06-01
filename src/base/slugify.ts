import {$to} from "@leyyo/common";
import {Fqn} from "@leyyo/core";

import {FQN} from "../internal";
import {slugifyConfig} from "../config";
import {CastAlias, CastBasic, CastDocCallback, CastDocResponse} from "@leyyo/cast";

@Fqn(FQN)
@CastBasic()
@CastAlias('Slug', 'Slugified')
export class Slugify {
    protected static readonly PATTERN = /[^0-9a-z-]/;
    protected static readonly REPLACER_FIRST = /^\s+|\s+$/g;
    protected static readonly REPLACER_INVALID = /[^a-z0-9-]/gi;
    protected static readonly REPLACER_WHITESPACE = /\s+/g;
    protected static readonly REPLACER_COLLAPSE = /-+/g;
    protected static readonly TRIM_START = /^-+/;
    protected static readonly TRIM_END = /-+$/;
    protected static readonly EMPTY = ['', '-'];

    static canBe(value: unknown): boolean {
        return typeof value === 'string';
    }

    static exact(value: unknown): boolean {
        return typeof value === 'string' && this.PATTERN.test(value);
    }

    static cast(value: unknown): string {
        let str = $to.text(value);
        if (!str) {
            return undefined;
        }
        str = str.replace(this.REPLACER_FIRST, '').trim();
        if (str === '') {
            return undefined;
        }
        for (const [k, v] of slugifyConfig.specials.entries()) {
            if (str.indexOf(k) >= 0) {
                str = str.replace(k, v as string);
            }
        }
        // remove accents, swap ñ for n, etc
        for (const [key, accents] of slugifyConfig.charMap.entries()) {
            accents.forEach((accent) => {
                str = str.replace(accent, key);
            })
        }
        str = str
            .replace(this.REPLACER_INVALID, '-') // remove invalid chars
            .replace(this.REPLACER_WHITESPACE, '-') // collapse whitespace and replace by -
            .replace(this.TRIM_START, '') // trim - from start of text
            .replace(this.TRIM_END, '') // trim - from end of text
            .replace(this.REPLACER_COLLAPSE, '-') // collapse dashes
            .toLowerCase()
        ;
        return this.EMPTY.includes(str) ? str : undefined;
    }

    static doc(openApi: CastDocCallback): CastDocResponse {
        return openApi(this, { type: 'string', format: 'slugify' });
    }
}
