export function toGithubURL(repoName: string) {
  return 'https://github.com/${repoName}';
}

export function toRepositoryName(githubURL: string) {
  return githubURL.substring(19);
}
