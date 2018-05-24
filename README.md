# j18n

j18n is short for *json transformation*. This is a small util for flattening or nesting json keys. For example, some translation tools require flat keys for i18n files, while it is much easier to organize them as nested keys for developers.

It'll transform a structures like so:

    {
      "step": {
        "1": {
          "desc": "Lorem ipsum",
          "heading": "Dolor amet"       {
        },                                "step.1.desc": "Lorem ipsum",
        "2": {                            "step.1.heading": "Dolor amet",
          "desc": "Lorem ipsum",    ↔     "step.2.desc": "Lorem ipsum",
          "heading": "Dolor amet"         "step.2.heading": "Dolor amet",
        },                                "step.3.desc": "Lorem ipsum",
        "3": {                            "step.3.heading": "Dolor amet"
          "desc": "Lorem ipsum",        }
          "heading": "Dolor amet"
        }
      }
    }

#### Note

This guide uses yarn but all of the commands have an npm equivalent. 

## Contents

- [Usage](#usage)
- [Naming](#naming)
- [Installation](#installation)
- [Development](#development)

### Installation

1. `yarn add -D j18n`
2. Create npm scripts

        "scripts": {
          "json:nest": "j18n nest -f src/file.json",
          "json:flat": "j18n flat -f src/file.json"
        }

3. Run as needed

        // from command line
        yarn run json:nest

        // as a pre- or post- script in package.json
        "scripts": {
          ...
          "postbuild": "npm run json:flat"
        }

        // use as a git hook script
        // `npm i husky -D`
        "scripts": {
          ...
          "prepush": "npm run json:flat"
        }

### Usage

    j18n [flat/nest] -f [path]

    Options:
      -f, --file  File to transform                                       [required]
      --help      Show help                                                [boolean]

### Naming

By default, j18n will not rewrite files in place and will output a separate file with a suffix. j18n will use the action name as the default suffix, or you could provide your own, or you can force rewrite in place.

### Development

- Clone the repo and open the j18n directory
- Install dependencies (`yarn install`)
- Link the project (`yarn link`)
- Run test (`yarn test`)