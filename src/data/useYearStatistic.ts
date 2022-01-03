import { useQuery } from 'react-query'

import { api } from '@/utils/axios'

import { QUERY_KEY } from './query-key'

export const useYearStatistic = (year: string) => useQuery(
  [QUERY_KEY.YEAR_STATISTIC_REVENUE, year], async () => {
    const response = await api.get('/statistics/revenue/year', { params: { year } })
    return response.data
  },
)
