import { useQuery } from 'react-query'

import { api } from '@/utils/axios'

import { QUERY_KEY } from './query-key'

export const useSuggestRoles = (keyword?: string) => useQuery(
  [QUERY_KEY.SUGGEST_ROLES, keyword], async () => {
    const response = await api.get('/suggest/roles', { params: { keyword } })
    return response.data
  },
)
