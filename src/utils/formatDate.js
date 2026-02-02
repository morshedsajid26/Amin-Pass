/**
 * Format ISO date string to readable format: YYYY-MM-DD h:mm AM/PM
 * @param {string} isoString - ISO 8601 date string (e.g., "2026-02-01T17:05:08.114Z")
 * @returns {string} Formatted date (e.g., "2026-02-01 5:05 PM")
 */
export function formatDate(isoString) {
  if (!isoString) return "—";

  try {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
  } catch (err) {
    console.error("Date formatting error:", err);
    return "—";
  }
}
