import { useQuery } from 'react-query'

import { api } from '@/utils/axios'
import { QUERY_KEY } from './query-key'
import { FilterUser } from '@/types/user.type'

export const useUser = (filterUser?: FilterUser) => useQuery(
  [QUERY_KEY.USERS, filterUser], async () => {
    const response = await api.get('/users', { params: filterUser })
    return response.data
  },
)
