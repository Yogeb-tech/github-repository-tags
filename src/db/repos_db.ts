import Database, { Database as DB } from 'better-sqlite3';
import * as fs from 'fs';
import * as path from 'path';

export interface Repository {
  id: string;
  name: string;
  url: string;
}

export interface Tag {
  id: string;
  name: string;
}

// Helper to load SQL files
function loadSQL(fileName: string): string {
  return fs.readFileSync(path.join(__dirname, 'sql', fileName), 'utf-8');
}

export class RepoDatabase {
  private db: DB;
  
  constructor() {
    // Use path to get the top level directory directory
    const dbPath = path.join(process.cwd(), "repos.db");

    // Now create/connect to the database
    this.db = new Database(dbPath);
    this.db.exec(loadSQL('init.sql'));
  }
  
  // Repository methods
  addRepository(repo: Repository): void {
    const sql = loadSQL('repositories.sql').split(';')[0]; // Get first statement
    this.db.prepare(sql).run(repo.id, repo.name, repo.url);
  }
  
  getAllRepositories(): Repository[] {
    const sql = loadSQL('repositories.sql').split(';')[1]; // Get second statement
    return this.db.prepare(sql).all() as Repository[];
  }
  
  getRepositoriesByTag(tagId: string): Repository[] {
    const sql = loadSQL('repositories.sql').split(';')[2]; // Get third statement
    return this.db.prepare(sql).all(tagId) as Repository[];
  }
  
  removeRepository(repoId: string): void {
    const sql = loadSQL('repositories.sql').split(';')[3]; // Get fourth statement
    this.db.prepare(sql).run(repoId);
  }
  
  // Tag methods
  addTag(tag: Tag): void {
    const sql = loadSQL('tags.sql').split(';')[0];
    this.db.prepare(sql).run(tag.id, tag.name);
  }
  
  getAllTags(): Tag[] {
    const sql = loadSQL('tags.sql').split(';')[1];
    return this.db.prepare(sql).all() as Tag[];
  }
  
  getTagsByRepo(repoId: string): Tag[] {
    const sql = loadSQL('tags.sql').split(';')[2];
    return this.db.prepare(sql).all(repoId) as Tag[];
  }
  
  removeTag(tagId: string): void {
    const sql = loadSQL('tags.sql').split(';')[3];
    this.db.prepare(sql).run(tagId);
  }
  
  linkTagToRepo(tagId: string, repoId: string): void {
    const sql = loadSQL('tags.sql').split(';')[4];
    this.db.prepare(sql).run(tagId, repoId);
  }
  
  close(): void {
    this.db.close();
  }
}