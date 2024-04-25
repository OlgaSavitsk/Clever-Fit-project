export const handleFormate = (date: string) => new Date(date).toLocaleDateString('en-GB', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
}).split('/').join('.')
