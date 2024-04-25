import { HttpStatusCode } from '@constants/index';
import { Modal } from 'antd';

import { modal } from './modal-error.helper';

import 'antd/dist/antd.css';
import classes from './index.module.css';

export const ModalErrorComponent = (
    statusCode: number,
    fn?: (val: boolean) => void
) => {
    Modal.destroyAll()

    const context = modal[statusCode as HttpStatusCode]

    return Modal.error({
        title: context?.title,
        content: context?.content,
        icon: context?.icon,
        okText: <span data-test-id='big-file-error-close'>
            {context?.buttonText}
        </span>,
        onOk() {
            if (fn) fn(true)
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
        className: classes.profile_modal
    })
};
