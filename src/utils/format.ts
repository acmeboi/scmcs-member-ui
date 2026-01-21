/**
 * Format amount with Nigerian Naira sign
 * @param amount - The amount to format (number or string)
 * @param options - Formatting options
 * @returns Formatted string with Naira sign (e.g., "₦1,234.56")
 */
export const formatNaira = (
  amount: number | string | null | undefined,
  options?: {
    showDecimals?: boolean;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    showZero?: boolean;
  }
): string => {
  // Handle null, undefined, or empty values
  if (amount === null || amount === undefined || amount === '') {
    return options?.showZero ? '₦0.00' : '₦0';
  }

  // Convert to number
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  // Handle NaN or invalid numbers
  if (isNaN(numAmount)) {
    return options?.showZero ? '₦0.00' : '₦0';
  }

  // Default options
  const {
    showDecimals = true,
    minimumFractionDigits = showDecimals ? 2 : 0,
    maximumFractionDigits = showDecimals ? 2 : 0,
  } = options || {};

  // Format the number with thousand separators
  const formatted = new Intl.NumberFormat('en-NG', {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(numAmount);

  return `₦${formatted}`;
};

/**
 * Format amount as compact (e.g., ₦1.2K, ₦1.5M)
 * @param amount - The amount to format
 * @returns Formatted compact string
 */
export const formatNairaCompact = (
  amount: number | string | null | undefined
): string => {
  if (amount === null || amount === undefined || amount === '') {
    return '₦0';
  }

  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(numAmount)) {
    return '₦0';
  }

  if (numAmount >= 1000000) {
    return `₦${(numAmount / 1000000).toFixed(1)}M`;
  }

  if (numAmount >= 1000) {
    return `₦${(numAmount / 1000).toFixed(1)}K`;
  }

  return formatNaira(numAmount, { showDecimals: false });
};

/**
 * Parse Naira string to number
 * @param nairaString - String with Naira sign (e.g., "₦1,234.56")
 * @returns Number value
 */
export const parseNaira = (nairaString: string): number => {
  if (!nairaString) return 0;

  // Remove Naira sign and thousand separators
  const cleaned = nairaString.replace(/₦|,/g, '').trim();
  const parsed = parseFloat(cleaned);

  return isNaN(parsed) ? 0 : parsed;
};

