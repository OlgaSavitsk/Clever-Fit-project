import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PASSWORD_REGEX, RoutePath, TIPS } from '@constants/index';
import { authActions, ChangePasswordRequest } from '@redux/auth';
import { RootState } from '@redux/configure-store';
import { getPrevLocation } from '@utils/index';
import { Button, Form, Input, Result } from 'antd';

import 'antd/dist/antd.css';
import classes from './index.module.css';


export const ResetPasswordPage: React.FC = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();

    const onFinish = useCallback(async (value: ChangePasswordRequest) => {
        dispatch(authActions.changePasswordRequest(value))
    }, [dispatch])

    const previousLocations = useSelector(({ router }: RootState) => getPrevLocation(router))

    const repeatedRequest = useCallback(() => {
        if (!previousLocations) return
        const { pathname, state } = previousLocations

        if (pathname === RoutePath.ChangePasswordError) {
            onFinish(state as ChangePasswordRequest)
        }
    }, [onFinish, previousLocations])

    useEffect(() => {
        repeatedRequest()
    }, [form, repeatedRequest])

    return (
        <Result className={classes.result_layout__password}
                icon={' '}
                title='Восстановление аккауанта'
                extra={[
                    <Form
                        form={form}
                        name="normal_login"
                        onFinish={onFinish}
                        size='large'
                        key='form'
                        style={{ width: '100%' }}
                    >
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
                                placeholder="Новый пароль"
                                data-test-id='change-password' />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
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
                                data-test-id='change-confirm-password'
                                placeholder="Повторите пароль" />
                        </Form.Item>
                        <Form.Item shouldUpdate={true} style={{ paddingTop: '30px', marginBottom: 0 }}>
                            {() => (
                                <Button
                                    data-test-id='change-submit-button'
                                    type="primary"
                                    htmlType="submit"
                                    style={{ width: '100%' }}
                                    disabled={!!form.getFieldsError().filter(({ errors }) => errors.length).length}
                                >
                                    Сохранить
                                </Button>
                            )}
                        </Form.Item>
                    </Form>
                ]} />
    );
};