export const { format: price } = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});
