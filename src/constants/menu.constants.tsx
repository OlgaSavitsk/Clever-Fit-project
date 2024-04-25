import Icon, { CalendarTwoTone, HeartFilled, IdcardOutlined, TrophyFilled } from '@ant-design/icons';
import { IconExit } from '@components/index';
import { Badge, MenuProps } from 'antd';

import { RoutePath } from './routes.constants';
import { LocalStorageKey } from './storage.constants';

import 'antd/dist/antd.css';

type MenuItem = Required<MenuProps>['items'][number] & {
    path?: string;
    type?: string;
};

interface MenuItemProps {
    messageCount: number;
    handleRequest: (path: string) => void
}

export const menuItems = ({ messageCount, handleRequest }: MenuItemProps): MenuItem[] => (
    [{
        key: RoutePath.Calendar,
        label: 'Календарь',
        icon: <CalendarTwoTone
            twoToneColor={['var(--ant-primary-9)', 'var(--ant-primary-9)']} />,
        onClick: () => handleRequest(RoutePath.Calendar)
    },
    {
        key: RoutePath.Trainings,
        label: 'Тренировки',
        icon: <Badge
            data-test-id='notification-about-joint-training'
            count={messageCount}
            size='small'><HeartFilled />
        </Badge>,
        onClick: () => handleRequest(RoutePath.Trainings)
    },
    {
        key: RoutePath.Achievements,
        label: <span data-test-id='sidebar-achievements'>Достижения</span>,
        icon: <TrophyFilled />,
        onClick: () => handleRequest(RoutePath.Achievements)
    },
    {
        key: RoutePath.Profile,
        label: 'Профиль',
        icon: <IdcardOutlined />
    },
    { key: '5', label: 'Выход', icon: <IdcardOutlined />, type: 'divider' },
    {
        key: RoutePath.SignIn, label: 'Выход', icon: <Icon component={IconExit} />,
        onClick: () => window.localStorage.removeItem(LocalStorageKey.authToken)
    },
    ]);
