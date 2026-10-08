import js from "@eslint/js";
import sonarjs from "eslint-plugin-sonarjs";

export default [
    js.configs.recommended,
    sonarjs.configs.recommended,
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "commonjs",
            globals: {
                node: true,
                jest: true,
                require: "readonly",
                module: "readonly",
                exports: "writable",
                __dirname: "readonly",
                __filename: "readonly",
                process: "readonly",
                console: "readonly",
                describe: "readonly",
                test: "readonly",
                it: "readonly",
                expect: "readonly",
                beforeEach: "readonly",
                afterEach: "readonly",
                beforeAll: "readonly",
                afterAll: "readonly"
            }
        },
        rules: {
            "no-unused-vars": "warn"
        }
    }
];
