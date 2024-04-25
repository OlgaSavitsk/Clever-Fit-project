import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CONTENT, SiderItems } from '@constants/index';
import { useHandleRequestTrainings } from '@hooks/index';
import { ModalComponent } from '@pages/reviews/components';
import { selectError } from '@redux/error';
import { userActions } from '@redux/user';
import { Button, Card, Grid, List, Space } from 'antd';

import 'antd/dist/antd.css';
import classes from './index.module.css';

const { useBreakpoint } = Grid;

export const MainPage: React.FC = () => {
  const dispatch = useDispatch()
  const { handleRequest } = useHandleRequestTrainings()
  const { statusCode } = selectError()
  const { lg, md, xs } = useBreakpoint();

  useEffect(() => {
    dispatch(userActions.getUser())
  }, [dispatch])

  return (
    <Space direction="vertical" size="middle"
      className={classes.main_content}
      style={{ maxWidth: lg ? 752 : 'auto' }}>
      <Space direction="vertical" size="large">

        <Card bordered={false} bodyStyle={{ paddingRight: md ? 50 : 32 }}>
          {CONTENT.MAIN}
        </Card>

        <Card bordered={false} bodyStyle={{ paddingRight: lg ? 50 : 32 }}>
          {CONTENT.SUBMAIN}
        </Card>

      </Space>
      <List
        grid={{ gutter: xs ? 6 : 16, column: 3, sm: 1, xs: 1 }}
        dataSource={SiderItems}
        renderItem={item => (
          <List.Item key={item.title}>
            <Card
              hoverable={true}
              title={item.title}
              headStyle={{
                textAlign: (lg || xs) ? 'center' : 'left',
                fontSize: 'var(--fs-base)',
                fontWeight: 'var(--fw-l)',
                whiteSpace: 'nowrap'
              }}
              bodyStyle={{ padding: '10px 24px 13px', textAlign: 'center' }}>
              <Button
                data-test-id={item.dataId}
                type='link'
                icon={item.icon}
                onClick={() => handleRequest(item.path)}
                style={{ fontSize: 'var(--fs-text)' }}>
                {item.action}
              </Button>
            </Card>
          </List.Item>
        )}
      />
      {statusCode && <ModalComponent status={statusCode} />}
    </Space>
  );
};