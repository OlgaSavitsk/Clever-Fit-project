import { Fragment, useCallback, useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { selectError } from '@redux/error';
import { selectUserState, userActions } from '@redux/user';
import { isArrayWithItems } from '@utils/index';
import { Button, Grid, Modal, Typography, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile, UploadFileStatus } from 'antd/es/upload/interface';
import { UploadChangeParam } from 'antd/lib/upload';

import 'antd/dist/antd.css';
import classes from './index.module.css';

type UploadFileProps = {
    currentUserImg: string;
    isCloseModalError: boolean;
    setIsCloseModal: (isCloseModalError: boolean) => void,
    setComponentDisabled: (value: boolean) => void
}

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });

export const UploadComponent: React.FC<UploadFileProps> = ({
    currentUserImg,
    isCloseModalError,
    setComponentDisabled,
    setIsCloseModal
}: UploadFileProps) => {
    const dispatch = useDispatch()
    const { progress } = selectUserState()
    const { statusCode } = selectError()
    const { xs } = Grid.useBreakpoint();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const [fileList, setFileList] = useState<UploadFile[]>(
        currentUserImg ? [{
            uid: '-1',
            name: previewTitle,
            status: 'done',
            url: currentUserImg
        }] : []);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        const fileUploaded = { ...file }

        if (!fileUploaded.url && !fileUploaded.preview) {
            fileUploaded.preview = await getBase64(file.originFileObj as RcFile);
        }
        setPreviewImage(fileUploaded.url || (fileUploaded.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(
            fileUploaded.name || fileUploaded.url!.substring(fileUploaded.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = useCallback(({ fileList: newList, file }: UploadChangeParam) => {
        setFileList(newList);
        setComponentDisabled(false)
        if (file.status === 'removed') {
            dispatch(userActions.putUserRequest({ imgSrc: '' }))
        }
    }, [dispatch, setComponentDisabled])

    const customRequest = useCallback(({ file }: any) => {
        dispatch(userActions.uploadFileRequest(file))
        dispatch(userActions.getUser())
    }, [dispatch]);

    const setFileAfterError = useCallback(() => {
        if (isCloseModalError) setFileList([])
        setIsCloseModal(false)
    }, [isCloseModalError, setIsCloseModal])

    useLayoutEffect(() => {
        if (progress)
            setFileList([...fileList.map((file) => (
                {
                    ...file,
                    percent: progress,
                    status: progress === 100 ? 'done' : 'uploading' as UploadFileStatus,
                    url: currentUserImg
                }))])
        if (statusCode) {
            setFileList([
                {
                    uid: '-2',
                    name: 'img.jpg',
                    status: 'error',
                }])
        }
        setFileAfterError()

    }, [statusCode, progress, currentUserImg, previewTitle, setFileAfterError])

    const uploadButton = (
        <div>
            {xs ? <Button block={true} icon={<UploadOutlined style={{ color: 'var(--ant-text)' }} />}>Загрузить</Button> :
                <Fragment>
                    <PlusOutlined /><div className={classes.upload_button}>Загрузить фото профиля</div>
                </Fragment>}
        </div>
    );

    return (
        <Fragment>
            {(!currentUserImg && xs) && <Typography.Text style={{ fontSize: 'var(--fs-sm)' }}>Загрузить фото профиля:</Typography.Text>}
            <Upload
                listType={xs ? 'picture' : 'picture-card'}
                fileList={fileList}
                customRequest={customRequest}
                onPreview={handlePreview}
                onChange={handleChange}
                progress={{
                    strokeColor: 'var(--ant-primary-6)',
                    strokeWidth: 2,
                    showInfo: false,
                }}
                style={{ width: '100%' }}
            >
                {isArrayWithItems(fileList) ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </Fragment >
    )
};
