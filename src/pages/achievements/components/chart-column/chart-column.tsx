import { Column, ColumnConfig } from '@ant-design/plots';
import { dateShortFormat } from '@constants/index';
import { StatisticsData } from '@pages/achievements/types/statistics.types';
import { Grid } from 'antd';
import { Dayjs } from 'dayjs';

type ChartColumnComponentProps = {
    statisticsData: StatisticsData;
    configProps?: ColumnConfig
};

export const ChartColumnComponent: React.FC<ChartColumnComponentProps> = ({ statisticsData, configProps }) => {
    const { xs } = Grid.useBreakpoint();

    const config: ColumnConfig = {
        ...configProps,
        data: statisticsData,
        yField: 'value',
        xField: 'date',
        sort: true,
        tooltip: false,
        axis: {
            x: {
                title: 'Нагрузка, кг',
                tick: false,
                titleFontSize: 14,
                labelFontSize: xs ? 8 : 12,
                labelFormatter: (datum: Dayjs) => `${datum.format(dateShortFormat)}`,
                labelAutoRotate: false
            },
            y: {
                tick: false,
                labelFontSize: xs ? 8 : 12,
                labelFormatter: (datum: number) => `${datum} кг`,
            },
        },
        style: {
            fill: '#85A5FF',
        },
    };

    return (
        <Column {...config} />
    )
};
