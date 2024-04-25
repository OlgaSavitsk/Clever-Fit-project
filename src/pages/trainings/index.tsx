import { Fragment, useCallback, useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ModalErrorComponent } from '@components/modal-error';
import { DrawerMode, layoutConfiguration, LayoutTrainingsTabsType, RoutePath, TabsKey, tabsTrainingsItems } from '@constants/index';
import { history } from '@redux/configure-store';
import { selectError } from '@redux/error';
import { palsActions, selectPals, TrainingPalsResponse } from '@redux/pals';
import { selectTraining, TrainingResponse } from '@redux/training';
import { setTrainingType } from '@utils/get-popular-training-type';
import { Alert, Layout, Tabs } from 'antd';

import { MarathonComponent, TrainingPanel } from './components';
import { PairsComponent } from './pals-component';
import { TrainingsComponent } from './tarinings-component';

import classes from './index.module.css';

export type OpenDrawerOptions = {
    mode: DrawerMode,
    isOpen: boolean,
    record?: TrainingResponse,
    userFrom?: TrainingPalsResponse
}

const layoutComponent = {
    [LayoutTrainingsTabsType.TRAINING]: TrainingsComponent,
    [LayoutTrainingsTabsType.PAIRS]: PairsComponent,
    [LayoutTrainingsTabsType.MARATHONS]: MarathonComponent,
}

export const TrainingsPage: React.FC = () => {
    const dispatch = useDispatch()
    const { trainings, trainingsList } = selectTraining()
    const { statusCode } = selectError()
    const { invites } = selectPals()
    const [tabsKey, setTabsKey] = useState<string>(TabsKey.Trainings)
    const [openDrawer, setOpenDrawer] = useState<OpenDrawerOptions | null>(null);
    const [isAlert, setAlert] = useState(false)

    const { layoutToTrainings } = layoutConfiguration[tabsKey as TabsKey] || {}
    const LayoutComponent = layoutToTrainings ? layoutComponent[layoutToTrainings] : Fragment

    const onChangeTabs = useCallback((key: string) => {
        setTabsKey(key)
    }, []);

    const repeatedErrorRequest = useCallback(() => {
        if (layoutToTrainings === LayoutTrainingsTabsType.TRAINING) history.push(RoutePath.Trainings)
        else if (layoutToTrainings === LayoutTrainingsTabsType.PAIRS) {
            const trainingType = setTrainingType(trainingsList, trainings)

            if (trainingType) dispatch(palsActions.getUserJointList({ trainingType }))
        }
    }, [dispatch, layoutToTrainings, trainings, trainingsList])

    const styleLayout = tabsKey === TabsKey.Marathons
        ? `${classes.training_layout} ${classes.marathon}`
        : classes.training_layout

    useLayoutEffect(() => {
        if (statusCode) {
            ModalErrorComponent({ statusCode, cb: repeatedErrorRequest })
        }
    }, [dispatch, repeatedErrorRequest, statusCode])

    return (
        <Fragment>
            <Layout className={styleLayout}>
                <Tabs
                    onChange={onChangeTabs}
                    items={tabsTrainingsItems({ messageCount: invites.length })}
                    defaultActiveKey={TabsKey.Trainings}
                    className={classes.trainings_tabs}
                    tabPosition='top'
                />

                <LayoutComponent
                    setOpenDrawer={setOpenDrawer}
                    trainings={trainings} />
                {
                    isAlert &&
                    <Alert
                        data-test-id='create-training-success-alert'
                        message={openDrawer?.mode === DrawerMode.edit
                            ? 'Тренировка успешно обновлена'
                            : 'Новая тренировка успешно добавлена'}
                        type="success"
                        showIcon={true}
                        closable={true}
                        className={classes.alert}
                    />
                }
            </Layout >
            {openDrawer?.isOpen &&
                <TrainingPanel
                    showDrawer={openDrawer}
                    userTrainings={trainings}
                    setShowDrawer={setOpenDrawer}
                    setAlert={setAlert} />}

        </Fragment>
    )
}