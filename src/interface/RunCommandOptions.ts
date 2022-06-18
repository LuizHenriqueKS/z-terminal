interface RunCommandOptions {

  executable?: string;
  cwd?: string;
  commandArgs?: string[];
  terminalArgs?: string[];
  escape?: boolean;
  repeatExitEachMiliseconds?: number;
  pipeOnProcess?: boolean

}

export default RunCommandOptions;
