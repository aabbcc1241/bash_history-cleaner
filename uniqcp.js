#!/usr/bin/env node
let fs = require('fs')
let readline = require('readline')

if (process.argv.length < 4) {
  console.log('uniqcp')
  console.log('Usage: uniqcp <outfile> <infile_1> [...<infile_n>]')
  process.exit()
}

let output = process.argv[2]

let lines = new Set()

function scanFile(input) {
  console.log('scanning', input)
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
  for (let i = 3; i < process.argv.length; i++) {
    let input = process.argv[i]
    await scanFile(input)
  }
  let count = lines.size.toLocaleString()
  console.log('total written', count, 'lines.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
