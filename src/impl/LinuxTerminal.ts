import { Terminal } from '../index';
import { spawn, ChildProcess } from 'child_process';
import { Readable } from 'stream';
import TerminalInitializationError from '../exception/TerminalnitializationError';
import CaptureDisabledError from '../exception/CaptureDisabledError';
import OpenTerminalOptions from '../interface/OpenTerminalOptions';
import CommandOptions from '../interface/CommandOptions';
import buildCommandLine from '../util/buildCommandLine';

class LinuxTerminal implements Terminal {
  childProcess: ChildProcess;
  _output: string;
  _error: string;
  _captureOutputEnabled: boolean;
  _captureErrorEnabled: boolean;

  constructor(options?: OpenTerminalOptions) {
    this.childProcess = spawn(options?.executable || 'bash');
    if (!this.childProcess) throw new TerminalInitializationError();
    this._output = '';
    this._error = '';
    this._captureOutputEnabled = false;
    this._captureErrorEnabled = false;
  }

  runCommand(command: string, options?: CommandOptions): Terminal {
    const line: string = buildCommandLine(command, options);
    this.sendLine(line);
    return this;
  }

  waitForExit(): Promise<Terminal> {
    const it = this;
    return new Promise(resolve => {
      this.childProcess.on('exit', () => {
        resolve(it);
      });
    });
  }

  printOnConsole(): Terminal {
    console.log(this.output());
    console.error(this.error());
    return this;
  }

  pipeOnProcess(): Terminal {
    this.childProcess.stderr!.pipe(process.stderr);
    this.childProcess.stdout!.pipe(process.stdout);
    return this;
  }

  exit(): Terminal {
    this.sendLine('exit');
    return this;
  }

  captureOutput(): Terminal {
    this.childProcess.stdout?.on('data', (data) => {
      this._output += data.toString();
    });
    this._captureOutputEnabled = true;
    return this;
  }

  captureError(): Terminal {
    this.childProcess.stderr?.on('data', (data) => {
      this._error += data.toString();
    });
    this._captureErrorEnabled = true;
    return this;
  }

  kill(): Terminal {
    this.childProcess.kill('SIGHUP');
    return this;
  }

  output(): string {
    if (this._captureOutputEnabled) {
      return this._output;
    } else {
      throw new CaptureDisabledError('Use terminal.captureOutput() before terminal.output()');
    }
  }

  error(): string {
    if (this._captureErrorEnabled) {
      return this._error;
    } else {
      throw new CaptureDisabledError('Use terminal.captureError() before terminal.error()');
    }
  }

  send(chunk: any): Terminal {
    this.childProcess.stdin!.write(chunk);
    return this;
  }

  sendLine(line: string): Terminal {
    this.send(line + '\n');
    return this;
  }

  get stdout(): Readable | null {
    return this.childProcess.stdout;
  }

  get stderr(): Readable | null {
    return this.childProcess.stderr;
  }
}

export default LinuxTerminal;
