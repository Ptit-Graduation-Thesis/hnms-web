import { useQuery } from 'react-query'

import { api } from '@/utils/axios'
import { QUERY_KEY } from './query-key'
import { FilterBranch } from '@/types/branch.type'

export const useBranchs = (filterBranch?: FilterBranch) => useQuery(
  [QUERY_KEY.BRANCHS, filterBranch], async () => {
    const response = await api.get('/branchs', { params: filterBranch })
    return response.data
  },
)
