const CHARS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

export function generatePassword(
  length: number,
  options: { [key: string]: boolean }
): string {
  let chars = '';
  Object.keys(options).forEach((key) => {
    if (options[key]) {
      chars += CHARS[key as keyof typeof CHARS];
    }
  });

  if (chars.length === 0) {
    chars = CHARS.lowercase; // Fallback to lowercase if no options selected
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password;
}