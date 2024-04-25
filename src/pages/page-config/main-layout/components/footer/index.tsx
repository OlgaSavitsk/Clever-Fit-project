import { Fragment } from 'react';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { RoutePath } from '@constants/routes.constants';
import { selectLocationPath } from '@redux/auth';
import { history } from '@redux/configure-store';
import { Button, Card, Grid, Layout, Space } from 'antd';

import 'antd/dist/antd.css';

const { Footer } = Layout;
const { useBreakpoint } = Grid;
const { Meta } = Card;

export const FooterComponent: React.FC = () => {
  const locationPathname = selectLocationPath()
  const { md, xs } = useBreakpoint();

  return (
    
      locationPathname === RoutePath.Home &&
        <Footer style={{ background: 'none', padding: xs ? '10px 16px 42px' : '24px 24px 42px' }}>
          <Space
            align={xs ? 'center' : 'end'}
            size={[8, 18]}
            style={{
              display: 'flex',
              justifyContent: md ? 'space-between' : 'center',
              flexDirection: md ? 'row' : 'column-reverse',
            }}>

            <Button type='link'
              data-test-id='see-reviews'
              style={{ fontSize: '16px'}} size='large'
              onClick={() => history.push(RoutePath.Feedbacks)}
            >
              Смотреть отзывы
            </Button>

            <Card
              hoverable={true}
              bodyStyle={{ padding: '11px 24px', textAlign: xs ? 'center' : 'left' }}
              actions={
                [<Fragment><Button type='link' icon={<AndroidFilled />} style={{ color: 'var(--ant-button-download)' }}>
                  Android OS
                </Button><Button type='link' icon={<AppleFilled />} style={{ color: 'var(--ant-button-download)' }}>
                    Apple iOS
                  </Button></Fragment>]
              }
              style={{ width: '100%' }}
            >
              <Meta
                title={<Button type='link' href='#' style={{ fontSize: '16px' }}>
                  Скачать на телефон
                </Button>}
                description="Доступно в PRO-тарифе"
                style={{ letterSpacing: '0.5px' }}
              />
            </Card>
          </Space>
        </Footer>
  );
};
