import React, { Fragment } from 'react';
import { PASSWORD_REGEX, TIPS } from '@constants/auth-form.constants';
import { Form, Input } from 'antd'

import classes from './index.module.css';

export const FormAuthList: React.FC = () => (
    <Fragment>
        <Form.Item
            name="email"
            className={classes.form_item}
            rules={[{ required: true }, { type: 'email' }]}
        >
            <Input
                 data-test-id='profile-email'
                addonBefore="e-mail:"
                className={classes.input}
                autoComplete='off' />
        </Form.Item>
        <Form.Item
            name="password"
            help={TIPS}
            className={classes.form_item}
            rules={[
                {
                    validator: (_, value) => !value || PASSWORD_REGEX.test(value)
                        ? Promise.resolve()
                        : Promise.reject(new Error(TIPS))
                },
            ]}
        >
            <Input.Password
                type="password"
                placeholder="Пароль"
                data-test-id='profile-password' />
        </Form.Item>
        <Form.Item
            name="confirm"
            dependencies={['password']}
            className={classes.form_item}
            rules={[
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
                data-test-id='profile-repeat-password'
                placeholder="Повторите пароль" />
        </Form.Item>
    </Fragment>
)