import { useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { dateFullFormat } from '@constants/trainings.constant';
import { setColor } from '@pages/calendar/calendar.helper';
import { Exercises, TrainingResponse } from '@redux/training';
import { transformPeriod } from '@utils/index';
import { Badge, Popover, Space, Typography } from 'antd';
import dayjs from 'dayjs';

import 'antd/dist/antd.css';
import classes from './index.module.css';

const spaceStyle: React.CSSProperties = { justifyContent: 'space-between', width: '100%' }

type TrainingDetailsComponentProps = {
  data: TrainingResponse;
  openDetails: boolean
  setOpenDetails: (openDetails: string | undefined) => void,
}

export const TrainingDetailsComponent: React.FC<TrainingDetailsComponentProps> = ({
  data,
  openDetails,
  setOpenDetails,
}) => {

  useEffect(() => {
    document.querySelector('[role="tooltip"]')?.setAttribute(
      'data-test-id', 'joint-training-review-card'
    )
  }, [])

  return (
    <Popover
      placement='bottomLeft'
      open={openDetails}
      overlayClassName={classes.overlay}
      zIndex={0}
      title={
        <Space style={spaceStyle}>
          <Badge color={setColor(data.name)}
            text={data.name} style={{
              color: 'var(--ant-text)'
            }} />
          <CloseOutlined
            onClick={() => setOpenDetails(undefined)} />
        </Space>
      }
      content={
        <div className={classes.popover_content}>

          <Space direction='horizontal' style={spaceStyle}>
            <Typography.Text strong={true}>
              {transformPeriod(data.parameters.period)}
            </Typography.Text>
            <Typography.Text>
              {dayjs(data.date).format(dateFullFormat)}
            </Typography.Text>
          </Space>

          <ul className={classes.events}>

            {data.exercises.map((item: Exercises) => (
              <li key={item.name}
                style={{ display: 'flex', justifyContent: 'space-between' }}>

                <Space direction='horizontal' style={spaceStyle}>
                  <Typography.Text type='secondary'>{item.name}</Typography.Text>
                  <Typography.Text style={{
                    fontSize: 'var(--fs-sm)',
                    color: 'var(--ant-primary-6)'
                  }}>{`(${item.approaches}) x (${`${item.weight}кг` ?? item.replays})`}</Typography.Text>
                </Space>
              </li>
            ))}

          </ul>
        </div>
      }
      className={classes.modal_pals}
    />
  )
}