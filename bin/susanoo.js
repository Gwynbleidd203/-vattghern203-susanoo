#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

if (process.argv.length < 3) {

    console.log('You have to provide a name to your app. (～￣▽￣)～')

    console.log('For example :')
    console.log('   npx susanoo dream-app')
    process.exit()
}

const projectName = process.argv[2]
const currentPath = process.cwd()
const projectPath = path.join(currentPath, projectName)
const git_repo = 'https://github.com/Vattghern203/-vattghern203-susanoo.git'

try {

    fs.mkdirSync(projectPath)

} catch (err) {

    if (err.code === 'EEXIST') {

        console.log(`The file ${projectName} already exist in the current directory. Please give it another name.`)
    }

    else {

        console.error(err)
    }

    process.exit(1)
}

async function main() {
    try {
        console.log('Charging Chakra... 🔋')
        console.log('or just Downloading files... ⏬')
        console.log('\n')

        execSync(`git clone --depth 1 ${git_repo} ${projectPath}`)

        process.chdir(projectPath)

        console.log('Activating Mangekyo Sharigan... ⚛')
        console.log('or just Installing dependencies... 🔧')
        execSync('npm install');

        console.log('Amaterasu! 🔥')
        console.log('or just Removing useless files... 🗑')
        execSync('npx rimraf ./.git')
        fs.rm(path.join(projectPath, 'bin'), { recursive: true })

        console.log('Perfect Susanoo completed. 💪')
        console.log('AKA The installation is done, this is ready to use ! 😄')

        console.log(`Now just cd ${projectName} and code 😎`)

    } catch (error) {
        console.log(error);
    }
}

main();