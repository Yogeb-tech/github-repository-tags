#!/usr/bin/env node

import { loadCommands } from './commands';
import { createCommand } from './utils';

// Initialize CLI program
const program = createCommand({
  name: 'typescript-cli-tool',
  description: 'A powerful CLI tool built with TypeScript',
  version: '1.0.0'
});

// Load command definitions from modules
loadCommands(program);

// Parse command-line arguments
program.parse(process.argv);