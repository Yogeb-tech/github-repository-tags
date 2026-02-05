import { application } from '..';
import { Repository } from '../db/repos-db';
import { createCommand } from '../utils/command-utils';

export function loadTagCommands(app: application) {
  const db = app.DB;
  const baseCommands = app.commands.base;

  /* Create Commands - all at base level with "tag-" prefix */

  // tag-add command
  baseCommands.addCommand(
    createCommand({
      command: 'tag-add',
      description: 'Add a new tag to the database',
      arguments: [
        {
          name: '<tagName>',
          description:
            'Name of the tag to create (e.g., "javascript", "react")',
        },
      ],
      action: async tagName => {
        try {
          db.addTag(tagName);
          console.log(`Tag "${tagName}" added successfully`);
        } catch (error) {
          console.error(`Failed to add tag "${tagName}":`, error);
        }
      },
    }),
  );

  // tag-connect command
  baseCommands.addCommand(
    createCommand({
      command: 'tag-connect',
      description: 'Connect a tag to a repository',
      arguments: [
        {
          name: '<repoName>',
          description: 'Repository name (format: owner/repo)',
        },
        {
          name: '<tagName>',
          description: 'Name of the tag to apply',
        },
      ],
      action: async (repoName, tagName) => {
        try {
          db.linkTagToRepo(tagName, repoName);
          console.log(
            `Repository "${repoName}" connected to tag "${tagName}" successfully`,
          );
        } catch (error) {
          console.error(
            `Failed to tag "${repoName}" with "${tagName}":`,
            error,
          );
        }
      },
    }),
  );

  // tag-list command
  baseCommands.addCommand(
    createCommand({
      command: 'tag-list',
      description: 'List all repositories with a specific tag',
      arguments: [
        {
          name: '<tagName>',
          description: 'Name of the tag to filter by',
        },
      ],
      action: async tagName => {
        try {
          const repos = db.getRepositoriesByTag(tagName);
          console.log(
            `\nRepositories with tag "${tagName}" (${repos.length} found):\n`,
          );

          if (repos.length === 0) {
            console.log('No repositories found with this tag.');
            console.log(
              'Use: node dist/index.js tag-connect <repo> <tag> to tag a repository',
            );
          } else {
            repos.forEach((repo: Repository, index: number) => {
              console.log(`${index + 1}. ${repo.name} - ${repo.url}`);
            });
          }
        } catch (error) {
          console.error(
            `Failed to get repositories with tag "${tagName}":`,
            error,
          );
        }
      },
    }),
  );

  // tag-remove command
  baseCommands.addCommand(
    createCommand({
      command: 'tag-remove',
      description: 'Remove a tag from a repository',
      arguments: [
        {
          name: '<repoName>',
          description: 'Repository name (format: owner/repo)',
        },
        {
          name: '<tagName>',
          description: 'Name of the tag to remove',
        },
      ],
      action: async (repoName: string, tagName: string) => {
        try {
          // Use repoName directly instead of converting to URL
          db.unlinkTagFromRepo(tagName, repoName);
          console.log(`Tag "${tagName}" removed from repository "${repoName}"`);
        } catch (error: any) {
          console.error(
            `Could not remove tag "${tagName}" from "${repoName}":`,
            error,
          );
        }
      },
    }),
  );

  // tag-list-all command to list all tags
  baseCommands.addCommand(
    createCommand({
      command: 'tag-list-all',
      description: 'List all available tags with usage counts',
      action: async () => {
        try {
          const tags = db.getAllTags();
          const usage = db.getTagUsageCount();

          console.log('\nAvailable tags:\n');

          if (tags.length === 0) {
            console.log(
              'No tags found. Use: node dist/index.js tag-add <name> to create a tag',
            );
          } else {
            tags.forEach((tag: any, index: number) => {
              const usageCount =
                usage.find(u => u.name === tag.name)?.usage_count || 0;
              console.log(
                `${index + 1}. ${tag.name} (used ${usageCount} time${usageCount !== 1 ? 's' : ''})`,
              );
            });
          }
        } catch (error) {
          console.error('Failed to get tags:', error);
        }
      },
    }),
  );
}
