-- INSERT tag
INSERT OR IGNORE INTO tags (name) VALUES (?);

-- GET all tags
SELECT * FROM tags;

-- GET tags by repository
SELECT t.* FROM tags t
JOIN tag_repositories tr ON t.name = tr.tag_name
WHERE tr.repo_name = ?;

-- DELETE tag (will cascade to tag_repositories)
DELETE FROM tags WHERE name = ?;

-- LINK tag to repository
INSERT OR IGNORE INTO tag_repositories (tag_name, repo_name) VALUES (?, ?);

-- UNLINK tag from repository
DELETE FROM tag_repositories WHERE tag_name = ? AND repo_name = ?;

-- GET tag usage count
SELECT t.name, COUNT(tr.repo_name) as usage_count
FROM tags t
LEFT JOIN tag_repositories tr ON t.name = tr.tag_name
GROUP BY t.name;