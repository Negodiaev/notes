export function formatDate(dateTime: string): string {
  return `${new Date(dateTime).toLocaleDateString().split('/').join('.')} ${new Date(dateTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
}
