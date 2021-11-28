import React, { useCallback, useState } from 'react'
import {
  Button, DatePicker, Form, Input, message, Modal,
} from 'antd'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'

import { api } from '@/utils/axios'
import { QUERY_KEY } from '@/data/query-key'

const ModalCreateCustomer = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [form] = Form.useForm()

  const [visible, setVisible] = useState(false)

  const onClose = useCallback(() => {
    setVisible(false)
    form.resetFields()
  }, [form])

  const { mutate: createCustomer, isLoading } = useMutation(
    (params) => api.post('/customers', params),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(QUERY_KEY.CUSTOMERS)
        onClose()
        message.success('The customer was successfully created')
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
        <h2>Create customer</h2>
        <Form form={form} layout="vertical" onFinish={createCustomer}>
          <Form.Item
            label="Full name"
            name="fullName"
            rules={[{ required: true, message: t('validate.required', { field: 'Full name' }) }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date of birth"
            name="dob"
            rules={[{ required: true, message: t('validate.required', { field: 'Date of birth' }) }]}
          >
            <DatePicker className="width-full" />
          </Form.Item>
          <Form.Item
            label="Phone number"
            name="phoneNumber"
            rules={[
              { required: true, message: t('validate.required', { field: 'Phone number' }) },
              {
                pattern: /^[+]{0,1}[(]{0,1}[0-9]{1,4}[)]{0,1}[-0-9]*$/,
                message: t('validate.invalid', { field: 'Phone number' }),
              },
            ]}
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
          <div className="modal-action">
            <Button className="mr-3" onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={isLoading}>Create</Button>
          </div>
        </Form>
      </Modal>
      <Button type="primary" onClick={() => setVisible(true)}>Create customer</Button>
    </>
  )
}

export default ModalCreateCustomer
