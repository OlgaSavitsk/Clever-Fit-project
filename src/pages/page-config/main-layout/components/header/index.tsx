import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined } from '@ant-design/icons';
import { breadcrumbNameMap, headerTitle } from '@constants/index';
import { RoutePath } from '@constants/routes.constants';
import { selectLocationPath } from '@redux/auth';
import { history } from '@redux/configure-store';
import { Breadcrumb, Button, Grid, PageHeader } from 'antd';

import 'antd/dist/antd.css';
import classes from './index.module.css';

const { useBreakpoint } = Grid;

type HeaderProps = {
  collapsed: boolean,
  getCollapted: (collapsed: boolean) => void
}

export const HeaderComponent: React.FC<HeaderProps> = ({ getCollapted, collapsed }: HeaderProps) => {
  const locationPathname = selectLocationPath();
  const location = useLocation()
  const { md, xs } = useBreakpoint();

  const { title, extra, breadcrumb } = headerTitle[locationPathname as RoutePath] || {}

  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    breadcrumb && <Breadcrumb.Item key="home">
      <Link to="/main">Главная</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return (
    <PageHeader
      breadcrumb={
        <Breadcrumb>{breadcrumbItems}</ Breadcrumb>
      }
      ghost={false}
      className={classes.header}
      title={title}
      extra={[md ? extra : <Button key={2} type='text' icon={<SettingOutlined data-test-id='header-settings' onClick={() => history.push(RoutePath.Settings)} />} />]}
    >
      {xs ? <Button key={1} data-test-id='sider-switch-mobile' className={classes.button_trigger__mobile}
        style={{ left: xs ? 0 : 'auto', transform: xs && collapsed ? 'translateX(104px)' : 'none' }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: classes.trigger,
          onClick: () => {
            getCollapted(!collapsed)
          },
        })}
      </Button> :
        <Button key={2} data-test-id='sider-switch' className={classes.button_trigger}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: classes.trigger,
            onClick: () => {
              getCollapted(!collapsed)
            },
          })}
        </Button>}
    </PageHeader>
  );
};
