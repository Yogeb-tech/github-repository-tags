# GitHub Repository Tag Manager

A CLI tool for managing topics across your GitHub repositories with local caching and bulk operations.

## Quick Start

```bash
# Install dependencies
npm install

# Build and run
npm run build
npm run main -- --help

# Or run directly in development
npm run dev -- --help
```

Available Commands

```
tag-add <tagName>        - Add a new tag to the database
tag-connect <repo> <tag> - Connect a tag to a repository
tag-list <tagName>       - List all repositories with a specific tag
tag-remove <repo> <tag>  - Remove a tag from a repository
tag-list-all            - List all available tags with usage counts
```

Development

```bash
# Type check
npm run type-check

# Run tests
npm test

# Build for production
npm run build

# Show help
npm run show-help
```

Project Structure

```
src/        - TypeScript source code
dist/       - Compiled JavaScript output
tests/  - Test files using Vitest
```

Requirements

```
Node.js 16+
TypeScript 4.7+
GitHub Personal Access Token (for GitHub API access)
```

Configuration

Set your GitHub token as an environment variable:

```bash
export GITHUB_TOKEN=your_token_here
```

Or create a .env file:

```c
GITHUB_TOKEN=your_token_here
```
