import RunCommandOptions from '@z-terminal/interface/RunCommandOptions';
import RunCommandResult from '@z-terminal/interface/RunCommandResult';
import openTerminal from './openTerminal';

async function runCommand(command: string, options?: RunCommandOptions): Promise<RunCommandResult> {
  const terminal = openTerminal({
    executable: options?.executable,
    cwd: options?.cwd,
    args: options?.terminalArgs
  });
  terminal.captureOutput();
  terminal.captureError();
  terminal.runCommand(command, {
    escape: options?.escape,
    args: options?.commandArgs
  });
  terminal.exit();
  await terminal.waitForExit();
  return {
    output() {
      return terminal.output();
    },
    error() {
      return terminal.error();
    }
  };
}

export default runCommand;
