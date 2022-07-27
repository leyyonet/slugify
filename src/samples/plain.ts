import {FuncLike,} from "@leyyo/core";
import {ScalarTest, ScalarTestItem} from "@leyyo/scalar";
import {plainSlug} from "../index";


export function samplePlain(describe: FuncLike, it: FuncLike): void {
    const items: Array<ScalarTestItem> = [
        {
            info: 'is valid',
            type: 'basic',
            is: true,
            input: 'foobar',
            expected: true
        },
        {
            info: 'is valid',
            type: 'basic',
            is: true,
            input: 'fooBar',
            expected: false
        },
        {
            info: 'standard',
            type: 'basic',
            input: 'Hello world!',
            expected: 'helloworld'
        },
        {
            info: 'replace middle',
            type: 'basic',
            input: 'Hello /? world!',
            expected: 'helloworld'
        },
        {
            info: 'trim & convert',
            type: 'basic',
            input: '!Hello world!',
            expected: 'helloworld'
        },
        {
            info: 'plain to array',
            type: 'array',
            input: 'Hello world!',
            expected: ['helloworld']
        },
        {
            info: 'to array',
            type: 'array',
            input: ["€1000","İSTANBUL/TÜRKİYE"],
            expected: ["euro1000","istanbulturkiye"]
        },
        {
            info: 'is array',
            type: 'array',
            is: true,
            input: ["euro1000","istanbulturkiye"],
            expected: true
        },
        {
            info: 'is array',
            type: 'array',
            is: true,
            input: ["€1000","İSTANBUL/TÜRKİYE"],
            expected: false
        },
        {
            info: 'to object',
            type: 'object',
            input: {price: '€1000', place: 'İSTANBUL/TÜRKİYE'},
            expected: {price: "euro1000", place: "istanbulturkiye"}
        },
        {
            info: 'is object',
            type: 'object',
            input: {price: "euro1000", place: "istanbulturkiye"},
            expected: true,
            is: true,
        },
        {
            info: 'is object',
            type: 'object',
            input: {price: '€1000', place: 'İSTANBUL/TÜRKİYE'},
            expected: false,
            is: true,
        },
    ];
   ScalarTest.run({describe, it, cast: plainSlug, items});
}