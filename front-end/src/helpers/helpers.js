export const BASE_API = "http://localhost:8080/api/v1";

export function formattedDateTime(timestamp) {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toTimeString().slice(0, 5)}`;
}

export function formattedDate(timestamp) {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()}`;
}
