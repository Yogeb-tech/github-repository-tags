import Database from 'better-sqlite3';

const db = Database('repos.db');

function initDB() {
  // Use db.exec() for running SQL without returning data
  db.exec(`
    CREATE TABLE IF NOT EXISTS tags (
        tag TEXT PRIMARY KEY,
        repos TEXT -- JSON array of objects { repo_name, repo_url }
    )
  `);
}

function addTaggedRepo(tag: string, repos: string) {
  // Prepare a statement and run it
  const stmt = db.prepare(
    `INSERT OR REPLACE INTO tags (tag, repos) VALUES (?, ?)`,
  );
  stmt.run(tag, repos);
}

function getTaggedRepo(tag: string) {
  const stmt = db.prepare(`SELECT * FROM tags WHERE tag = ?`);
  return stmt.get(tag); // Returns a single row or undefined
}

function getAllTaggedRepos() {
  const stmt = db.prepare(`SELECT * FROM tags`);
  return stmt.all(); // Returns an array of all rows
}

function updateTaggedRepo(tag: string, repos: string) {
  const stmt = db.prepare(`UPDATE tags SET repos = ? WHERE tag = ?`);
  const result = stmt.run(repos, tag);
  return result.changes; // Number of rows updated
}

function deleteTaggedRepo(tag: string) {
  const stmt = db.prepare(`DELETE FROM tags WHERE tag = ?`);
  const result = stmt.run(tag);
  return result.changes; // Number of rows deleted
}

// Example usage:
initDB();

// Add a tag with repos as JSON string
addTaggedRepo(
  'javascript',
  JSON.stringify([
    { repo_name: 'express', repo_url: 'https://github.com/expressjs/express' },
    { repo_name: 'react', repo_url: 'https://github.com/facebook/react' },
  ]),
);

// Get a tag
const jsRepos = getTaggedRepo('javascript');
console.log(jsRepos);

// Get all tags
const allTags = getAllTaggedRepos();
console.log(allTags);
