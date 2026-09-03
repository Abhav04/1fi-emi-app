/**
 * Formats a numeric amount into Indian Rupee currency format (en-IN).
 *
 * @param {number|string} amount - The numerical amount to format.
 * @param {Object} [options] - Optional formatting configurations.
 * @param {boolean} [options.includeSymbol=false] - Whether to prepend ₹ symbol.
 * @param {number} [options.maximumFractionDigits=2] - Maximum decimal digits.
 * @returns {string} Formatted Indian Rupee string (e.g. "1,27,400").
 */
export function formatINR(amount, { includeSymbol = false, maximumFractionDigits = 2 } = {}) {
  if (amount === null || amount === undefined || amount === '') return '';
  const num = Number(amount);
  if (Number.isNaN(num)) return '';

  const formatted = num.toLocaleString('en-IN', {
    maximumFractionDigits,
  });

  return includeSymbol ? `₹${formatted}` : formatted;
}
