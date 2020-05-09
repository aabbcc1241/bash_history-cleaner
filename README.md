# uniqcp (.bash_history cleaner)
remove duplicated lines in file

[![npm Package Version](https://img.shields.io/npm/v/uniqcp.svg?maxAge=2592000)](https://www.npmjs.com/package/uniqcp)

## Background
To avoid duplicated lines in .bash_history, you can add the below line in .bashrc
```
export HISTCONTROL=ignoredups
```
However, when you're working on multiple account/machine (e.g. desktop, notebook), you might want to merge the history file.

In the past I use this way
```bash
cat ~/.bash_history > /tmp/a
cat "another .bash_history from other account/machine" > /tmp/a
cat /tmp/a | sort | uniq > ~/.bash_history
rm /tmp/a
```
But the order is lost.

This program aim to solve this program in a better way.

## Installation
Installing npm package (recommended)
```bash
npm i -g uniqcp
```
Installing Go package (slower)
```bash
go get github.com/beenotung/uniqcp
```

## Usage
for single input file
```bash
uniqcp outfile infile1
```
for multiple input files
```bash
uniqcp outfile infile1
uniqcp outfile infile1 infile2 infile3
```

## Features
 - read from 1..n file
 - skip duplicated line(s)

## Todo
 - trim leading & tailing space
 - only show message with "-v" flag
 - show line reduced with optional flag

## Further work
As there is no timestamp for each line, how to merge two files keeping the 'real order' is not so direct. welcome to have any suggestion :)

## License
[BSD-2-Clause Licensed](./LICENSE)
