import { createCommand } from './command_utils';
import { nanoid } from 'nanoid';
import { application } from '..';

export function loadTagsCommands(app: application) {
  /* Create Commands */
  const add = createCommand({
    command: 'add',
    description: 'Add a tag you can use',
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
    action: async () => {
      //const tagID = 
      //const repoID =
      //app.DB.linkTagToRepo()
    },
  });

  const connect = createCommand({
    command: 'connect',
    description: 'Connect a tag to a repo',
    action: async () => {
      console.log('connecting repo to a tag');
    },
  });

  const list = createCommand({
    command: 'list',
    description: 'Lists all the commands of inputted tag',
    action: async () => {
      console.log('list all tags');
    },
  });

  const remove = createCommand({
    command: 'remove',
    description: 'Remove a tag from a Repository',
    action: async () => {
      console.log('remove a repository to tag "x"');
    },
  });

  const rename = createCommand({
    command: 'rename',
    description:
      'Rename a tag, changes apply to all repositories associated with the tag',
    action: async () => {
      console.log('rename tag');
    },
  });

  const replace = createCommand({
    command: 'replace',
    description: 'add a tag to saved list',
    action: async () => {
      console.log('add a repository to tag "x"');
    },
  });

  /* Make commands subcommands of 'tag'*/
  app.commands.tags.addCommand(add);
  app.commands.tags.addCommand(list);
  app.commands.tags.addCommand(remove);
  app.commands.tags.addCommand(rename);
}
