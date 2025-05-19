import {Dict} from "@leyyo/common";

export interface SlugifyConfigLike {
    /**
     * Sets special chars
     *
     * @param {Dict<string>} specials
     * @param {boolean} clear
     * */
    setSpecials(specials: Dict<string>, clear: boolean): void;
    clearSpecials(): void;
    get charMap(): Map<string, Array<string|RegExp>>;
    get specials(): Map<string, string>;
}
