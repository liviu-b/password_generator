interface StrengthResult {
  score: number;
  label: string;
}

export function calculateStrength(
  password: string,
  options: { [key: string]: boolean }
): StrengthResult {
  if (!password) {
    return { score: 0, label: 'Very Weak' };
  }

  let score = 0;

  // Length check
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;

  // Character variety
  if (/[A-Z]/.test(password) && options.uppercase) score++;
  if (/[a-z]/.test(password) && options.lowercase) score++;
  if (/[0-9]/.test(password) && options.numbers) score++;
  if (/[^A-Za-z0-9]/.test(password) && options.symbols) score++;

  // Normalize score
  score = Math.min(4, Math.floor(score / 1.5));

  const labels = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
  return { score, label: labels[score] };
}