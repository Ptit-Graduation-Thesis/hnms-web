import { useQuery } from 'react-query'

import { api } from '@/utils/axios'
import { QUERY_KEY } from './query-key'

export const useSuggestBranch = (keyword?: string) => useQuery(
  [QUERY_KEY.SUGGEST_BRANCHS, keyword], async () => {
    const response = await api.get('/suggest/branchs', { params: { keyword } })
    return response.data
  },
)
