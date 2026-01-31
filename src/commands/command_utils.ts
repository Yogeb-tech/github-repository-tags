import { Command } from "commander";

interface CommandArgument {
  name: string;
  description?: string;
  defaultValue?: string;
  type?: string;
}

interface CommandConfig {
  command?: string;
  name?: string;
  description?: string;   
  action?: (input: string) => void;
  arguments?: CommandArgument[];
  options?: Record<string, any>;
  version?: string
}

export function createCommand(config: CommandConfig): Command {
  const cmd = new Command();

  if (config.command){
    cmd.command(config.command)
    cmd.name(config.command);
  }

  if (config.name) {
    cmd.name(config.name);
  }

  if (config.version) {
    cmd.version(config.version);
  }

  if (config.arguments) {
    for (const arg of config.arguments) {
      cmd.argument(arg.name, arg.description, arg.defaultValue);
    }
  }

  if (config.action) {
    cmd.action(config.action);
  }

  if (config.options) {
    for (const [key, value] of Object.entries(config.options)) {
      cmd.option(key, value);
    }
  }

  return cmd
}