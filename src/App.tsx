import React from 'react'
import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import '@/utils/i18next'
import '@/styles/global.scss'
import { AppContextProvider } from '@/contexts/app/app.context'
import PrivateRoute from '@/common/PrivateRoute'
import Login from '@/pages/auth/Login'
import Home from '@/pages/home/Home'
import ErrorPage from '@/components/error/ErrorPage'
import ListEmployee from '@/pages/employee/ListEmployee'
import ListItem from '@/pages/item/ListItem'
import ListBranch from '@/pages/branch/ListBranch'
import ListCustomer from '@/pages/customer/ListCustomer'

const queryClient = new QueryClient()

const ROUTE = (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/employee" component={ListEmployee} />
      <PrivateRoute exact path="/item" component={ListItem} />
      <PrivateRoute exact path="/branch" component={ListBranch} />
      <PrivateRoute exact path="/customer" component={ListCustomer} />

      <Route path="*" component={ErrorPage} />
    </Switch>
  </BrowserRouter>
)

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      {ROUTE}
    </AppContextProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>
)

export default App
