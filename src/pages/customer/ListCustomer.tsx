import React from 'react'

import Layout from '@/common/Layout'
import ListCustomerComponent from '@/components/customer/ListCustomer'
import { SidebarKey } from '@/enums/sidebar-key'

const ListCustomer = () => (
  <Layout sidebarKey={SidebarKey.CUSTOMER}>
    <ListCustomerComponent />
  </Layout>
)

export default ListCustomer
