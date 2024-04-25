import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { TrainingPalsResponse } from '@redux/pals';
import { Avatar, Grid, List, Space } from 'antd';

import { DescriptionItem } from '../invite-list/helper';
import { ModalCancelComponent } from '../modal-cancel-training';

import 'antd/dist/antd.css';
import classes from './index.module.css';

type JoinToMyTrainingComponentProps = {
    pals: TrainingPalsResponse[]
}

export const JoinToMyTrainingComponent: React.FC<JoinToMyTrainingComponentProps> = ({ pals }) => {
    const [openCancelModal, setOpenCancelModal] = useState<TrainingPalsResponse | null>(null);
    const { xs } = Grid.useBreakpoint();

    const isOpen = (record: TrainingPalsResponse) => openCancelModal ? record.id === openCancelModal.id : false;

    return (
        <Space direction='vertical' size={24} style={{ width: xs ? '100%' : 'auto' }}>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    lg: 4,
                }}
                dataSource={pals}
                renderItem={(item, index) => (
                    <List.Item
                        data-test-id={`joint-training-cards${index}`}
                        key={item.id}
                        className={classes.list_item}
                        onClick={() => setOpenCancelModal(item)}
                    >
                        <List.Item.Meta
                            avatar={item.imageSrc ?
                                <Avatar src={item.imageSrc} size={42} /> :
                                <Avatar
                                    size={42}
                                    icon={<UserOutlined />}
                                    style={{ backgroundColor: 'var(--ant-default-avatar)' }} />}
                            title={item.name} />
                        <DescriptionItem title="Тип тренировки" content={item.trainingType} />
                        <DescriptionItem title="Средняя нагрузка" content={`${item.avgWeightInWeek} кг/нед`} />
                    </List.Item>
                )
                } />

            {(openCancelModal && isOpen(openCancelModal)) &&
                <ModalCancelComponent
                    data={openCancelModal}
                    openModal={isOpen(openCancelModal)}
                    setOpenCancelModal={setOpenCancelModal}
                />}
        </Space>
    )
};
