#!/usr/bin/env node

import { Command } from 'commander';
import { loadBaseCommands } from './commands/base_commands';
import { RepoDatabase } from './db/repos_db';
import { GitHubClient } from './github_client';
import { createCommand } from './utils/command_utils';

type CommandType = 'base' | 'tags';

export interface application {
  commands: Record<CommandType, Command>;
  DB: RepoDatabase;
  client: GitHubClient;
}

async function syncStarredRepos(client: GitHubClient) {
  try {
    const starred_repos = await client
      .getOctokit()
      .activity.listReposStarredByUser();

    starred_repos.data.forEach(item => {
      const repo = (item as any).repo || item;
      DB.addRepository(repo.license?.url);
    });

    console.log('Synced starred repositories');
  } catch (error) {
    console.error('Failed to sync starred repos:', error);
  }
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

const client = new GitHubClient();
const DB = new RepoDatabase('repos.db');

// Call the function
syncStarredRepos(client);

const app: application = {
  commands: {
    base: commands,
    tags: tags,
  },
  DB: DB,
  client: client,
};

// Load command definitions from modules
loadBaseCommands(app);

// Parse command-line arguments
commands.parse(process.argv);
