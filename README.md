# .bash_history cleaner
remove duplicated lines in file

## Background
To avoid duplicated lines in .bash_history, you can add the below line in .bashrc
```
export HISTCONTROL=ignoredups
```
However, when you're working on multiple account/machine (e.g. desktop, notebook), you might want to merge the history file.

In the past I use this way
```
cat ~/.bash_history > /tmp/a
cat "another .bash_history from other account/machine" > /tmp/a
cat /tmp/a | sort | uniq > ~/.bash_history
rm /tmp/a
```
But the order is lost.

This program aim to solve this program in a better way.

## Features
 - read from 1..n file
 - skip duplicated line(s)

## Todo
 - trim leading & tailing space

## Further work
As there is no timestamp for each line, how to merge two files keeping the 'real order' is not so direct. welcome to have any suggestion :)
