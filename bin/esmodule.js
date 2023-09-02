#!/usr/bin/env node

import spawn from 'cross-spawn';
import fs from 'fs';
import path from 'path';
import picocolors from 'picocolors';

if (process.argv.length < 3) {
  console.log(picocolors.red('You have to provide a name to your app.\n'));
  console.log(picocolors.blue('For example:'));
  console.log(picocolors.cyan('npx susanoo dream-app'));
  process.exit();
}

// Project name from the command line
const projectName = process.argv[2];

// Create project dir with the project name.
const currentDir = process.cwd();
const projectDir = path.resolve(currentDir, projectName);

// Check if the dir already exists
try {
  fs.mkdirSync(projectDir, { recursive: true });
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log(
      picocolors.red(
        `The file ${projectName} already exists in the current directory. Please give it another name. 🙏`
      )
    );
  } else {
    console.error(err);
  }
  process.exit(1);
}

const templateDir = path.resolve(new URL(import.meta.url).pathname, '../templates');

try {
  await fs.promises.copyFile(
    path.join(templateDir, 'gitignore'),
    path.join(projectDir, '.gitignore')
  );
} catch (err) {
  console.log(err);
}

try {
  fs.renameSync(path.join(projectDir, 'gitignore'), path.join(projectDir, '.gitignore'));
} catch (err) {
  console.log(err);
}

const projectPackageJson = require(path.join(projectDir, 'package.json'));

projectPackageJson.name = projectName;

fs.writeFileSync(
  path.join(projectDir, 'package.json'),
  JSON.stringify(projectPackageJson, null, 2)
);

spawn.sync('npm', ['install'], { stdio: 'inherit' });

console.log('Success! Your new project is ready.');
console.log(`Created ${projectName} at ${projectDir}`);
