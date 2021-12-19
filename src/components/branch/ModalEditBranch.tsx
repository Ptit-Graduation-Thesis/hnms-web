import React, { useCallback, useState } from 'react'
import {
  Modal, Form, Input, Divider, Button, message,
} from 'antd'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'

import editIcon from '@/assets/img/edit.svg'
import { api } from '@/utils/axios'
import { QUERY_KEY } from '@/data/query-key'
import { DetailBranch } from '@/types/branch.type'

type ModalProps = {
  branch: DetailBranch
}

const ModalEditBranch: React.FC<ModalProps> = ({ branch }) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [form] = Form.useForm()

  const [visible, setVisible] = useState(false)

  const onClose = useCallback(() => {
    setVisible(false)
    form.resetFields()
  }, [form])

  const { mutate: editBranch, isLoading } = useMutation(
    (params) => api.put(`/branchs/${branch.id}`, params),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(QUERY_KEY.BRANCHS)
        onClose()
        message.success('The branch was successfully edited')
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
        <h2>Edit Branch</h2>
        <Form form={form} layout="vertical" onFinish={editBranch} initialValues={branch}>
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

export default ModalEditBranch
