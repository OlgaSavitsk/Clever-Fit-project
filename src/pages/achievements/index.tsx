import { Fragment, useCallback, useLayoutEffect, useMemo } from 'react';
import { ModalErrorComponent } from '@components/modal-error';
import {
    filterTagAll,
    layoutConfiguration,
    LayoutStatisticsTabsType,
    TabsKey,
    tabsStatisticsItems,
} from '@constants/index';
import { useFilterStatisticsData } from '@hooks/index';
import { selectError } from '@redux/error';
import { selectTraining } from '@redux/training';
import { Grid, Layout, Space, Tabs, Tag } from 'antd';

import { config } from './achivevements.config';
import { EmptyTrainingComponent, MonthStatisticsComponent, WeekStatisticsComponent } from './components';

import classes from './index.module.css';

const layoutComponent = {
    [LayoutStatisticsTabsType.WEEK]: WeekStatisticsComponent,
    [LayoutStatisticsTabsType.Month]: MonthStatisticsComponent
}

export const AchievementsPage: React.FC = () => {
    const { trainings, trainingsList } = selectTraining()
    const { statusCode } = selectError()
    const { statistics, filter, setFilter } = useFilterStatisticsData(trainings)
    const { lg } = Grid.useBreakpoint();
   
    const { layoutToStatistics } = layoutConfiguration[filter.period as TabsKey] || {}
    const LayoutComponent = layoutToStatistics ? layoutComponent[layoutToStatistics] : Fragment

    const selectTrainingList = useMemo(() => [filterTagAll, ...trainingsList], [trainingsList])

    const onChangeTrainingTabs = useCallback((tag: string) => {
        setFilter((prev) => ({ ...prev, trainingType: tag }));
    }, [setFilter])

    const onChangePeriodTabs = useCallback((key: string) => {
        setFilter((prev) => ({ ...prev, period: key }))
    }, [setFilter]);

    useLayoutEffect(() => {
        if (statusCode) {
            ModalErrorComponent({ statusCode })
        }
    }, [statusCode])

    return (
        <Layout className={classes.training_layout}>
            <Tabs
                onChange={onChangePeriodTabs}
                items={tabsStatisticsItems}
                defaultActiveKey={TabsKey.WeekStatistics}
                className={classes.trainings_tabs}
                tabPosition='top'
            />

            <Space size={lg ? 24 : 8} align='start' direction='horizontal'>
                <span className={classes.tag_label}>{config.labelTabs}</span>

                <Space size={[4, 8]} direction='horizontal' wrap={true}>
                    {selectTrainingList.map(({ key, name }) => (
                        <Tag.CheckableTag
                            key={key}
                            checked={!!filter.trainingType}
                            onChange={() => onChangeTrainingTabs(name)}
                            className={classes.statistics_tag}
                        >
                            <Tag
                                color={filter.trainingType === name ? 'blue' : 'default'}>
                                {name}
                            </Tag>
                        </Tag.CheckableTag>
                    ))}
                </Space>

            </Space>

            {statistics
                ? <LayoutComponent
                    statisticsValue={statistics}
                />
                : <EmptyTrainingComponent />}
        </Layout >
    )
}