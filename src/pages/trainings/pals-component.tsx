
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { palsCardTitle } from '@constants/index';
import { palsActions, selectPals } from '@redux/pals';
import { selectTraining } from '@redux/training';
import { isArrayWithItems, setTrainingType } from '@utils/index';
import { Button, Card, Grid, Space, Typography } from 'antd';

import { InviteListComponent, JoinToMyTrainingComponent, MessageComponent } from './components';
import { OpenDrawerOptions } from '.';

import 'antd/dist/antd.css';
import classes from './index.module.css';

type PairsComponentProps = {
    setOpenDrawer: (options: OpenDrawerOptions) => void
}

export const PairsComponent: React.FC<PairsComponentProps> = ({ setOpenDrawer }) => {
    const dispatch = useDispatch()
    const { pals, invites, joinList } = selectPals()
    const { trainings, trainingsList } = selectTraining()

    const { xs } = Grid.useBreakpoint();

    const trainingType = useMemo(() =>
        setTrainingType(trainingsList, trainings), [trainings, trainingsList])

    const handleUserJoin = useCallback(() => {
        dispatch(palsActions.getUserJointList())
    }, [dispatch])

    const handleUserJoinWithTrainingType = useCallback(() => {
        if (trainingType) {
            dispatch(palsActions.getUserJointList({ trainingType }))
        }
    }, [dispatch, trainingType])

    useEffect(() => {
        dispatch(palsActions.getTrainingPals())
        dispatch(palsActions.getInvite())
    }, [dispatch])

    return (
        isArrayWithItems(joinList)
            ? <InviteListComponent joinList={joinList} setOpenDrawer={setOpenDrawer} />

            : < Space direction='vertical' size={24} >

                {isArrayWithItems(invites) ? <MessageComponent invites={invites} /> : null}

                <Card
                    actions={[
                        <Button
                            type='link'
                            key={1}
                            onClick={handleUserJoin}
                            block={xs}>Случайный выбор</Button>,
                        <Button
                            type='text'
                            key={2}
                            onClick={handleUserJoinWithTrainingType}
                            block={xs}>
                            Выбор друга по моим тренировкам
                        </Button>,
                    ]}
                    className={classes.card}
                >
                    <Card.Meta
                        title={<Typography.Title
                            level={3}
                            style={{ color: 'var(--ant-primary-9)' }}
                            className={classes.pals_title}>
                            {palsCardTitle.title}
                        </Typography.Title>}
                        description={palsCardTitle.description}
                    />
                </Card >

                <Typography.Title level={4}>Мои партнёры по тренировкам</Typography.Title>

                {isArrayWithItems(pals)
                    ? <JoinToMyTrainingComponent pals={pals} />
                    : <Space>
                        <Typography.Text>У вас пока нет партнёров для совместных тренировок</Typography.Text>
                    </Space>
                }
            </Space >
    )
}
