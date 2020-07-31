# Meteor Dep Checker

This package is specifically designed as a way to keep track of which of the Socialize packages need dependency version updates when other Socialize package they depend on get updated. It may however be useful if you maintain a group of interdependent Meteor packages that require you to keep their dependencies in sync, and so I've made it available in this repo.

## Installation and Usage

Since this package has a very specific use case, it's not published to NPM. You can install it directly from this repository like so:

```sh
npm install -g https://github.com/copleykj/meteor-dep-check.git
```

Once installed you will now have the `mdep-check` command available, which can be run from within a directory that contains interdependant Meteor package dirs

```sh
cd /path/to/package/dirs

mdep-check
```

This will output a list off all the packages in the current directory. Packages with a local version that matches the currently published version will be in blue otherwise they will be magenta. At the end there will be a yellow:green version indicator which shows the local version in yellow and the published version in green.

If any package has a dependency mismatch, it will be listed below the package in red as `package@newestVersion` with the yellow:green version indicator specifying the version package currently depends on in yellow, and the currently published version in green.

```sh
socialize:base-model - 1.1.4:1.1.3
 └ aldeed:collection2@3.1.0 - 3.0.6:3.1.0
 └ aldeed:schema-index@3.0.0 - 2.0.0:3.0.0
socialize:cloudinary - 1.0.5:1.0.4
socialize:commentable - 1.0.3:1.0.2
socialize:feed - 1.0.3:1.0.2

```
