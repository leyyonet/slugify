import {strict as assert} from 'assert';
import {Slugify} from "../src";

interface TestItem {
    info: string,
    is?: boolean,
    input: unknown,
    expected: unknown;
}
const items: Array<TestItem> = [
    {
        info: undefined,
        is: true,
        input: 'foo-bar',
        expected: true
    },
    {
        info: undefined,
        is: true,
        input: 'fooBar',
        expected: false
    },
    {
        info: undefined,
        input: 'Hello world!',
        expected: 'hello-world'
    },
    {
        info: 'replace middle',
        input: 'Hello /? world!',
        expected: 'hello-world'
    },
    {
        info: 'trim & convert',
        input: '!Hello world!',
        expected: 'hello-world'
    },
    {
        info: 'utf8 chars',
        input: 'fıstıkçı şahap',
        expected: 'fistikci-sahap'
    },
    {
        info: 'specials',
        input: '100 €',
        expected: '100-euro'
    },
];

describe('10* >> Slugify', () => {
    items.forEach(item => {

        it(item.info ?? item.input + (item.is ? ' (is)' : ''), () => {
            if (item.is) {
                assert.equal(Slugify.exact(item.input), item.expected);
            }
            else {
                assert.equal(Slugify.cast(item.input), item.expected);
            }
        });

    });
});
