import { useCallback, useEffect, useState } from 'react';
import { DrawerMode } from '@constants/trainings.constant';
import { useTrainings } from '@hooks/index';
import { OpenDrawerOptions } from '@pages/trainings';
import { TrainingResponse } from '@redux/training';
import { Button, Drawer, Form, Grid } from 'antd';
import dayjs from 'dayjs';

import { FormDrawerComponent } from './components/drawer-form';
import { TitleDrawerComponent } from './components/title';

import 'antd/dist/antd.css';
import classes from './index.module.css';

type PanelAddTrainingProps = {
  showDrawer: OpenDrawerOptions | null,
  userTrainings: TrainingResponse[],
  setShowDrawer: (showDrawer: OpenDrawerOptions | null) => void,
  setAlert: (isAlert: boolean) => void
}

export const TrainingPanel: React.FC<PanelAddTrainingProps> = ({
  showDrawer, userTrainings, setShowDrawer, setAlert
}) => {
  const { xs } = Grid.useBreakpoint();
  const [form] = Form.useForm()
  const [submittable, setSubmittable] = useState(false);
  const { mode, record, userFrom } = showDrawer as OpenDrawerOptions
  const [isFillForm, setIsFillForm] = useState(!!record)

  const [handleCreate] = useTrainings()

  const onFinish = useCallback(async () => {
    const trainingPayload = {
      mode,
      createdTraining: {
        ...record,
        ...form.getFieldsValue(),
        name: userFrom?.trainingType ?? form.getFieldValue('name'),
      },
      userFrom
    }

    handleCreate(trainingPayload)
    setShowDrawer({ mode, isOpen: false })
    setAlert(true)
  }, [form, handleCreate, mode, record, setAlert, setShowDrawer, userFrom])

  const values = Form.useWatch([], form);

  const handleDrawer = () => {
    setShowDrawer(null)
  }

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
    if (isFillForm) {
      form.setFieldsValue({ ...record, date: dayjs(record?.date) })
      setIsFillForm(false)
    }
  }, [form, isFillForm, record, values])

  return (
    <Drawer
      data-test-id='modal-drawer-right'
      width={xs ? 364 : 408}
      destroyOnClose={true}
      placement="right"
      closable={false}
      onClose={handleDrawer}
      open={!!showDrawer}
      mask={false}
      drawerStyle={{ background: 'transparent' }}
      className={classes.drawer}
      title={
        <TitleDrawerComponent
          mode={mode}
          setShowDrawer={setShowDrawer} />
      }
      footer={
        <Button
          type="primary"
          htmlType="submit"
          block={true}
          onClick={onFinish}
          disabled={!submittable}
        >
          {mode === DrawerMode.invite ? 'Отправить приглашение' : 'Сохранить'}
        </Button>
      }
    >

      <FormDrawerComponent
        form={form}
        showDrawer={showDrawer}
        userTrainings={userTrainings}
      />

    </Drawer >
  )
};
