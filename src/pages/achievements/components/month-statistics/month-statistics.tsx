import { useMemo } from 'react';
import { ListStatisticsOptions, weekDaysName } from '@constants/index';
import { config } from '@pages/achievements/achivevements.config';
import { Statistics } from '@pages/achievements/types/statistics.types';
import { Col, Collapse, Grid, Layout, List, Row, Space } from 'antd';

import { CardsStatisticsComponent, ChartColumnComponent, ChartPieComponent, ListStatisticsComponent } from '..';

import { ListItemComponent } from './components/list-item/list-item';
import { configPlot, expandIcon, formatWeekDateRange, splitMonthToWeek } from './helper';

import classes from './index.module.css';

type MonthStatisticsComponentProps = {
  statisticsValue: Partial<Statistics> | null
}

const weekAmount = 4

export const MonthStatisticsComponent: React.FC<MonthStatisticsComponentProps> = ({ 
  statisticsValue 
}) => {
  const { xl, lg } = Grid.useBreakpoint();
  const { sortedData } = { ...statisticsValue }

  const splitedData = useMemo(() => splitMonthToWeek(weekAmount, sortedData), [sortedData])

  const lastWeekOfSpletedData = splitedData[splitedData.length - 1]

  return (
    <Layout className={classes.statistics_layout}>
      <Space direction='vertical' className={classes.list_wrapper}>
        <div className={classes.chart_wrapper}>
          {sortedData &&
            <ChartColumnComponent
              statisticsData={sortedData}
              configProps={configPlot} />}
        </div>
        <Row>
          {splitedData.map((weekArray, indexArr) => {
            const listItemKey = weekArray[indexArr] ? weekArray[indexArr].key : indexArr

            return (
              <Col key={listItemKey} xl={6} md={24}>
                {lg ?
                  <List
                    header={formatWeekDateRange(weekArray)}
                    itemLayout="vertical"
                    className={classes.stat_list}
                    split={false}
                    dataSource={weekDaysName}
                    renderItem={(item, index) => {
                      const isValueExists = !!(weekArray[index] && weekArray[index].value);

                      return (
                        <ListItemComponent
                          count={item.key}
                          isValueExists={isValueExists}
                          weekArray={weekArray[index] || {}} />
                      )
                    }}
                  />
                  : <Collapse
                    expandIconPosition='end'
                    expandIcon={expandIcon}
                    ghost={true}
                  >
                    <Collapse.Panel header={formatWeekDateRange(weekArray)} key="1">
                      {weekDaysName.map((item, index) => {
                        const isValueExists = !!(weekArray[index] && weekArray[index].value);

                        return (
                          <ListItemComponent
                            count={item.key}
                            isValueExists={isValueExists}
                            weekArray={weekArray[index] || {}} />
                        )
                      })}
                    </Collapse.Panel>

                  </Collapse>}
              </Col>
            )
          })}
        </Row>
      </Space>

      <CardsStatisticsComponent statistics={statisticsValue} />

      <Space size={24} direction={xl ? 'horizontal' : 'vertical'} className={classes.pie_wrapper}>

        {lastWeekOfSpletedData && <ChartPieComponent statisticsData={lastWeekOfSpletedData} />}

        <ListStatisticsComponent
          header={config.listFrequentTitle}
          sortedData={lastWeekOfSpletedData}
          options={ListStatisticsOptions.exercise} />
      </Space>

    </Layout >
  )
}