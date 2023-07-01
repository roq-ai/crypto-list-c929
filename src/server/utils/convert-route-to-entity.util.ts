const mapping: Record<string, string> = {
  'crypto-currency-exchanges': 'crypto_currency_exchange',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
