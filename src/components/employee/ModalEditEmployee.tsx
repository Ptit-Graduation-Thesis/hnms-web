import React, { useCallback, useMemo, useState } from 'react'

import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form, Input, InputNumber, message, Modal, Row, Select,
} from 'antd'
import { AxiosError } from 'axios'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'

import editIcon from '@/assets/img/edit.svg'
import { QUERY_KEY } from '@/data/query-key'
import { useSuggestBranch } from '@/data/useSuggestBranchs'
import { useSuggestRoles } from '@/data/useSuggestRoles'
import { DetailUser } from '@/types/user.type'
import { api } from '@/utils/axios'

type ModalProps = {
  employee: DetailUser
}

const ModalEditEmployee: React.FC<ModalProps> = ({ employee }) => {
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

  const { mutate: editEmployee, isLoading } = useMutation(
    (params) => api.put(`/users/${employee.id}`, params),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(QUERY_KEY.USERS)
        onClose()
        message.success('The employee was successfully edited')
      },
      onError: (err: AxiosError) => {
        if (err?.response?.data) message.error(err?.response?.data?.message)
        else message.error('Something went wrong')
      },
    },
  )

  const initialValues = useMemo(() => ({
    ...employee,
    password: '',
    confirmPassword: '',
    dob: dayjs(employee.dob),
  }), [employee])

  const onFinish = useCallback((params) => {
    editEmployee({
      ...params,
      password: params.password || undefined,
      confirmPassword: params.confirmPassword || undefined,
    })
  }, [editEmployee])

  return (
    <>
      <Modal width={700} footer={null} closable={false} visible={visible}>
        <h2>Edit employee</h2>
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={initialValues}>
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
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (getFieldValue('password') === value) {
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
            <Button type="primary" htmlType="submit" loading={isLoading}>Save</Button>
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

export default ModalEditEmployee
