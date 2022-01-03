import { useQuery } from 'react-query'

import { api } from '@/utils/axios'

import { QUERY_KEY } from './query-key'

export const useMonthStatistic = (month: string) => useQuery(
  [QUERY_KEY.MONTH_STATISTIC_REVENUE, month], async () => {
    const response = await api.get('/statistics/revenue/month', { params: { month } })
    return response.data
  },
)
