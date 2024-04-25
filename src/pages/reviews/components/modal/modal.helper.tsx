import { ReactNode } from 'react'
import { To } from 'react-router-dom'
import { HttpStatusCode } from '@constants/index'
import { RoutePath } from '@constants/routes.constants'
import { ResultStatusType } from 'antd/lib/result'

type ObjectResult = {
    [key in HttpStatusCode]?: ModalContext;
}

type ModalContext = {
    status: ResultStatusType,
    title: string,
    buttonText: string,
    subTitle?: ReactNode,
    redirectPath?: To,
    dataId?: string
}

export const modalContext: ObjectResult = {
    [HttpStatusCode.OK]: {
        status: 'success',
        title: 'Отзыв успешно опубликован',
        buttonText: 'Отлично',
        dataId: 'registration-enter-button'
    },
    [HttpStatusCode.NOT_FOUND]: {
        status: 'error',
        title: 'Данные не сохранились',
        subTitle: <p>Что-то пошло не так. Попробуйте ещё раз.</p>,
        buttonText: 'Написать отзыв',
        dataId: 'write-review-not-saved-modal'
    },
    [HttpStatusCode.INTERNAL_SERVER_ERROR]: {
        status: '500',
        title: 'Что-то пошло не так',
        subTitle: <p>Произошла ошибка, попробуйте ещё раз.</p>,
        buttonText: 'Назад',
        redirectPath: RoutePath.Home,
    }
}
