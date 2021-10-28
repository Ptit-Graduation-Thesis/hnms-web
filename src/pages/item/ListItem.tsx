import React from 'react'

import ListItemComponent from '@/components/item/ListItem'
import Layout from '@/common/Layout'
import { SidebarKey } from '@/enums/sidebar-key'

const ListItem = () => (
  <Layout sidebarKey={SidebarKey.ITEM}>
    <ListItemComponent />
  </Layout>
)

export default ListItem
