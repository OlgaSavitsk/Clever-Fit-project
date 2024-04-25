import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { tabItems } from '@constants/index';
import { history } from '@redux/configure-store';
import { Grid, Tabs } from 'antd';
import { To } from 'history';

import 'antd/dist/antd.css';
import classes from './index.module.css';

const { useBreakpoint } = Grid;

export const TabsComponent: React.FC = () => {
    const { pathname } = useLocation()
    const { xs } = useBreakpoint();

    const onChange = useCallback((key: To) => {
        if (key !== pathname) {
            history.push(key)
        }
    }, [pathname]);

    return (
        <Tabs
            onChange={onChange}
            items={tabItems}
            activeKey={pathname}
            size={xs ? 'small' : 'middle'} 
            className={classes.tabs}/>
    );
};
