// src/commands/base-commands.ts
import { Command } from 'commander';
import { createCommand } from '../utils';
import { loadTagsCommands } from './tags';
import { GitHubClient } from '../github_client';

export function loadBaseCommands(base: Command) {
  const client = new GitHubClient();

  // Command to list starred repositories
  base.addCommand(
    createCommand({
      command: 'list-starred',
      description: 'List your starred GitHub repositories',
      action: async () => {
        try {
          const user = await client.getOctokit().users.getAuthenticated();
          const starred = await client.getOctokit().activity.listReposStarredByUser({
            username: user.data.login,
            per_page: 100,
          });

          console.log(
            `\n ${starred.data.length} starred repositories for ${user.data.login}:\n`,
          );

          starred.data.forEach((item: any, index: number) => {
            const repo = item.repo || item; // Handle API response format
            console.log(`${index + 1}. ${repo.full_name}`);
          });
        } catch (error: any) {
          console.error('Error:', error.message);
        }
      },
    }),
  );

  // Load subcommands under 'tags'
  const tags = createCommand({
    command: 'tags',
    description: 'Leads to subcommands related to tagging',
  });
  loadTagsCommands(tags);
}