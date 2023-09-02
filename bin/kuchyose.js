#!/usr/bin/env node

import spawn from 'cross-spawn'
import fs from "fs"
import path from 'path'
import picocolors from 'picocolors'

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