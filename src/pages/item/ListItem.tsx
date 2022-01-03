import React from 'react'

import Layout from '@/common/Layout'
import ListItemComponent from '@/components/item/ListItem'
import { SidebarKey } from '@/enums/sidebar-key'

const ListItem = () => (
  <Layout sidebarKey={SidebarKey.ITEM}>
    <ListItemComponent />
  </Layout>
)

export default ListItem
