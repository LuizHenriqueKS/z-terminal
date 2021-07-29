import WindowsTerminal from '../impl/WindowsTerminal';
import OpenTerminalOptions from '../interface/OpenTerminalOptions';
import Terminal from '../interface/Terminal';

function openTerminal(options?: OpenTerminalOptions): Terminal {
  return new WindowsTerminal(options);
}

export default openTerminal;
