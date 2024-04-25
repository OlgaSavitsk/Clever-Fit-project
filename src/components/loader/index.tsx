import { selectLoading } from '@redux/loader/selectors';
import { Space, Spin } from 'antd';
import Lottie from 'lottie-react';

import loader from './loader.json';

import 'antd/dist/antd.css';
import classes from './index.module.css';

export const Loader: React.FC = () => {
    const isLoading = selectLoading()

    return (
        isLoading ?
            <Space direction="vertical" align="center" >
                <Spin indicator={
                    <Lottie
                        data-test-id='loader'
                        animationData={loader}
                        loop={true} />}
                    className={classes.loader_wrapper} />
            </Space>
            : null
    )
}