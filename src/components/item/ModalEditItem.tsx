import React, {
  useCallback, useEffect, useState,
} from 'react'
import {
  Button, Modal, Form, Input, Upload, InputNumber, Select, message,
} from 'antd'
import { useTranslation } from 'react-i18next'
import { RcFile } from 'antd/lib/upload'
import { useMutation, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'

import editIcon from '@/assets/img/edit.svg'
import { enumToArray, getBase64 } from '@/utils/helper'
import { getItemTypeName, ItemType } from '@/enums/item-type.enum'
import { api } from '@/utils/axios'
import { QUERY_KEY } from '@/data/query-key'
import { DetailItem } from '@/types/item.type'

interface ModalEditItemProps {
  item: DetailItem
}

const ModalEditItem: React.FC<ModalEditItemProps> = ({ item }) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [form] = Form.useForm()

  const [visible, setVisible] = useState(false)
  const [picture, setPicture] = useState<RcFile>()
  const [render, setRender] = useState(0)

  const onClose = useCallback(() => {
    setVisible(false)
    setPicture(undefined)
    form.resetFields()
  }, [form])

  const { mutate: updateItem, isLoading } = useMutation(
    (params: FormData) => api.put(`/items/${item.id}`, params),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(QUERY_KEY.ITEMS)
        onClose()
        message.success('The item was successfully edited')
      },
      onError: (err: AxiosError) => {
        if (err?.response?.data) message.error(err?.response?.data?.message)
        else message.error('Something went wrong')
      },
    },
  )

  const onFinish = useCallback((values) => {
    const formData = new FormData()

    if (picture) formData.append('picture', new Blob([picture as Blob]), picture?.name)
    formData.append('name', values.name)
    if (values.des) formData.append('des', values.des)
    formData.append('price', values.price)
    formData.append('type', values.type)

    updateItem(formData)
  }, [updateItem, picture])

  useEffect(() => {
    if (picture) {
      getBase64(picture, (imgUrl) => {
        form.setFieldsValue({ pictureUrl: imgUrl })
        setRender(render + 1)
      })
    }
  }, [form, picture, render])

  return (
    <>
      <Modal width={500} footer={null} closable={false} visible={visible}>
        <h2>Edit employee</h2>
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={item}>
          <Form.Item
            className="mb-0"
            label={<span><span className="required">* </span>Picture</span>}
          >
            <Upload
              accept=".png, .jpg, .jpeg"
              listType="picture-card"
              showUploadList={false}
              maxCount={1}
              beforeUpload={() => false}
              onChange={(info) => setPicture(info.fileList[0].originFileObj)}
            >
              {form.getFieldValue('pictureUrl')
                ? <img height={100} src={form.getFieldValue('pictureUrl')} alt="" />
                : <img height={100} src={item.pictureUrl} alt="" />}
            </Upload>
          </Form.Item>
          <Form.Item
            className="item-hidden"
            name="pictureUrl"
            rules={[{ required: true, message: t('validate.required', { field: 'Picture' }) }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: t('validate.required', { field: 'Name' }) }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="des"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: t('validate.required', { field: 'Price' }) }]}
          >
            <InputNumber
              className="width-full"
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              parser={(value) => `${value}`.replace(/\$\s?|(\.*)/g, '')}
              addonAfter="₫"
            />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: t('validate.required', { field: 'Type' }) }]}
          >
            <Select placeholder="Select type">
              {enumToArray(ItemType, getItemTypeName).map((type) => (
                <Select.Option key={type.value} value={type.value}>{type.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <div className="modal-action">
            <Button className="mr-3" onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={isLoading}>Edit</Button>
          </div>
        </Form>
      </Modal>
      <Button
        icon={<img className="table-icon" src={editIcon} alt="" />}
        type="text"
        onClick={() => setVisible(true)}
      />
    </>
  )
}

export default ModalEditItem
