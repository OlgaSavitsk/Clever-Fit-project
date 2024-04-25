import { Fragment } from 'react';
import { Badge, Space, TabsProps } from 'antd';

export enum TabsKey {
    Trainings = 'trainings',
    Pairs = 'pairs',
    Marathons = 'marathons',
    WeekStatistics = '7',
    MonthStatistics = '28',
    ProStatistics = 'pro'
}

interface MenuItemProps {
    messageCount: number;
}

export const tabsTrainingsItems = ({ messageCount }: MenuItemProps) => ([
    { label: 'Мои тренировки', key: TabsKey.Trainings },
    { label: <Space>Совместные тренировки<Badge count={messageCount ?? 0} /></Space>, key: TabsKey.Pairs },
    { label: 'Марафоны', key: TabsKey.Marathons },
]);

export const tabsStatisticsItems: TabsProps['items'] = [
    { label: 'За неделю', key: TabsKey.WeekStatistics },
    { label: 'За месяц', key: TabsKey.MonthStatistics },
    { label: 'За всё время (PRO)', key: TabsKey.ProStatistics, disabled: true, },
];

export const palsCardTitle = {
    title: <Fragment>Хочешь тренироваться с тем, кто разделяет твои цели и темп?<br /> Можешь найти&nbsp;друга для совместных тренировок среди других пользователей.</Fragment>,
    description: 'Можешь воспользоваться случайным выбором или выбрать друга с похожим на твой уровень и вид тренировки, и мы найдем тебе идеального спортивного друга.'
}

export enum LayoutTrainingsTabsType {
    TRAINING = 'trainings',
    PAIRS = 'pairs',
    MARATHONS = 'marathons',
}

export enum LayoutStatisticsTabsType {
    WEEK = 'week',
    Month = 'month',
}

type LayoutConfiguration = {
    [key in TabsKey]: {
        layoutToTrainings?: LayoutTrainingsTabsType;
        layoutToStatistics?: LayoutStatisticsTabsType;
    };
};

export const layoutConfiguration: Partial<LayoutConfiguration> = {
    [TabsKey.Trainings]: {
        layoutToTrainings: LayoutTrainingsTabsType.TRAINING,
    },
    [TabsKey.Pairs]: {
        layoutToTrainings: LayoutTrainingsTabsType.PAIRS,
    },
    [TabsKey.Marathons]: {
        layoutToTrainings: LayoutTrainingsTabsType.MARATHONS,
    },
    [TabsKey.WeekStatistics]: {
        layoutToStatistics: LayoutStatisticsTabsType.WEEK,
    },
    [TabsKey.MonthStatistics]: {
        layoutToStatistics: LayoutStatisticsTabsType.Month,
    },
};