import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';
import { dateFullFormat,InviteStatus } from '@constants/index';
import { InviteResponse, palsActions } from '@redux/pals';
import { TrainingResponse } from '@redux/training';
import { Avatar, Button, Comment, Grid, List, Space, Typography } from 'antd';
import dayjs from 'dayjs';

import { TrainingDetailsComponent } from '../training-details';

import { LoadButton } from './components/load-button';

import 'antd/dist/antd.css';
import classes from './index.module.css';

type MessageComponentProps = {
  invites: InviteResponse[]
}

export const MessageComponent: React.FC<MessageComponentProps> = ({ invites }) => {
  const dispatch = useDispatch()
  const [listData, setListdata] = useState<InviteResponse[]>([]);
  const [openDetails, setOpenDetails] = useState<string | undefined>(undefined);
  const { lg, md, xs } = Grid.useBreakpoint();

  const isOpen = (record: TrainingResponse) => record._id === openDetails;

  const handleResponseInvite = useCallback((inviteId: string) => {
    dispatch(palsActions.responseInviteRequest({ id: inviteId, status: InviteStatus.accepted }))
    dispatch(palsActions.getTrainingPals())
  }, [dispatch])

  const handleCancelInvite = useCallback((inviteId: string) => {
    dispatch(palsActions.getTrainingPals())
    dispatch(palsActions.cancelInviteRequest({ id: inviteId, status: InviteStatus.rejected }))
  }, [dispatch])

  return (
    <div className={classes.message_wrapper}>
      <Typography.Text type="secondary">{`Новое сообщение (${invites.length})`}</Typography.Text>
      <List
        className={classes.list}
        dataSource={listData}
        itemLayout="horizontal"
        loadMore={<LoadButton invites={invites} setListdata={setListdata} />}
        renderItem={({ _id, training, from, createdAt }: InviteResponse) => {
          const opened = isOpen(training);

          return (
            <Comment
              className={classes.comment}
              avatar={
                <List.Item.Meta
                  className={classes.avatar}
                  avatar={from.imageSrc ?
                    <Avatar src={from.imageSrc} size={42} /> :
                    <Avatar
                      size={42}
                      icon={<UserOutlined />}
                      style={{ backgroundColor: 'var(--ant-default-avatar)' }} />}
                  title={
                    <Space.Compact direction='vertical'>
                      <span>{from.firstName}</span>
                      <span>{from.lastName}</span>
                    </Space.Compact>}
                />}
              content={
                <Space direction={lg ? 'horizontal' : 'vertical'} size={24}>
                  <Space direction='vertical'>
                    <Typography.Text
                      className={classes.content}>
                      Привет, я ищу партнёра для совместных [силовых тренировок]. Ты хочешь присоединиться ко мне на следующих тренировках?
                    </Typography.Text>
                    <Space direction='vertical'>
                      <Button
                        type='link'
                        size='middle'
                        style={{ padding: 0, textAlign: 'left' }}
                        onClick={() => setOpenDetails(training._id)}
                      >
                        Посмотреть детали тренировки
                      </Button>
                      {openDetails &&
                        <TrainingDetailsComponent
                          data={training}
                          openDetails={opened}
                          setOpenDetails={setOpenDetails}
                        />}
                    </Space>
                  </Space>
                  <Space.Compact direction='vertical' size='middle' block={xs || md}>
                    <Button
                      type="primary"
                      size='middle'
                      block={md}
                      onClick={() => handleResponseInvite(_id)}
                    >
                      Тренироваться вместе
                    </Button>
                    <Button
                      size='middle'
                      block={md}
                      onClick={() => handleCancelInvite(_id)}
                    >
                      Отклонить запрос
                    </Button>
                  </Space.Compact></Space>}
              datetime={<Typography.Text
                className={classes.date}>
                {dayjs(createdAt).format(dateFullFormat)}
              </Typography.Text>}
            />)
        }} />
    </div>)
};
