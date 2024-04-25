import { Button } from 'antd'

import classes from './index.module.css';

type ButtonProps = {
    dataId: string;
    setOpenFeedModal?: (openFeedModal: boolean) => void,
    setCloseModalError?: (openFeedModal: boolean) => void
    style?: React.CSSProperties,
}

export const ButtonModal: React.FC<ButtonProps> = (
    { dataId, setOpenFeedModal, setCloseModalError, style }: ButtonProps
) => (
    <Button
        data-test-id={dataId}
        type="primary"
        size='middle'
        style={style}
        className={classes.button}
        onClick={() => {
            if (setCloseModalError) setCloseModalError(false);
            if (setOpenFeedModal) setOpenFeedModal(true);
        }}>
        Написать отзыв
    </Button>
);