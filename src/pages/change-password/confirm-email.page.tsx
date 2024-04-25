import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import VerificationInput from 'react-verification-input';
import {
    authActions,
    selectAuthEmail,
    selectAuthStatusCode
} from '@redux/auth';
import { Grid, Result, Typography } from 'antd';

import 'antd/dist/antd.css';
import classes from './index.module.css';

const { Text } = Typography;
const { useBreakpoint } = Grid;


export const ConfirmEmailPage: React.FC = () => {
    const dispatch = useDispatch()
    const statusCode = selectAuthStatusCode()
    const email = selectAuthEmail()
    const [value, setValue] = useState<string>('')
    const { xs } = useBreakpoint();


    const onConfirmHandle = useCallback(async (confirmValue: string) => {
        if (email) {
            dispatch(
                authActions.confirmEmailRequest(
                    { email, code: confirmValue, }))
            setValue('')
        }
    }, [dispatch, email])

    const onChange = useCallback((inpuValue: string) => {
        setValue(inpuValue)
    }, [])

    return (
        <Result className={classes.result_layout}
            status={statusCode ? 'error' : 'info'}
            title={statusCode ?
                'Неверный код. Введите код для восстановления аккауанта'
                : `Введите код
                 для восстановления аккауанта`
            }
            subTitle={<Typography.Text type='secondary'>Мы отправили вам на e-mail{' '}
                <Text strong={true}>{email}</Text> шестизначный код. Введите его в поле ниже.</Typography.Text>}
            extra={[
                <VerificationInput
                    inputProps={{ 'data-test-id': 'verification-input' }}
                    key='confirm-input' placeholder='' length={6}
                    onComplete={onConfirmHandle}
                    onChange={onChange}
                    value={value}
                    classNames={{
                        container: classes.container,
                        character: statusCode ? `${classes.character} ${classes.failed}` : classes.character,
                        characterSelected: classes.selected,
                    }} />,
                <Text
                    key='confirm-text'
                    type="secondary"
                    style={{ width: xs ? 230 : '96%' }}>
                    Не пришло письмо? Проверьте папку Спам.
                </Text>
            ]} />

    );
};