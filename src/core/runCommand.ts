import RunCommandOptions from '../interface/RunCommandOptions';
import RunCommandResult from '../interface/RunCommandResult';
import openTerminal from './openTerminal';

async function runCommand(command: string, options?: RunCommandOptions): Promise<RunCommandResult> {
  const terminal = openTerminal({
    executable: options?.executable,
    cwd: options?.cwd,
    args: options?.terminalArgs
  });
  if (options?.pipeOnProcess) {
    terminal.pipeOnProcess();
  }
  terminal.captureOutput();
  terminal.captureError();
  if (options?.cwd) {
    terminal.runCommand('cd', { args: [options.cwd] });
  }
  terminal.runCommand(command, {
    escape: options?.escape,
    args: options?.commandArgs
  });
  if (options?.repeatExitEachMiliseconds) {
    const interval = setInterval(() => {
      terminal.exit();
    }, options.repeatExitEachMiliseconds);
    await terminal.waitForExit();
    clearInterval(interval);
  } else {
    terminal.exit();
    await terminal.waitForExit();
  }
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
