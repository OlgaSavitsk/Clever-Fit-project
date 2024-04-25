import { ListStatisticsOptions } from '@constants/index';
import { config } from '@pages/achievements/achivevements.config';
import { Statistics } from '@pages/achievements/types/statistics.types';
import { Grid, Layout, Space } from 'antd';

import { CardsStatisticsComponent, ChartColumnComponent, ChartPieComponent, ListStatisticsComponent } from '..';

import classes from './index.module.css';

type WeekStatisticsComponentProps = {
  statisticsValue: Partial<Statistics> | null
}

export const WeekStatisticsComponent: React.FC<WeekStatisticsComponentProps> = ({ statisticsValue }) => {
  const { xl } = Grid.useBreakpoint();
  const { statisticsData, sortedData } = { ...statisticsValue }

  return (
    <Layout className={classes.statistics_layout} >
      <Space direction={xl ? 'horizontal' : 'vertical'} className={classes.list_wrapper}>
        <div className={classes.chart_wrapper}>
          {sortedData && <ChartColumnComponent statisticsData={sortedData} />}
        </div>
        {sortedData && <ListStatisticsComponent
          header={config.listLoadTitle}
          sortedData={sortedData}
          options={ListStatisticsOptions.load} />}

      </Space>

      <CardsStatisticsComponent statistics={statisticsValue} />

      <Space size={24} direction={xl ? 'horizontal' : 'vertical'} className={classes.list_wrapper}>

        {statisticsData && <ChartPieComponent statisticsData={sortedData} />}

        {sortedData && <ListStatisticsComponent
          header={config.listFrequentTitle}
          sortedData={sortedData}
          options={ListStatisticsOptions.exercise} />}
      </Space>

    </Layout >
  )
}