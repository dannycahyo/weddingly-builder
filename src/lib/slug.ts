export function generateSlug(name1: string, name2: string): string {
  const combined = `${name1}-and-${name2}`;
  return combined
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function generateUniqueSlug(baseName: string): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `${baseName}-${timestamp}${random}`;
}
