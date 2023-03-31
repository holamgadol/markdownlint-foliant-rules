// @ts-check

'use strict'

const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const { execFileSync } = require('child_process')

function readApiRefRegistryDir (directory) {
  const result = {}
  try {
    const files = fs.readdirSync(directory)
    files
      .filter(file => path.extname(file) === '.apirefregistry')
      .forEach(file => {
        const filePath = path.join(directory, file)
        const contents = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }))
        const key = path.parse(file).name
        result[key] = contents
      })
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`Error: No such file or directory ${directory}`)
    } else {
      console.error(error)
    }
  }
  return result
}

const cache = {}

function loadYAML (path) {
  if (path.startsWith('http')) {
    if (cache[path]) { // check cache first
      return cache[path]
    }

    try {
      const yamlData = yaml.load(execFileSync('curl', ['--silent', '-L', path], { encoding: 'utf8' }))
      cache[path] = yamlData // cache the downloaded data
      return yamlData
    } catch (error) {
      console.error(error)
    }
  } else {
    try {
      return yaml.load(fs.readFileSync(path, { encoding: 'utf-8' }))
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = {
  loadYAML,
  readApiRefRegistryDir
}
