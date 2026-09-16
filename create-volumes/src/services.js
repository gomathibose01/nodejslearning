import { executeRemoteCommand } from './client.js';
import { parseUssFiles, parseSmsConfiguration } from './parsers.js';

/**
 * Action: Fetches file information from a directory path
 */
export async function getUssFilesService(hostname, targetDir = '/u/ibmuser') {
  const rawText = await executeRemoteCommand(hostname, `ls -la ${targetDir}`);
  return parseUssFiles(rawText);
}

/**
 * Action: Executes ZOAU command to pull mainframe SMS information 
 
export async function getSmsConfigService(hostname) {
  // Replace 'vsmcmd sms -l' with your actual target ZOAU binary syntax call
  const rawText = await executeRemoteCommand(hostname, 'vsmcmd sms -l'); 
  return parseSmsConfiguration(rawText);
}
*/

