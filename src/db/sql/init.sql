-- Create tables
CREATE TABLE IF NOT EXISTS repositories (
  name TEXT PRIMARY KEY,      -- Name as primary key
  url TEXT NOT NULL UNIQUE 
);

CREATE TABLE IF NOT EXISTS tags (
  name TEXT PRIMARY KEY      -- Tag name as primary key
);

CREATE TABLE IF NOT EXISTS tag_repositories (
  tag_name TEXT NOT NULL,
  repo_name TEXT NOT NULL,    -- Changed from repo_url to repo_name
  PRIMARY KEY(tag_name, repo_name),
  FOREIGN KEY (tag_name) REFERENCES tags(name) ON DELETE CASCADE,
  FOREIGN KEY (repo_name) REFERENCES repositories(name) ON DELETE CASCADE
);