import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Grid, Layout } from 'antd';

import { FooterComponent, HeaderComponent, SiderComponent } from './components';

import 'antd/dist/antd.css';
import classes from './index.module.css';

const { Content } = Layout;
const { useBreakpoint } = Grid;

export function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const { xs } = useBreakpoint();

    return (
        <Layout>
            <SiderComponent collapsed={xs ? !collapsed : collapsed} getCollapted={setCollapsed}/>
            <Layout className={classes.site_layout}>
                <HeaderComponent collapsed={collapsed} getCollapted={setCollapsed} />
                <Content
                    className={classes.layout_background}>

                    <Outlet />

                </Content>
                <FooterComponent />
            </Layout>
        </Layout >
    );
}