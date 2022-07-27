// noinspection JSUnusedGlobalSymbols

export * from './abstract-slugify';
export * from './index-types';
export * from './slugify';
export * from './casts';

import {SlugifyLike} from "./index-types";
import {Slugify} from "./slugify";

export const slugify: SlugifyLike = new Slugify();
export const plainSlug = slugify.plain;
export const dashSlug = slugify.dash;
export const keywordSlug = slugify.keyword;