import { Command } from "commander";
import { Octokit } from "@octokit/rest";
import { createCommand } from "./utils";
import * as dotenv from "dotenv";

dotenv.config();

export function loadCommands(program: Command) {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
        console.error("GITHUB_TOKEN environment variable is not set");
        process.exit(1);
    }

    const octokit = new Octokit({ auth: token });

    // Command to list starred repositories
    program.addCommand(
        createCommand({
            command: "list-starred",
            description: "List your starred GitHub repositories",
            action: async () => {
                try {
                    // Get authenticated user
                    const { data: user } = await octokit.users.getAuthenticated();
                    
                    // Get starred repositories
                    const { data: starred } = await octokit.activity.listReposStarredByUser({
                        username: user.login,
                        per_page: 100
                    });

                    console.log(`\n ${starred.length} starred repositories for ${user.login}:\n`);
                    
                    starred.forEach((item: any, index: number) => {
                        const repo = item.repo || item; // Handle API response format
                        console.log(`${index + 1}. ${repo.full_name}`);
                    });
                } catch (error: any) {
                    console.error("Error:", error.message);
                }
            }
        })
    );
}