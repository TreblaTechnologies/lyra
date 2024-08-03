export function getFirstWord(sentence: string): string {
  sentence = sentence.trim();

  const spaceIndex = sentence.indexOf(" ");

  if (spaceIndex === -1) {
    return sentence;
  }

  const firstWord = sentence.substring(0, spaceIndex);

  return firstWord;
}

export function getLastWord(sentence: string): string {
  sentence = sentence.trim();

  const spaceIndex = sentence.lastIndexOf(" ");

  if (spaceIndex === -1) {
    return sentence;
  }

  const lastWord = sentence.substring(spaceIndex + 1);

  return lastWord;
}

export function getFirstTwoWords(
  sentence: string,
  enableShortWord: boolean = true
): string {
  sentence = sentence.trim();

  const words = sentence.split(" ");

  if (enableShortWord && words.length > 2) {
    if (isShortWord(words[1])) {
      if (words.length > 3 && isShortWord(words[2])) {
        return words.slice(0, 4).join(" ");
      }
      return words.slice(0, 3).join(" ");
    }
  }

  return words.slice(0, 2).join(" ");
}

export function isShortWord(word: string): boolean {
  return word.length <= 3;
}

export function getPluralOrSingular(
  count: number,
  singular: string,
  plural: string
): string {
  if (count <= 0) return "";

  return `${count} ${count > 1 ? plural : singular}`;
}

export function getInitials(text: string): string {
  const formattedText: string = getFirstTwoWords(text);

  const words = formattedText.split(" ");

  let initials = words[0][0];

  if (words.length > 1) {
    initials += words[words.length - 1][0];
  }

  return initials.toUpperCase();
}
