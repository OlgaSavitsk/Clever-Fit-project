import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { InviteResponse } from '@redux/pals';
import { Button } from 'antd';

import 'antd/dist/antd.css';

type LoadButtonProps = {
    invites: InviteResponse[]
    setListdata: (list: InviteResponse[]) => void
}

export const LoadButton: React.FC<LoadButtonProps> = ({ invites, setListdata }) => {
    const [isHidden, setHidden] = useState(true);

    const list = useMemo(() =>
        isHidden ? invites.slice(0, 1) : invites
        , [invites, isHidden])

    const onLoadFeedbacks = useCallback(() => {
        setHidden(false);
        setListdata(list);
    }, [list, setListdata]);

    const onHideFeedbacks = useCallback(() => {
        setHidden(true);
        setListdata(list);
    }, [list, setListdata]);

    useLayoutEffect(() => {
        setListdata(list);
    }, [list, setListdata])

    return (
        <Button
            data-test-id='all-reviews-button'
            type='link'
            icon={<DownOutlined />}
            style={{ fontSize: 'var(--fs-base)' }} size='large'
            onClick={isHidden ? onLoadFeedbacks : onHideFeedbacks}
        >
            {isHidden ? 'Показать все сообщения' : 'Скрыть все сообщения'}
        </Button>
    )
};