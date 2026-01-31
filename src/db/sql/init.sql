-- Create tables
CREATE TABLE repositories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL
);

CREATE TABLE tags (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE tag_repositories (
  tag_id TEXT NOT NULL,
  repo_id TEXT NOT NULL,
  PRIMARY KEY(tag_id, repo_id)
);