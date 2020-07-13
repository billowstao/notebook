# npm

- [npm](#npm)
  - [About npm](#about-npm)
  - [Downloading and installing Node.js and npm](#downloading-and-installing-nodejs-and-npm)
  - [Managing your profile settings](#managing-your-profile-settings)
  - [Packages and modules](#packages-and-modules)
    - [About packages and modules](#about-packages-and-modules)
      - [About package formats](#about-package-formats)
      - [npm package git URL formats](#npm-package-git-url-formats)
      - [About modules](#about-modules)
  - [Creating a package.json file](#creating-a-packagejson-file)
    - [About semantic versioning](#about-semantic-versioning)
      - [Incrementing semantic versions in published packages](#incrementing-semantic-versions-in-published-packages)
      - [Using semantic versioning to specify update types your package can accept](#using-semantic-versioning-to-specify-update-types-your-package-can-accept)

## [About npm](https://docs.npmjs.com/about-npm/)

npm is the world’s largest software registry. Open source developers from every continent use npm to share and borrow packages, and many organizations use npm to manage private development as well.

## [Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

```bash
# Note: npm Enterprise requires npm 4.4.x or greater. To download the latest version of npm, on the command line, run the following command:

[sudo] npm install npm -g
```

## [Managing your profile settings](https://docs.npmjs.com/managing-your-profile-settings)

view user account profile settings from the command line

```bash
npm profile get
```

From the CLI, you can change the following properties for your user account:

- email
- two-factor auth
- fullname
- homepage
- freenode
- twitter
- github
- password

method

```bash
npm profile set <prop> <value>
```

## [Packages and modules](https://docs.npmjs.com/packages-and-modules/)

### [About packages and modules](https://docs.npmjs.com/about-packages-and-modules)

#### About package formats

A package is any of the following:

- a) A folder containing a program described by a `package.json` file.
- b) A gzipped tarball containing (a).
- c) A URL that resolves to (b).
- d) A `<name>@<version>` that is published on the registry with (c).
- e) A `<name>@<tag>` that points to (d).
- f) A `<name>` that has a latest tag satisfying (e).
- g) A `git` url that, when cloned, results in (a).

#### npm package git URL formats

Git URLs used for npm packages can be formatted in the following ways:

- `git://github.com/user/project.git#commit-ish`
- `git+ssh://user@hostname:project.git#commit-ish`
- `git+http://user@hostname/project/blah.git#commit-ish`
- `git+https://user@hostname/project/blah.git#commit-ish`

The `commit-ish` can be any tag, sha, or branch that can be supplied as an argument to `git checkout`. The default `commit-ish` is master.

#### About modules

A `module` is any file or directory in the `node_modules` directory that can be loaded by the Node.js `require()` function.

To be loaded by the Node.js `require()` function, a module must be one of the following:

- A folder with a `package.json` file containing a "`main`" field.
- A folder with an `index.js` file in it.
- A JavaScript file.

> Note: Since modules are not required to have a `package.json` file, not all modules are packages. Only modules that have a `package.json` file are also packages.

In the context of a Node program, the module is also the thing that was loaded from a file. For example, in the following program:

```js
var req = require('request')
```

we might say that “The variable `req` refers to the `request` module”.

## [Creating a package.json file](https://docs.npmjs.com/creating-a-package-json-file)

### About semantic versioning

#### Incrementing semantic versions in published packages

To help developers who rely on your code, we recommend starting your package version at 1.0.0 and incrementing as follows:

| Code status                               | Stage         | Rule                                                               | Example version |
| ----------------------------------------- | ------------- | ------------------------------------------------------------------ | --------------- |
| First release                             | New product   | Start with 1.0.0                                                   | 1.0.0           |
| Backward compatible bug fixes             | Patch release | Increment the third digit                                          | 1.0.1           |
| Backward compatible new features          | Minor release | Increment the middle digit and reset last digit to zero            | 1.1.0           |
| Changes that break backward compatibility | Major release | Increment the first digit and reset middle and last digits to zero | 2.0.0           |

#### Using semantic versioning to specify update types your package can accept

You can specify which update types your package can accept from dependencies in your package’s `package.json` file.

For example, to specify acceptable version ranges up to 1.0.4, use the following syntax:

- Patch releases: `1.0` or `1.0.x` or `~1.0.4`
- Minor releases: `1` or `1.x` or `^1.0.4`
- Major releases: `*` or `x`
