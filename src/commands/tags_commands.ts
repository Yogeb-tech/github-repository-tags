import { application } from '..';
import { createCommand } from '../utils/command_utils';
import { toGithubURL } from '../utils/utils';

export function loadTagsCommands(app: application) {
  const db = app.DB;
  const tagCommands = app.commands.tags;

  /* Create Commands */
  const add = createCommand({
    command: 'add',
    description: 'Add a tag you can use',
    arguments: [
      {
        name: '<tag_name>',
        description:
          'name of the tag you are applying to the target repository',
      },
    ],
    action: async tag_name => {
      try {
        db.addTag(tag_name);
        console.log(`Tag "${tag_name}" added successfully`);
      } catch (error) {
        console.error(`Failed to add tag "${tag_name}":`, error);
      }
    },
  });

  const connect = createCommand({
    command: 'connect',
    description: 'Connect a tag to a repo',
    arguments: [
      {
        name: '<repo_name>',
        description: 'name of the repository',
      },
      {
        name: '<tag_name>',
        description:
          'name of the tag you are applying to the target repository',
      },
    ],
    action: async (repo_name, tag_name) => {
      db.linkTagToRepo(toGithubURL(repo_name), tag_name);
    },
  });

  const list = createCommand({
    command: 'list',
    description: 'Lists all the commands of inputted tag',
    arguments: [
      {
        name: '<tag_name>',
        description:
          'name of the tag you are applying to the target repository',
      },
    ],
    action: async tag_name => {
      db.getRepositoriesByTag(tag_name);
    },
  });

  const remove = createCommand({
    command: 'remove',
    description: 'Remove a tag from a Repository',
    action: async () => {
      console.log('remove a repository to tag "x"');
    },
  });

  /*
  const rename = createCommand({
    command: 'rename',
    description:
      'Rename a tag, changes apply to all repositories associated with the tag',
    action: async () => {
      console.log('rename tag');
    },
  });
  */

  /* Make commands subcommands of 'tag'*/
  tagCommands.addCommand(add);
  tagCommands.addCommand(connect);
  tagCommands.addCommand(list);
  tagCommands.addCommand(remove);
}
