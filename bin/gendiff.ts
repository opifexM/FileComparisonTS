#!/usr/bin/env node

import { Command } from 'commander';
import { startGeneration } from '../src';

const program = new Command();
program
  .name('gendiff')
  .description('  Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1>')
  .arguments('<filepath2>')
  .action((filepath1, filepath2, options) => {
    console.log(startGeneration(filepath1, filepath2, options.format));
  });

program.parse();