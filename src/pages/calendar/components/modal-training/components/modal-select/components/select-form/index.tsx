import { useMemo } from 'react';
import { ArrowLeftOutlined, DownOutlined } from '@ant-design/icons';
import { TrainingForm } from '@pages/calendar/types';
import { selectTraining, TrainingResponse } from '@redux/training';
import { Divider, Form, FormInstance, Select, Space } from 'antd';

import { selectOptions } from '../../helper.modal-training';

import 'antd/dist/antd.css';
import classes from './index.module.css';

type CreateTrainingModalProps = {
  userTraining: TrainingResponse[]
  form: FormInstance<TrainingForm>,
  setOpenSelectModal: (openSelectModal: boolean) => void,
  setOpenTrainingModal: (openTrainingModal: boolean) => void,
  setSelectValue: (selectValue: string) => void,
}

export const SelectForm: React.FC<CreateTrainingModalProps> = ({
  userTraining,
  form,
  setOpenSelectModal,
  setOpenTrainingModal,
  setSelectValue,
}) => {
  const { trainingsList } = selectTraining()

  const setSelectOptions = useMemo(() => selectOptions(userTraining, trainingsList), [trainingsList, userTraining])
 
  return (
    <div style={{ display: 'flex' }}>
      <Form
        form={form}
        size='middle'
        style={{ width: '100%' }}
        initialValues={{
          trainings: []
        }}
        className={classes.select_form}
      >
        <Form.Item>
          <Space style={{ width: '100%' }}>
            <ArrowLeftOutlined
              data-test-id='modal-exercise-training-button-close'
              onClick={() => {
                setOpenSelectModal(false);
                setOpenTrainingModal(true);
              }} />

            <Form.List name='trainings'>
              {(_subFields, { add }) => (
                <Form.Item
                  name='name'
                  rules={[
                    { required: true, message: '' },
                  ]}
                  style={{ width: '100%', marginBottom: 0 }}
                >
                  <Select
                    data-test-id='modal-create-exercise-select'
                    placeholder='Выбор типа тренировки'
                    bordered={false}
                    suffixIcon={<DownOutlined />}
                    style={{ width: '100%' }}
                    onChange={(selectValue) => {
                      setSelectValue(selectValue);
                      form.setFieldsValue({ trainings: [] })
                      add({
                        name: selectValue,
                        exercises: [{
                          name: ''
                        }]
                      });
                    }}
                    options={setSelectOptions.map(
                      (training) => ({ label: training.name, value: training.name }))} />
                </Form.Item>
              )}
            </Form.List>
          </Space>
        </Form.Item>
        <Divider style={{ margin: 'calc(1 * var(--margin-space)) 0' }} />
      </Form >
    </div >
  )
};