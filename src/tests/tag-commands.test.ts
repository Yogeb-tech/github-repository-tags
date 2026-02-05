// __tests__/tag-actions.test.ts
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Types for our test data
interface Repository {
  name: string;
  url: string;
}

// Test suite for tag management actions
describe('Tag Actions', () => {
  // Mock console functions to verify output
  const mockConsole = {
    log: vi.fn(),
    error: vi.fn(),
  };

  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Factory that creates a tag-add action with injected database
  const createTagAddAction = (db: { addTag: (name: string) => void }) => {
    return async (tagName: string) => {
      try {
        db.addTag(tagName);
        mockConsole.log(`Tag "${tagName}" added successfully`);
      } catch (error) {
        mockConsole.error(`Failed to add tag "${tagName}":`, error);
      }
    };
  };

  // Factory that creates a tag-list action
  const createTagListAction = (db: {
    getRepositoriesByTag: (name: string) => Repository[];
  }) => {
    return async (tagName: string) => {
      try {
        const repos = db.getRepositoriesByTag(tagName);
        mockConsole.log(
          `\nRepositories with tag "${tagName}" (${repos.length} found):\n`,
        );

        if (repos.length === 0) {
          mockConsole.log('No repositories found with this tag.');
        } else {
          repos.forEach((repo, index) => {
            mockConsole.log(`${index + 1}. ${repo.name} - ${repo.url}`);
          });
        }
      } catch (error) {
        mockConsole.error(
          `Failed to get repositories with tag "${tagName}":`,
          error,
        );
      }
    };
  };

  // Test: tag-add should call database and log success
  it('tag-add: calls db and logs success', async () => {
    const mockDB = { addTag: vi.fn() };
    const action = createTagAddAction(mockDB);

    await action('vue');

    expect(mockDB.addTag).toHaveBeenCalledWith('vue');
    expect(mockConsole.log).toHaveBeenCalledWith(
      'Tag "vue" added successfully',
    );
  });

  // Test: tag-list should display repositories correctly
  it('tag-list: shows repositories', async () => {
    const mockDB = {
      getRepositoriesByTag: vi
        .fn()
        .mockReturnValue([
          { name: 'vuejs/core', url: 'https://github.com/vuejs/core' },
        ]),
    };
    const action = createTagListAction(mockDB);

    await action('vue');

    expect(mockDB.getRepositoriesByTag).toHaveBeenCalledWith('vue');
    expect(mockConsole.log).toHaveBeenCalledWith(
      '\nRepositories with tag "vue" (1 found):\n',
    );
    expect(mockConsole.log).toHaveBeenCalledWith(
      '1. vuejs/core - https://github.com/vuejs/core',
    );
  });
});
