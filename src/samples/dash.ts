import {FuncLike,} from "@leyyo/core";
import {ScalarTest, ScalarTestItem} from "@leyyo/scalar";
import {dashSlug} from "../index";


export function sampleDash(describe: FuncLike, it: FuncLike): void {
    const items: Array<ScalarTestItem> = [
        {
            info: 'is valid',
            type: 'basic',
            is: true,
            input: 'foo-bar',
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
            expected: 'hello-world'
        },
        {
            info: 'replace middle',
            type: 'basic',
            input: 'Hello /? world!',
            expected: 'hello-world'
        },
        {
            info: 'trim & convert',
            type: 'basic',
            input: '!Hello world!',
            expected: 'hello-world'
        },
        {
            info: 'plain to array',
            type: 'array',
            input: 'Hello world!',
            expected: ['hello-world']
        },
        {
            info: 'to array',
            type: 'array',
            input: ["€1000","İSTANBUL/TÜRKİYE"],
            expected: ["euro-1000","istanbul-turkiye"]
        },
        {
            info: 'is array',
            type: 'array',
            is: true,
            input: ["euro-1000","istanbul-turkiye"],
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
            expected: {price: "euro-1000", place: "istanbul-turkiye"}
        },
        {
            info: 'is object',
            type: 'object',
            input: {price: "euro-1000", place: "istanbul-turkiye"},
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
   ScalarTest.run({describe, it, cast: dashSlug, items});
}