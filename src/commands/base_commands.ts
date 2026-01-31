// src/commands/base-commands.ts
import { application } from '..';
import { createCommand } from './command_utils';
import { loadTagsCommands } from './tags_commands';

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
          const starred = await octokit.activity.listReposStarredByUser({
            username: user.data.login,
            per_page: 100,
          });

          console.log(
            `\n ${starred.data.length} starred repositories for ${user.data.login}:\n`,
          );

          starred.data.forEach((item: any, index: number) => {
            const repo = item.repo || item; // Handle API response format
            console.log(
              `${index + 1}. ${repo.name} - https://github.com/${repo.full_name}`,
            );
          });
        } catch (error: any) {
          console.error('Error:', error.message);
        }
      },
    }),
  );

  // TODO: Move this to index.ts
  loadTagsCommands(app);

  base_commands.addCommand(app.commands.tags);
}
