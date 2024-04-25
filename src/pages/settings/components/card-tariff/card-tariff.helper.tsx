import { ReactNode } from 'react'
import { CheckOutlined } from '@ant-design/icons'
import { Button } from 'antd'

export type TariffCardContext = {
    name: string,
    title: string,
    content?: ReactNode,
    dataId?: string,
    defaultTariff?: boolean,
}

export const tariffContext: TariffCardContext[] = [
    {
        name: 'FRE',
        title: 'FREE tarif',
        content: <Button type='text' style={{ color: 'var(--ant-primary-10)', fontWeight: 'var(--fw-m)' }}>активен<CheckOutlined /></Button>,
        defaultTariff: true
    },
    {
        name: 'PRO',
        title: 'PRO tarif',
        dataId: 'pro-tariff-card',
    },
]