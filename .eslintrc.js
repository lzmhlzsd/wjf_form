module.exports = {
    root: true,
    extends: "standard",
    parser: "babel-eslint",
    plugins: [],
    env: {
        browser: true
    },
    parserOptions: {
        sourceType: "module",
        allowImportExportEverywhere: true //ignore eslint error: 'import' and 'export' may only appear at the top level
    },
    rules: {
        indent: ["error", 4],
        // 'eol-last': ['error', 'never'],   //结尾不需要换行
        "no-useless-escape": 0,
        "space-in-parens": ["error", "always"],
        "no-useless-rename": [
            "error",
            {
                ignoreDestructuring: true,
                ignoreImport: true,
                ignoreExport: true
            }
        ]
    }
};