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
import { enumToArray, getBase64 } from '@/utils/helper'
import { getItemTypeName, ItemType } from '@/enums/item-type.enum'
import { api } from '@/utils/axios'
import { QUERY_KEY } from '@/data/query-key'

const ModalCreateItem = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [form] = Form.useForm()

  const [visible, setVisible] = useState(false)
  const [picture, setPicture] = useState<RcFile>()

  const onClose = useCallback(() => {
    setVisible(false)
    setPicture(undefined)
    form.resetFields()
  }, [form])

  const { mutate: createItem, isLoading } = useMutation(
    (params: FormData) => api.post('/items', params),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(QUERY_KEY.ITEMS)
        onClose()
        message.success('The item was successfully created')
      },
      onError: (err: AxiosError) => {
        if (err?.response?.data) message.error(err?.response?.data?.message)
        else message.error('Something went wrong')
      },
    },
  )

  const onFinish = useCallback((values) => {
    const formData = new FormData()

    formData.append('picture', new Blob([picture as Blob]), picture?.name)
    formData.append('name', values.name)
    if (values.des) formData.append('des', values.des)
    formData.append('price', values.price)
    formData.append('type', values.type)

    createItem(formData)
  }, [createItem, picture])

  useEffect(() => {
    if (picture) {
      getBase64(picture, (imgUrl) => form.setFieldsValue({ picture: imgUrl }))
    }
  }, [form, picture])

  return (
    <>
      <Modal footer={null} closable={false} visible={visible}>
        <h2>Create item</h2>
        <Form form={form} layout="vertical" onFinish={onFinish}>
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
              {form.getFieldValue('picture')
                ? <img height={100} src={form.getFieldValue('picture')} alt="" />
                : '+ Upload'}
            </Upload>
          </Form.Item>
          <Form.Item
            className="item-hidden"
            name="picture"
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
            <Button type="primary" htmlType="submit" loading={isLoading}>Create</Button>
          </div>
        </Form>
      </Modal>
      <Button type="primary" onClick={() => setVisible(true)}>Create item</Button>
    </>
  )
}

export default ModalCreateItem
