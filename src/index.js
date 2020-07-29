#! /usr/bin/env node

import vm from 'vm';
import chalk from 'chalk';
import { existsSync, readFileSync } from 'fs';
import { Api, Package, Npm, Packages, currentPackage, setCurrentPath, currentPath } from './meteor-package-api';
import { getDirectories } from './utils';

const context = vm.createContext({ Packages, currentPackage, currentPath, Package, Api, Npm });
const fileName = 'package.js';

const dirs = getDirectories(process.cwd());

dirs.forEach((dir) => {
    const path = `${dir}/${fileName}`;
    if (existsSync(path)) {
        setCurrentPath(path);
        const contents = readFileSync(path);
        vm.runInContext(contents, context);
    }
});

Object.keys(Packages).forEach((name) => {
    const { deps } = Packages[name];
    deps.forEach((dep) => {
        const [depName, depVersion] = dep.split('@');
        const depPackage = Packages[depName];
        if (depPackage && (depPackage.version !== depVersion)) {
            // const packagePath = `file://${Packages[name].path}`;
            console.log(`${chalk.blue.bold(name)} ${chalk.white('=>')} ${chalk.greenBright.bold(`${depName}@${depPackage.version}`)} \n`);
        }
    });
});
