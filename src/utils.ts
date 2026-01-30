import { Command } from "commander";

interface CommandArguement {
    name: string;
    description?: string;
    defaultValue?: unknown;
}

interface CommandConfig {
    name?: string
    command?: string;
    description?: string;
    version?: string
    action?: (name: string) => void;
    arguement?: CommandArguement;
}

export function createCommand(config: CommandConfig): Command {
    const cmd: Command = new Command();

    if (config.command) {
        cmd.command(config.command);
        cmd.name(config.command);
    }
    if (config.name) {
        cmd.name(config.name);
    }
    if (config.description) {
        cmd.description(config.description);
    }
    if (config.version) {
        cmd.version(config.version);
    }
    if (config.arguement) {
        cmd.argument(config.arguement.name, config.arguement.description, config.arguement.defaultValue);
    }
    if (config.action) {
        cmd.action(config.action);
    }

    return cmd;
}