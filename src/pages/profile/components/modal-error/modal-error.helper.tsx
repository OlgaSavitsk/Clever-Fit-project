import { ReactNode } from 'react'
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons'
import { HttpStatusCode } from '@constants/index'
import { Typography } from 'antd'

type ObjectResult = {
    [key in HttpStatusCode]?: ModalContext
}

export type ModalContext = {
    title: ReactNode,
    buttonText: string,
    content: ReactNode,
    icon?: ReactNode,
    closeIcon?: ReactNode
}

export const modal: ObjectResult = {
    [HttpStatusCode.CONFLICT]: {
        title: <Typography.Text strong={true}>
            Файл слишком большой
        </Typography.Text>,
        content: <Typography.Text>
            Выберите файл размером менее 5 МБ.
        </Typography.Text>,
        icon: <CloseCircleOutlined style={{ color: 'red' }} />,
        buttonText: 'Закрыть',
        closeIcon: <CloseOutlined />,
    },
    [HttpStatusCode.INTERNAL_SERVER_ERROR]: {
        title: <Typography.Text strong={true}>
            При сохранении данных произошла ошибка
        </Typography.Text>,
        content: <Typography.Text>
            Придётся попробовать ещё раз
        </Typography.Text>,
        icon: <CloseCircleOutlined style={{ color: 'red' }} />,
        buttonText: 'Закрыть',
    },
}