import { SettingOutlined } from '@ant-design/icons';
import { RoutePath } from '@constants/routes.constants';
import { history } from '@redux/configure-store';
import { Button } from 'antd'

export const ButtonSettings: React.FC = () => (
    <Button
        data-test-id='header-settings'
        type="link"
        size='small'
        onClick={() => history.push(RoutePath.Settings)} icon={<SettingOutlined />}>
        Настройки
    </Button>
);