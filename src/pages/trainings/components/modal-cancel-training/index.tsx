import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { CheckCircleTwoTone, CloseOutlined } from '@ant-design/icons';
import { InviteStatus } from '@constants/trainings.constant';
import { palsActions, TrainingPalsResponse } from '@redux/pals';
import { Avatar, Badge, Button, Col, List, Modal, Row, Space } from 'antd';

import { DescriptionItem } from '../invite-list/helper';

import 'antd/dist/antd.css';
import classes from './index.module.css';

type ModalCancelComponentProps = {
    data: TrainingPalsResponse
    openModal: boolean;
    setOpenCancelModal: (openModal: null) => void
}

export const ModalCancelComponent: React.FC<ModalCancelComponentProps> = ({
    data, openModal, setOpenCancelModal
}) => {
    const dispatch = useDispatch()

    const handleCancelInvite = useCallback((id: string) => {
        dispatch(palsActions.cancelInviteRequest({ id, status: InviteStatus.rejected }))
        setOpenCancelModal(null)
    }, [dispatch, setOpenCancelModal])

    const handleCancel = () => {
        setOpenCancelModal(null)
    };

    return (

        <Modal
            data-test-id='partner-modal'
            open={openModal}
            centered={true}
            footer={null}
            closable={true}
            closeIcon={<CloseOutlined onClick={handleCancel} />}
            maskStyle={{
                backdropFilter: 'blur(4px)',
                background: 'var(--mask-modal-bg)'
            }}
        >
            <Row gutter={[0, 24]}>
                <Col span={12}>
                    <List.Item.Meta
                        avatar={
                            <Avatar src={data.imageSrc} />
                        }
                        title={data.name}
                        className={classes.modal_meta}
                    />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Тип тренировки" content={data.trainingType} />
                    <DescriptionItem title="Средняя нагрузка" content={`${data.avgWeightInWeek} кг/нед`} />
                </Col>

                <Col span={12}>
                    <Space>тренировка одобрена
                        <Badge count={
                            <CheckCircleTwoTone
                                twoToneColor={['var(--ant-form-background', 'var(--tariff)']} />} />
                    </Space>
                </Col>
                <Col span={12}>
                    <Button
                        data-test-id='create-new-training-button'
                        size='middle'
                        onClick={() => handleCancelInvite(data.inviteId)}
                    >
                        Отменить тренировку
                    </Button>
                </Col>
            </Row>
        </Modal>
    )
};
