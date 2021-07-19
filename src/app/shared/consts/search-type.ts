export type SearchTypes = 'cheapest' | 'fastest';

export const searchType: { [key in SearchTypes]: string } = {
  cheapest: 'The Cheapest',
  fastest: 'The Fastest',
};
