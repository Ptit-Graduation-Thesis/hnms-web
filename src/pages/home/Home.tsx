import React from 'react'

import HomeComponent from '@/components/home/Home'
import Layout from '@/common/Layout'
import { SidebarKey } from '@/enums/sidebar-key'

const Home = () => (
  <Layout sidebarKey={SidebarKey.HOME}>
    <HomeComponent />
  </Layout>
)

export default Home
