import { Link } from 'react-router-dom';
import { menuItems,RoutePath } from '@constants/index';
import { useHandleRequestTrainings } from '@hooks/index';
import { history } from '@redux/configure-store';
import { selectPals } from '@redux/pals';
import { Grid, Image, Layout, Menu } from 'antd';

import 'antd/dist/antd.css';
import classes from './index.module.css';

const { Sider } = Layout;
const { useBreakpoint } = Grid;

type SiderProps = {
  collapsed: boolean,
  getCollapted: (collapsed: boolean) => void
}

export const SiderComponent: React.FC<SiderProps> = ({ collapsed, getCollapted }: SiderProps) => {
  const { handleRequest } = useHandleRequestTrainings()
  const { invites } = selectPals()
  const { xs } = useBreakpoint();

  const imgSize = xs ? 72 : 133

  const handleClick = (key: string) => {
    history.push(key)
    getCollapted(collapsed)
  }

  return (
    <Sider
      theme='light'
      collapsedWidth={xs ? 0 : 64}
      width={xs ? 106 : 208}
      trigger={null}
      collapsible={true}
      collapsed={collapsed}
      className={classes.sider}
      style={{
        position: xs ? 'fixed' : 'sticky',
        top: 0,
      }}
    >
      <div className={collapsed ? classes.collapsed : classes.logo}>
        <Link to={RoutePath.Home}>
          <Image
            src={collapsed ? '../fit.svg' : '../logo.svg'}
            preview={false}
            width={collapsed ? 28 : imgSize}
            alt='logo'
          />
        </Link>
      </div>

      <Menu
        theme='light'
        mode='inline'
        onClick={({ key }) => handleClick(key)}
        items={menuItems({ messageCount: invites.length, handleRequest })}
        className={classes.menu}
      />
    </Sider>
  );
};
