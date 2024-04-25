import { ListStatisticsOptions, weekDaysName } from '@constants/index';
import { StatisticsData } from '@pages/achievements/types/statistics.types';
import { Badge, Col, List, Row, Typography } from 'antd';

import classes from './index.module.css';


type ListStatisticsComponentProps = {
  header: string
  sortedData: StatisticsData,
  options: ListStatisticsOptions
}

export const ListStatisticsComponent: React.FC<ListStatisticsComponentProps> = ({
  header, sortedData, options
}) => {
  const isListOptionsLoad = options === ListStatisticsOptions.load

  return (
    <List
      header={header}
      itemLayout="vertical"
      className={classes.stat_list}
      split={false}
      dataSource={weekDaysName}
      renderItem={(item, index) => {
        const isValueExists = !!(sortedData[index] && sortedData[index].value);
        const { value, frequentExerciseName } = sortedData[index] || {}

        return (
          sortedData && (
            <List.Item key={item.key}>
              <Row gutter={16}>
                <Col xl={2} lg={1}>
                  {isListOptionsLoad
                    ? <Badge count={item.key}
                      className={isValueExists ? classes.exists : classes.charts_list__item}
                      color={isValueExists ? 'var(--ant-primary-6)' : 'var(--ant-primary-1)'} />
                    : <Badge count={item.key}
                      color='#FF4D4F' />}
                </Col>
                <Col lg={7} xs={10}>
                  <Typography.Text type='secondary'>{item.value}</Typography.Text>
                </Col>
                <Col span={13}>
                  {isListOptionsLoad
                    ? <Typography.Text strong={true}>
                      {isValueExists ? `${value.toFixed()}кг` : ''}
                    </Typography.Text>
                    : <Typography.Text strong={true}>
                      {isValueExists ? frequentExerciseName : ''}
                    </Typography.Text>}
                </Col>
              </Row>
            </List.Item>)
        );
      }} />
  )
}