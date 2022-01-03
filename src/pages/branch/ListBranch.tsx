import React from 'react'

import Layout from '@/common/Layout'
import ListBranchComponent from '@/components/branch/ListBranch'
import { SidebarKey } from '@/enums/sidebar-key'

const ListBranch = () => (
  <Layout sidebarKey={SidebarKey.BRANCH}>
    <ListBranchComponent />
  </Layout>
)

export default ListBranch
