import { Fragment } from 'react';
import { DrawerMode } from '@constants/index';
import { Checkbox, Col, Form, Input, InputNumber, Space, Tag, Typography } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import 'antd/dist/antd.css';
import classes from './index.module.css';

type ModalListProps = {
    name: number,
    edit: string | boolean,
    setChecked: (checked: { isChecked: boolean, name: number }) => void
}

export const FormList: React.FC<ModalListProps> = ({ name, edit, setChecked }: ModalListProps) => (
    <Fragment>
        <Col span={24}>
            <Form.Item
                name={[name, 'name']}
            >
                <Input data-test-id={`modal-drawer-right-input-exercise${name}`}
                    placeholder='Упражнение'
                    addonAfter={edit === DrawerMode.edit
                        ? <Checkbox
                            data-test-id={`modal-drawer-right-checkbox-exercise${name}`}
                            onChange={(e: CheckboxChangeEvent) => {
                                if (e.target.checked) setChecked({ isChecked: e.target.checked, name })
                            }} />
                        : null}
                />
            </Form.Item>
        </Col>
        <Col span={8} >
            <Form.Item>
                <Space direction='vertical'>
                    <Tag color="default">Подходы</Tag>
                    <Form.Item
                        name={[name, 'approaches']}
                    >
                        <InputNumber
                            data-test-id={`modal-drawer-right-input-approach${name}`}
                            addonBefore="+"
                            min={1}
                            placeholder='1' />
                    </Form.Item>
                </Space>
            </Form.Item>
        </Col>
        <Col xs={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 3 }}>
            <Form.Item>
                <Space direction='vertical'>
                    <Tag color="default">Вес, кг</Tag>
                    <Form.Item
                        name={[name, 'weight']}
                    >
                        <InputNumber
                            data-test-id={`modal-drawer-right-input-weight${name}`}
                            min={0}
                            placeholder='0' />
                    </Form.Item>
                </Space>
            </Form.Item>
        </Col>
        <Col xs={{ offset: 1 }} lg={{ span: 1, offset: 0 }} >
            <Typography.Text
                type='secondary'
                className={classes.formlist_sign}>
                x</Typography.Text>
        </Col>
        <Col span={5} >
            <Form.Item>
                <Space direction='vertical'>
                    <Tag color="default">Количество</Tag>
                    <Form.Item
                        name={[name, 'replays']}
                    >
                        <InputNumber
                            data-test-id={`modal-drawer-right-input-quantity${name}`}
                            min={1} placeholder='3' />
                    </Form.Item>
                </Space>
            </Form.Item>
        </Col>
    </Fragment>
)
