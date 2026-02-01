-- Create tables
CREATE TABLE IF NOT EXISTS repositories (
  url TEXT PRIMARY KEY,      -- URL as primary key
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS tags (
  name TEXT PRIMARY KEY      -- Tag name as primary key
);

CREATE TABLE IF NOT EXISTS tag_repositories (
  tag_name TEXT NOT NULL,
  repo_url TEXT NOT NULL,
  PRIMARY KEY(tag_name, repo_url),
  FOREIGN KEY (tag_name) REFERENCES tags(name) ON DELETE CASCADE,
  FOREIGN KEY (repo_url) REFERENCES repositories(url) ON DELETE CASCADE
);
