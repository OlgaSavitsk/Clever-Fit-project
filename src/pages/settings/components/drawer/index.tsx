import { Fragment, useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CheckCircleFilled, CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { dateShortFormat, SettingsTariff, settingsTariff } from '@constants/index';
import { TariffListResponse, userActions, UserResponse } from '@redux/user';
import { Badge, Button, Col, Drawer, Grid, List, Radio, RadioChangeEvent, Row, Tag, Typography } from 'antd';
import dayjs from 'dayjs';

import 'antd/dist/antd.css';
import classes from './index.module.css';

type PanelAddTrainingProps = {
  tariff: TariffListResponse[],
  user: UserResponse,
  showDrawer: boolean | TariffListResponse,
  setShowDrawer: (showDrawer: boolean) => void,
}

export const SettingsDrawer: React.FC<PanelAddTrainingProps> = ({
  tariff, user, showDrawer, setShowDrawer
}) => {
  const dispatch = useDispatch()
  const { xs } = Grid.useBreakpoint();
  const [checked, setChecked] = useState<{ isChecked: boolean, days: number }>(
    { isChecked: false, days: 0 }
  );

  const currentTariff = useMemo(() => {
    const [tariffValue] = tariff

    return tariffValue
  }, [tariff])

  const handlePayment = useCallback(() => {
    const paymentValue = {
      tariffId: currentTariff._id,
      days: checked.days
    }

    dispatch(userActions.paymentTariffRequest(paymentValue))
  }, [checked.days, currentTariff, dispatch])

  return (
    <Drawer
      data-test-id='tariff-sider'
      width={xs ? 360 : 408}
      destroyOnClose={true}
      placement="right"
      closable={false}
      onClose={() => setShowDrawer(false)}
      open={showDrawer as boolean}
      mask={false}
      drawerStyle={{ background: 'transparent' }}
      className={classes.drawer}
      title={
        <Row gutter={[0, 16]} >
          <Col span={21}>
            <Typography.Title level={xs ? 4 : 4}>
              Сравнить тарифы
            </Typography.Title>
          </Col>

          <Col span={1}>
            <CloseOutlined data-test-id='modal-drawer-right-button-close'
              onClick={() => {
                setShowDrawer(false)
              }}
              style={{ color: 'var(--ant-text)', textAlign: 'end' }} />
          </Col>
        </Row>
      }
      footer={
        user.tariff ? null : <Button
          data-test-id='tariff-submit'
          type="primary"
          size='large'
          disabled={!checked.isChecked}
          block={true}
          onClick={handlePayment}
        >
          Выбрать и оплатить
        </Button>}
    >
      <Row gutter={[0, { xs: 30, lg: 70 }]} align="bottom">
        <Row gutter={[0, 16]}>
          {user.tariff &&

            <Tag color='var(--ant-primary-1)' className={classes.tag_pro} >
              <Typography.Title level={5} className={classes.drawer_title}>
                {`Ваш PRO tarif активен до ${dayjs(user.tariff.expired).format(dateShortFormat)}`}
              </Typography.Title>
            </Tag>
          }
          <Col lg={{ span: 4, offset: 16 }} xs={{ span: 4, offset: 16 }}>
            <Tag color="default">FREE</Tag>
          </Col>
          <Col lg={{ span: 4 }} xs={{ span: 4 }}>
            <Tag color='var(--ant-primary-1)' style={{ color: 'var(--ant-primary-7)' }}>
              PRO
              {user.tariff ? <CheckCircleOutlined style={{ color: 'var(--tariff)', padding: '0 var(--padding-space)' }} /> : null}
            </Tag>
          </Col>

          {settingsTariff.map((settingTariff: SettingsTariff) => (
            <Fragment key={settingTariff.title}>
              <Col span={17}>
                <Typography.Text>{settingTariff.title}</Typography.Text>
              </Col>
              <Col span={4}>
                <Badge count={settingTariff.tariffFree ? <CheckCircleFilled /> : <CloseCircleOutlined defaultChecked={true} />} />
              </Col><Col span={3}>
                <Badge count={settingTariff.tariffPro ? <CheckCircleFilled /> : <CloseCircleOutlined defaultChecked={true} />} />
              </Col>
            </Fragment>
          ))}
        </Row>

        {user.tariff ? null : <Row gutter={[0, 16]} style={{ width: '100%' }}>
          <Col span={24}>
            <Typography.Text strong={true}>Стоимость тарифа</Typography.Text>
          </Col>

          <Col span={24}>
            <Radio.Group
              onChange={(e: RadioChangeEvent) => {
                if (e.target.checked) setChecked({ isChecked: e.target.checked, days: e.target.value });
              }}
            >
              <List
                data-test-id='tariff-cost'
                dataSource={currentTariff.periods}
                renderItem={item => (
                  <List.Item>
                    <Col span={16}>
                      <Typography.Text>{item.text}</Typography.Text>
                    </Col><Col span={6}>
                      <Typography.Text strong={true}>{item.cost.toString().replace('.', ',')}$</Typography.Text>
                    </Col>
                    <Col span={2}>
                      <Radio
                        data-test-id={item.cost === 10 ? 'tariff-10' : undefined}
                        value={item.days} />
                    </Col>
                  </List.Item>
                )}
                split={false}
              />

            </Radio.Group>
          </Col>

        </Row>}
      </Row >
    </Drawer >
  )
};
