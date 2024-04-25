import { useMemo } from 'react';
import { EditTwoTone } from '@ant-design/icons';
import { DrawerMode } from '@constants/index';
import { setColor } from '@pages/calendar/calendar.helper';
import { Exercises, TrainingResponse } from '@redux/training';
import { Badge, Button, Typography } from 'antd';

import 'antd/dist/antd.css';
import classes from './index.module.css';

type TrainingModalProps = {
  createdExercises?: Exercises[],
  userTraining?: TrainingResponse[],
  setOpenSelectModal?: (openSelectModal: boolean) => void,
  setOpenTrainingModal?: (openTrainingModal: boolean) => void,
  setEditTraining?: (editTraining: TrainingResponse) => void,
  setShowDrawer?: (mode: string) => void,
}

export const ModalList: React.FC<TrainingModalProps> = ({
  createdExercises,
  userTraining,
  setOpenSelectModal,
  setOpenTrainingModal,
  setEditTraining,
  setShowDrawer,
}) => {

  const data = useMemo(() => createdExercises || userTraining, [createdExercises, userTraining])

  return (
    <ul className={classes.events}>
        {data && data.map((item: Exercises | TrainingResponse, index) => (
          <li key={item.name}

            style={{ display: 'flex', justifyContent: 'space-between' }}>

            {userTraining ? <Badge color={setColor(item.name)}
              text={item.name} style={{
                color: item.isImplementation ? 'var(--ant-text)' : undefined
              }} />
              :
              <Typography.Text type='secondary'>{item.name}</Typography.Text>}
            <Button
              data-test-id={`modal-update-training-edit-button${index}`}
              type='text'
              size='small'
              disabled={item.isImplementation}
              icon={<EditTwoTone
                twoToneColor={item.isImplementation
                  ? ['var(--ant-text)', 'var(--ant-text)']
                  : undefined} />}
              onClick={() => {
                if (setShowDrawer) setShowDrawer(DrawerMode.edit);
                else {
                  if(setOpenSelectModal) setOpenSelectModal(true);
                  if(setOpenTrainingModal) setOpenTrainingModal(false);
                  if(setEditTraining) setEditTraining(item as TrainingResponse);
                }
              }} />
          </li>)
        )}
    </ul>
  )
};
