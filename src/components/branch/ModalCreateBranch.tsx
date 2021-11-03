import React, { useCallback, useState } from 'react'
import {
  Modal, Form, Input, Divider, Button, message,
} from 'antd'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import { api } from '@/utils/axios'
import { QUERY_KEY } from '@/data/query-key'

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
      onError: () => { message.error('Create branch was failue') },
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
