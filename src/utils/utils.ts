import { RepoDatabase } from '../db/repos-db';
import { GitHubClient } from '../github-client';

export function toGithubURL(repoName: string) {
  return `https://github.com/${repoName}`;
}

export function toRepositoryName(githubURL: string) {
  return githubURL.substring(19);
}

export async function syncStarredRepos(client: GitHubClient, DB: RepoDatabase) {
  // Added DB parameter
  try {
    const octokit = client.getOctokit();
    // Check if we should use authenticated user endpoint
    const starred_repos =
      await octokit.rest.activity.listReposStarredByAuthenticatedUser({
        per_page: 100,
      });

    starred_repos.data.forEach(item => {
      const repo = (item as any).repo || item;
      DB.addRepository({
        url: repo.html_url,
        name: repo.name,
      });
    });

    console.log('Synced starred repositories');
  } catch (error) {
    console.error('Failed to sync starred repos:', error);
  }
}
