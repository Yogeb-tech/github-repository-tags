#!/usr/bin/env node

import { Command } from 'commander';
import { loadBaseCommands } from './commands/base-commands';
import { loadTagCommands } from './commands/tags-commands';
import { RepoDatabase } from './db/repos-db';
import { GitHubClient } from './github-client';
import { createCommand } from './utils/command-utils';

type CommandType = 'base';

export interface application {
  commands: Record<CommandType, Command>;
  DB: RepoDatabase;
  client: GitHubClient;
}

/* Initialize application members */
const commands = createCommand({
  name: 'typescript-cli-tool',
  description: 'A powerful CLI tool built with TypeScript',
  version: '1.0.0',
});

const client = new GitHubClient();
const DB = new RepoDatabase('repos.db');

const app: application = {
  commands: {
    base: commands,
  },
  DB: DB,
  client: client,
};

/* Load command definitions from modules */
loadBaseCommands(app);
loadTagCommands(app);

commands.addHelpText(
  'after',
  `
Examples:
  node dist/index.js sync             # Sync starred repos from GitHub
  node dist/index.js list-starred     # List your starred repos
  node dist/index.js tag-add <name>   # Create a new tag
  node dist/index.js tag-connect <repo> <tag>  # Tag a repository
  node dist/index.js tag-list <tag>   # List repos with a tag

Run any command with --help for more details.
`,
);

// Parse command-line arguments
commands.parse(process.argv);
