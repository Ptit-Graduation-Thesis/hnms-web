import React, { useCallback, useState } from 'react'

import {
  Modal, Form, Input, Divider, Button, message,
} from 'antd'
import { AxiosError } from 'axios'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'

import { QUERY_KEY } from '@/data/query-key'
import { api } from '@/utils/axios'

const ModalCreateBranch = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [form] = Form.useForm()

  const [visible, setVisible] = useState(false)

  const onClose = useCallback(() => {
    setVisible(false)
    form.resetFields()
  }, [form])

  const { mutate: createBranch, isLoading } = useMutation(
    (params) => api.post('/branchs', params),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(QUERY_KEY.BRANCHS)
        onClose()
        message.success('The branch was successfully created')
      },
      onError: (err: AxiosError) => {
        if (err?.response?.data) message.error(err?.response?.data?.message)
        else message.error('Something went wrong')
      },
    },
  )

  return (
    <>
      <Modal footer={null} closable={false} visible={visible}>
        <h2>Create Branch</h2>
        <Form form={form} layout="vertical" onFinish={createBranch}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: t('validate.required', { field: 'Name' }) }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: t('validate.required', { field: 'Address' }) }]}
          >
            <Input />
          </Form.Item>
          <Divider className="mt-0 mb-4" />
          <div className="modal-action">
            <Button className="mr-3" onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={isLoading}>Create</Button>
          </div>
        </Form>
      </Modal>
      <Button type="primary" onClick={() => setVisible(true)}>Create branch</Button>
    </>
  )
}

export default ModalCreateBranch
