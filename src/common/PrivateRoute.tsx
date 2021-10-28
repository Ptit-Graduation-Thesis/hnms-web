import React from 'react'
import { Route, RouteProps, useHistory } from 'react-router-dom'

import { getToken } from '@/utils/axios'

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const history = useHistory()

  React.useEffect(() => {
    if (!getToken()) history.push('/login')
  }, [history])

  return <Route {...props} />
}

export default PrivateRoute
