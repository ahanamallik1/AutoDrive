export const validateSearch = (value: string): string[] => {
  const decodedValue = decodeURIComponent(value.replace(/\+/g, " "));
  const trimmed = decodedValue.trim();

  if (!trimmed) return [];

  // Reject if no alphanumeric characters
  if (!/[a-zA-Z0-9]/.test(trimmed)) return [];

  // Only allow safe characters
  if (!/^[a-zA-Z0-9\s\-.'"]+$/.test(trimmed)) return [];

  // Reject purely numeric or suspicious negative values
  if (/^-?\d+$/.test(trimmed)) return [];

  return [trimmed.toLowerCase()];
};
