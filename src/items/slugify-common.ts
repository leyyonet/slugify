import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "node:path";
import fs from "fs";
import { DeveloperError, isEmpty, isObj, isText, repoCommon, testCase } from "@leyyo/common";
import { PCK } from "../internal.js";
import { SlugifyCommonLike, SlugifyMap, SlugifySpecials } from "../type.js";

class SlugifyCommon implements SlugifyCommonLike {
  //region properties
  protected _charMap: Map<string, Array<string | RegExp>>;
  protected _specials: Map<string, string>;
  //endregion properties

  //region private
  protected _readFile<T>(name: string) {
    const __dirname = dirname(dirname(fileURLToPath(import.meta.url)));
    const fullPath = path.normalize(`${__dirname}/assets/${name}.json`);
    if (fs.existsSync(fullPath)) {
      return JSON.parse(fs.readFileSync(fullPath, "utf8")) as T;
    }
    return undefined;
  }
  protected _loadCharMap(): void {
    const mapJson = this._readFile<SlugifyMap>("map");
    if (!isObj(mapJson)) {
      return;
    }
    for (const [key, accents] of Object.entries(mapJson)) {
      if (Array.isArray(accents)) {
        this._charMap.set(key, []);
        accents.forEach((accent) => {
          try {
            this._charMap.get(key).push(new RegExp(accent, "g"));
          } catch (_e) {
            /* empty */
          }
        });
      }
    }
  }
  protected _loadSpecials(): void {
    const special = this._readFile<SlugifySpecials>("special");
    if (!isObj(special)) {
      return;
    }
    this.setSpecials(special);
  }
  //endregion private

  // region methods
  constructor() {
    this._charMap = repoCommon.newMap(`${PCK}.charMap`);
    this._specials = repoCommon.newMap(`${PCK}.specials`);
    this._loadCharMap();
    this._loadSpecials();
  }
  clearSpecials(): void {
    this._specials.clear();
  }
  setSpecials(specials: SlugifySpecials): void {
    if (isObj(specials)) {
      for (const [k, v] of Object.entries(specials)) {
        if (isEmpty(v)) {
          this._specials.set(k, "");
        } else if (!isText(v)) {
          throw new DeveloperError("Invalid special character", testCase(PCK, "invalid-specials"));
        }
        this._specials.set(k, v as string);
      }
    }
  }
  // endregion methods

  // region getters
  get charMap(): Map<string, Array<string | RegExp>> {
    return this._charMap;
  }
  get specials(): Map<string, string> {
    return this._specials;
  }
  // endregion getters
}
export const slugifyCommon: SlugifyCommonLike = new SlugifyCommon();
