#!/usr/bin/env node

import { Command } from 'commander';
import { execSync } from 'child_process';
import path from 'path';

const program = new Command();

program
  .name('sys-tool')
  .description('Execute and parse system commands')
  .version('1.0.0');

program
  .command('list-files')
  .description('Run "ls" on a folder and get output in JSON format')
  .option('-d, --dir <string>', 'Directory path to list', '.') // Defaults to current folder
  .action((options) => {
    try {
      console.log(`Executing: ls ${options.dir}\n`);

      // 1. Run the external command and capture output as a text string
      // We pass the folder name into the command dynamically
      const rawOutput = execSync(`ls ${options.dir}`, { encoding: 'utf8' });

      // 2. Parse the text output into an array of objects
      const filesArray = rawOutput
        .split('\n')                  // Split the output by line breaks
        .map(line => line.trim())     // Remove extra whitespace spaces
        .filter(line => line !== '')  // Exclude empty lines at the end of the text
        .map((filename, index) => {   // Map each line into a clean JSON object format
          return {
            id: index + 1,
            fileName: filename,
            extension: path.extname(filename) || 'none'
          };
        });

      // 3. Convert the Javascript object array into a formatting JSON string
      const jsonOutput = JSON.stringify(filesArray, null, 2);

      // Print out your valid JSON string!
      console.log(jsonOutput);

    } catch (error) {
      console.error('❌ Failed to execute system command:', error.message);
    }
  });

program.parse(process.argv);
