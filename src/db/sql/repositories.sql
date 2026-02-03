-- INSERT repository
INSERT OR REPLACE INTO repositories (url, name) VALUES (?, ?);

-- GET all repositories
SELECT * FROM repositories;

-- GET repository by URL
SELECT * FROM repositories WHERE url = ?;

-- GET repositories by tag
SELECT r.* FROM repositories r
JOIN tag_repositories tr ON r.url = tr.repo_url
WHERE tr.tag_name = ?;

-- DELETE repository
DELETE FROM repositories WHERE url = ?;

-- GET repositories with their tags (convenience query)
SELECT r.*, GROUP_CONCAT(tr.tag_name) as tags
FROM repositories r
LEFT JOIN tag_repositories tr ON r.url = tr.repo_url
GROUP BY r.url;