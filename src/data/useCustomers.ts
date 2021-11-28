import { useQuery } from 'react-query'

import { api } from '@/utils/axios'
import { QUERY_KEY } from './query-key'
import { FilterCustomer } from '@/types/customer.type'

export const useCustomers = (filter?: FilterCustomer) => useQuery(
  [QUERY_KEY.CUSTOMERS, filter], async () => {
    const response = await api.get('/customers', { params: filter })
    return response.data
  },
)
