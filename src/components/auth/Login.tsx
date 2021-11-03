import React from 'react'
import {
  Button, Form, Input, message,
} from 'antd'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import loginImg from '@/assets/img/login.svg'
import userImg from '@/assets/img/user.svg'
import lockImg from '@/assets/img/lock.svg'
import logoImg from '@/assets/img/logo.png'
import styles from '@/styles/login.module.scss'
import { api, setToken } from '@/utils/axios'
import { LoginType } from '@/types/login.type'

const Login = () => {
  const { t } = useTranslation()
  const history = useHistory()

  const { mutate: login, isLoading } = useMutation(
    ({ username, password }: LoginType) => api.post('/auth/login', { username, password }), {
      onSuccess: (res) => {
        setToken(res.data.accessToken)
        history.push('/')
      },
      onError: (err: AxiosError) => {
        message.error(err?.response?.data?.message)
      },
    },
  )

  return (
    <div className={styles.background}>
      <Form className={styles.form} onFinish={login}>
        <div className={styles.logo_container}>
          <img src={logoImg} alt="" className={styles.logo} />
          <h1>HNMS</h1>
        </div>
        <div className={styles.login_img}>
          <img src={loginImg} alt="" />
        </div>
        <div className={styles.login_form}>
          <h2 className="mb-3">{t('login.welcome')}</h2>
          <Form.Item name="username">
            <Input
              size="large"
              prefix={<img src={userImg} width={20} height={20} alt="" />}
              placeholder={t('login.username')}
            />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password
              size="large"
              prefix={<img src={lockImg} width={20} height={20} alt="" />}
              placeholder={t('login.password')}
            />
          </Form.Item>
          <Button
            color="#1b9cfc"
            type="primary"
            size="large"
            htmlType="submit"
            loading={isLoading}
          >
            {t('login.login')}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default Login