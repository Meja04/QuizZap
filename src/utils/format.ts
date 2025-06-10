// sostitutivo della pipe titlecase di Angular
export const formatTitleCase = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();


// formatta il tempo rimanente
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}