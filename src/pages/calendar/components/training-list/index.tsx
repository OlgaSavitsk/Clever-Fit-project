import { setColor } from '@pages/calendar/calendar.helper';
import { TrainingResponse } from '@redux/training';
import { Badge } from 'antd';

import 'antd/dist/antd.css';
import classes from './index.module.css';

type TrainingListProps = {
  userTraining: TrainingResponse[]
}

export const TrainingList: React.FC<TrainingListProps> = ({
  userTraining,
}) => (
  <ul className={classes.events}>
    {userTraining.map((item) =>
      <li key={item.name}>
        <Badge color={setColor(item.name)}
          text={item.name} />
      </li>
    )}
  </ul>
)
