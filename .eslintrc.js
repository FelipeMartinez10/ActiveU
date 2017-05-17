module.exports = {
    "globals" : {
        "console": true,
    },
    "env": {
        "meteor": true,
        "node": true,
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module",
        "ecmaVersion": 6,
        "esversion":6

    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
       "no-unused-vars": [
         "error",
         {
           "vars": "local",
           "args": "after-used",
           "ignoreRestSiblings": false
         }
       ]
    }
};
