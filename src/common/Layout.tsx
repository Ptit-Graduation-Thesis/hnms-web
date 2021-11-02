import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { useProfile } from '@/data/useProfile'
import styles from '@/styles/common.module.scss'
import { SidebarKey } from '@/enums/sidebar-key'
import SideBar from './SideBar'
import { useAppContext } from '@/contexts/app/app.context'

type LayoutProp = {
  sidebarKey: SidebarKey
}

const Layout: React.FC<LayoutProp> = ({ children, sidebarKey }) => {
  const { state } = useAppContext()
  const history = useHistory()

  const { data, isError } = useProfile()

  useEffect(() => {
    if (isError) history.push('/login')
  }, [isError, history])

  if (data) {
    return (
      <div className={styles.layout}>
        <SideBar sidebarKey={sidebarKey} />
        <div className={`${styles.content} ${state.isCollapse && styles.content_full}`}>
          {children}
        </div>
      </div>
    )
  }

  return <></>
}

export default Layout
