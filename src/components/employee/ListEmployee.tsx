import React, { useCallback, useMemo, useState } from 'react'
import {
  Divider, Table, Select, Input,
} from 'antd'
import { ColumnsType } from 'antd/lib/table'
import debounce from 'lodash.debounce'
import { SelectValue } from 'antd/lib/select'

import styles from '@/styles/employee.module.scss'
import { useUser } from '@/data/useUsers'
import { formatDate } from '@/utils/date'
import { getRoleName } from '@/enums/role-status.enum'
import { formatMoney } from '@/utils/format-number'
import { useSuggestRoles } from '@/data/useSuggestRoles'
import { useSuggestBranch } from '@/data/useSuggestBranchs'
import { enumToArray } from '@/utils/helper'
import { getUserStatusName, UserStatus } from '@/enums/user-status.enum'
import { DetailUser, FilterUser, SearchUser } from '@/types/user.type'
import SwitchStatus from './SwitchStatus'
import ModalCreateEmployee from './ModalCreateEmployee'
import ModalEditEmployee from './ModalEditEmployee'

const columns: ColumnsType<any> = [
  { title: 'ID', dataIndex: 'id' },
  { title: 'Full name', dataIndex: 'fullName' },
  { title: 'Username', dataIndex: 'username' },
  { title: 'Phone number', dataIndex: 'phoneNumber' },
  { title: 'Address', dataIndex: 'address' },
  { title: 'Credential ID', dataIndex: 'credentialId' },
  { title: 'Date of birth', dataIndex: 'dob' },
  { title: 'Salary', dataIndex: 'salary' },
  { title: 'Role', dataIndex: 'role' },
  { title: 'Branch', dataIndex: 'branch' },
  { title: 'Status', dataIndex: 'status' },
  { dataIndex: 'action', width: 50 },
]

const ListEmployee = () => {
  const [filterUsers, setFilter] = useState<FilterUser>()
  const [searchUser, setSearch] = useState<SearchUser>()

  const { data: employees, isLoading } = useUser(filterUsers)
  const { data: roles, isLoading: rolesLoading } = useSuggestRoles(searchUser?.role)
  const { data: branchs, isLoading: branchsLoading } = useSuggestBranch(searchUser?.branch)

  const dataSource = useMemo(() => {
    if (employees) {
      return employees.data.map((employee: DetailUser) => ({
        ...employee,
        key: employee.id,
        dob: formatDate(employee.dob),
        salary: formatMoney(employee.salary),
        role: getRoleName(employee.roleId),
        branch: employee.branch.name,
        status: <SwitchStatus id={employee.id} checked={!!employee.status} />,
        action: <ModalEditEmployee employee={employee} />,
      }))
    }

    return []
  }, [employees])

  const onFilter = useCallback((key: keyof FilterUser, value?: SelectValue | number[] | number | string) => {
    setFilter((old) => {
      const newState: { [k: string]: SelectValue | number[] | number | string | undefined } = { ...old }
      newState[key] = value
      return newState
    })
  }, [])

  const onSearch = debounce((key: keyof SearchUser | 'keyword', value: string) => {
    if (key === 'keyword') {
      setFilter((old) => ({ ...old, keyword: value }))
      return
    }

    setSearch((old) => {
      const newState = { ...old }
      newState[key] = value
      return newState
    })
  }, 500)

  return (
    <div>
      <div className="title-list">
        <h1>Employee manager</h1>
        <ModalCreateEmployee />
      </div>
      <Divider />
      <div className={styles.filter}>
        <div className={styles.filter_select}>
          <Select
            className={styles.select}
            placeholder="Select roles"
            allowClear
            mode="multiple"
            maxTagCount="responsive"
            filterOption={false}
            loading={rolesLoading}
            onChange={(values) => onFilter('roles', values)}
            onSearch={(value) => onSearch('role', value)}
          >
            {roles?.data.map((role: { id: number; name: string }) => (
              <Select.Option key={role.id} value={role.id}>{role.name}</Select.Option>
            ))}
          </Select>
          <Select
            className={styles.select}
            placeholder="Select branchs"
            allowClear
            mode="multiple"
            maxTagCount="responsive"
            filterOption={false}
            loading={branchsLoading}
            onChange={(values) => onFilter('branchs', values)}
            onSearch={(value) => onSearch('branch', value)}
          >
            {branchs?.data.map((branch: { id: number; name: string }) => (
              <Select.Option key={branch.id} value={branch.id}>{branch.name}</Select.Option>
            ))}
          </Select>
          <Select
            className={styles.select}
            placeholder="Select status"
            allowClear
            onChange={(value) => onFilter('status', value)}
          >
            {enumToArray(UserStatus, getUserStatusName).map((status) => (
              <Select.Option key={status.value} value={status.value}>{status.name}</Select.Option>
            ))}
          </Select>
        </div>
        <div className="filter-search">
          <Input.Search
            placeholder="Search keyword"
            allowClear
            onSearch={(value) => onFilter('keyword', value)}
            onChange={(e) => onSearch('keyword', e.target.value)}
          />
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        onChange={(pagination) => setFilter((old) => ({ ...old, page: pagination.current }))}
        pagination={{
          current: employees?.page,
          total: employees?.total,
          defaultPageSize: employees?.limit,
          showSizeChanger: false,
        }}
      />
    </div>
  )
}

export default ListEmployee
