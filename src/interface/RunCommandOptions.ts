interface RunCommandOptions {

  executable?: string;
  cwd?: string;
  commandArgs?: string[];
  terminalArgs?: string[];
  escape?: boolean;

}

export default RunCommandOptions;
