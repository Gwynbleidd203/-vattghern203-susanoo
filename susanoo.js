//#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
</head>
<body>
    <h1>hello world!</h1>
</body>
</html>
`

const cssContent = `
@charset "UTF-8";

*,
*::before,
*::after {
    padding: 0;
    margin: 0;
    box-sizing: inherit;
    text-decoration: none;
}

html {
    font-size: 62.5%;
    color-scheme: dark light;
}

body {
    box-sizing: border-box;
}

img,
svg,
video {
    width: 100%;
    height: auto;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

ol,
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
`

const projectDir = process.cwd()
const htmlFilePath = path.join(projectDir, 'index.html')
const cssFilePath = path.join(projectDir, 'style.css')

fs.writeFileSync(htmlFilePath, htmlContent, 'utf-8')
fs.writeFileSync(cssFilePath, cssContent, 'utf-8')

console.log('Success, bitch!')