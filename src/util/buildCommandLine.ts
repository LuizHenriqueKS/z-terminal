import CommandOptions from '@z-terminal/interface/CommandOptions';

function buildCommandLine(command: string, options?: CommandOptions) {
  let result;
  if (isEscapeActivated(options) && command.includes(' ')) {
    result = `"${command}"`;
  } else {
    result = `${command}`;
  }
  if (options?.args !== undefined) {
    result += ' ' + buildArgsLine(options);
  }
  return result;
}

function isEscapeActivated(options?: CommandOptions): boolean {
  if (options === undefined || options.escape === undefined) {
    return true;
  }
  return false;
}

function buildArgsLine(options?: CommandOptions) {
  if (options?.args !== undefined) {
    if (isEscapeActivated(options)) {
      return options.args.map(a => `"${a}"`).join(' ');
    } else {
      return options.args.join(' ');
    }
  }
  return '';
}

export default buildCommandLine;
