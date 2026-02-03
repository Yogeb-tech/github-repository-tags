import Database, { Database as DB } from 'better-sqlite3';
import * as fs from 'fs';
import * as path from 'path';

export interface Repository {
  url: string;
  name: string;
}

export interface Tag {
  name: string;
}

// Helper to load SQL files
function loadSQL(fileName: string): string {
  return fs.readFileSync(path.join(__dirname, 'sql', fileName), 'utf-8');
}

export class RepoDatabase {
  private db: DB;

  // TODO: Add error handling to each function
  // TODO: Finish off prototype and basic functionality

  constructor(fileName: string) {
    const dbPath = path.join(process.cwd(), fileName);
    this.db = new Database(dbPath);
    this.db.exec(loadSQL('init.sql'));
  }

  // Repository methods
  addRepository(repo: Repository): void {
    const sql = loadSQL('repositories.sql').split(';')[0]; // INSERT repository
    this.db.prepare(sql).run(repo.url, repo.name);
  }

  getRepository(url: string): Repository | null {
    const sql = 'SELECT * FROM repositories WHERE url = ?';
    return this.db.prepare(sql).get(url) as Repository | null;
  }

  getAllRepositories(): Repository[] {
    const sql = loadSQL('repositories.sql').split(';')[1]; // GET all repositories
    return this.db.prepare(sql).all() as Repository[];
  }

  getRepositoriesByTag(tagName: string): Repository[] {
    const sql = loadSQL('repositories.sql').split(';')[3]; // GET repositories by tag
    return this.db.prepare(sql).all(tagName) as Repository[];
  }

  removeRepository(url: string): void {
    const sql = loadSQL('repositories.sql').split(';')[4]; // DELETE repository
    this.db.prepare(sql).run(url);
  }

  getRepositoriesWithTags(): (Repository & { tags: string })[] {
    const sql = loadSQL('repositories.sql').split(';')[5]; // GET repositories with their tags
    return this.db.prepare(sql).all() as (Repository & { tags: string })[];
  }

  // Tag methods
  addTag(tagName: string): void {
    const sql = loadSQL('tags.sql').split(';')[0]; // INSERT tag
    this.db.prepare(sql).run(tagName);
  }

  getAllTags(): Tag[] {
    const sql = loadSQL('tags.sql').split(';')[1]; // GET all tags
    return this.db.prepare(sql).all() as Tag[];
  }

  getTagsByRepo(repoUrl: string): Tag[] {
    const sql = loadSQL('tags.sql').split(';')[2]; // GET tags by repository
    return this.db.prepare(sql).all(repoUrl) as Tag[];
  }

  removeTag(tagName: string): void {
    const sql = loadSQL('tags.sql').split(';')[3]; // DELETE tag
    this.db.prepare(sql).run(tagName);
  }

  linkTagToRepo(tagName: string, repoUrl: string): void {
    const sql = loadSQL('tags.sql').split(';')[4]; // LINK tag to repository
    this.db.prepare(sql).run(tagName, repoUrl);
  }

  unlinkTagFromRepo(tagName: string, repoUrl: string): void {
    const sql = loadSQL('tags.sql').split(';')[5]; // UNLINK tag from repository
    this.db.prepare(sql).run(tagName, repoUrl);
  }

  getTagUsageCount(): { name: string; usage_count: number }[] {
    const sql = loadSQL('tags.sql').split(';')[6]; // GET tag usage count
    return this.db.prepare(sql).all() as {
      name: string;
      usage_count: number;
    }[];
  }

  close(): void {
    this.db.close();
  }
}
