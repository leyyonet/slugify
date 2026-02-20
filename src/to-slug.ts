import { slugifyCommon } from "./slugify-common.js";
import { toTextValue } from "@leyyo/type";
import { ToOpt, ToOptFn } from "@leyyo/type";
import { isSlug } from "./is-slug.js";

// noinspection JSUnusedGlobalSymbols
/**
 * Convert value as slug
 *
 * @param {any} value
 * @param {ToOpt} opt - options
 * @return {string} - slug text
 * */
export function toSlug(value: unknown, opt?: ToOpt | ToOptFn): string {
  let str = toTextValue(value, opt);
  if (!str) {
    return undefined;
  }
  str = str.replace(/[.,/#!$%^&*;:{}=_`~()]/g, "").trim();
  if (!str) {
    return toTextValue(str, opt);
  }
  if (isSlug(str)) {
    return str;
  }

  str = str.replace(/^\s+|\s+$/g, "").trim();
  if (!str) {
    return toTextValue(str, opt);
  }
  str = replaceAccents(str);
  str = replaceSpecials(str);
  str = finalize(str);
  return toTextValue(str, opt);
}

/**
 * Clear unwanted/insignificant chars
 *
 * @param {string} str
 * @return {string}
 * */
function finalize(str: string): string {
  return str
    .replace(/[^a-z0-9-]/gi, "-") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/^-+/, "") // trim - from start of text
    .replace(/-+$/, "") // trim - from end of text
    .replace(/-+/g, "-") // collapse dashes
    .toLowerCase();
}

/**
 * Clear accent chars
 *
 * @param {string} str
 * @return {string}
 * */
function replaceAccents(str: string): string {
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
  return str;
}

/**
 * Clear special chars
 *
 * @param {string} str
 * @return {string}
 * */
function replaceSpecials(str: string): string {
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
  return str;
}
