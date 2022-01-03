import React from 'react'

import Layout from '@/common/Layout'
import ListEmployeeComponent from '@/components/employee/ListEmployee'
import { SidebarKey } from '@/enums/sidebar-key'

const ListEmployee = () => (
  <Layout sidebarKey={SidebarKey.EMPLOYEE}>
    <ListEmployeeComponent />
  </Layout>
)

export default ListEmployee
