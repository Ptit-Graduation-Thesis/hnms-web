import React, { useCallback } from 'react'

import { Menu } from 'antd'
import { useQueryClient } from 'react-query'
import { useHistory } from 'react-router-dom'

import boxIcon from '@/assets/img/box.svg'
import buildingIcon from '@/assets/img/building.svg'
import collapseOffIcon from '@/assets/img/collapse-off.svg'
import collapseOnIcon from '@/assets/img/collapse-on.svg'
import customerIcon from '@/assets/img/customer.svg'
import dashboardIcon from '@/assets/img/dashboard.svg'
import employeeIcon from '@/assets/img/employee.svg'
import logoPng from '@/assets/img/logo.png'
import logoutIcon from '@/assets/img/logout.svg'
import { updateCollapse } from '@/contexts/app/app.action'
import { useAppContext } from '@/contexts/app/app.context'
import { useProfile } from '@/data/useProfile'
import { RoleStatus } from '@/enums/role-status.enum'
import { SidebarKey } from '@/enums/sidebar-key'
import styles from '@/styles/common.module.scss'
import { clearToken } from '@/utils/axios'
import { LocalStorageKey, setLocalStorage } from '@/utils/storage'

const MENU_ITEM = [
  {
    key: SidebarKey.DASHBOARD,
    url: '/',
    title: 'Dashboard',
    icon: <img className={styles.sidebar_icon} src={dashboardIcon} alt="" />,
    role: [RoleStatus.ADMIN],
  },
  {
    key: SidebarKey.EMPLOYEE,
    url: '/employee',
    title: 'Employee',
    icon: <img className={styles.sidebar_icon} src={employeeIcon} alt="" />,
    role: [RoleStatus.ADMIN],
  },
  {
    key: SidebarKey.CUSTOMER,
    url: '/customer',
    title: 'Customer',
    icon: <img className={styles.sidebar_icon} src={customerIcon} alt="" />,
    role: [RoleStatus.ADMIN, RoleStatus.SALE_EMPLOYEE, RoleStatus.ACCOUNTANT],
  },
  {
    key: SidebarKey.ITEM,
    url: '/item',
    title: 'Item',
    icon: <img className={styles.sidebar_icon} src={boxIcon} alt="" />,
    role: [RoleStatus.ADMIN, RoleStatus.SALE_EMPLOYEE, RoleStatus.ACCOUNTANT],
  },
  {
    key: SidebarKey.BRANCH,
    url: '/branch',
    title: 'Branch',
    icon: <img className={styles.sidebar_icon} src={buildingIcon} alt="" />,
    role: [RoleStatus.ADMIN],
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

  const hasPermission = useCallback((role: RoleStatus[]) => role.includes(data?.roleId), [data?.roleId])

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
        {MENU_ITEM.filter((item) => hasPermission(item.role)).map((item) => (
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
