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

## Command Flags

`--include-npm` - Check the version in the `package.json` file and if the version doesn't match the version in package.js, display the version from `package.json` in the output.

`--exclude-unpublished` - Don't display packages that don't have a version published to Atmosphere.

## Sample Output

```sh
socialize:base-model       local@1.1.4   published@1.1.3
socialize:cloudinary       local@1.0.5   published@1.0.4
socialize:commentable      local@1.0.3   published@1.0.2   npm@1.0.0
socialize:feed             local@1.0.3   published@1.0.2   npm@1.0.1
socialize:friendships      local@1.1.0   published@1.0.2   npm@1.0.0
socialize:likeable         local@1.0.3   published@1.0.2   npm@1.0.0
socialize:linkable-model   local@1.0.4   published@1.0.3   npm@1.0.0
socialize:messaging        local@1.2.1   published@1.2.0   npm@1.0.0
 └ socialize:user-presence@1.0.1      1.0.0:1.0.1
 └ socialize:linkable-model@1.0.4     1.0.3:1.0.4
socialize:postable         local@1.0.2   published@1.0.1   npm@1.0.0
socialize:requestable      local@1.0.4   published@1.0.3   npm@1.0.0
socialize:server-presence  local@1.0.1   published@1.0.1
socialize:server-time      local@1.0.0   published@1.0.0
socialize:user-blocking    local@1.0.2   published@1.0.1   npm@1.0.3
socialize:user-model       local@1.0.2   published@1.0.2   npm@1.0.0
socialize:user-presence    local@1.0.1   published@1.0.1   npm@1.0.0
socialize:user-profile     local@1.0.3   published@1.0.2   npm@1.0.1
socialize:voteable         local@1.0.2   published@1.0.1
```
