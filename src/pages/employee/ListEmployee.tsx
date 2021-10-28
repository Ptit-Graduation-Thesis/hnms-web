import React from 'react'

import ListEmployeeComponent from '@/components/employee/ListEmployee'
import Layout from '@/common/Layout'
import { SidebarKey } from '@/enums/sidebar-key'

const ListEmployee = () => (
  <Layout sidebarKey={SidebarKey.EMPLOYEE}>
    <ListEmployeeComponent />
  </Layout>
)

export default ListEmployee
