import { runCommand } from '@z-terminal/index';

it('should print a message', async () => {
  const result = await runCommand('echo Hello world', { escape: false });
  expect(result.output()).toContain('\r\nHello world\r\n');
});
