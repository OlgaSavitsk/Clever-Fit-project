import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TrainingForm, TrainingFormValue } from '@pages/calendar/types';
import { trainingActions, TrainingResponse } from '@redux/training';
import { Button, Divider, Empty, FormInstance, Grid, Popover } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import { ModalList } from '../modal-list';

import { SelectForm } from './components/select-form';
import { setCreatedExercises, setCreatedTraining } from './helper.modal-training';

import 'antd/dist/antd.css';
import classes from './index.module.css';

type CreateTrainingModalProps = {
  openSelectModal: boolean
  userTraining: TrainingResponse[]
  form: FormInstance<TrainingForm>,
  selectDate: undefined | Dayjs,
  editTraining: TrainingResponse | undefined,
  setOpenSelectModal: (openSelectModal: boolean) => void,
  setOpenTrainingModal: (openTrainingModal: boolean) => void,
  setShowDrawer: (showDrawer: boolean | string) => void,
}

export const SelectTrainingModal: React.FC<CreateTrainingModalProps> = ({
  openSelectModal,
  userTraining,
  form,
  selectDate,
  editTraining,
  setOpenSelectModal,
  setOpenTrainingModal,
  setShowDrawer
}) => {
  const dispatch = useDispatch()
  const [selectValue, setSelectValue] = useState('')
  const { xs } = Grid.useBreakpoint();

  const createdExercisesList: TrainingFormValue[] | TrainingResponse[] = form.getFieldValue('trainings')

  const createdTraining: TrainingFormValue | TrainingResponse = useMemo(() => {
    const select = editTraining ? editTraining.name : selectValue
    const [training] = setCreatedTraining(createdExercisesList, select, selectDate) || []

    return training
  }, [editTraining, selectValue, createdExercisesList, selectDate])

  const createdExercises = useMemo(() => setCreatedExercises(createdTraining), [createdTraining])

  const onCreate = useCallback(async () => {
    dispatch(trainingActions.postTrainingRequest(createdTraining))
    dispatch(trainingActions.getTraining())
  }, [dispatch, createdTraining])

  const onUpdate = useCallback(async () => {
    let updatedTraining = { ...createdTraining }

    if (selectDate?.isBefore(dayjs())) {
      updatedTraining = {
        ...createdTraining,
        isImplementation: true
      }
    }
    dispatch(trainingActions.putTrainingRequest(updatedTraining))
    dispatch(trainingActions.getTraining())
  }, [dispatch, selectDate, createdTraining])

  useLayoutEffect(() => {
    if (editTraining) { 
      form.setFieldsValue({ trainings: [editTraining] }) 
    }
  }, [editTraining, form])

  return (
    <Popover
      placement={xs ? 'bottom' : 'bottomLeft'}
      open={openSelectModal}
      overlayClassName={classes.overlay}
      title={
        <SelectForm
          userTraining={userTraining}
          form={form}
          setOpenSelectModal={setOpenSelectModal}
          setOpenTrainingModal={setOpenTrainingModal}
          setSelectValue={setSelectValue} />
      }
      content={
        <div className={classes.popover_content} data-test-id='modal-create-exercise'>
          {createdExercises
            ? <ModalList
              createdExercises={createdExercises}
              setShowDrawer={setShowDrawer}
            />
            : <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 32,
                marginTop: 'calc(6 * var(--margin-space))'
              }}
              description={null}
            />}
          <Divider style={{ marginTop: 'calc(3 * var(--margin-space))' }} />

          <Button
            size={xs ? 'middle' : 'large'}
            block={true}
            onClick={() => setShowDrawer(true)}
            disabled={!selectValue}
          >
            Добавить упражнения
          </Button>
          <Button type='link'
            size={xs ? 'middle' : 'large'}
            htmlType='submit'
            disabled={!createdExercises?.find(ex => ex.name)}
            onClick={() => {
              if (editTraining) { onUpdate() }
              else onCreate()
              setOpenSelectModal(false)
              form.resetFields()
            }}
            block={true}
          >
            {selectDate?.isBefore(dayjs()) ? 'Сохранить изменения' : 'Сохранить'}
          </Button>
        </div>
      }
      className={classes.modal_training}
    />
  )
};
