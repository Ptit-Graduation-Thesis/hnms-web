import React from 'react'

import DashboardComponent from '@/components/dashboard/Dashboard'
import Layout from '@/common/Layout'
import { SidebarKey } from '@/enums/sidebar-key'

const Dashboard = () => (
  <Layout sidebarKey={SidebarKey.DASHBOARD}>
    <DashboardComponent />
  </Layout>
)

export default Dashboard
