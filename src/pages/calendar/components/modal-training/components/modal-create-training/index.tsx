import { Fragment } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { dateFullFormat } from '@constants/index';
import { selectTraining, TrainingResponse } from '@redux/training';
import { isArrayWithItems } from '@utils/index';
import { Button, Divider, Empty, Grid, Popover, Space, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import { ModalList } from '../modal-list';

import 'antd/dist/antd.css';
import classes from './index.module.css';

type TrainingModalProps = {
  userTraining: TrainingResponse[]
  selectDate: Dayjs | undefined,
  openTrainingModal: boolean,
  setOpenSelectModal: (openSelectModal: boolean) => void,
  setOpenTrainingModal: (openTrainingModal: boolean) => void,
  setEditTraining: (editTraining: TrainingResponse) => void,
  setShowDrawer: (showDrawer: boolean) => void,
}

export const CreateTrainingModal: React.FC<TrainingModalProps> = ({
  userTraining,
  selectDate,
  openTrainingModal,
  setOpenSelectModal,
  setOpenTrainingModal,
  setEditTraining,
}) => {
  const { trainingsList } = selectTraining()
  const { xs } = Grid.useBreakpoint();

  const onClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setOpenTrainingModal(false)
  }

  return (
    <Space >
      <Popover
        placement={xs ? 'bottom' : 'bottomLeft'}
        open={openTrainingModal}
        overlayClassName={classes.overlay}
        title={
          <Space direction='horizontal' align='start' size={30}
            style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Space direction='vertical' align='start' size={0}>
              <Typography.Text strong={true}>
                Тренировки на {selectDate && selectDate.add(0, 'month').format(dateFullFormat)}
              </Typography.Text>
            </Space>
            <CloseOutlined
              data-test-id='modal-create-training-button-close'
              onClick={onClose}
            />
          </Space>
        }
        content={
          <div data-test-id='modal-create-training'>
            {isArrayWithItems(userTraining) ?
              <ModalList
                userTraining={userTraining}
                setOpenSelectModal={setOpenSelectModal}
                setOpenTrainingModal={setOpenTrainingModal}
                setEditTraining={setEditTraining} />
              :
              <Fragment>
                <Typography.Text type="secondary" style={{ fontWeight: 'var(--fw-l)' }}>
                  Нет активных тренировок
                </Typography.Text>
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{
                    height: 32,
                    marginTop: 'calc(6 * var(--margin-space))'
                  }}
                  description={null}
                />
              </Fragment>
            }
            <Divider style={{ marginTop: 'calc(3 * var(--margin-space))' }} />
            <Button
              type='primary'
              size='large'
              block={true}
              disabled={
                userTraining?.length === trainingsList.length || selectDate?.isBefore(dayjs())}
              onClick={() => {
                setOpenTrainingModal(false)
                setOpenSelectModal(true)
              }}
            >Создать тренировку
            </Button>
          </div>}
        className={isArrayWithItems(userTraining) ? `${classes.modal_training} ${classes.training_exist}` : classes.modal_training}
      />
    </Space>
  )
};
