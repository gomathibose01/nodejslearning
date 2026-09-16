import path from 'path';

/**
 * Parses raw 'ls -la' text into clean JSON arrays
 */
export function parseUssFiles(rawText) {
  if (!rawText) return [];
  return rawText
    .split('\n')
    .map(line => line.trim())
    .filter(line => line !== '' && !line.startsWith('total'))
    .map((line, idx) => {
      const parts = line.split(/\s+/); // Split by arbitrary spaces
      if (parts.length < 9) return null;
      return {
        id: idx + 1,
        permissions: parts[0],
        owner: parts[2],
        group: parts[3],
        size: parseInt(parts[4], 10),
        name: parts.slice(8).join(' ')
      };
    })
    .filter(Boolean);
}

/**
 * Parses ZOAU command output or typical SMS configuration output lines
 *
 * (Assumes mock/typical columnar layout key-value strings from SMS storage)

export function parseSmsConfiguration(rawText) {
  return
}
*/
