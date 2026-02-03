// src/commands/base-commands.ts
import { application } from '..';
import { createCommand } from '../utils/command-utils';
import { syncStarredRepos, toGithubURL } from '../utils/utils';

export function loadBaseCommands(app: application) {
  const client = app.client;
  const octokit = client.getOctokit();
  const base_commands = app.commands.base;

  // Command to list starred repositories
  base_commands.addCommand(
    createCommand({
      command: 'list-starred',
      description: 'List your starred GitHub repositories',
      action: async () => {
        try {
          const user = await octokit.users.getAuthenticated();
          const starred_repos = await octokit.activity.listReposStarredByUser({
            username: user.data.login,
            per_page: 100,
          });

          console.log(
            `\n ${starred_repos.data.length} starred repositories for ${user.data.login}:\n`,
          );

          starred_repos.data.forEach((item: any, index: number) => {
            const repo = item.repo || item; // Handle API response format
            console.log(
              `${index + 1}. ${repo.name} - ${toGithubURL(repo.full_name)}`,
            );
          });
        } catch (error: any) {
          console.error('Error:', error.message);
        }
      },
    }),
  );

  // Add a sync command
  base_commands.addCommand(
    createCommand({
      command: 'sync',
      description:
        'Sync your starred GitHub repositories to the local database',
      action: async () => {
        try {
          // Import the sync function
          await syncStarredRepos(client, app.DB);
        } catch (error: any) {
          console.error('Error:', error.message);
        }
      },
    }),
  );
}
