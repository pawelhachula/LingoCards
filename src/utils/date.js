// src/utils/date.js
// Pomocnicze funkcje do obsługi dat lokalnych (eliminacja przesunięć UTC strefy czasowej)

/**
 * Zwraca datę lokalną w formacie YYYY-MM-DD.
 * @param {Date} [d=new Date()] - obiekt Date
 * @returns {string} np. "2026-06-08"
 */
export const getLocalDateString = (d = new Date()) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
