#!/usr/bin/env node

import { Command } from 'commander';
import { loadBaseCommands } from './commands/base_commands';
import { createCommand } from './commands/command_utils';
import { RepoDatabase } from './db/repos_db';
import { GitHubClient } from './github_client';

type CommandType = 'base' | 'tags';

export interface application {
  commands: Record<CommandType, Command>;
  DB: RepoDatabase | undefined; // HACK: Temporary undefined until working with npn run build
  client: GitHubClient;
}

/* Initialize application members */
const commands = createCommand({
  name: 'typescript-cli-tool',
  description: 'A powerful CLI tool built with TypeScript',
  version: '1.0.0',
});

const tags = createCommand({
  command: 'tags',
  description:
    'Subcommand of commands: Leads to subcommands related to tagging',
});
// TODO: I need proper error handling jesus christ
const DB = new RepoDatabase();

// TODO: Actually get data first
const client = new GitHubClient();

const app: application = {
  commands: {
    base: commands,
    tags: tags,
  },
  DB: undefined, //DB,
  client: client,
};

// Load command definitions from modules
loadBaseCommands(app);

// Parse command-line arguments
commands.parse(process.argv);
