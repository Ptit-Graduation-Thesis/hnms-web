import { useQuery } from 'react-query'

import { FilterItem } from '@/types/item.type'
import { api } from '@/utils/axios'

import { QUERY_KEY } from './query-key'

export const useItems = (filter?: FilterItem) => useQuery(
  [QUERY_KEY.ITEMS, filter], async () => {
    const response = await api.get('/items', { params: filter })
    return response.data
  },
)
