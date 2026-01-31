// src/github-client.ts
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';

dotenv.config();

export class GitHubClient {
  protected octokit: Octokit;

  constructor() {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      console.error('GITHUB_TOKEN environment variable is not set');
      process.exit(1);
    }
    this.octokit = new Octokit({ auth: token });
  }

  public getOctokit(): Octokit {
    return this.octokit;
  }
}
