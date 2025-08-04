export const validateCategory = (value: string | null) => {
  if (!value) return null;

  const validCategories = ["new", "used", "filter by status"];
  return validCategories.includes(value) ? value : null;
};
