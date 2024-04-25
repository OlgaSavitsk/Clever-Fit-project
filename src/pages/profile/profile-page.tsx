import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormAuthList } from '@components/form-auth-list';
import { dateFullFormat } from '@constants/index';
import { selectError } from '@redux/error';
import { selectUserState, userActions, UserPayload } from '@redux/user';
import { Alert, Button, Col, DatePicker, Form, Grid, Input, Layout, Row, Typography } from 'antd';
import dayjs from 'dayjs';

import { ModalErrorComponent, UploadComponent } from './components';

import 'antd/dist/antd.css';
import classes from './index.module.css';

export const ProfilePage: React.FC = () => {
  const dispatch = useDispatch()
  const { user, progress } = selectUserState()
  const { statusCode } = selectError()
  const { xs } = Grid.useBreakpoint();
  const [form] = Form.useForm();
  const [isAlert, setAlert] = useState(false)
  const [isCloseModal, setIsCloseModal] = useState(false)
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

  const currentUserImg = useMemo(() => user && user.imgSrc ? user.imgSrc : '', [user])

  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentDisabled(disabled);
  };

  const onFinish = useCallback(async (val: Partial<UserPayload>) => {
    dispatch(userActions.putUserRequest({ ...val, readyForJointTraining: true }))
    if (user) {
      form.setFieldsValue({ ...user, birthday: dayjs(user.birthday) })
      setAlert(true)
      setComponentDisabled(true)
    }
  }, [dispatch, form, user])

  const cancelModalError = useCallback((val: boolean) => {
    dispatch(userActions.setErrorUser(null))
    setIsCloseModal(val)
  }, [dispatch])

  useLayoutEffect(() => {
    if (user) {
      form.setFieldsValue({ ...user, birthday: user.birthday && dayjs(user.birthday) })
    }
    if (statusCode) {
      ModalErrorComponent(statusCode, cancelModalError)
      setComponentDisabled(true)
    }

  }, [form, user, statusCode, progress, cancelModalError])

  return (
    <Layout className={classes.profile_layout}>
      <Form
        form={form}
        name="normal_login"
        className={classes.profile_form}
        onFinish={onFinish}
        size='large'
        onValuesChange={onFormLayoutChange}
      >
        <Row gutter={[24, { xs: 20, lg: 24 }]}>
          <Col span={24}>
            <Typography.Title level={5}>Личная информация</Typography.Title>
          </Col>
          <Col lg={{ span: 6, order: 1 }} sm={{ span: 6, order: 1 }} xs={{ span: 24, order: 2 }}>
            <Form.Item
              data-test-id='profile-avatar'
              name="imgSrc"
              className={classes.upload_item}
            >
              <UploadComponent
                currentUserImg={currentUserImg}
                isCloseModalError={isCloseModal}
                setIsCloseModal={setIsCloseModal}
                setComponentDisabled={setComponentDisabled}
              />

            </Form.Item>
          </Col>

          <Col lg={{ span: 18, order: 1 }} sm={{ span: 18, order: 1 }} xs={{ span: 24 }}>
            <Form.Item
              name="firstName">
              <Input
                data-test-id='profile-name'
                placeholder='Имя'
                autoComplete='off' />
            </Form.Item>
            <Form.Item
              name="lastName">
              <Input
                data-test-id='profile-surname'
                placeholder='Фамилия'
                autoComplete='off' />
            </Form.Item>

            <Form.Item
              name="birthday">
              <DatePicker
                data-test-id='profile-birthday'
                placeholder='Дата рождения'
                format={dateFullFormat}
                style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col span={24} order={3}>
            <Typography.Title level={5}>Приватность и авторизация</Typography.Title>
          </Col>
          <Col span={24} order={4}>
            <FormAuthList />
          </Col>
          <Col span={24} order={5}>
            <Form.Item shouldUpdate={true}>
              {() => (
                <Button
                  data-test-id='profile-submit'
                  type="primary"
                  htmlType="submit"
                  block={xs}
                  disabled={componentDisabled}
                >
                  Сохранить изменения
                </Button>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {isAlert && <Alert
        data-test-id='alert'
        message="Данные профиля успешно обновлены"
        type="success"
        showIcon={true}
        closable={true}
        style={{ width: '395px', alignSelf: 'center' }}
      />}
    </Layout >
  )
};
