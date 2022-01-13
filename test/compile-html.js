const test = require('tape')
const { CompileHTML, readFile } = require('../src/compile-html')
const path = require('path')

const sourceDirectory = path.join(process.cwd(), 'test', 'fixtures', 'source')
const targetDirectory = path.join(process.cwd(), 'test', 'fixtures', 'tmp')

const html = new CompileHTML({
  sourceDirectory,
  targetDirectory,
})

test('compile-with-variables', async (t) => {
  const locals = {
    greeting: '¡hola!',
  }
  await html.compile({ filePath: 'index.html', locals })
  const targetPath = path.join(targetDirectory, 'index.html')
  const expectedPath = path.join(process.cwd(), 'test', 'fixtures', 'expected', 'index.html')

  const targetContents = (await readFile(targetPath)).trim()
  const expectedContents = (await readFile(expectedPath)).trim()

  t.assert(targetContents === expectedContents, 'compiled file contents match')
  t.end()
})
