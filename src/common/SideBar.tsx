import React, { useCallback } from 'react'
import { Menu } from 'antd'
import { useHistory } from 'react-router-dom'
import { useQueryClient } from 'react-query'

import logoPng from '@/assets/img/logo.png'
import homeIcon from '@/assets/img/home.svg'
import employeeIcon from '@/assets/img/employee.svg'
import boxIcon from '@/assets/img/box.svg'
import buildingIcon from '@/assets/img/building.svg'
import customerIcon from '@/assets/img/customer.svg'
import logoutIcon from '@/assets/img/logout.svg'
import collapseOnIcon from '@/assets/img/collapse-on.svg'
import collapseOffIcon from '@/assets/img/collapse-off.svg'
import styles from '@/styles/common.module.scss'
import { useAppContext } from '@/contexts/app/app.context'
import { updateCollapse } from '@/contexts/app/app.action'
import { SidebarKey } from '@/enums/sidebar-key'
import { clearToken } from '@/utils/axios'
import { LocalStorageKey, setLocalStorage } from '@/utils/storage'
import { useProfile } from '@/data/useProfile'

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
    key: SidebarKey.CUSTOMER,
    url: '/customer',
    title: 'Customer',
    icon: <img className={styles.sidebar_icon} src={customerIcon} alt="" />,
  },
]

type SidebarProp = {
  sidebarKey: SidebarKey
}

const SideBar: React.FC<SidebarProp> = ({ sidebarKey }) => {
  const { state, dispatch } = useAppContext()
  const history = useHistory()
  const queryClient = useQueryClient()

  const { data } = useProfile()

  const toggle = useCallback(() => {
    setLocalStorage(LocalStorageKey.IS_COLLAPSE, JSON.stringify(!state.isCollapse))
    dispatch(updateCollapse(!state.isCollapse))
  }, [dispatch, state.isCollapse])

  const logout = useCallback(() => {
    queryClient.getQueryCache().clear()
    clearToken()
    history.push('/login')
  }, [history, queryClient])

  return (
    <div className={`${styles.sidebar} ${state.isCollapse && styles.sidebar_small}`}>
      <div className={`${styles.sidebar_top}`}>
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
        {state.isCollapse ? null : (
          <>
            <Menu.Item key="fullName" disabled className={styles.full_name}>{data.fullName}</Menu.Item>
            <Menu.Divider />
          </>
        )}
        {MENU_ITEM.map((item) => (
          <Menu.Item key={item.key} icon={item.icon} onClick={() => history.push(item.url)}>{item.title}</Menu.Item>
        ))}
        <Menu.Item
          key={SidebarKey.LOGOUT}
          icon={<img className={styles.sidebar_icon} src={logoutIcon} alt="" />}
          onClick={logout}
        >
          Logout
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default SideBar
