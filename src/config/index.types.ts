export interface SlugifyConfigLike {
    /**
     * Sets special chars
     *
     * @param {SlugifySpecials} specials
     * @param {boolean} clear
     * */
    setSpecials(specials: SlugifySpecials, clear: boolean): void;
    clearSpecials(): void;
    get charMap(): Map<string, Array<string|RegExp>>;
    get specials(): Map<string, string>;
}

export type SlugifyMap = Record<string, Array<string|RegExp>>;
export type SlugifySpecials = Record<string, string>;
