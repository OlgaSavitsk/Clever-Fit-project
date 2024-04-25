import { CloseOutlined } from '@ant-design/icons';
import { LocalStorageKey, RoutePath } from '@constants/index';
import { history } from '@redux/configure-store';
import { Grid, Modal, Result, Typography } from 'antd';

import 'antd/dist/antd.css';
import classes from './index.module.css';

const { useBreakpoint } = Grid;

type ModalProps = {
    open: boolean,
    email: string,
}

export const ModalPaymentComponent: React.FC<ModalProps> = ({ open, email }: ModalProps) => {
    const { xs } = useBreakpoint();

    return (
        <Modal
            data-test-id='tariff-modal-success'
            centered={true}
            open={open}
            footer={null}
            width={xs ? 328 : 539}
            closable={true}
            closeIcon={<CloseOutlined onClick={() => {
                history.push(RoutePath.SignIn)
                window.localStorage.removeItem(LocalStorageKey.authToken)}}
            />}
            destroyOnClose={true}
            maskStyle={{
                backdropFilter: 'blur(4px)',
                background: 'var(--mask-modal-bg)'
            }}
        >
            <Result className={classes.result_layout}
                status='success'
                title='Чек для оплаты у вас на почте'
                subTitle={<Typography.Text type='secondary'>Мы отправили инструкцию для оплаты вам на e-mail{' '}
                    <Typography.Text strong={true}>{email}</Typography.Text>. После подтверждения оплаты войдите в приложение заново.</Typography.Text>}
                extra={[
                    <Typography.Text
                        key='confirm-text'
                        type="secondary"
                    >
                        Не пришло письмо? Проверьте папку Спам.
                    </Typography.Text>
                ]} />

        </Modal>
    );
};
