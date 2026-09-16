import { spawn } from 'child_process';

/**
 * Launches an async passwordless SSH session into USS
 * @param {string} hostname 
 * @returns {Promise<number>} Resolves with the exit status code when the session closes
 */
export function connectToUss(hostname) {
  // Return a Promise to make this function asynchronous
  return new Promise((resolve, reject) => {
    try {
      const args = ['-o', 'BatchMode=yes', `ibmuser@${hostname}`];
      
      // Spawn kicks off the process asynchronously in the background
      const sshProcess = spawn('ssh', args, { stdio: 'inherit' });

      // Event listener: Fires asynchronously when the user types 'exit' or disconnects
      sshProcess.on('close', (code) => {
        resolve(code); // Successfully fulfills the promise with the exit code
      });

      // Event listener: Fires asynchronously if the ssh program crashes or can't run
      sshProcess.on('error', (err) => {
        reject(new Error(`Background process failed: ${err.message}`));
      });
      
    } catch (error) {
      reject(error);
    }
  });
}

