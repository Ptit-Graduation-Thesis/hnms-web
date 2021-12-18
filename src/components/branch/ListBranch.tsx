import React, { useMemo, useState } from 'react'
import {
  Divider, Input, Table,
} from 'antd'
import { ColumnsType } from 'antd/lib/table'
import debounce from 'lodash.debounce'

import styles from '@/styles/branch.module.scss'
import { useBranchs } from '@/data/useBanchs'
import { DetailBranch, FilterBranch } from '@/types/branch.type'
import ModalCreateBranch from './ModalCreateBranch'
import ModalEditBranch from './ModalEditBranch'

const columns: ColumnsType<any> = [
  { title: 'ID', dataIndex: 'id' },
  { title: 'Name', dataIndex: 'name' },
  { title: 'Address', dataIndex: 'address' },
  { dataIndex: 'action', width: 50 },
]

const ListBranch = () => {
  const [filterBranchs, setFilter] = useState<FilterBranch>()

  const { data: branchs, isLoading } = useBranchs(filterBranchs)

  const dataSource = useMemo(() => {
    if (branchs) {
      return branchs.data.map((branch: DetailBranch) => ({
        ...branch,
        key: branch.id,
        action: <ModalEditBranch branch={branch} />,
      }))
    }

    return []
  }, [branchs])

  const handleChangeKeyword = debounce((keyword: string) => setFilter((old) => ({ ...old, keyword })), 500)

  return (
    <div>
      <div className="title-list">
        <h1>Branch manager</h1>
        <ModalCreateBranch />
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
          current: filterBranchs?.page,
          total: branchs?.total,
          defaultPageSize: branchs?.limit,
          showSizeChanger: false,
        }}
      />
    </div>
  )
}

export default ListBranch
