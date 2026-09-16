#!/usr/bin/env node

import { Command } from 'commander';
import { listRemoteUssFiles } from './src/sshService.js';

const program = new Command();

program
  .name('create-volumes')
  .version('1.0.0');

// NEW AUTOMATED COMMAND
program
  .command('list-remote')
  .description('Automatically fetch and display files under /u/ibmuser on the mainframe')
  .argument('<hostname>', 'Mainframe Host/IP')
  .action(async (hostname) => {
    try {
      console.log(`🤖 Requesting file list from /u/ibmuser on ${hostname}... please wait...`);
      
      // Await pauses execution until the remote text output has been completely gathered
      const fileListText = await listRemoteUssFiles(hostname);
      
      console.log('\n--- Remote USS Files Found ---');
      console.log(fileListText);
      
    } catch (error) {
      console.error(`\n❌ Automation Error: ${error.message}`);
    }
  });

program.parse();

