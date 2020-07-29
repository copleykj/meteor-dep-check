import { lstatSync, readdirSync } from 'fs';
import { join } from 'path';

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory);

export { getDirectories };
