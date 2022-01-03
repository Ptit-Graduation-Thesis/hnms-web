import React from 'react'

import { message, Switch } from 'antd'
import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from 'react-query'

import { QUERY_KEY } from '@/data/query-key'
import { api } from '@/utils/axios'

type SwitchStatusProps = {
  id: number
  checked: boolean
}

const SwitchStatus: React.FC<SwitchStatusProps> = ({ id, checked }) => {
  const queryClient = useQueryClient()

  const { mutate: changeStatus, isLoading } = useMutation(
    () => api.put(`users/${id}`, { status: checked ? 0 : 1 }), {
      onSuccess: () => queryClient.invalidateQueries(QUERY_KEY.USERS),
      onError: (err: AxiosError) => {
        if (err?.response?.data) message.error(err?.response?.data?.message)
        else message.error('Something went wrong')
      },
    },
  )

  return <Switch checked={checked} loading={isLoading} onClick={() => changeStatus()} />
}

export default SwitchStatus
