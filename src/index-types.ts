import {RecLike, TypeOpt} from "@leyyo/core";
import {ScalarItemCast} from "@leyyo/scalar";

// region cast
export type SlugifyAlias = string;
export type SlugifyOpt = TypeOpt;
export type SlugifyCast = ScalarItemCast<SlugifyAlias, SlugifyOpt>;
// endregion cast

export interface SlugifyLike {
    initialize(): void;
    /**
     * Sets special chars
     *
     * @param {RecLike<string>} specials
     * @param {boolean} clear
     * */
    setSpecials(specials: RecLike<string>, clear: boolean): void;
    clearSpecials(): void;
    /**
     * Converts dash-style text, "foo-bar"
     *
     * @param {unknown} value
     * @param {?SlugifyOpt} opt
     * @returns {(string | null)}
     * */
    toDash(value: unknown, opt?: SlugifyOpt): string;
    isDash(value: unknown, opt?: SlugifyOpt): boolean;
    get dash(): SlugifyCast;
    get keyword(): SlugifyCast;
    get plain(): SlugifyCast;
    get charMap(): Map<string, Array<string|RegExp>>;
    get specials(): Map<string, string>;
}
