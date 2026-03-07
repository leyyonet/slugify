import { isText } from "@leyyo/common";

const _pattern = /^[a-z0-9]*(-[a-z0-9]+)*$/g;

/**
 * check that value is slug
 *
 * @param {any} value
 * @return {boolean}
 * */
export function isSlug(value: unknown): boolean {
  return isText(value) && _pattern.test(value as string);
}
