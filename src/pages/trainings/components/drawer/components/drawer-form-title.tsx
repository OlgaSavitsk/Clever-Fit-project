import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { DrawerMode } from '@constants/index';
import { setColor } from '@pages/calendar/calendar.helper';
import { OpenDrawerOptions } from '@pages/trainings';
import { selectTraining } from '@redux/training';
import { setSelectOptions } from '@utils/index';
import { Avatar, Badge, Col, Form, List, Select, Space } from 'antd';

import 'antd/dist/antd.css';
import classes from '../index.module.css';

type FormDrawerTitleComponentProps = {
    showDrawer: OpenDrawerOptions | null,
}

export const FormDrawerTitleComponent: React.FC<FormDrawerTitleComponentProps> = ({
    showDrawer,
}) => {
    const { trainingsList } = selectTraining()
    
    const { mode, userFrom } = {...showDrawer}

    return (

        <Col span={24}>
            {mode === DrawerMode.invite ?
                userFrom &&
                <List.Item.Meta
                    avatar={userFrom.imageSrc ?
                        <Avatar src={userFrom.imageSrc} size={42} /> :
                        <Avatar
                            size={42}
                            icon={<UserOutlined />}
                            style={{ backgroundColor: 'var(--ant-default-avatar)' }} />}
                    title={
                        <Space.Compact direction='horizontal' className={classes.title_avatar}>
                            <p style={{ width: '25%', margin: 0 }}>{userFrom.name}</p>
                            <Badge color={setColor(userFrom.trainingType)}
                                text={userFrom.trainingType} style={{
                                    color: 'var(--ant-text)'
                                }} />
                        </Space.Compact>}
                /> :
                <Form.Item
                    name='name'
                    style={{ width: '100%', marginBottom: 0 }}
                    rules={[
                        { required: true }
                    ]}
                >
                    <Select
                        data-test-id='modal-create-exercise-select'
                        placeholder='Выбор типа тренировки'
                        suffixIcon={<DownOutlined />}
                        style={{ width: '100%' }}
                        options={setSelectOptions(trainingsList)} />
                </Form.Item>}
        </Col>
    )
};