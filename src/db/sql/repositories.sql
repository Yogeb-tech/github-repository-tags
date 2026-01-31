-- INSERT repository
INSERT OR REPLACE INTO repositories VALUES (?, ?, ?);

-- GET all repositories
SELECT * FROM repositories;

-- GET repositories by tag
SELECT r.* FROM repositories r
JOIN tag_repositories tr ON r.id = tr.repo_id
WHERE tr.tag_id = ?;

-- DELETE repository
DELETE FROM repositories WHERE id = ?;