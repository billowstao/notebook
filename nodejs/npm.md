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
  - [Specifying dependencies and devDependencies in a package.json file](#specifying-dependencies-and-devdependencies-in-a-packagejson-file)
    - [Adding dependencies to a package.json file](#adding-dependencies-to-a-packagejson-file)
      - [Adding dependencies to a package.json file from the command line](#adding-dependencies-to-a-packagejson-file-from-the-command-line)
  - [Getting packages from the registry](#getting-packages-from-the-registry)
    - [Searching for and choosing packages to download](#searching-for-and-choosing-packages-to-download)
    - [Downloading and installing packages locally](#downloading-and-installing-packages-locally)
    - [Updating packages downloaded from the registry](#updating-packages-downloaded-from-the-registry)
    - [Using npm packages in your projects](#using-npm-packages-in-your-projects)
      - [Using unscoped packages in your projects](#using-unscoped-packages-in-your-projects)
      - [Using scoped packages in your projects](#using-scoped-packages-in-your-projects)
    - [Uninstalling packages and dependencies](#uninstalling-packages-and-dependencies)
  - [CLI documentation](#cli-documentation)
    - [npm-package-locks](#npm-package-locks)
    - [npm-install](#npm-install)
      - [Algorithm](#algorithm)
      - [Limitations of npm’s Install Algorithm](#limitations-of-npms-install-algorithm)

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

## [Specifying dependencies and devDependencies in a package.json file](https://docs.npmjs.com/specifying-dependencies-and-devdependencies-in-a-package-json-file)

- "`dependencies`": Packages required by your application in production.
- "`devDependencies`": Packages that are only needed for local development and testing.

### Adding dependencies to a package.json file

#### Adding dependencies to a package.json file from the command line

To add dependencies and devDependencies to a `package.json` file from the command line, you can install them in the root directory of your package using the `--save-prod` flag for dependencies (the default behavior of `npm install`) or the `--save-dev` flag for devDependencies.

To add an entry to the "`dependencies`" attribute of a `package.json` file, on the command line, run the following command:

```bash
npm install <package-name> [--save-prod]
```

To add an entry to the "`devDependencies`" attribute of a `package.json` file, on the command line, run the following command:

```bash
npm install <package-name> --save-dev
```

## Getting packages from the registry

### [Searching for and choosing packages to download](https://docs.npmjs.com/searching-for-and-choosing-packages-to-download)

### [Downloading and installing packages locally](https://docs.npmjs.com/downloading-and-installing-packages-locally)

### [Updating packages downloaded from the registry](https://docs.npmjs.com/updating-packages-downloaded-from-the-registry)

### [Using npm packages in your projects](https://docs.npmjs.com/using-npm-packages-in-your-projects)

#### Using unscoped packages in your projects

Node.js `module`

If you are creating a Node.js module, you can use a package in your module by passing it as an argument to the `require` function.

Example: using lodash in a Node.js `module`

For example, to use the lodash package in a Node.js module, in the root directory of the module, create a file named `index.js` with the following contents:

```js
// index.js
var lodash = require('lodash');

var output = lodash.without([1, 2, 3], 1);
console.log(output);
```

Run the code using `node index.js`. It should output `[2, 3]`.

#### Using scoped packages in your projects

To use a scoped package, simply include the scope wherever you use the package name.

Node.js `module`

When requiring a scoped package in the index.js file of your Node.js `module`, you must reference the scope in addition to the package name:

```js
var projectName = require("@scope/package-name")
```

### [Uninstalling packages and dependencies](https://docs.npmjs.com/uninstalling-packages-and-dependencies)

## CLI documentation

### [npm-package-locks](https://docs.npmjs.com/configuring-npm/package-locks)

Conceptually, the “input” to `npm install` is a `package.json`, while its “output” is a fully-formed `node_modules` tree: a representation of the dependencies you declared. In an ideal world, npm would work like a pure function: the same `package.json` should produce the exact same `node_modules` tree, any time. In some cases, this is indeed true. But in many others, npm is unable to do this. There are multiple reasons for this:

- different versions of npm (or other package managers) may have been used to install a package, each using slightly different installation algorithms.

- a new version of a direct semver-range package may have been published since the last time your packages were installed, and thus a newer version will be used.

- A dependency of one of your dependencies may have published a new version, which will update even if you used pinned dependency specifiers (1.2.3 instead of ^1.2.3)

- The registry you installed from is no longer available, or allows mutation of versions (unlike the primary npm registry), and a different version of a package exists under the same version number now.

To prevent this potential issue, npm uses `package-lock.json` or, if present, `npm-shrinkwrap.json`. These files are called package locks, or lockfiles.

This file describes an exact, and more importantly reproducible `node_modules` tree. Once it’s present, any future installation will base its work off this file, instead of recalculating dependency versions off package.json.

The presence of a package lock changes the installation behavior such that:

1. The module tree described by the package lock is reproduced. This means reproducing the structure described in the file, using the specific files referenced in “resolved” if available, falling back to normal package resolution using “version” if one isn’t.
2. The tree is walked and any missing dependencies are installed in the usual fashion.

### [npm-install](https://docs.npmjs.com/cli-commands/install.html)

Install a package

Description

This command installs a package, and any packages that it depends on. If the package has a package-lock or shrinkwrap file, the installation of dependencies will be driven by that, with an `npm-shrinkwrap.json` taking precedence if both files exist. See `package-lock.json` and `npm shrinkwrap`.

A package is:

- a) a folder containing a program described by a `package.json` file
- b) a gzipped tarball containing (a)
- c) a url that resolves to (b)
- d) a `<name>@<version>` that is published on the registry (see `registry`) with (c)
- e) a `<name>@<tag>` (see `npm dist-tag`) that points to (d)
- f) a `<name>` that has a “latest” tag satisfying (e)
- g) a `<git remote url>` that resolves to (a)

`npm install` saves any specified packages into `dependencies` by default. Additionally, you can control where and how they get saved with some additional flags:

- `-P`, `--save-prod`: Package will appear in your `dependencies`. This is the default unless `-D` or `-O` are present.
- `-D`, `--save-dev`: Package will appear in your `devDependencies`.
- `-O`, `--save-optional`: Package will appear in your `optionalDependencies`.
- `--no-save`: Prevents saving to `dependencies`.

When using any of the above options to save dependencies to your package.json, there are two additional, optional flags:

- `-E`, `--save-exact`: Saved dependencies will be configured with an exact version rather than using npm’s default semver range operator.
- `-B`, `--save-bundle`: Saved dependencies will also be added to your `bundleDependencies` list.

Further, if you have an `npm-shrinkwrap.json` or `package-lock.json` then it will be updated as well.

#### Algorithm

To install a package, npm uses the following algorithm:

```text
load the existing node_modules tree from disk
clone the tree
fetch the package.json and assorted metadata and add it to the clone
walk the clone and add any missing dependencies
  dependencies will be added as close to the top as is possible
  without breaking any other modules
compare the original tree with the cloned tree and make a list of
actions to take to convert one to the other
execute all of the actions, deepest first
  kinds of actions are install, update, remove and move
```

For this `package{dep}` structure: `A{B,C}`, `B{C}`, `C{D}`, this algorithm produces:

```text
A
+-- B
+-- C
+-- D
```

That is, the dependency from B to C is satisfied by the fact that A already caused C to be installed at a higher level. D is still installed at the top level because nothing conflicts with it.

For `A{B,C}`, `B{C,D@1}`, `C{D@2}`, this algorithm produces:

```text
A
+-- B
+-- C
   `-- D@2
+-- D@1
```

Because B’s D@1 will be installed in the top level, C now has to install D@2 privately for itself. This algorithm is deterministic, but different trees may be produced if two dependencies are requested for installation in a different order.

#### Limitations of npm’s Install Algorithm

npm will refuse to install any package with an identical name to the current package. This can be overridden with the `--force` flag, but in most cases can simply be addressed by changing the local package name.

There are some very rare and pathological edge-cases where a cycle can cause npm to try to install a never-ending tree of packages. Here is the simplest case:

```text
A -> B -> A' -> B' -> A -> B -> A' -> B' -> A -> ...
```

where `A` is some version of a package, and `A`' is a different version of the same package. Because `B` depends on a different version of `A` than the one that is already in the tree, it must install a separate copy. The same is true of `A`', which must install `B`'. Because `B`' depends on the original version of `A`, which has been overridden, the cycle falls into infinite regress.

To avoid this situation, npm flat-out refuses to install any `name@version` that is already present anywhere in the tree of package folder ancestors. A more correct, but more complex, solution would be to symlink the existing version into the new location. If this ever affects a real use-case, it will be investigated.
