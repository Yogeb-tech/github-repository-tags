import { Database } from 'better-sqlite3';

const db = new Database('repos.db');

db.run(`
    CREATE TABLE IF NOT EXISTS tags (
        tag TEXT PRIMARY KEY,
        repos TEXT -- JSON array of objects { repo_name, repo_url }
    )
`);