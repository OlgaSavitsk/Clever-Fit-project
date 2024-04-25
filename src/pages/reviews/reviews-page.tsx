import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { ButtonModal } from '@components/index';
import { FeedbacksResponse, selectFeedbacks } from '@redux/feedbacks';
import { handleSortDate, isArrayWithItems } from '@utils/index';
import { Button, Grid, Space } from 'antd';

import { CommentList, EmptyComponent, FeedbackModalComponent, ModalComponent } from './components';

import 'antd/dist/antd.css';
import classes from './index.module.css';

const { useBreakpoint } = Grid;

export const ReviewsPage: React.FC = () => {
    const { feedbacks, statusCode } = selectFeedbacks()
    const [isHidden, setHidden] = useState(true);
    const [listData, setListdata] = useState<FeedbacksResponse[]>([]);
    const [open, setOpen] = useState(false);

    const { xs } = useBreakpoint();

    const list = useMemo(() => {
        const sortFeedbacks = handleSortDate([...feedbacks])

        return isHidden ? sortFeedbacks.slice(0, 4) : sortFeedbacks
    }, [feedbacks, isHidden])


    const onLoadFeedbacks = useCallback(() => {
        setHidden(false);
        setListdata(list);
        window.dispatchEvent(new Event('resize'));
    }, [list]);

    const onHideFeedbacks = useCallback(() => {
        setHidden(true);
        setListdata(list);
    }, [list]);

    useEffect(() => {
        setListdata(list);
    }, [list]);

    const loadMore =
        (
            <Space
                align="start"
                size={[11, 17]}
                className={classes.loadButton_wrapper}
                style={{
                    flexDirection: xs ? 'column' : 'row',
                    paddingTop: xs ? '45px' : '90px',
                }}>

                <ButtonModal setOpenFeedModal={(value) => setOpen(value)} dataId="write-review" />

                <Button
                    data-test-id='all-reviews-button'
                    type='link'
                    style={{ fontSize: 'var(--fs-base)' }} size='large'
                    onClick={isHidden ? onLoadFeedbacks : onHideFeedbacks}
                >
                    {isHidden ? 'Развернуть все отзывы' : 'Свернуть все отзывы'}
                </Button>
            </Space>

        )

    return (
        <Fragment>{isArrayWithItems(listData) ?
            <CommentList comments={listData} loadButton={loadMore} />
            : <EmptyComponent setOpenFeedModal={(value) => setOpen(value)} />

        }
            <FeedbackModalComponent isOpen={open} setOpenFeedModal={(value) => setOpen(value)} />
            {statusCode && <ModalComponent status={statusCode} setOpenFeedModal={(value) => setOpen(value)} />}
        </Fragment>

    );
};
