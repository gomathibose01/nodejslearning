import { spawn } from 'child_process';

/**
 * Automates a remote 'ls' command on USS and captures the output text
 * @param {string} hostname - Target Mainframe Host/IP
 * @returns {Promise<string>} Resolves with the plain text file listing
 */
export function listRemoteUssFiles(hostname) {
  return new Promise((resolve, reject) => {
    try {
      // Pass the automated command "ls -la /u/ibmuser" at the end of the SSH array
      const args = [
        '-o', 'BatchMode=yes', 
        `ibmuser@${hostname}`, 
        'ls -la /u/ibmuser'
      ];
      
      // We do NOT use { stdio: 'inherit' } here because we want Node to intercept the text data
      const sshProcess = spawn('ssh', args);

      let dataBuffer = '';
      let errorBuffer = '';

      // Event listener: Fires every time a chunk of text arrives from USS
      sshProcess.stdout.on('data', (chunk) => {
        dataBuffer += chunk.toString();
      });

      // Event listener: Fires if USS sends back an error message text
      sshProcess.stderr.on('data', (chunk) => {
        errorBuffer += chunk.toString();
      });

      // Event listener: Fires when the remote command completes and disconnects
      sshProcess.on('close', (code) => {
        if (code === 0) {
          resolve(dataBuffer); // Return the complete text result
        } else {
          reject(new Error(`USS command failed with code ${code}. Error: ${errorBuffer}`));
        }
      });

      sshProcess.on('error', (err) => {
        reject(new Error(`Failed to start SSH process: ${err.message}`));
      });

    } catch (error) {
      reject(error);
    }
  });
}

