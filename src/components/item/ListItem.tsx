import React, { useMemo, useState } from 'react'
import {
  Divider, Image, Input, Select, Table,
} from 'antd'
import debounce from 'lodash.debounce'
import { ColumnsType } from 'antd/lib/table'

import styles from '@/styles/item.module.scss'
import ModalCreateItem from './ModalCreateItem'
import { DetailItem, FilterItem } from '@/types/item.type'
import { enumToArray } from '@/utils/helper'
import { getItemTypeName, ItemType } from '@/enums/item-type.enum'
import { useItems } from '@/data/useItems'
import { formatMoney } from '@/utils/format-number'
import ModalEditItem from './ModalEditItem'

const columns: ColumnsType<any> = [
  { title: 'ID', dataIndex: 'id' },
  { title: 'Picture', dataIndex: 'picture' },
  { title: 'Name', dataIndex: 'name' },
  { title: 'Description', dataIndex: 'des', width: 500 },
  { title: 'Price', dataIndex: 'price' },
  { title: 'Qr code', dataIndex: 'qrCode' },
  { title: 'Type', dataIndex: 'type' },
  { title: 'Action', dataIndex: 'action' },
]

const ListItem = () => {
  const [filter, setFilter] = useState<FilterItem>()

  const { data: items, isLoading } = useItems(filter)

  const dataSource = useMemo(() => {
    if (items) {
      return items.data.map((item: DetailItem) => ({
        ...item,
        key: item.id,
        picture: <Image height={50} src={item.pictureUrl} />,
        price: formatMoney(item.price),
        type: getItemTypeName(item.type),
        action: <ModalEditItem item={item} />,
      }))
    }

    return []
  }, [items])

  const onSearch = debounce((keyword: string) => setFilter((old) => ({ ...old, keyword })), 500)

  return (
    <div>
      <div className="title-list">
        <h1>Item manager</h1>
        <ModalCreateItem />
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
          current: items?.page,
          total: items?.total,
          defaultPageSize: items?.limit,
          showSizeChanger: false,
        }}
      />
    </div>
  )
}

export default ListItem
