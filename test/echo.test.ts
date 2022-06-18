// @ts-ignore
import { runCommand } from '@z-terminal/index';

it('should print a message', async () => {
  const result = await runCommand('echo Hello world', { escape: false, pipeOnProcess: true });
  expect(result.output()).toContain('Hello world');
});
