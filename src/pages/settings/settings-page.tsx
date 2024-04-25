import { Fragment, useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { InfoCircleOutlined } from '@ant-design/icons';
import { ButtonModal } from '@components/button';
import { RoutePath } from '@constants/index';
import { FeedbackModalComponent } from '@pages/reviews/components';
import { history } from '@redux/configure-store';
import { selectUserState, TariffListResponse, userActions } from '@redux/user';
import { Badge, Button, Form, Grid, Layout, Space, Switch, Tooltip, Typography } from 'antd';

import { Tooltips } from './constants/tariff-tooltip.constans';
import { CardTariffComponent, ModalPaymentComponent, SettingsDrawer } from './components';

import 'antd/dist/antd.css';
import classes from './index.module.css';

export const SettingsPage: React.FC = () => {
  const dispatch = useDispatch()
  const { user, tariffList, paymentStatus } = selectUserState()
  const { xs } = Grid.useBreakpoint();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [showDrawer, setShowDrawer] = useState<boolean | TariffListResponse>(false);

  const currentTariff = useMemo(() => user && user.tariff ? user.tariff : '', [user])

  const onChange = useCallback(() => {
    dispatch(userActions.putUserRequest(form.getFieldsValue()))
  }, [dispatch, form]);

  useLayoutEffect(() => {
    if (user) form.setFieldsValue(user)
    if (paymentStatus) setShowDrawer(false)
  }, [form, paymentStatus, user])

  return (
    <Layout className={classes.settings_background}>
      <Layout className={classes.settings_layout}>
        <Typography.Title level={4}>Мой тариф</Typography.Title>
        <Space direction='vertical' size={xs ? 36 : 40} className={classes.setting_wrapper}>
          
          <CardTariffComponent tariffList={tariffList} user={user} setShowDrawer={setShowDrawer} />

          <Form
            form={form}
            labelCol={xs ? { flex: '60%' } : undefined}
            className={classes.settings_form}
            size='large'
          >
            <Form.Item
              name="readyForJointTraining"
              valuePropName="checked"
              label={
                <Fragment><Typography.Text strong={true}>Открыт для совместных тренировок</Typography.Text>
                  <Tooltip placement="bottomLeft" title={Tooltips.readyForJointTraining}>
                    <Badge data-test-id='tariff-trainings-icon'
                      count={<InfoCircleOutlined style={{ color: 'var(--ant-text)', margin: 4 }} />} />
                  </Tooltip>
                </Fragment>}
            >
              <Switch
                data-test-id='tariff-trainings'
                size={xs ? 'small' : 'default'} onChange={onChange} />
            </Form.Item>

            <Form.Item
              name="sendNotification"
              label={
                <Fragment><Typography.Text strong={true}>Уведомления</Typography.Text>
                  <Tooltip placement="bottomLeft" title={Tooltips.sendNotification}>
                    <Badge data-test-id='tariff-notifications-icon'
                      count={<InfoCircleOutlined style={{ color: 'var(--ant-text)', margin: 4 }} />} />
                  </Tooltip>
                </Fragment>}
            >
              <Switch
                data-test-id='tariff-notifications'
                size={xs ? 'small' : 'default'} onChange={onChange} />
            </Form.Item>
            <Form.Item
              name="theme"
              label={
                <Fragment><Typography.Text type={currentTariff ? undefined : 'secondary'} strong={true}>Тёмная тема</Typography.Text>
                  <Tooltip placement="bottomLeft" title={Tooltips.theme}>
                    <Badge data-test-id='tariff-theme-icon' count={<InfoCircleOutlined style={{ color: 'var(--ant-text)', margin: 4 }} />} />
                  </Tooltip>
                </Fragment>}
            >
              <Switch
                data-test-id='tariff-theme'
                disabled={!currentTariff} size={xs ? 'small' : 'default'} />
            </Form.Item>
          </Form >
          <Space
            direction={xs ? 'vertical' : 'horizontal'}
            align="start"
            size={[11, 17]}
            className={classes.loadButton_wrapper}>
            <ButtonModal setOpenFeedModal={(value) => setOpen(value)} dataId="write-review" />
            <Button
              type='link'
              style={{ fontSize: 'var(--fs-base' }} size='large'
              block={!!xs}
              onClick={() => history.push(RoutePath.Feedbacks)}
            >
              Смотреть все отзывы
            </Button>
          </Space>
          <FeedbackModalComponent isOpen={open} setOpenFeedModal={(value) => setOpen(value)} />

          {paymentStatus && <ModalPaymentComponent open={paymentStatus} email={user.email} />}
        </Space>
      </Layout >
      {showDrawer &&
        <SettingsDrawer
          tariff={tariffList}
          showDrawer={showDrawer}
          user={user}
          setShowDrawer={setShowDrawer} />}
    </Layout>
  )
};
