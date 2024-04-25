import { Fragment, useMemo } from 'react';
import { config } from '@pages/achievements/achivevements.config';
import { Statistics } from '@pages/achievements/types/statistics.types';
import { Card, Col, Grid, Row, Space, Typography } from 'antd';

import { cardsWithStatisticsContext } from '../list-statistics/helper';

import classes from './index.module.css';


type ListStatisticsComponentProps = {
  statistics: Partial<Statistics> | null
}

export const CardsStatisticsComponent: React.FC<ListStatisticsComponentProps> = ({ statistics }) => {
  const { lg, xs } = Grid.useBreakpoint();
  const { totalData, frequent } = { ...statistics }

  const cardsWithStatPerDay = useMemo(() =>
    cardsWithStatisticsContext(config.cardsWithStatPerDay, totalData)
    , [totalData])

  const cardsWithFrequent = useMemo(() =>
    cardsWithStatisticsContext(config.cardsWithFrequentData, frequent)
    , [frequent])

  return (
    <Fragment>
      <Space direction={xs ? 'vertical' : 'horizontal'}
        size={lg ? 24 : 16}
        wrap={true}
        className={classes.statistics}>
        {cardsWithStatPerDay.map(({ context, value, index }) => (
          <Card
            key={index}
            className={classes.card_total}
          >
            <Card.Meta
              title={
                <Typography.Title level={1} style={{ wordBreak: 'keep-all' }}>
                  {value}
                </Typography.Title>}
              description={context}
            />
          </Card>
        ))}
      </Space>
      <Space direction='vertical' className={classes.statistics} size={16}>
        {cardsWithFrequent.map(({ context, value, index }) => (
          value && <Row key={index}>
            <Col lg={3} md={5} xs={8}>
              <Typography.Text type='secondary'>{context}</Typography.Text>
            </Col>
            <Col xs={{ span: 12, offset: 3 }} lg={{ span: 12, offset: 2 }}>
              <Typography.Title level={3}>
                {typeof value === 'string' ? value.toLowerCase() : value}
              </Typography.Title>
            </Col>
          </Row>
        ))}
      </Space>
    </Fragment>
  )
}