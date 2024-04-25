import { RoutePath } from '@constants/index';
import { history } from '@redux/configure-store';
import { Button, Result } from 'antd';

import 'antd/dist/antd.css';

export const ErrorPage: React.FC = () => {
    const handleClick = () => {
        history.push(RoutePath.Home)
    }

    return (
        <Result
            status="404"
            title="Такой страницы нет"
            subTitle="Извините, страница не найдена, возможно, она была удалена или перемещена."
            extra={<Button type="primary" onClick={handleClick}>На главную</Button>}
        />
    );
}