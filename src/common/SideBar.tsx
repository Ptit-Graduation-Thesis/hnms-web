import React from 'react'
import { Menu } from 'antd'

import styles from '@/styles/common.module.scss'
import userImg from '@/assets/img/user.svg'

const SideBar = () => (
  <div className={styles.side_bar}>
    <Menu
      className={styles.menu}
      mode="inline"
      theme="dark"
      defaultSelectedKeys={['1']}
    >
      <Menu.Item key="1" icon={<img src={userImg} alt="" width={20} />}>Option 1</Menu.Item>
      <Menu.SubMenu key="sub1" title="Option 2">
        <Menu.Item key="2">Sub 1</Menu.Item>
        <Menu.Item key="3">Sub 2</Menu.Item>
        <Menu.Item key="4">Sub 3</Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="5">Option 3</Menu.Item>
    </Menu>
  </div>
)

export default SideBar
