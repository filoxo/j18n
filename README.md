# j18n

j18n is short for *json transformation*. This is a small util for flattening or nesting json keys. For example, Ancestry's Rosetta requires flat keys for i18n files, while it is much easier to organize them as nested keys for developers.

### Usage

    j18n [flat/nest] -f [path]

    Options:
      -f, --file  File to transform                                       [required]
      --help      Show help                                                [boolean]

### Example

This util is only published to Ancestry's npm repo. See ["NPM modules for Development"](https://confluence.mfsbe.com/display/NODE/2015/03/11/Migration+of+Npm+Modules+to+Artifactory#MigrationofNpmModulestoArtifactory-Development) for more details.

1. `npm i -D j18n`
2. Create npm scripts

    "scripts": {
      "json:nest": "j18n nest -f src/file.json",
      "json:flat": "j18n flat -f src/file.json"
    }

3. Run as needed

    // from command line
    npm run json:nest

    // as a pre- or post- step
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