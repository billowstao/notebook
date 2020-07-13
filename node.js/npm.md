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
