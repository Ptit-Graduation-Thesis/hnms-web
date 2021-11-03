import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form, Input, InputNumber, message, Modal, Row, Select,
} from 'antd'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'

import { useSuggestRoles } from '@/data/useSuggestRoles'
import { useSuggestBranch } from '@/data/useSuggestBranchs'
import { api } from '@/utils/axios'
import { QUERY_KEY } from '@/data/query-key'

const ModalCreateEmployee = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [form] = Form.useForm()

  const [visible, setVisible] = useState(false)

  const { data: roles, isLoading: rolesLoading } = useSuggestRoles()
  const { data: branchs, isLoading: branchsLoading } = useSuggestBranch()

  const onClose = useCallback(() => {
    setVisible(false)
    form.resetFields()
  }, [form])

  const { mutate: createEmployee, isLoading } = useMutation(
    (params) => api.post('/users', params),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(QUERY_KEY.USERS)
        onClose()
        message.success('The employee was successfully created')
      },
      onError: () => { message.error('Create employee was failue') },
    },
  )

  return (
    <>
      <Modal width={700} footer={null} closable={false} visible={visible}>
        <h2>Create employee</h2>
        <Form form={form} layout="vertical" onFinish={createEmployee}>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item
                label="Full name"
                name="fullName"
                rules={[{ required: true, message: t('validate.required', { field: 'Full name' }) }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: t('validate.required', { field: 'Username' }) }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: t('validate.required', { field: 'Password' }) },
                  { min: 6, message: t('validate.min', { field: 'Password', length: 6 }) },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Confirm password"
                name="confirmPassword"
                rules={[
                  { required: true, message: t('validate.required', { field: 'Password' }) },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error(t('validate.match')))
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={12}>
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
            </Col>
            <Col span={12}>
              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: t('validate.required', { field: 'Address' }) }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Credential ID"
                name="credentialId"
                rules={[
                  { required: true, message: t('validate.required', { field: 'Credential ID' }) },
                  { pattern: /^[0-9]*$/, message: t('validate.invalid', { field: 'Credential ID' }) },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Date of birth"
                name="dob"
                rules={[{ required: true, message: t('validate.required', { field: 'Date of birth' }) }]}
              >
                <DatePicker className="width-full" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Salary"
                name="salary"
                rules={[{ required: true, message: t('validate.required', { field: 'Salary' }) }]}
              >
                <InputNumber
                  className="width-full"
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                  parser={(value) => `${value}`.replace(/\$\s?|(\.*)/g, '')}
                  addonAfter="₫"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item
                label="Role"
                name="roleId"
                rules={[{ required: true, message: t('validate.required', { field: 'Role' }) }]}
              >
                <Select placeholder="Select role" loading={rolesLoading}>
                  {roles?.data.map((role: { id: number; name: string }) => (
                    <Select.Option key={role.id} value={role.id}>{role.name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Branch"
                name="branchId"
                rules={[{ required: true, message: t('validate.required', { field: 'Branch' }) }]}
              >
                <Select placeholder="Select branch" loading={branchsLoading}>
                  {branchs?.data.map((branch: { id: number; name: string }) => (
                    <Select.Option key={branch.id} value={branch.id}>{branch.name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Divider className="mt-0 mb-4" />
          <div className="modal-action">
            <Button className="mr-3" onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={isLoading}>Create</Button>
          </div>
        </Form>
      </Modal>
      <Button type="primary" onClick={() => setVisible(true)}>Create employee</Button>
    </>
  )
}

export default ModalCreateEmployee
