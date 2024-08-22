const currencyFormatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  minimumFractionDigits: 0,
});
const numberFormatter = new Intl.NumberFormat('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 3 });
const integerFormatter = new Intl.NumberFormat('en-AU', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
const dateFormatter = new Intl.DateTimeFormat('en-AU');

export function formatCurrency (val?: number | null) {
  return currencyFormatter.format(val ?? 0);
}

export function formatNumber (val?: number | null) {
  return numberFormatter.format(val ?? 0);
}

export function formatInt (val?: number | null) {
  return integerFormatter.format(val ?? 0);
}

export function formatDate (val?: Date | string | null) {
  return !val ? '-' : val instanceof Date ? dateFormatter.format(val) : dateFormatter.format(new Date(val));
}

export function fromSnakeCase (val?: string | null) {
  if (!val) {
    return '';
  }
  const sentence = val.replace(/_/g, ' ').trim();
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}
