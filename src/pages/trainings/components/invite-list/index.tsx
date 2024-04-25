import { Fragment, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ArrowLeftOutlined, CheckCircleTwoTone, ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';
import { DrawerMode, InviteStatus } from '@constants/index';
import { OpenDrawerOptions } from '@pages/trainings';
import { palsActions, selectPals, TrainingPalsResponse } from '@redux/pals';
import { getSortedTraining } from '@utils/handle-sort-trainings';
import { isArrayWithItems, updatePals } from '@utils/index';
import { Avatar, Badge, Button, Grid, Input, InputRef, List, Space, Typography } from 'antd';

import { DescriptionItem, HighlightText, setSearchedValue } from './helper';

import 'antd/dist/antd.css';
import classes from './index.module.css';

type InviteListComponentProps = {
    joinList: TrainingPalsResponse[],
    setOpenDrawer: (options: OpenDrawerOptions) => void
}

export const InviteListComponent: React.FC<InviteListComponentProps> = ({
    joinList, setOpenDrawer
}) => {
    const dispatch = useDispatch()
    const { createdInvite } = selectPals()
    const { lg } = Grid.useBreakpoint();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState<TrainingPalsResponse[]>([]);
    const searchInput = useRef<InputRef>(null);

    const data = useMemo(() =>
        searchText ? searchedColumn : joinList, [joinList, searchText, searchedColumn])

    const sortedData = useMemo(() => getSortedTraining(data), [data])

    const updatedData = useMemo(() => createdInvite ? updatePals(sortedData, createdInvite) : sortedData, [createdInvite, sortedData])

    const isDisabled = (item: TrainingPalsResponse) => item.status === (InviteStatus.pending || InviteStatus.rejected)

    const handleSearch = (
        value: string
    ) => {
        setSearchText(value)
        const searchedValue = setSearchedValue(joinList, value)

        setSearchedColumn(searchedValue)
    };

    const handleClick = () => {
        dispatch(palsActions.setUserJointList([]))
    }

    return (
        isArrayWithItems(joinList) && <Space direction='vertical' size={24}>
            <Space direction='horizontal' size={[lg ? 160 : 64, 16]} wrap={true}>
                <Space>
                    <Button
                        type='text'
                        icon={<ArrowLeftOutlined />}
                        onClick={handleClick}
                        className={classes.button_back}>
                        <Typography.Title level={4}>Назад</Typography.Title>
                    </Button>
                </Space>
                <Space>
                    <Input.Search
                        data-test-id='search-input'
                        ref={searchInput}
                        onSearch={(value: string) => handleSearch(value)}
                        placeholder="Поиск по имени"
                        className={classes.search_input} />
                </Space>
            </Space>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    md: 2,
                    lg: 4,
                }}
                dataSource={updatedData}
                pagination={{
                    size: 'small',
                    pageSize: 12,
                }}
                renderItem={(item, index) => (
                    <List.Item
                        data-test-id={`joint-training-cards${index}`}
                        key={item.id}
                        className={classes.list_item}
                    >
                        <List.Item.Meta
                            avatar={item.imageSrc ?
                                <Avatar src={item.imageSrc} size={42} /> :
                                <Avatar
                                    size={42}
                                    icon={<UserOutlined />}
                                    style={{ backgroundColor: 'var(--ant-default-avatar)' }} />}
                            title={<HighlightText searchSource={item} searchText={searchText} />}
                        />
                        <DescriptionItem title="Тип тренировки" content={item.trainingType} />
                        <DescriptionItem title="Средняя нагрузка" content={`${item.avgWeightInWeek} кг/нед`} />
                        {item.status === InviteStatus.accepted
                            ? (<Fragment>
                                <Button
                                    size='middle'
                                    block={true}
                                    className={classes.list_button}
                                >
                                    Отменить тренировку
                                </Button>
                                <Space>тренировка одобрена
                                    <Badge count={<CheckCircleTwoTone twoToneColor={['var(--ant-form-background', 'var(--tariff)']} />} />
                                </Space>
                            </Fragment>)
                            :
                            <Fragment>
                                <Button
                                    data-test-id='create-new-training-button'
                                    type='primary'
                                    size='middle'
                                    block={true}
                                    disabled={isDisabled(item)}
                                    className={classes.list_button}
                                    onClick={() => setOpenDrawer({
                                        mode: DrawerMode.invite, isOpen: true, userFrom: item
                                    })}
                                >
                                    Создать тренировку
                                </Button>
                                {isDisabled(item) && (item.status === InviteStatus.pending
                                    ? <span>ожидает подтверждения</span>
                                    : <Space>тренировка отклонена
                                        <Badge count={<ExclamationCircleOutlined />} />
                                    </Space>)}
                            </Fragment>}
                    </List.Item>
                )} />
        </Space>)
};
