import { execa }           from 'execa';
import { ExecutionError }  from '../../core/errors.js';
import { logger }          from '../logger/logger.js';

export const commandExecutor = {

  async run(command, args = [], options = {}) {
    const {
      dryRun  = false,
      timeout = 30_000,   // 30 seconds default; z/OS commands may need more
      encoding = 'utf8',  // 'buffer' for binary output (e.g. DCOLLECT)
    } = options;
    // Destructuring — extracts named fields from the options object.
    // Same as: const dryRun = options.dryRun ?? false; etc.

    // Log every command before running — audit trail in the application log.
    // In production this appears as a structured JSON line that can be queried.
    logger.info({ command, args, dryRun }, 'executing command');

    if (dryRun) {
      // Dry-run: return immediately without touching the OS.
      logger.info({ command, args }, 'dry-run: command not executed');
      return { stdout: '', stderr: '', dryRun: true };
    }

    try {
      // execa(command, args, options)
      // command  = the binary to run, e.g. 'sqlite3', 'oprmsg', 'lvcreate'
      // args     = array of arguments — NEVER a concatenated string
      // timeout  = kill the process if it hasn't finished in N milliseconds
      // encoding = 'utf8' for text output, 'buffer' for binary (DCOLLECT)
      const result = await execa(command, args, { timeout, encoding });
      // 'await' = wait for the external command to finish before continuing.
      // PARALLEL: like WAIT on a z/OS ATTACH — don't proceed until done.

      logger.debug({ stdout: result.stdout }, 'command completed');

      return {
        stdout: result.stdout,   // text output from the command
        stderr: result.stderr,   // error/warning output (may be non-empty even on success)
        dryRun: false,
      };

    } catch (err) {
      // execa throws when the command exits with a non-zero return code,
      // or when the command is not found, or when it times out.
      // We catch that raw execa error and wrap it in OUR ExecutionError.
      // This is the firewall: no execa-specific error ever escapes this module.
      // PARALLEL: like converting a z/OS abend code into your own
      // application return code before returning to the caller.
      logger.error(
        { command, args, exitCode: err.exitCode, stderr: err.stderr },
        'command failed'
      );
      throw new ExecutionError(
        `Command failed: ${command} ${args.join(' ')}`,
        err   // original error preserved as .cause for debugging
      );
    }
  },
};

