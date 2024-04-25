import { PlusOutlined } from '@ant-design/icons';
import { DrawerMode } from '@constants/index';
import { TrainingResponse } from '@redux/training';
import { isArrayWithItems } from '@utils/index';
import { Button, Grid, Space, Typography } from 'antd';

import { TableComponent } from './components';
import { OpenDrawerOptions } from '.';

import 'antd/dist/antd.css';
import classes from './index.module.css';

type TrainingsComponentProps = {
  trainings: TrainingResponse[],
  setOpenDrawer: (options: OpenDrawerOptions | null) => void
}

export const TrainingsComponent: React.FC<TrainingsComponentProps> = ({
  trainings,
  setOpenDrawer,
}) => {
  const { xs } = Grid.useBreakpoint();

  return (
    isArrayWithItems(trainings) ?
      <Space direction='vertical' size={xs ? 20 : 54}>

        <TableComponent trainings={trainings} setOpenDrawer={setOpenDrawer} />

        <Button
          data-test-id='create-new-training-button'
          type='primary' size='large' block={xs} icon={<PlusOutlined />}
          style={{ zIndex: 1 }}
          onClick={() => setOpenDrawer({ mode: DrawerMode.create, isOpen: true })}>
          Новая тренировка
        </Button>
      </Space>
      :
      <Space direction='vertical' size={75} align='center' className={classes.empty}>
        <Typography.Title level={3}>У вас ещё нет созданных тренировок</Typography.Title>
        <Button
          data-test-id='create-new-training-button'
          type='primary'
          size='large'
          block={xs}
          onClick={() => setOpenDrawer({ mode: DrawerMode.create, isOpen: true })}>
          Создать тренировку
        </Button>
      </Space>
  )
};