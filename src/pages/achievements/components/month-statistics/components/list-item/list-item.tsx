import { dateFullFormat } from '@constants/index';
import { AverageStatisticsData } from '@pages/achievements/types/statistics.types';
import { Badge, Col, List, Row, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import classes from './index.module.css';

type ListItemComponentProps = {
    count: number,
    isValueExists: boolean,
    weekArray: AverageStatisticsData & { date: Dayjs }
}

export const ListItemComponent: React.FC<ListItemComponentProps> = ({ count, isValueExists, weekArray }) => {
    const { date, value, key } = weekArray

    return (
        <List.Item key={key}>
            <Row gutter={16}>
                <Col xl={3} lg={1}>
                    <Badge count={count}
                        className={isValueExists ? classes.exists : classes.charts_list__item}
                        color={isValueExists ? 'var(--ant-primary-6)' : 'var(--ant-primary-1)'} />

                </Col>
                <Col lg={8} xs={5}>
                    <Typography.Text type='secondary'>
                        {dayjs(date).format(dateFullFormat)}
                    </Typography.Text>
                </Col>
                <Col lg={10} xs={17}>
                    <Typography.Text strong={true}>
                        {isValueExists ? `${value} кг` : ''}
                    </Typography.Text>
                </Col>
            </Row>
        </List.Item>

    )
}