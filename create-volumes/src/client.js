import { spawn } from 'child_process';

/**
 * Executes a single command string on the mainframe via SSH and returns raw string data
 * @param {string} hostname - Mainframe target Host/IP
 * @param {string} commandString - The exact command to execute on USS
 * @returns {Promise<string>} Raw terminal text output
 */
export function executeRemoteCommand(hostname, commandString) {
  return new Promise((resolve, reject) => {
    if (!hostname) return reject(new Error('Hostname is missing.'));
    if (!commandString) return reject(new Error('Command string is empty.'));

    // Securely pass the command string as the final execution argument
    const args = ['-o', 'BatchMode=yes', `ibmuser@${hostname}`, commandString];
    const sshProcess = spawn('ssh', args);

    let outputBuffer = '';
    let errorBuffer = '';

    sshProcess.stdout.on('data', (chunk) => { outputBuffer += chunk.toString(); });
    sshProcess.stderr.on('data', (chunk) => { errorBuffer += chunk.toString(); });

    sshProcess.on('close', (code) => {
      if (code === 0) {
        resolve(outputBuffer);
      } else {
        reject(new Error(`USS Command Execution Failed (Code ${code}): ${errorBuffer.trim()}`));
      }
    });

    sshProcess.on('error', (err) => reject(new Error(`Network spawn error: ${err.message}`)));
  });
}

