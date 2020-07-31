#! /usr/bin/env node

import chalk from 'chalk';
import { w3cwebsocket as WebSocket } from 'websocket';
import DDP from 'simpleddp';
import { Api, Package, Npm, Packages, currentPackage, setCurrentPath, currentPath } from './meteor-package-api';
import { getDirectories, runPackageDirsInContext, getPackageDepsToFetch, getLocalNpmVersions } from './utils';
import { argv } from 'yargs';

const { includeNpm, excludeUnpublished } = argv;

const context = { Packages, currentPackage, currentPath, setCurrentPath, Package, Api, Npm };
const dirs = getDirectories(process.cwd());

runPackageDirsInContext(dirs, context);
const depsToFetch = getPackageDepsToFetch(Packages);

const client = new DDP({
    endpoint: 'wss://atmospherejs.com/websocket',
    SocketConstructor: WebSocket,
    reconnectInterval: 5000,
});

const publishedPackages = {};
const npmVersions = includeNpm ? getLocalNpmVersions(dirs) : {};

const run = async () => {
    try {
        await client.connect();

        const subs = depsToFetch.map((user) => client.subscribe('user/packages', user, 20).ready());
        await Promise.all(subs);

        client.collection('packages').fetch().forEach(({ name, latestVersion: { version } }) => {
            publishedPackages[name] = version;
        });
    } catch (error) {
        console.log(error);
    }

    const boldBlue = chalk.bold.blue;
    const boldMagentaBright = chalk.bold.magentaBright;
    const yellowBright = chalk.yellowBright;
    const greenBright = chalk.greenBright;

    Object.keys(Packages).forEach((name) => {
        const { deps, version } = Packages[name];
        const publishedVersion = publishedPackages[name];
        const color = version === publishedVersion ? boldBlue : boldMagentaBright;
        const npmVersion = npmVersions[name];

        const localVersionString = 'local@' + version;
        const publishedVersionString = publishedVersion ? 'published@' + publishedVersion : 'unpublished';
        const npmVersionString = npmVersion && npmVersion !== version ? chalk.bold.redBright('npm@' + npmVersion) : '';

        if (!excludeUnpublished || publishedVersion) {
            console.log(`${color(name.padEnd(27, ' '))}${yellowBright(localVersionString.padEnd(14, ' '))}${greenBright(publishedVersionString.padEnd(18, ' '))}${npmVersionString}`);

            deps.forEach((dep) => {
                const [depName, depVersion] = dep.split('@');
                let depPackage = Packages[depName];

                if (!depPackage) {
                    const version = publishedPackages[depName];
                    depPackage = { version };
                }

                if (depPackage.version !== depVersion) {
                    // const packagePath = `file://${Packages[name].path}`;
                    console.log(` \u2514 ${chalk.redBright.bold(`${depName}@${depPackage.version}`)} - ${chalk.yellowBright(depVersion)}:${chalk.greenBright(depPackage.publishedVersion || depPackage.version)}`);
                }
            });
        }
    });
    await client.disconnect();
};
run();
