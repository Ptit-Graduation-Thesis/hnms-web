import React from 'react'
import { Menu } from 'antd'
import { useHistory } from 'react-router-dom'

import logoPng from '@/assets/img/logo.png'
import homeIcon from '@/assets/img/home.svg'
import employeeIcon from '@/assets/img/employee.svg'
import boxIcon from '@/assets/img/box.svg'
import buildingIcon from '@/assets/img/building.svg'
import logoutIcon from '@/assets/img/logout.svg'
import collapseOnIcon from '@/assets/img/collapse-on.svg'
import collapseOffIcon from '@/assets/img/collapse-off.svg'
import styles from '@/styles/common.module.scss'
import { useAppContext } from '@/contexts/app/app.context'
import { toggleCollapse } from '@/contexts/app/app.action'
import { SidebarKey } from '@/enums/sidebar-key'

const MENU_ITEM = [
  {
    key: SidebarKey.HOME,
    url: '/',
    title: 'Home',
    icon: <img className={styles.sidebar_icon} src={homeIcon} alt="" />,
  },
  {
    key: SidebarKey.EMPLOYEE,
    url: '/employee',
    title: 'Employee',
    icon: <img className={styles.sidebar_icon} src={employeeIcon} alt="" />,
  },
  {
    key: SidebarKey.ITEM,
    url: '/item',
    title: 'Item',
    icon: <img className={styles.sidebar_icon} src={boxIcon} alt="" />,
  },
  {
    key: SidebarKey.BRANCH,
    url: '/branch',
    title: 'Branch',
    icon: <img className={styles.sidebar_icon} src={buildingIcon} alt="" />,
  },
  {
    key: SidebarKey.LOGOUT,
    url: '#',
    title: 'Logout',
    icon: <img className={styles.sidebar_icon} src={logoutIcon} alt="" />,
  },
]

type SidebarProp = {
  sidebarKey: SidebarKey
}

const SideBar: React.FC<SidebarProp> = ({ sidebarKey }) => {
  const { state, dispatch } = useAppContext()
  const history = useHistory()

  const toggle = () => dispatch(toggleCollapse())

  return (
    <div className={styles.sidebar}>
      <div className={`${styles.sidebar_top} ${state.isCollapse && styles.w_5rem}`}>
        <img className={`${state.isCollapse && styles.opacity_0}`} src={logoPng} alt="" />
        <span className={`${state.isCollapse && styles.opacity_0}`}>HNMS</span>
        {state.isCollapse ? (
          <img className={styles.collapse_icon} src={collapseOnIcon} alt="" onClick={toggle} aria-hidden />
        ) : (
          <img className={styles.collapse_icon} src={collapseOffIcon} alt="" onClick={toggle} aria-hidden />
        )}
      </div>
      <Menu
        className={styles.menu}
        mode="inline"
        theme="dark"
        inlineCollapsed={state.isCollapse}
        defaultSelectedKeys={[sidebarKey]}
      >
        <Menu.Divider />
        {MENU_ITEM.map((item) => (
          <Menu.Item key={item.key} icon={item.icon} onClick={() => history.push(item.url)}>{item.title}</Menu.Item>
        ))}
      </Menu>
    </div>
  )
}

export default SideBar
