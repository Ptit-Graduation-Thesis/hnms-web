import React, { useMemo, useState } from 'react'

import { Divider, Input, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import debounce from 'lodash.debounce'

import { useCustomers } from '@/data/useCustomers'
import styles from '@/styles/customer.module.scss'
import { DetailCustomer, FilterCustomer } from '@/types/customer.type'
import { formatDate } from '@/utils/date'

import ModalCreateCustomer from './ModalCreateCustomer'
import ModalEditCustomer from './ModalEditCustomer'

const columns: ColumnsType<any> = [
  { title: 'ID', dataIndex: 'id' },
  { title: 'Full name', dataIndex: 'fullName' },
  { title: 'Date of birth', dataIndex: 'dob' },
  { title: 'Phone number', dataIndex: 'phoneNumber' },
  { title: 'Address', dataIndex: 'address' },
  { title: '', dataIndex: 'action', width: 50 },
]

const ListCustomer = () => {
  const [filter, setFilter] = useState<FilterCustomer>()

  const { data: customers, isLoading } = useCustomers(filter)

  const dataSource = useMemo(() => {
    if (customers) {
      return customers.data.map((customer: DetailCustomer) => ({
        ...customer,
        key: customer.id,
        dob: formatDate(customer.dob),
        action: <ModalEditCustomer customer={customer} />,
      }))
    }

    return []
  }, [customers])

  const handleChangeKeyword = debounce((keyword: string) => setFilter((old) => ({ ...old, keyword })), 500)

  return (
    <div>
      <div className="title-list">
        <h1>Customer manager</h1>
        <ModalCreateCustomer />
      </div>
      <Divider />
      <div className={styles.filter}>
        <div className="filter-search">
          <Input.Search
            placeholder="Search keyword"
            allowClear
            onChange={(e) => handleChangeKeyword(e.target.value)}
            onSearch={(keyword) => setFilter((old) => ({ ...old, keyword }))}
          />
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        onChange={(pagination) => setFilter((old) => ({ ...old, page: pagination.current }))}
        pagination={{
          current: filter?.page,
          total: customers?.total,
          defaultPageSize: customers?.limit,
          showSizeChanger: false,
        }}
      />
    </div>
  )
}

export default ListCustomer
