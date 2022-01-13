const fs = require('fs')
const path = require('path')

class CompileHTML {
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
    const target = path.join(this.targetDirectory, filePath)
    const targetDirectory = path.dirname(target)
    await mkdirp(targetDirectory)
    return writeFile (target, source)
  }
}
module.exports.CompileHTML = CompileHTML

async function readFile (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, contents) => {
      if (error) return reject(error)
      resolve(contents.toString())
    })
  })
}
module.exports.readFile = readFile

async function writeFile (filePath, contents) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, contents, (error) => {
      if (error) return reject(error)
      resolve()
    })
  })
}
module.exports.writeFile = writeFile

async function mkdirp (directory) {
  return new Promise((resolve, reject) => {
    fs.mkdir(directory, { recursive: true }, (error) => {
      if (error) return reject(error)
      resolve()
    })
  })
}
module.exports.mkdirp = mkdirp