-- INSERT repository
INSERT OR REPLACE INTO repositories (name, url) VALUES (?, ?);

-- GET all repositories
SELECT * FROM repositories;

-- GET repository by URL
SELECT * FROM repositories WHERE url = ?;

-- GET repository by name (NEW - since name is now primary key)
SELECT * FROM repositories WHERE name = ?;

-- GET repositories by tag
SELECT r.* FROM repositories r
JOIN tag_repositories tr ON r.name = tr.repo_name
WHERE tr.tag_name = ?;

-- DELETE repository by name (since name is primary key)
DELETE FROM repositories WHERE name = ?;

-- DELETE repository by URL (alternative)
DELETE FROM repositories WHERE url = ?;

-- GET repositories with their tags (convenience query)
SELECT r.*, GROUP_CONCAT(tr.tag_name) as tags
FROM repositories r
LEFT JOIN tag_repositories tr ON r.name = tr.repo_name
GROUP BY r.name;