import React, { useMemo, useState } from 'react'

import {
  Divider, Image, Input, Select, Table,
} from 'antd'
import { ColumnsType } from 'antd/lib/table'
import debounce from 'lodash.debounce'

import { useItems } from '@/data/useItems'
import { useProfile } from '@/data/useProfile'
import { getItemTypeName, ItemType } from '@/enums/item-type.enum'
import { RoleStatus } from '@/enums/role-status.enum'
import styles from '@/styles/item.module.scss'
import { DetailItem, FilterItem } from '@/types/item.type'
import { formatMoney } from '@/utils/format-number'
import { enumToArray } from '@/utils/helper'

import ModalEditItem from './ModalEditItem'
import ModalDetailItem from './ModalDetailItem'
import ModalCreateItem from './ModalCreateItem'

const columns: ColumnsType<any> = [
  { title: 'ID', dataIndex: 'id' },
  { title: 'Picture', dataIndex: 'picture' },
  { title: 'Name', dataIndex: 'name' },
  { title: 'Description', dataIndex: 'des', width: 500 },
  { title: 'Price', dataIndex: 'price' },
  { title: 'Qr code', dataIndex: 'qrCode' },
  { title: 'Type', dataIndex: 'type' },
  { dataIndex: 'action', width: 50 },
]

const ListItem = () => {
  const [filter, setFilter] = useState<FilterItem>()

  const { data: items, isLoading } = useItems(filter)
  const { data: profile } = useProfile()

  const hasPermit = useMemo(
    () => [RoleStatus.ACCOUNTANT, RoleStatus.ADMIN].includes(profile?.roleId), [profile?.roleId],
  )

  const dataSource = useMemo(() => {
    if (items) {
      return items.data.map((item: DetailItem) => ({
        ...item,
        key: item.id,
        picture: <Image height={50} src={item.pictureUrl} />,
        price: formatMoney(item.price),
        type: getItemTypeName(item.type),
        action: (
          <div className="flex">
            <ModalDetailItem item={item} />
            {hasPermit && <ModalEditItem item={item} />}
          </div>
        ),
      }))
    }

    return []
  }, [hasPermit, items])

  const onSearch = debounce((keyword: string) => setFilter((old) => ({ ...old, keyword })), 500)

  return (
    <div>
      <div className="title-list">
        <h1>Item manager</h1>
        {hasPermit && <ModalCreateItem />}
      </div>
      <Divider />
      <div className={styles.filter}>
        <div>
          <Select
            className={styles.select}
            placeholder="Select types"
            allowClear
            onChange={(type: number) => setFilter((old) => ({ ...old, type }))}
          >
            {enumToArray(ItemType, getItemTypeName).map((type) => (
              <Select.Option key={type.value} value={type.value}>{type.name}</Select.Option>
            ))}
          </Select>
        </div>
        <div className="filter-search">
          <Input.Search
            placeholder="Search keyword"
            allowClear
            onSearch={(keyword) => setFilter((old) => ({ ...old, keyword }))}
            onChange={(e) => onSearch(e.target.value)}
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
          total: items?.total,
          defaultPageSize: items?.limit,
          showSizeChanger: false,
        }}
      />
    </div>
  )
}

export default ListItem
