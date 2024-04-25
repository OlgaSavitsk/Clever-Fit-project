import { useCallback, useState } from 'react';
import { TrainingForm } from '@pages/calendar/types';
import { TrainingResponse } from '@redux/training';
import { FormInstance } from 'antd';
import { Dayjs } from 'dayjs';

import { CreateTrainingModal } from './components/modal-create-training';
import { SelectTrainingModal } from './components/modal-select';

import 'antd/dist/antd.css';

type TrainingModalProps = {
    userTraining: TrainingResponse[]
    cellValue: Dayjs,
    selectDate: Dayjs | undefined,
    openTrainingModal: boolean,
    openSelect: boolean,
    form: FormInstance<TrainingForm>
    setOpenTrainingModal: (openTrainingModal: boolean) => void,
    setOpenSelectModal: (openSelectModal: boolean) => void,
    setShowDrawer: (showDrawer: boolean | string) => void,
}

export const TrainingModal: React.FC<TrainingModalProps> = ({
    userTraining,
    cellValue,
    selectDate,
    openTrainingModal,
    openSelect,
    form,
    setOpenSelectModal,
    setOpenTrainingModal,
    setShowDrawer,
}) => {
    const [editTraining, setEditTraining] = useState<TrainingResponse>()

    const isOpenModal = useCallback(() => {
        if (openTrainingModal)
            return (
                <CreateTrainingModal
                    userTraining={userTraining}
                    openTrainingModal={openTrainingModal}
                    selectDate={selectDate}
                    setOpenTrainingModal={setOpenTrainingModal}
                    setOpenSelectModal={setOpenSelectModal}
                    setEditTraining={setEditTraining}
                    setShowDrawer={setShowDrawer}
                />
            )
            
            return null
    }, [openTrainingModal, selectDate, setOpenSelectModal, setOpenTrainingModal, setShowDrawer, userTraining])

    return (
        (cellValue.isSame(selectDate, 'day') &&
            <div>
                {openSelect
                    ? <SelectTrainingModal
                        userTraining={userTraining}
                        openSelectModal={openSelect}
                        form={form}
                        selectDate={selectDate}
                        editTraining={editTraining}
                        setOpenSelectModal={setOpenSelectModal}
                        setOpenTrainingModal={setOpenTrainingModal}
                        setShowDrawer={setShowDrawer}
                    /> : isOpenModal()}
            </div>
        )
    )
};