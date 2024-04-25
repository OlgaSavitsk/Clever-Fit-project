import { ReactNode } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ButtonSettings } from '@components/index';
import { history } from '@redux/configure-store';
import { Button, Typography } from 'antd';

import { RoutePath } from './routes.constants';

export const breadcrumbNameMap: Record<string, string> = {
    [RoutePath.Feedbacks]: 'Отзывы пользователей',
    [RoutePath.Calendar]: 'Календарь',
    [RoutePath.Trainings]: 'Тренировки',
    [RoutePath.Achievements]: 'Достижения',
};

type RoutesTitle = {
    [key in RoutePath]?: {
        title?: ReactNode;
        extra?: ReactNode | null
        breadcrumb?: boolean
    };
};


export const headerTitle: RoutesTitle = {
    [RoutePath.Home]: {
        title: <Typography.Title>
            Приветствуем тебя в CleverFit — приложении,<br /> которое поможет тебе добиться своей мечты!
        </Typography.Title>,
        extra:
            <ButtonSettings />,
        breadcrumb: true
    },
    [RoutePath.Profile]: {
        title: <Typography.Title level={4}>Профиль</Typography.Title>,
        extra:
            <ButtonSettings />,
        breadcrumb: false
    },
    [RoutePath.Settings]: {
        title: <Button
            data-test-id='settings-back'
            type='text'
            onClick={() => history.back()}
            icon={<ArrowLeftOutlined />}
            style={{ fontSize: 'calc(var(--fs-base) * 1.25)', fontWeight: 'var(--fw-m' }}
        >
            Настройки
        </Button >,
        extra: null,
        breadcrumb: false
    },
    [RoutePath.Feedbacks]: {
        extra: null,
        breadcrumb: true
    },
    [RoutePath.Trainings]: {
        extra:
            <ButtonSettings />,
        breadcrumb: true
    },
    [RoutePath.Calendar]: {
        extra:
            <ButtonSettings />,
        breadcrumb: true
    },
    [RoutePath.Achievements]: {
        extra:
            <ButtonSettings />,
        breadcrumb: true
    },
};
