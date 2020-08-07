const Packages = {};

let currentPackage = '';
let currentPath = '';

const setCurrentPath = (path) => {
    currentPath = path;
};

const Api = {
    use: (deps = []) => {
        const cpDeps = Packages[currentPackage].deps;
        if (typeof deps === 'string') {
            deps = [deps];
        }
        Packages[currentPackage].deps = cpDeps ? [...deps, ...cpDeps] : deps;
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
        const pcp = Packages[currentPackage];
        Packages[currentPackage] = pcp ? { ...pcp, ...description } : description;
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
