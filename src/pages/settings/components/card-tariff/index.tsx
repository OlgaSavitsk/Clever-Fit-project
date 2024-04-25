import { useMemo } from 'react';
import { dateShortFormat } from '@constants/index';
import { TariffListResponse, UserResponse } from '@redux/user';
import { Button, Card, Grid, Space } from 'antd';
import dayjs from 'dayjs';

import { tariffContext } from './card-tariff.helper';

import 'antd/dist/antd.css';

type PanelAddTrainingProps = {
  tariffList: TariffListResponse[],
  user: UserResponse,
  setShowDrawer: (showDrawer: boolean) => void,
}

export const CardTariffComponent: React.FC<PanelAddTrainingProps> = ({
  tariffList, user, setShowDrawer
}) => {
  const { xs, sm } = Grid.useBreakpoint();

  const activTariff = useMemo(() => tariffList.find((tariff: TariffListResponse) => tariff._id === user.tariff?.tariffId), [tariffList, user])

  return (
    <Space direction={sm ? 'horizontal' : 'vertical'} size={xs ? 12 : 25}>
      {tariffContext.map(card => {
        
        const activeContent = (user.tariff ?
          <Button type='text' style={{ color: 'var(--ant-primary-10)', fontWeight: 'var(--fw-m)' }}>
            {`активен до ${dayjs(user.tariff?.expired).format(dateShortFormat)}`}
          </Button>
          : <Button data-test-id='activate-tariff-btn' type='primary'>Активировать</Button>)

        return (<Card
          data-test-id={card.dataId}
          key={card.name}
          title={card.title}
          extra={<Button
            type='link'
            onClick={() => setShowDrawer(true)}>
            Подробнее
          </Button>}
          cover={
            card.defaultTariff ? <img
              alt="tariff"
              src='../free.jpg'
            /> :
              <img
                alt="tariff"
                src={activTariff ? '../pro.jpg' : '../pro-disable.jpg'}
              />
          }
          bodyStyle={{ textAlign: 'center', boxShadow: 'var(--box-shadow' }}
        >
          {card.defaultTariff ? card.content : activeContent}
        </Card>)
      })}
    </Space>
  )
};
