# Leyyo: Slugify

## Blueprint

### Items
| Stereotype  | Name                                                           | Props           | Description        |
|-------------|----------------------------------------------------------------|-----------------|--------------------|
| `is fnc`    | [isSlug](src/items/is-slug.ts)                                 | `P`             | is slug            |
| `to fnc`    | [toSlug](src/items/to-slug.ts)                                 | `P`             | to slug            |
| `instance`  | [slugifyCommon](src/items/slugify-common.ts)                   |                 | slug configuration |
| `error`     | [InvalidSlugError](src/error/invalid-slug.error.ts)            | `P` `F` `E` `I` |                    |
| `predictor` | [leyyoSlugifyPredictor](src/loader/leyyo-slugify-predictor.ts) |                 | predictor loader   |
| `lazy`      | [leyyoSlugifyLazy](src/loader/leyyo-slugify-lazy.ts)           |                 | lazy loader        |
> Props: `P`: **predictor**, `F`: **FQN**, `E`: **Emit**, `I`: **I18N**

### Dependencies
| Name            | Framework | Description      |
|-----------------|-----------|------------------|
| `@leyyo/type`   | √         | *toText support* |
| `@leyyo/common` | √         |                  |

### Test Cases
| Test Case          | Error          | Message                   | Method      |
|--------------------|----------------|---------------------------|-------------|
| `invalid-specials` | DeveloperError | Invalid special character | setSpecials |

## Author
- `Date` 2020-11-15
- `Name` Mustafa Yelmer
- `Repo` [github.com/leyyonet/slugify](https://github.com/leyyonet/slugify)
