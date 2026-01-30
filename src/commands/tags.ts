import { Command } from 'commander';
import { Octokit } from '@octokit/rest';
import { createCommand } from '../utils';
import * as dotenv from 'dotenv';

dotenv.config();

export function loadTagsCommands(tags: Command) {
  /* Setup */
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error('GITHUB_TOKEN environment variable is not set');
    process.exit(1);
  }

  const octokit = new Octokit({ auth: token });
}
