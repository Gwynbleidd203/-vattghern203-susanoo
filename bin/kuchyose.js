#!/usr/bin/env node

const spawn = require('cross-spawn');
const fs = require('fs');
const path = require('path');
const picocolors = require('picocolors')

if (process.argv.length < 3) {

    console.log(
        picocolors.red('You have to provide a name to your app.\n')
    )
    
    console.log(
        picocolors.blue('For example :')
    )
    console.log(
       picocolors.cyan('npx susanoo dream-app')
    )

    process.exit()
}

// Project name from the command line
const projectName = process.argv[2]

// Create project dir with the project name.

const currentDir = process.cwd()
const projectDir = path.resolve(currentDir, projectName)

// Check if the dir already exists
try {

    fs.mkdirSync(projectDir, { recursive: true})

} catch (err) {

    if (err.code === 'EEXIST') {

        console.log(
           picocolors.red(`The file ${projectName} already exist in the current directory. Please give it another name. 🙏`)
        )
    }

    else {

        console.error(err)
    }

    process.exit(1)
}

// get templates dir

const templateDir = path.resolve(__dirname, '../templates');
fs.cpSync(templateDir, projectDir, {recursive: true})

try {
    fs.renameSync(
    
        path.join(projectDir, 'gitignore'),
        path.join(projectDir, '.gitignore')
    )

} catch(err) {

    console.log(err)
}

console.log(
    picocolors.cyan('Renaming a few things...')
)

const projectPackageJson = require(path.join(projectDir, 'package.json'))

projectPackageJson.name = projectName

fs.writeFileSync(
    path.join(projectDir, 'package.json'),
    JSON.stringify(projectPackageJson, null, 2)
)

console.log(
    picocolors.cyan('Rewriting some stuff...')
)

spawn.sync('npm', ['install'], { stdio: 'inherit' });

console.log(
    picocolors.bgCyan('Success! Your new project is ready.\n'
    ));

console.log(
    picocolors.bgCyan(`Created ${projectName} at ${projectDir}\n`
    ));