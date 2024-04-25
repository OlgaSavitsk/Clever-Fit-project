import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { DrawerMode } from '@constants/trainings.constant';
import { OpenDrawerOptions } from '@pages/trainings';
import { Col, Row, Typography } from 'antd';

import 'antd/dist/antd.css';

type PanelAddTrainingProps = {
    mode: DrawerMode
    setShowDrawer: (showDrawer: OpenDrawerOptions | null) => void,
}

const title = {
    [DrawerMode.edit]: 'Редактирование',
    [DrawerMode.create]: 'Добавление упражнений',
    [DrawerMode.invite]: 'Совместная тренировка'
}

export const TitleDrawerComponent: React.FC<PanelAddTrainingProps> = ({
    mode, setShowDrawer
}) => {
    const titleContent = title[mode]

    return (
        <Row gutter={[0, 16]} >
            <Col span={2}>
                {mode === DrawerMode.edit ? <EditOutlined /> : <PlusOutlined />}
            </Col>

            <Col span={21}>
                <Typography.Text strong={true}>
                    {titleContent}
                </Typography.Text>
            </Col>

            <Col span={1}>
                <CloseOutlined data-test-id='modal-drawer-right-button-close'
                    onClick={() => {
                        setShowDrawer(null)
                    }}
                    style={{ color: 'var(--ant-text)', textAlign: 'end' }} />
            </Col>
        </Row >

    )
};