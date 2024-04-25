import { HttpStatusCode } from '@constants/index';
import { Modal } from 'antd';

import { modalContext } from './modal-error.helper';

import 'antd/dist/antd.css';
import classes from './index.module.css';

type ModalErrorComponentProps = {
    statusCode: HttpStatusCode,
    cb?: () => void,
}

export const ModalErrorComponent = ({ statusCode, cb }: ModalErrorComponentProps) => {
    Modal.destroyAll()

    const context = modalContext[statusCode]

    return context && Modal.error({
        title: context?.title,
        content: context?.content,
        icon: context?.icon,
        okText: <span data-test-id='modal-error-user-training-button'>
            {context?.buttonText}
        </span>,
        onOk() {
            if (cb) cb()
            Modal.destroyAll()
        },
        okButtonProps: {
            type: 'primary',
            size: 'large'
        },
        closeIcon: context?.closeIcon,
        closable: true,
        centered: true,
        bodyStyle: {
            padding: 'calc(8 * var(--margin-space))'
        },
        maskStyle: {
            backdropFilter: 'blur(3px)',
            background: 'var(--mask-bg)'
        },
        className: classes.calendar_modal
    })
};
