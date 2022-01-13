const fs = require('fs')
const path = require('path')

module.exports = class CompileHTML {
  constructor ({ sourceDirectory, targetDirectory }) {
    this.sourceDirectory = sourceDirectory
    this.targetDirectory = targetDirectory
  }
  async compile ({ filePath, locals }) {
    let source = await readFile(path.join(this.sourceDirectory, filePath))
    for (let key in locals) {
      const regex = new RegExp(`{{ ${key} }}`, 'g')
      source = source.replace(regex, locals[key])
    }
    return writeFile (path.join(this.targetDirectory, filePath), source)
  }
}

async function readFile (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, contents) => {
      if (error) return reject(error)
      resolve(contents.toString())
    })
  })
}

async function writeFile (filePath, contents) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, contents, (error) => {
      if (error) return reject(error)
      resolve()
    })
  })
}
