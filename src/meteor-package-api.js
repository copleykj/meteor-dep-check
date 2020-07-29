const Packages = {};

let currentPackage = '';
let currentPath = '';

const setCurrentPath = (path) => {
    currentPath = path;
};

const Api = {
    use: (deps = []) => {
        if (typeof deps === 'string') {
            deps = [deps];
        }
        Packages[currentPackage].deps = deps;
    },
    versionsFrom: () => { },
    imply: () => { },
    mainModule: () => { },
    addFiles: () => { },
    export: () => { },
};

const Package = {
    describe: (description) => {
        currentPackage = description.name;
        description.path = currentPath; // eslint-disable-line
        Packages[currentPackage] = description;
    },
    onUse: (callback) => {
        callback(Api);
    },
    on_use: (callback) => {
        callback(Api);
    },
    onTest: () => { },
};

const Npm = {
    depends: () => { },
};

export { Api, Package, Npm, Packages, currentPackage, setCurrentPath, currentPath };
