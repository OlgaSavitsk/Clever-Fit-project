import { Fragment, useState } from 'react';
import { DownOutlined, EditTwoTone } from '@ant-design/icons';
import { DrawerMode } from '@constants/index';
import { setColor } from '@pages/calendar/calendar.helper';
import { OpenDrawerOptions } from '@pages/trainings';
import { TrainingResponse } from '@redux/training';
import { transformPeriod } from '@utils/index';
import { Badge, Button, Grid, Space, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { TrainingModal } from '../modal-tarining';

import 'antd/dist/antd.css';
import classes from './index.module.css';

export type TableComponentProps = {
  trainings: TrainingResponse[],
  setOpenDrawer: (options: OpenDrawerOptions) => void
}

export const TableComponent: React.FC<TableComponentProps> = ({
  trainings,
  setOpenDrawer
}: TableComponentProps) => {
  const { xs } = Grid.useBreakpoint();
  const [openTrainingModal, setOpenTrainingModal] = useState<string | undefined>(undefined);

  const isOpen = (record: TrainingResponse) => record._id === openTrainingModal;

  const columns: ColumnsType<TrainingResponse> = [
    {
      title: 'Тип тренировки',
      dataIndex: 'type',
      key: 'type',
      colSpan: 2,
      align: 'left',
      render: (_, item: TrainingResponse) => (
        <Badge color={setColor(item.name)} />
      )
    },
    {
      dataIndex: 'name',
      key: 'name',
      colSpan: 0,
      width: xs ? 116 : 240,
      render: (_, item: TrainingResponse) => {
        const opened = isOpen(item);

        return (
          <Fragment>
            <Space
              style={{ width: '100%', justifyContent: 'space-between' }}
              onClick={() => setOpenTrainingModal(item._id)}>
              <Typography.Text>
                {item.name}
              </Typography.Text>
              <DownOutlined style={{ fontSize: 10 }} />
            </Space>

            {openTrainingModal &&
              <TrainingModal
                openTrainingModal={opened}
                data={item}
                setOpenTrainingModal={setOpenTrainingModal}
                handleOpenDrawer={setOpenDrawer} />}
          </Fragment>
        )
      },
    },
    {
      title:
        <Space.Compact direction="horizontal" block={true} style={{ justifyContent: 'space-between' }}>
          <Typography.Text>Периодичность</Typography.Text>
          <DownOutlined />
        </Space.Compact>,
      dataIndex: 'period',
      key: 'period',
      colSpan: xs ? 2 : 1,
      width: xs ? 188 : 240,
      sorter: (a, b) => Number(a.parameters.period) - Number(b.parameters.period),
      render: (_, record: TrainingResponse) => (
        <span>
          {transformPeriod(record.parameters.period)}
        </span>
      ),
    },
    {
      key: 'edit',
      dataIndex: 'edit',
      align: xs ? 'right' : 'center',
      colSpan: xs ? 0 : 1,
      render: (_, record: TrainingResponse, index: number) => (
        <Button
          data-test-id={`update-my-training-table-icon${index}`}
          type='text'
          size='small'
          disabled={record.isImplementation}
          icon={< EditTwoTone style={{ fontSize: 25 }}
            twoToneColor={
              record.isImplementation
                ? ['var(--ant-text)', 'var(--ant-text)']
                : undefined
            }
          />}
          onClick={() => setOpenDrawer({
            mode: DrawerMode.edit, record, isOpen: true
          })}
        />)
    }
  ];

  return (
    <Table
      data-test-id='my-trainings-table'
      dataSource={trainings}
      columns={columns}
      pagination={{ position: ['bottomLeft'] }}
      size='small'
      className={classes.table} />
  )
};
