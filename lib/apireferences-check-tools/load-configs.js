// @ts-check

'use strict'

const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const { execFileSync } = require('child_process')

const registryCache = {}

function loadApiRefRegistry (pathToRegistry) {
  const result = {}

  if (pathToRegistry.startsWith('http')) {
    if (registryCache[pathToRegistry]) {
      return registryCache[pathToRegistry]
    }

    try {
      const result = yaml.load(execFileSync('curl', ['--silent', '-L', pathToRegistry], { encoding: 'utf8' }))
      registryCache[pathToRegistry] = result // cache the downloaded data
      return result
    } catch (error) {
      console.error(error)
    }
  } else {
    try {
      const files = fs.readdirSync(pathToRegistry)
      files
        .filter(file => path.extname(file) === '.apirefregistry')
        .forEach(file => {
          const filePath = path.join(pathToRegistry, file)
          const contents = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }))
          const key = path.parse(file).name
          result[key] = contents
        })
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.error(`Error: No such file or pathToRegistry ${pathToRegistry}`)
      } else {
        console.error(error)
      }
    }
    return result
  }
}

const configCache = {}

function loadYAML (path) {
  if (path.startsWith('http')) {
    if (configCache[path]) { // check cache first
      return configCache[path]
    }

    try {
      const yamlData = yaml.load(execFileSync('curl', ['--silent', '-L', path], { encoding: 'utf8' }))
      configCache[path] = yamlData // cache the downloaded data
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
  loadApiRefRegistry
}
