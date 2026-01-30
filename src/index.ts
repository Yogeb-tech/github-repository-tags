#!/usr/bin/env node

import { loadBaseCommands } from './commands/base';
import { createCommand } from './utils';

// Initialize CLI program
const program = createCommand({
  name: 'typescript-cli-tool',
  description: 'A powerful CLI tool built with TypeScript',
  version: '1.0.0',
});

// Load command definitions from modules
loadBaseCommands(program);

// Parse command-line arguments
program.parse(process.argv);
