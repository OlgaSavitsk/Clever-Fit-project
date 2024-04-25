import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { ButtonModal } from '@components/index';
import { HttpStatusCode } from '@constants/index';
import { history } from '@redux/configure-store';
import { Button, Grid, Modal, Result } from 'antd';

import { modalContext } from './modal.helper';

import 'antd/dist/antd.css';
import classes from './index.module.css';

const { useBreakpoint } = Grid;

type ModalProps = {
    status: HttpStatusCode,
    setOpenFeedModal?: (openFeedModal: boolean) => void
}

export const ModalComponent: React.FC<ModalProps> = ({ status, setOpenFeedModal }: ModalProps) => {
    const [open, setOpen] = useState(false);
    const { xs } = useBreakpoint();

    const context = useMemo(() => {
        if (status) return modalContext[status];

        return undefined
    }, [status]);

    const handleRedirect = useCallback(() => {
        if (context?.redirectPath) history.push(context.redirectPath)
        setOpen(false)
    }, [context])

    useEffect(() => {
        setOpen(true)
    }, [])

    return (
        <Modal
            data-test-id='modal-no-review'
            centered={true}
            open={open}
            footer={null}
            onCancel={() => setOpen(false)}
            width={xs ? 328 : 539}
            closable={false}
            destroyOnClose={true}
            bodyStyle={{ padding: xs ? '32px 16px' : '38px 85.5px' }}
            maskStyle={{
                backdropFilter: 'blur(4px)',
                background: 'var(--mask-modal-bg)'
            }}
        >
            {context && <Result
                status={context.status}
                title={context.title}
                subTitle={context.subTitle}
                className={classes.modal}
                extra={[
                    status === HttpStatusCode.NOT_FOUND ?
                        <Fragment><ButtonModal key='write'
                            style={{ width: '100%' }}
                            setOpenFeedModal={setOpenFeedModal}
                            setCloseModalError={(value) => setOpen(value)}
                            dataId="write-review-not-saved-modal" />
                            <Button key='close' size="large"
                                onClick={() => setOpen(false)}
                                style={{ width: '100%' }}>
                                Закрыть
                            </Button></Fragment>
                        : <Button
                            data-test-id={context.dataId}
                            type="primary"
                            size="large"
                            key="console"
                            style={{ width: status === HttpStatusCode.INTERNAL_SERVER_ERROR ? 'auto' : '100%' }}
                            onClick={handleRedirect}
                        >
                            {context.buttonText}
                        </Button>,
                ]} />}
        </Modal>
    );
};
