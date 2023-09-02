#!/usr/bin/env node

const spawn = require('cross-spawn');
const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '../templates');

// Function to display a menu of template options and get user input
function selectTemplate() {
  console.log('Available Templates:');
  const templateOptions = fs.readdirSync(templatesDir);
  templateOptions.forEach((template, index) => {
    console.log(`${index + 1}. ${template}`);
  });

  const userInput = prompt('Select a template (enter a number): ');

  if (userInput >= 1 && userInput <= templateOptions.length) {
    const selectedTemplate = templateOptions[userInput - 1];
    return selectedTemplate;
  } else {
    console.log('Invalid input. Please enter a valid number.');
    return selectTemplate();
  }
}

// Prompt function for user input
function prompt(question) {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    readline.question(question, (answer) => {
      readline.close();
      resolve(answer);
    });
  });
}

// The first argument will be the project name.
const projectName = process.argv[2];

if (!projectName) {
  console.log('You have to provide a name to your app.');
  console.log('For example:');
  console.log('npx create-my-template my-app');
  process.exit(1);
}

const projectDir = path.resolve(process.cwd(), projectName);

try {
  fs.mkdirSync(projectDir, { recursive: true });
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log(`The file ${projectName} already exists in the current directory. Please give it another name.`);
  } else {
    console.error(err);
  }
  process.exit(1);
}

const selectedTemplate = selectTemplate();

const templateDir = path.join(templatesDir, selectedTemplate);

// Copy the selected template to the new project directory
fs.copyFileSync(path.join(templateDir, 'gitignore'), path.join(projectDir, '.gitignore'));

const projectPackageJson = require(path.join(projectDir, 'package.json'));
projectPackageJson.name = projectName;

fs.writeFileSync(path.join(projectDir, 'package.json'), JSON.stringify(projectPackageJson, null, 2));

spawn.sync('npm', ['install'], { stdio: 'inherit', cwd: projectDir });

console.log('Success! Your new project is ready.');
console.log(`Created ${projectName} at ${projectDir}`);
