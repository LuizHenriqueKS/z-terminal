import LinuxTerminal from '../impl/LinuxTerminal';
import WindowsTerminal from '../impl/WindowsTerminal';
import OpenTerminalOptions from '../interface/OpenTerminalOptions';
import Terminal from '../interface/Terminal';

function openTerminal(options?: OpenTerminalOptions): Terminal {
  if (process.platform === 'win32') {
    return new WindowsTerminal(options);
  } else {
    return new LinuxTerminal(options);
  }
}

export default openTerminal;
