export const formatMoney = (money: number | string) => new Intl.NumberFormat(
  'vi-VN', { style: 'currency', currency: 'VND' },
).format(+money)
