import { CSSProperties } from 'react';
import { CalendarTwoTone, HeartFilled, IdcardOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

import { RoutePath } from './routes.constants';


export const SiderItems = [
  {
    title: 'Расписать тренировки',
    action: 'Тренировки',
    icon: <HeartFilled />,
    path: RoutePath.Trainings,
    dataId: 'menu-button-training'
  },
  {
    title: 'Назначить календарь',
    action: 'Календарь',
    icon: <CalendarTwoTone twoToneColor={['#2F54EB', '#2F54EB']} />,
    path: RoutePath.Calendar,
    dataId: 'menu-button-calendar'
  },
  {
    title: 'Заполнить профиль',
    action: 'Профиль',
    icon: <IdcardOutlined />,
    path: RoutePath.Profile,
    dataId: 'menu-button-profile'
  },
];

type HeaderCssProp = Record<string, CSSProperties>

const styles: HeaderCssProp = {
  titleMain: {
    color: '#061178',
    fontSize: 'var(--fs-base)',
    lineHeight: '130%',
    textAlign: 'left'
  },
  titleSubmain: {
    fontWeight: 'var(--fw-m)',
    fontSize: 'calc(var(--fs-base) * 1.25)',
    lineHeight: '130%',
    margin: 0,
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    textAlign: 'left'
  }
}

export const CONTENT = {
  MAIN: <Typography.Text style={styles.titleMain}>
    <p>C CleverFit ты сможешь:</p>
    <p>— планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;</p>
    <p>— отслеживать свои достижения в разделе статистики, сравнивая свои результаты c нормами и рекордами;</p>
    <p>— создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы o&nbsp;тренировках;</p>
    <p>— выполнять расписанные тренировки для разных частей тела, следуя подробным инструкциям и советам профессиональных тренеров.</p></Typography.Text>,
  SUBMAIN:
    <Typography.Text style={styles.titleSubmain}>
      CleverFit — это не просто приложение, а твой личный помощник
      в&nbsp;мире фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!</Typography.Text>,
};
