import {strict as assert} from 'assert';
import {describe, it} from "node:test";
import {$test} from "@leyyo/common";
import {Slugify} from "../index";

interface TestItem {
    info: string,
    type: 'basic'|'array'|'object',
    is?: boolean,
    input: any,
    expected: any;
}
const items: Array<TestItem> = [
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

describe('10* >> Slugify', () => {
    items.forEach(item => {
        it($test.title(100, '[i] ' + item.info + '/' + item.type), () => {
            if (item.is) {
                assert.equal(Slugify.is(item.input), item.expected);
            }
            else {
                assert.equal(Slugify.cast(item.input), item.expected);
            }
        });

    });
});
