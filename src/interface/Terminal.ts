import { Readable } from 'stream';
import CommandOptions from './CommandOptions';

interface Terminal {

  waitForExit(): Promise<Terminal>;
  printOnConsole(): Terminal;
  pipeOnProcess(): Terminal;

  captureOutput(): Terminal;
  captureError(): Terminal;

  exit(): Terminal;
  kill(): Terminal;

  output(): string;
  error(): string;

  send(chunk: any): Terminal;
  sendLine(line: string): Terminal;

  runCommand(command: string, options?: CommandOptions): Terminal;

  get stdout(): Readable | null;
  get stderr(): Readable | null;

}

export default Terminal;
