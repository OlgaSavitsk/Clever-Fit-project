import { ReactNode } from 'react'
import { To } from 'react-router-dom'
import { RoutePath } from '@constants/routes.constants'
import { ResultStatusType } from 'antd/lib/result'

type ObjectResult = {
    [key in RoutePath]?: ResultContext;
}

type ResultContext = {
    title: string,
    subTitle: ReactNode,
    buttonText: string,
    redirectPath: To,
    status?: ResultStatusType,
    dataId?: string
}

const result: ObjectResult = {
    [RoutePath.SignUpSuccess]: {
        status: 'success',
        title: 'Регистрация успешна',
        subTitle: <p>Регистрация прошла успешно. Зайдите<br />
            в приложение, используя свои e-mail и пароль.</p>,
        buttonText: 'Войти',
        redirectPath: RoutePath.SignIn,
        dataId: 'registration-enter-button'
    },
    [RoutePath.SignUpFailed]: {
        status: 'error',
        title: 'Данные не сохранились',
        subTitle: <p>Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.</p>,
        buttonText: 'Назад к регистрации',
        redirectPath: RoutePath.SignUp,
        dataId: 'registration-back-button',
    },
    [RoutePath.Error]: {
        status: 'error',
        title: 'Данные не сохранились',
        subTitle: <p>Что-то пошло не так и ваша регистрация<br /> не завершилась. Попробуйте ещё раз.</p>,
        buttonText: 'Повторить',
        redirectPath: RoutePath.SignUp,
        dataId: 'registration-retry-button',
    },
    [RoutePath.SignInError]: {
        status: 'warning',
        title: 'Вход не выполнен',
        subTitle: <p>Что-то пошло не так. Попробуйте еще раз.</p>,
        buttonText: 'Повторить',
        redirectPath: RoutePath.SignIn,
        dataId: 'login-retry-button'
    },
    [RoutePath.CheckemailNoExist]: {
        status: 'error',
        title: 'Такой e-mail не зарегистрирован',
        subTitle: <p>Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.</p>,
        buttonText: 'Попробовать снова',
        redirectPath: RoutePath.SignIn,
        dataId: 'check-retry-button'
    },
    [RoutePath.ChangePasswordSuccess]: {
        status: 'success',
        title: 'Пароль успешно изменен',
        subTitle: <p>Теперь можно войти в аккаунт, используя<br />свой логин и новый пароль.</p>,
        buttonText: 'Войти',
        redirectPath: RoutePath.SignIn,
        dataId: 'change-entry-button'
    },
    [RoutePath.ChangePasswordError]: {
        status: 'error',
        title: 'Данные не сохранились',
        subTitle: <p>Что-то пошло не так. Попробуйте ещё раз.</p>,
        buttonText: 'Повторить',
        redirectPath: RoutePath.ResetPassword,
        dataId: 'change-retry-button'
    },
    [RoutePath.CheckemailError]: {
        status: '500',
        title: 'Что-то пошло не так',
        subTitle: <p>Произошла ошибка, попробуйте отправить форму ещё раз.</p>,
        buttonText: 'Назад',
        redirectPath: RoutePath.SignIn,
        dataId: 'check-back-button'
    }
}

export const resultContext = new Map(Object.entries(result))

