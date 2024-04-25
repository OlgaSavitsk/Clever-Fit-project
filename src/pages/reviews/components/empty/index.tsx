import { CSSProperties } from 'react';
import { ButtonModal } from '@components/index';
import { selectLoading } from '@redux/loader';
import { Card, Grid, Space } from 'antd';
import Meta from 'antd/lib/card/Meta';

import 'antd/dist/antd.css';
import classes from './index.module.css';

type EmptyProps = {
    setOpenFeedModal: (openFeedModal: boolean) => void
}

const { useBreakpoint } = Grid;

const cardBodyStyle: CSSProperties = {
    minHeight: '245px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
}

export const EmptyComponent: React.FC<EmptyProps> = ({ setOpenFeedModal }: EmptyProps) => {
    const isLoading = selectLoading()
    const { xs } = useBreakpoint();

    return (
        !isLoading && <Space align='center' direction="vertical" size={[0, xs ? 44 : 17]}
            className={classes.empty_modal}
        >
            <Card
                bordered={false}
                bodyStyle={cardBodyStyle}>
                <Meta title="Оставьте свой отзыв первым"
                    description=" Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении. Поделитесь своим мнением и опытом с другими пользователями, и помогите им сделать правильный выбор." />
            </Card>
            <ButtonModal
                setOpenFeedModal={setOpenFeedModal}
                dataId="write-review"
                style={{ width: xs ? '100%' : 'auto' }} />
        </Space>
    );
};
