import { ArrowLeftOutlined } from '@ant-design/icons';
import { DrawerMode } from '@constants/trainings.constant';
import { setColor } from '@pages/calendar/calendar.helper';
import { OpenDrawerOptions } from '@pages/trainings';
import { Exercises, TrainingResponse } from '@redux/training';
import { Button, Divider, Grid, Popover, Space, Typography } from 'antd';

import 'antd/dist/antd.css';
import classes from './index.module.css';

type CreateTrainingModalProps = {
  openTrainingModal: boolean
  data: TrainingResponse;
  setOpenTrainingModal: (openTrainingModal: string | undefined) => void,
  handleOpenDrawer: (options: OpenDrawerOptions) => void
}

export const TrainingModal: React.FC<CreateTrainingModalProps> = ({
  openTrainingModal,
  data,
  setOpenTrainingModal,
  handleOpenDrawer
}) => {
  const { xs } = Grid.useBreakpoint();

  return (
    <Popover
      placement={xs ? 'bottom' : 'bottomLeft'}
      open={openTrainingModal}
      overlayClassName={classes.overlay}
      title={
        <Space>
          <ArrowLeftOutlined
            data-test-id='modal-exercise-training-button-close'
            onClick={() => {
              setOpenTrainingModal(undefined);
            }} />
          <Typography.Text>{data.name}</Typography.Text>
        </Space>
      }
      content={
        <div className={classes.popover_content} data-test-id='modal-create-exercise'>

          <Divider style={{ border: `1px solid ${setColor(data.name)}` }} />

          <ul className={classes.events}>
            {data && data.exercises.map((item: Exercises | TrainingResponse) => (
              <li key={item.name}
                style={{ display: 'flex', justifyContent: 'space-between' }}>

                <Typography.Text type='secondary'>{item.name}</Typography.Text>
              </li>
            )
            )}
          </ul>
          
          <Divider style={{ marginTop: 'calc(3 * var(--margin-space))' }} />

          <Button
            size={xs ? 'middle' : 'large'}
            block={true}
            onClick={() => handleOpenDrawer({ mode: DrawerMode.edit, record: data, isOpen: true })}
          >
            Добавить упражнения
          </Button>
        </div>
      }
      className={classes.modal_training}
    />
  )
};
