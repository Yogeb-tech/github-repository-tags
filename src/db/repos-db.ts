import Database, { Database as DB } from 'better-sqlite3';
import * as fs from 'fs';
import * as path from 'path';

export interface Repository {
  name: string;
  url: string;
}

export interface Tag {
  name: string;
}

// Enums instead of constants
enum RepositoriesSQL {
  INSERT_REPOSITORY = 0,
  GET_ALL_REPOSITORIES = 1,
  GET_REPOSITORY_BY_URL = 2,
  GET_REPOSITORY_BY_NAME = 3,
  GET_REPOSITORIES_BY_TAG = 4,
  DELETE_REPOSITORY_BY_NAME = 5,
  GET_REPOSITORIES_WITH_TAGS = 6,
}

enum TagsSQL {
  INSERT_TAG = 0,
  GET_ALL_TAGS = 1,
  GET_TAGS_BY_REPO = 2,
  DELETE_TAG = 3,
  LINK_TAG_TO_REPO = 4,
  UNLINK_TAG_FROM_REPO = 5,
  GET_TAG_USAGE_COUNT = 6,
}

// Helper to load SQL files
function loadSQL(fileName: string): string {
  return fs.readFileSync(path.join(__dirname, 'sql', fileName), 'utf-8');
}

export class RepoDatabase {
  private db: DB;
  private repositoriesSQL: string[];
  private tagsSQL: string[];

  constructor(fileName: string) {
    const dbPath = path.join(process.cwd(), fileName);
    this.db = new Database(dbPath);

    // Execute the initialization SQL to create tables
    const initSQL = loadSQL('init.sql');
    this.db.exec(initSQL);

    // Load the query SQL files
    this.repositoriesSQL = loadSQL('repositories.sql').split(';');
    this.tagsSQL = loadSQL('tags.sql').split(';');
  }

  // Repository methods
  addRepository(repo: Repository): void {
    const sql = this.repositoriesSQL[RepositoriesSQL.INSERT_REPOSITORY];
    this.db.prepare(sql).run(repo.name, repo.url);
  }

  getRepositoryByUrl(url: string): Repository | null {
    const sql = this.repositoriesSQL[RepositoriesSQL.GET_REPOSITORY_BY_URL];
    return this.db.prepare(sql).get(url) as Repository | null;
  }

  getRepositoryByName(name: string): Repository | null {
    const sql = this.repositoriesSQL[RepositoriesSQL.GET_REPOSITORY_BY_NAME];
    return this.db.prepare(sql).get(name) as Repository | null;
  }

  getAllRepositories(): Repository[] {
    const sql = this.repositoriesSQL[RepositoriesSQL.GET_ALL_REPOSITORIES];
    return this.db.prepare(sql).all() as Repository[];
  }

  getRepositoriesByTag(tagName: string): Repository[] {
    const sql = this.repositoriesSQL[RepositoriesSQL.GET_REPOSITORIES_BY_TAG];
    return this.db.prepare(sql).all(tagName) as Repository[];
  }

  removeRepositoryByName(name: string): void {
    const sql = this.repositoriesSQL[RepositoriesSQL.DELETE_REPOSITORY_BY_NAME];
    this.db.prepare(sql).run(name);
  }

  getRepositoriesWithTags(): (Repository & { tags: string })[] {
    const sql =
      this.repositoriesSQL[RepositoriesSQL.GET_REPOSITORIES_WITH_TAGS];
    return this.db.prepare(sql).all() as (Repository & { tags: string })[];
  }

  // Tag methods
  addTag(tagName: string): void {
    const sql = this.tagsSQL[TagsSQL.INSERT_TAG];
    this.db.prepare(sql).run(tagName);
  }

  getAllTags(): Tag[] {
    const sql = this.tagsSQL[TagsSQL.GET_ALL_TAGS];
    return this.db.prepare(sql).all() as Tag[];
  }

  getTagsByRepo(repoName: string): Tag[] {
    const sql = this.tagsSQL[TagsSQL.GET_TAGS_BY_REPO];
    return this.db.prepare(sql).all(repoName) as Tag[];
  }

  removeTag(tagName: string): void {
    const sql = this.tagsSQL[TagsSQL.DELETE_TAG];
    this.db.prepare(sql).run(tagName);
  }

  linkTagToRepo(tagName: string, repoName: string): void {
    const sql = this.tagsSQL[TagsSQL.LINK_TAG_TO_REPO];
    this.db.prepare(sql).run(tagName, repoName);
  }

  unlinkTagFromRepo(tagName: string, repoName: string): void {
    const sql = this.tagsSQL[TagsSQL.UNLINK_TAG_FROM_REPO];
    this.db.prepare(sql).run(tagName, repoName);
  }

  getTagUsageCount(): { name: string; usage_count: number }[] {
    const sql = this.tagsSQL[TagsSQL.GET_TAG_USAGE_COUNT];
    return this.db.prepare(sql).all() as {
      name: string;
      usage_count: number;
    }[];
  }

  close(): void {
    this.db.close();
  }
}
