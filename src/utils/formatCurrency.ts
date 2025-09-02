export const formatCurrency = (amount: number) => {
  return `₦${new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0)}`;
};

/**
 * Smart currency formatting that automatically chooses the best display format
 * @param amount - The amount to format
 * @param options - Formatting options
 * @returns Formatted currency string
 */
export const formatCurrencySmart = (
  amount: number,
  options: {
    compact?: boolean; // Use K, M, B notation
    precision?: number; // Decimal places for compact notation
    showSymbol?: boolean; // Show ₦ symbol
    locale?: string; // Locale for formatting
  } = {}
) => {
  const {
    compact = true,
    precision = 1,
    showSymbol = true,
    locale = "en-US",
  } = options;

  const numAmount = Number(amount) || 0;
  const symbol = showSymbol ? "₦" : "";

  if (compact && numAmount >= 1000000000) {
    return `${symbol}${(numAmount / 1000000000).toFixed(precision)}B`;
  } else if (compact && numAmount >= 1000000) {
    return `${symbol}${(numAmount / 1000000).toFixed(precision)}M`;
  } else if (compact && numAmount >= 1000) {
    return `${symbol}${(numAmount / 1000).toFixed(precision)}K`;
  } else {
    return `${symbol}${new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(numAmount)}`;
  }
};

/**
 * Format currency for display in tables and lists
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
export const formatCurrencyDisplay = (amount: number) => {
  return formatCurrencySmart(amount, { compact: false, showSymbol: true });
};

/**
 * Format currency for compact display (K, M, B notation)
 * @param amount - The amount to format
 * @param precision - Decimal places
 * @returns Formatted currency string
 */
export const formatCurrencyCompact = (
  amount: number,
  precision: number = 1
) => {
  return formatCurrencySmart(amount, {
    compact: true,
    precision,
    showSymbol: true,
  });
};

/**
 * Format currency for charts and tooltips
 * @param amount - The amount to format
 * @param precision - Decimal places
 * @returns Formatted currency string
 */
export const formatCurrencyChart = (amount: number, precision: number = 2) => {
  return formatCurrencySmart(amount, {
    compact: true,
    precision,
    showSymbol: true,
  });
};

/**
 * Format currency for KPI cards and summaries
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
export const formatCurrencyKPI = (amount: number) => {
  return formatCurrencySmart(amount, {
    compact: true,
    precision: 1,
    showSymbol: true,
  });
};

/**
 * Format currency without symbol (for calculations and comparisons)
 * @param amount - The amount to format
 * @returns Formatted number string
 */
export const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);
};

/**
 * Format percentage with proper decimal places
 * @param value - The percentage value (0-100)
 * @param precision - Decimal places
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number, precision: number = 1) => {
  return `${(Number(value) || 0).toFixed(precision)}%`;
};
