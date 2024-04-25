import { Fragment, useCallback, useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ModalErrorComponent } from '@components/modal-error';
import { selectError } from '@redux/error';
import { selectTraining, trainingActions } from '@redux/training';
import { Form, Grid, Layout, } from 'antd';
import locale from 'antd/lib/calendar/locale/ru_RU';
import { Dayjs } from 'dayjs';

import {
  CalendarComponent,
  PanelAddTraining,
  TrainingList,
  TrainingModal
} from './components';
import { TrainingForm } from './types';

import 'antd/dist/antd.css';
import classes from './index.module.css';

import 'dayjs/locale/ru';

const { useBreakpoint } = Grid;

export const CalendarPage: React.FC = () => {
  const { statusCode } = selectError()
  const { trainings } = selectTraining()
  const [dateSelect, setValueselect] = useState<Dayjs>()
  const [openSelectModal, setOpenSelectModal] = useState(false)
  const [openTrainingModal, setOpenTrainingModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState<boolean | string>(false);
  const [form] = Form.useForm<TrainingForm>()
  const { xs, md } = useBreakpoint();
  const dispatch = useDispatch()

  const handleTrainingList = useCallback(() => {
    dispatch(trainingActions.getTrainingList())
  }, [dispatch])

  const dateCellRender = useCallback((cellValue: Dayjs) => {

    const trainingCorrespondDay = trainings
      .filter((training) => cellValue.isSame(training.date, 'day'))

    return (
      <Fragment>
        <TrainingModal
          openTrainingModal={openTrainingModal}
          openSelect={openSelectModal}
          userTraining={trainingCorrespondDay}
          cellValue={cellValue}
          selectDate={dateSelect}
          form={form}
          setOpenSelectModal={setOpenSelectModal}
          setOpenTrainingModal={(val) => setOpenTrainingModal(val)}
          setShowDrawer={setShowDrawer} />

        {md && <TrainingList userTraining={trainingCorrespondDay} />}
      </Fragment>
    );
  }, [dateSelect, form, md, openSelectModal, openTrainingModal, trainings]);

  const cellRender = useCallback((date: Dayjs) => {
    const training = trainings.find(train => date.isSame(train.date, 'day'))

    const style = training ? classes.training_exist : classes.calendar_cell

    return (
      <div className={training?.isImplementation
        ? `${classes.training_exist} ${classes.done}`
        : style}>
        {dateCellRender(date)}
      </div>)
  }, [dateCellRender, trainings])

  useLayoutEffect(() => {
    if (statusCode) {
      ModalErrorComponent({ statusCode, cb: handleTrainingList })
      setOpenTrainingModal(false)
    }
  }, [handleTrainingList, statusCode])

  return (
    <Fragment>
      <Layout className={classes.calendar_layout}>
        <CalendarComponent
          locale={locale}
          className={classes.calendar}
          fullscreen={!xs}
          dateCellRender={cellRender}
          onChange={() => {
            setOpenTrainingModal(false)
            setOpenSelectModal(false)
            setShowDrawer(false)
          }}
          onSelect={(date: Dayjs) => {
            setValueselect(date)
            setOpenTrainingModal(true)
          }}
        />
      </Layout>
      {showDrawer &&
        <PanelAddTraining
          selectDate={dateSelect}
          showDrawer={showDrawer}
          form={form}
          userTraining={trainings}
          setShowDrawer={setShowDrawer} />}
    </Fragment>
  );
};
