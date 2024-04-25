import { useCallback, useState } from 'react';
import { DownOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { dateFullFormat, DrawerMode } from '@constants/index';
import { FormList } from '@pages/calendar/components';
import { DatePicker } from '@pages/calendar/components/calendar';
import { OpenDrawerOptions } from '@pages/trainings';
import { TrainingResponse } from '@redux/training';
import { periodOptions, transformPeriod } from '@utils/transform-period.utils';
import { Button, Checkbox, Col, Form, FormInstance, Row, Select, Space } from 'antd';
import locale from 'antd/lib/calendar/locale/ru_RU';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import dayjs, { Dayjs } from 'dayjs';

import { FormDrawerTitleComponent } from './drawer-form-title';

import 'antd/dist/antd.css';
import classes from '../index.module.css';

const validateMessages = {
    required: '',
};

type FormDrawerComponentProps = {
    form: FormInstance,
    showDrawer: OpenDrawerOptions | null,
    userTrainings: TrainingResponse[],
}

export const FormDrawerComponent: React.FC<FormDrawerComponentProps> = ({
    form, showDrawer, userTrainings,
}) => {
    const [checkedPeriod, setCheckedPeriod] = useState(false);
    const [checkedTraining, setCheckedTraining] = useState<{ isChecked: boolean, name: number }>(
        { isChecked: false, name: 0 }
    );

    const { mode } = showDrawer as OpenDrawerOptions

    const handleCheckbox = useCallback((e: CheckboxChangeEvent) => {
        setCheckedPeriod(e.target.checked)
    }, [])

    const disabledDate = (current: Dayjs) => current && current < dayjs().endOf('day');

    const cellRender = (current: Dayjs) => {
        const training = userTrainings.find(train => current.isSame(train.date, 'day'))

        const style = training ? classes.training_exist : classes.calendar_cell

        return (
            <div className={training?.isImplementation
                ? `${classes.training_exist} ${classes.done}`
                : style}>
                {current.date()}
            </div>
        );
    }

    return (
        <Form
            form={form}
            size='middle'
            style={{ width: '100%' }}
            initialValues={{
                parameters: {
                    period: 'Периодичность'
                },
            }}
            validateMessages={validateMessages}
            className={classes.drawer_form}
        >
            <Row gutter={[0, 24]}>

                <FormDrawerTitleComponent showDrawer={showDrawer} />

                <Col span={12}>
                    <Space direction="vertical" size='small'>
                        <Form.Item
                            name='date'
                            rules={[
                                { required: true },
                            ]}>
                            <DatePicker
                                data-test-id='modal-drawer-right-date-picker'
                                locale={locale}
                                disabledDate={disabledDate}
                                dateRender={cellRender}
                                format={dateFullFormat} />
                        </Form.Item>
                        {checkedPeriod && <Form.Item name={['parameters', 'period']}>
                            <Select
                                data-test-id='modal-drawer-right-select-period'
                                suffixIcon={<DownOutlined />}
                                options={periodOptions.map(
                                    (training) => ({ label: transformPeriod(training), value: training }))} />
                        </Form.Item>}
                    </Space>
                </Col>
                <Col span={11} offset={1}>
                    <Space direction="vertical" size='small'>
                        <Form.Item name={['parameters', 'repeat']} valuePropName="checked">
                            <Checkbox
                                data-test-id='modal-drawer-right-checkbox-period'
                                onChange={handleCheckbox}>С периодичностью</Checkbox>
                        </Form.Item>
                    </Space>
                </Col>

                <Form.List name='exercises'
                    initialValue={
                        [{}]
                    }>
                    {(fields, { add, remove }) => (
                        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 24 }}>

                            {fields.map((field) => (
                                <Row key={field.key} align="bottom" gutter={[0, 8]}>
                                    <FormList name={field.name} edit={mode} setChecked={setCheckedTraining} />
                                </Row>
                            ))}

                            <div className={classes.drawer_button}>
                                <Button type="link" size='large'
                                    onClick={() => add({})} block={true} icon={<PlusOutlined />}>
                                    Добавить ещё
                                </Button>
                                {mode === DrawerMode.edit &&
                                    <Button type="text" size='large'
                                        disabled={!checkedTraining.isChecked}
                                        block={true} icon={<MinusOutlined />}
                                        onClick={() => remove(checkedTraining?.name)}>
                                        Удалить
                                    </Button>}
                            </div>
                        </div>
                    )}
                </Form.List>
            </Row>
        </Form>
    )
};