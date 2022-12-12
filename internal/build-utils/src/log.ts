import process from 'process';
import consola from 'consola';

const [command, info, error] = ['command', 'info', 'error'].map((symbol: string) => {
  return (msg: string) => `[${symbol}] ${msg}`;
});
export function errorAndExit(e: Error): never {
  consola.error(e.stack ?? e.message);
  process.exit(1);
}

export { command, info, error };
