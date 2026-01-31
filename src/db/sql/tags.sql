-- INSERT tag
INSERT OR IGNORE INTO tags VALUES (?, ?);

-- GET all tags
SELECT * FROM tags;

-- GET tags by repository
SELECT t.* FROM tags t
JOIN tag_repositories tr ON t.id = tr.tag_id
WHERE tr.repo_id = ?;

-- DELETE tag
DELETE FROM tags WHERE id = ?;

-- LINK tag to repository
INSERT OR IGNORE INTO tag_repositories VALUES (?, ?);