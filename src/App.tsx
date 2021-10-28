import React from 'react'
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import '@/utils/i18next'
import '@/styles/global.scss'
import { AppContextProvider } from '@/contexts/app/app.context'
import Login from '@/pages/auth/Login'
import Home from '@/pages/home/Home'
import ErrorPage from '@/components/error/ErrorPage'
import PrivateRoute from '@/common/PrivateRoute'
import ListEmployee from '@/pages/employee/ListEmployee'
import ListItem from '@/pages/item/ListItem'
import ListBranch from '@/pages/branch/ListBranch'

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/employee" component={ListEmployee} />
          <PrivateRoute exact path="/item" component={ListItem} />
          <PrivateRoute exact path="/branch" component={ListBranch} />

          <Route path="/error" component={ErrorPage} />
          <Redirect to="/error" />
        </Switch>
      </BrowserRouter>
    </AppContextProvider>
  </QueryClientProvider>
)

export default App
