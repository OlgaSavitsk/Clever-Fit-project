import { Pie, PieConfig } from '@ant-design/plots';
import { StatisticsData } from '@pages/achievements/types/statistics.types';
import { Grid } from 'antd';

import classes from './index.module.css';

type ChartPieComponentProps = {
    statisticsData?: StatisticsData;
};

export const ChartPieComponent: React.FC<ChartPieComponentProps> = ({ statisticsData }) => {
    const { xs } = Grid.useBreakpoint();

    const config: PieConfig = {
        data: statisticsData,
        angleField: 'frequentExercisePercent',
        colorField: 'frequentExerciseName',
        innerRadius: 0.6,
        label: {
            connector: false,
            lineWidth: 0,
            text: 'frequentExerciseName',
            position: 'outside',
            tick: false,
            fontSize: 14,
        },
        legend: false,
        width: xs ? 328 : 520,
        height: 250,
        autoFit: false,
    }

    return (
        <div className={classes.chart_wrapper}>
            <Pie {...config} />
        </div>
    )
};
