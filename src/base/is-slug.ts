import {decoratorPool} from "@leyyo/core";
import {
    IdValidator,
    Placeholder,
    ValidatorMetadata,
    ValidatorOpt,
    ValidatorOptExt,
    ValidatorParam,
    validatorPool,
    ValidatorStored
} from "@leyyo/validator";
import {CallParams} from "@leyyo/http-call";
import {FQN} from "../internal";
import {Slugify} from "./slugify";

type H = Placeholder;
type P = CallParams;
type E = string;

/**
 * Data must be slugified
 *
 * Conditions
 * - string
 *
 * Relations
 */
export function IsSlug(opt?: ValidatorOpt): PropertyDecorator;
export function IsSlug(opt?: ValidatorOpt): ParameterDecorator;
export function IsSlug(opt?: ValidatorOptExt): ClassDecorator;
export function IsSlug(opt?: ValidatorOptExt): MethodDecorator;
export function IsSlug(opt?: ValidatorOpt | ValidatorOptExt): PropertyDecorator | ParameterDecorator | ClassDecorator | MethodDecorator {
    return (clazz: object, property?: PropertyKey, index?: number) =>
        deco.process([clazz, property, index], {opt});
}

const deco = decoratorPool.newId<ValidatorStored<P>, ValidatorMetadata<P, H, E>, ValidatorParam>(IsSlug)
    .fqn(FQN)
    .targets('field', 'parameter')
    .keywords(IdValidator)
    .keywords('ph:field', 'ph:deco', 'ph:data')
    .processor((ins, p) => {
        const opt = validatorPool.options(ins, p.opt);
        const params = {} as P;
        ins.set({opt, params});
    })
    .metadata({
        error: '{{field}} must be all caps',
        is: (data) => typeof data === 'string',
        validates: (data, current) => {

            if (!Slugify.exact(data)) {
                return current.failed({});
            }

            return current.ignored();
        }
    });
