import vm from 'vm';
import { existsSync, lstatSync, readdirSync, readFileSync } from 'fs';

import { join } from 'path';

const fileName = 'package.js';

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory);

const runPackageDirsInContext = (dirs, contextObj) => {
    const context = vm.createContext(contextObj);
    const { setCurrentPath } = contextObj;
    dirs.forEach((dir) => {
        const path = `${dir}/${fileName}`;
        if (existsSync(path)) {
            setCurrentPath(path);
            const contents = readFileSync(path);
            vm.runInContext(contents, context);
        }
    });
};

const getPackageDepsToFetch = (Packages) => {
    const depsToFetch = new Set();

    Object.keys(Packages).forEach((name) => {
        const { deps } = Packages[name];
        depsToFetch.add(name.split(':')[0]);
        deps.forEach((dep) => {
            const [depName] = dep.split('@');
            depsToFetch.add(depName.split(':')[0]);
        });
    });

    return Array.from(depsToFetch);
};
export { getDirectories, runPackageDirsInContext, getPackageDepsToFetch };
