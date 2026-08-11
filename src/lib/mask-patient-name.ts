const prefixes = ["น.ส.", "ด.ช.", "ด.ญ.", "นาย", "นาง"];

function maskWord(word: string): string {
  if (!word) {
    return "";
  }

  if (word.length <= 2) {
    return `${word.charAt(0)}*`;
  }

  const visibleLength = Math.ceil(word.length / 2);

  return `${word.slice(0, visibleLength)}**`;
}

export function maskPatientName(fullname: string): string {
  const cleanName = fullname.trim();

  let prefix = "";
  let nameWithoutPrefix = cleanName;

  for (const currentPrefix of prefixes) {
    if (cleanName.startsWith(currentPrefix)) {
      prefix = currentPrefix;
      nameWithoutPrefix = cleanName.slice(currentPrefix.length).trim();
      break;
    }
  }

  const nameParts = nameWithoutPrefix
    .split(/\s+/)
    .filter(Boolean)
    .map(maskWord);

  return `${prefix}${nameParts.join(" ")}`.trim();
}

export function formatPatientName(fullname: string): string {
  return fullname.trim();
}
