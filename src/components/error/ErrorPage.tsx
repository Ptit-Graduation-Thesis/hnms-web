import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Button } from 'antd'

import { useProfile } from '@/data/useProfile'
import { RoleStatus } from '@/enums/role-status.enum'

type LocationState = {
  status: number
}

const ErrorPage = () => {
  const history = useHistory()
  const location = useLocation<LocationState>()
  const [errorMessage, setErrorMessage] = useState('')
  const status = useMemo(() => (location.state && location.state.status ? location.state.status : 404), [location])

  const { data } = useProfile()

  const gobackUrl = useMemo(() => {
    switch (data?.roleId) {
      case RoleStatus.ADMIN:
        return '/'

      case RoleStatus.ACCOUNTANT:
        return '/item'

      case RoleStatus.SALE_EMPLOYEE:
        return '/customer'

      default:
        return '/'
    }
  }, [data?.roleId])

  useEffect(() => {
    switch (status) {
      case 404:
        setErrorMessage('Oops, The Page you are looking for cant be found!')
        break
      case 403:
        setErrorMessage('You don\'t have permission to access page')
        break
      default:
        setErrorMessage('')
        break
    }
  }, [status])
  return (
    <div>
      <h1>Error status: {status}</h1>
      <h2>Message: {errorMessage}</h2>
      <Button type="link" onClick={() => history.replace(gobackUrl)}>Return home</Button>
    </div>
  )
}

export default ErrorPage
