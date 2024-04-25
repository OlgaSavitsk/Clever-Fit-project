import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GooglePlusOutlined } from '@ant-design/icons';
import { TabsComponent } from '@components/index';
import { PASSWORD_REGEX, RoutePath, TIPS } from '@constants/index';
import { authActions, selectPreviousLocations } from '@redux/auth';
import { Button, Form, Grid, Image, Input, Space } from 'antd';

import 'antd/dist/antd.css';
import classes from './index.module.css';

const validateMessages = {
  required: '',
};

type SignUpParams = {
  email: string,
  password: string,
  confirm?: string
}

const { useBreakpoint } = Grid;

export const SignUp: React.FC = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const { xs } = useBreakpoint();

  const previousLocations = selectPreviousLocations()

  const onFinish = useCallback(async (value: SignUpParams | unknown) => {
    dispatch(authActions.signUpRequest(value))
  }, [dispatch])

  const repeatedRequest = useCallback(() => {
    if (!previousLocations) return
    const { pathname, state } = previousLocations

    if (pathname === RoutePath.Error) {
      onFinish(state)
    } 
  }, [onFinish, previousLocations])

  useEffect(() => {
    repeatedRequest()
  }, [repeatedRequest])

  return (
    <Space direction="vertical" align="center" size={xs ? 32 : 48} style={{ width: '100%', textAlign: 'center' }}>
      <Image
        src='../logo.svg'
        preview={false}
        width={xs ? 203 : 309}
        alt='logo' />
      <Form
        form={form}
        name="normal_login"
        className={classes.login_form}
        onFinish={onFinish}
        size='large'
        validateMessages={validateMessages}
      >
        <TabsComponent />

        <Form.Item
          name="email"
          rules={[{ required: true }, { type: 'email' }]}
        >
          <Input
            data-test-id='registration-email'
            addonBefore="e-mail:"
            className={classes.input}
            autoComplete='off' />
        </Form.Item>

        <Form.Item
          name="password"
          help={TIPS}
          rules={[
            { required: true },
            {
              validator: (_, value) => PASSWORD_REGEX.test(value)
                ? Promise.resolve()
                : Promise.reject(new Error(TIPS))
            },
          ]}
        >
          <Input.Password
            type="password"
            placeholder="Пароль"
            data-test-id='registration-password' />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={['password']}
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('Пароли не совпадают'));
              },
            }),
          ]}
        >
          <Input.Password
            data-test-id='registration-confirm-password'
            placeholder="Повторите пароль" />
        </Form.Item>

        <Form.Item shouldUpdate={true}>
          {() => (
            <Space direction="vertical" align="center" size={16} className={classes.form_button__item}>
              <Button
                data-test-id='registration-submit-button'
                type="primary"
                htmlType="submit"
                className={classes.form_button}
                disabled={!!form.getFieldsError().filter(({ errors }) => errors.length).length}
              >
                Войти
              </Button>
              <Button
                icon={xs ? '' : <GooglePlusOutlined />}
                href={`${import.meta.env.VITE_API_BASE_URL}/auth/google`}
                className={classes.form_button}>
                Регистрация через Google
              </Button>
            </Space>
          )}
        </Form.Item>
      </Form>
    </Space>
  );
};
