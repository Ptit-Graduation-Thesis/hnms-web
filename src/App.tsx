import React, { Suspense } from 'react'

import { createBrowserHistory } from 'history'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import {
  Router, Switch, Route,
} from 'react-router-dom'

import '@/utils/i18next'
import '@/styles/global.scss'

import PrivateRoute from '@/common/PrivateRoute'
import ErrorPage from '@/components/error/ErrorPage'
import { AppContextProvider } from '@/contexts/app/app.context'
import Login from '@/pages/auth/Login'
import ListBranch from '@/pages/branch/ListBranch'
import ListCustomer from '@/pages/customer/ListCustomer'
import Dashboard from '@/pages/dashboard/Dashboard'
import ListEmployee from '@/pages/employee/ListEmployee'
import ListItem from '@/pages/item/ListItem'

export const history = createBrowserHistory()
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const ROUTE = (
  <Router history={history}>
    <Suspense fallback={null}>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/employee" component={ListEmployee} />
          <PrivateRoute exact path="/item" component={ListItem} />
          <PrivateRoute exact path="/branch" component={ListBranch} />
          <PrivateRoute exact path="/customer" component={ListCustomer} />

          <Route path="*" component={ErrorPage} />
        </Switch>
      </div>
    </Suspense>
  </Router>
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
