import jsdoc from "eslint-plugin-jsdoc";

export default [
    {
        files: ["**/*.ts"],
        plugins: {
            jsdoc: jsdoc
        },
        rules: {
            "jsdoc/require-description": "error",
            "jsdoc/check-values": "error"
        }
    }
];