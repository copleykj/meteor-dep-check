# Meteor Dep Checker

This package is specifically designed as a way to keep track of which of the Socialize packages need dependency version updates when other Socialize package they depend on get updated. It may however be useful for your set of Meteor packages that depend on one another.

## Installation and Usage

Since this package has a very specific use case, it's not published to NPM. You can install it directly from this repository like so:

```sh
npm install -g https://github.com/copleykj/meteor-dep-check.git
```

Once installed you will now have the mdp command which can be run from within a directory that contains interdependant Meteor package dirs

```sh
cd /path/to/package/dirs

mdp
```

This will give an output specifying in a format `package:needingDepUpdate => package:dependency@newVersionNumber`. For Example, below you will see that the `socialize:commentable` package needs to have it's dependency on `socialize:likeable` version updated to `1.0.3`

```sh
socialize:commentable => socialize:likeable@1.0.3

```
