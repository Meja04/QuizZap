// sostitutivo della pipe titlecase di Angular
export const formatTitleCase = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();