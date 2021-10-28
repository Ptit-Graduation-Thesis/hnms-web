import React from 'react'

import ListBranchComponent from '@/components/branch/ListBranch'
import Layout from '@/common/Layout'
import { SidebarKey } from '@/enums/sidebar-key'

const ListBranch = () => (
  <Layout sidebarKey={SidebarKey.BRANCH}>
    <ListBranchComponent />
  </Layout>
)

export default ListBranch
