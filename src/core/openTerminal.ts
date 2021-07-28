import WindowsTerminal from '@z-terminal/impl/WindowsTerminal';
import OpenTerminalOptions from '@z-terminal/interface/OpenTerminalOptions';
import Terminal from '@z-terminal/interface/Terminal';

function openTerminal(options?: OpenTerminalOptions): Terminal {
  return new WindowsTerminal(options);
}

export default openTerminal;
