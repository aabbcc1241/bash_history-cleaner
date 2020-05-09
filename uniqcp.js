#!/usr/bin/env node
let fs = require('fs')
let readline = require('readline')

function printName() {
  let version = require('./package').version
  console.log('uniqcp v' + version)
}

function printHelp() {
  printName()
  console.log('Usage: uniqcp [options] <outfile> <infile_1> [...<infile_n>]')
  console.log()
  console.log('Early terminating options:')
  console.log('  -h | --help    : show this help message')
  console.log('  -v | --version : show the software name and version')
  console.log()
  console.log('Optional options:')
  console.log('  -a | --append  : append mode (by default will erase the existing content in the outfile)')
  console.log('  -v | --verbose : verbose mode, show file in process and total number of unique lines')
  console.log()
  console.log('Remark:')
  console.log('  When -v is used with outfile and infile(s), it will be treated as verbose flag. Otherwise, it will be treated as version flag.')
}

// flags
let append = false
let verbose = false

// parameters
let output
let inputs = []

for (let i = 2; i < process.argv.length; i++) {
  let arg = process.argv[i]
  switch (arg) {
    case '--version':
      printName()
      process.exit()
      break
    case '-h':
    case '--help':
      printHelp()
      process.exit()
      break
    case '-a':
    case '--append':
      append = true
      break
    case '-v':
    case '--verbose':
      verbose = true
      break
    default:
      if (!output) {
        output = arg
      } else {
        inputs.push(arg)
      }
  }
}
if (inputs.length === 0) {
  if (verbose) {
    printName()
  } else {
    printHelp()
  }
  process.exit(0)
}

let lines = new Set()

function scanFile(input) {
  if (verbose) console.log('scanning', input)
  return new Promise(resolve => {
    let instream = fs.createReadStream(input)
    let rl = readline.createInterface({
      input: instream,
      output: process.stdout,
      terminal: false,
    })

    rl.on('line', line => {
      if (lines.has(line)) return
      lines.add(line)
      fs.appendFileSync(output, line + '\n')
    })
    rl.on('close', () => {
      resolve()
    })
  })
}

async function main() {
  if (!append) {
    fs.writeFileSync(output, '')
  }
  for (let input of inputs) {
    await scanFile(input)
  }
  let count = lines.size.toLocaleString()
  if (verbose) console.log('total written', count, 'lines.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
