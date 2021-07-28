# z-terminal

## Install

```
npm i z-terminal
```

## Examples

```typescript
import { openTerminal } from 'z-terminal';

async function main(){
  const terminal = openTerminal({cwd: 'c:\\'});
  terminal.runCommand("set /a result=10+5", {escape: false});
  terminal.runCommand("echo %result%", {escape: false});
  terminal.pipeOnProcess();
  terminal.exit();
  await terminal.waitForExit();
  console.log(terminal.output());
}

main().catch(e=>console.error(e));
```

```typescript
import { runCommand } from 'z-terminal';

async function main(){
  const result = await runCommand('dir /b', {escape: false});
  console.log(result.output());
}

main().catch(e=>console.error(e));
```