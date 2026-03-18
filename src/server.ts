import { toSlug } from "./items/to-slug.js";

interface TestItem {
  input: string;
  expected: string;
}
const chars = [{ input: "Hello world", expected: "hello-world" }] as Array<TestItem>;

chars.forEach((char) => {
  const current = toSlug(char.input);
  console.log(`input: ${char.input}, current: ${current}, expected: ${char.expected}`);
});
