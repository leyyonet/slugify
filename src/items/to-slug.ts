import { slugifyCommon } from "./slugify-common.js";
import { ToOpt, toTextOf } from "@leyyo/type";
import { optCheck, OptFn } from "@leyyo/common";

// region internal
/**
 * Clear punctuations
 *
 * @param {string} str
 * @return {string}
 * */
function _clearPunctuation(str: string): string {
  return str.replace(/[.,/#?!$%^&*;:{}=_`~()]/g, "-").trim();
}

/**
 * Clear bulk spaces
 *
 * @param {string} str
 * @return {string}
 * */
function _clearSpaces(str: string): string {
  return str.replace(/^\s+|\s+$/g, "").trim();
}

/**
 * Clear unwanted/insignificant chars
 *
 * @param {string} str
 * @return {string}
 * */
function _finalize(str: string): string {
  return str
    .replace(/[^a-z0-9-]/gi, "-") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/^-+/, "") // trim - from start of text
    .replace(/-+$/, "") // trim - from end of text
    .replace(/-+/g, "-") // collapse dashes
    .toLowerCase()
    .trim();
}

/**
 * Clear accent chars
 *
 * @param {string} str
 * @return {string}
 * */
function _accents(str: string): string {
  // eslint-disable-next-line no-control-regex
  if (/^[\x00-\x7F]+$/g.test(str)) {
    return str; // is ascii
  }
  try {
    for (const [key, accents] of slugifyCommon.charMap.entries()) {
      accents.forEach((accent) => {
        str = str.replace(accent, key);
      });
    }
  } catch (e) {
    console.log(e.message);
  }
  return str.trim();
}

/**
 * Clear special chars
 *
 * @param {string} str
 * @return {string}
 * */
function _specials(str: string): string {
  // eslint-disable-next-line no-control-regex
  if (/^[\x00-\x7F]+$/g.test(str)) {
    return str; // is ascii
  }
  try {
    for (const [k, v] of slugifyCommon.specials.entries()) {
      if (str.indexOf(k) >= 0) {
        str = str.replace(k, v as string);
      }
    }
  } catch (e) {
    console.log(e.message);
  }
  return str.trim();
}

const _fncList = [_clearPunctuation, _clearSpaces, _accents, _specials, _finalize];

function _lambda(str: string, _opt?: ToOpt): string {
  for (const fnc of _fncList) {
    str = fnc(str);
    if (!str) {
      return undefined;
    }
  }
  return str ? str : undefined;
}
// endregion internal

// noinspection JSUnusedGlobalSymbols
/**
 * Convert value as slug
 *
 * @param {any} value
 * @param {ToOpt} opt - options
 * @return {string} - slug text
 * */
export function toSlug(value: unknown, opt?: ToOpt | OptFn): string {
  const o = optCheck(opt);
  return toTextOf(value, (v) => _lambda(v, o), o);
}
