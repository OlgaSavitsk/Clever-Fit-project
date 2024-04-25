import { Outlet } from 'react-router-dom';
import { RoutePath } from '@constants/routes.constants';
import { selectLocationPath } from '@redux/auth';
import { Grid,Layout, Space } from 'antd';

import 'antd/dist/antd.css';
import classes from './index.module.css';

const { useBreakpoint } = Grid;

export const UnauthorizedLayout: React.FC = () => {
    const locationPathname = selectLocationPath()
    const { xs } = useBreakpoint();

    return (
        <Layout className={classes.page_layout}>
            <div className={classes.page_wrapper}>
                <Space
                    direction="vertical"
                    align="center"
                    size={xs ? 32 : 48}
                    style={{
                        padding: locationPathname === RoutePath.ConfirmEmail ?
                            '64px 32px' : '64px 85.5px'
                    }}
                    className={classes.form_layout}
                >
                    <Outlet />
                </Space>
            </div>
        </Layout >
    );
};