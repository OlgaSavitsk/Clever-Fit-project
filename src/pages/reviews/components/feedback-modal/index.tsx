import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RateComponent } from '@components/index';
import { FeedbackPayload, feedbacksActions } from '@redux/feedbacks';
import { Button, Form, Input, Modal } from 'antd';

import 'antd/dist/antd.css';
import classes from './index.module.css';

const { TextArea } = Input;

type FeedbackModalProps = {
    isOpen: boolean,
    setOpenFeedModal: (openFeedModal: boolean) => void,
}

export const FeedbackModalComponent: React.FC<FeedbackModalProps> = (
    { isOpen, setOpenFeedModal }: FeedbackModalProps
) => {
    const dispatch = useDispatch()
    const [isError, setError] = useState(false);
    const [form] = Form.useForm();

    const formVal = Form.useWatch([], form)

    const handleForm = useCallback(() => {
        form.submit()
    }, [form])

    const onFinish = useCallback(async (value: FeedbackPayload) => {
        dispatch(feedbacksActions.postFeedbackRequest(value))
        setOpenFeedModal(false)
        dispatch(feedbacksActions.getFeedbacks())
    }, [dispatch, setOpenFeedModal])

    useEffect(() => {
        form.validateFields().then((val) => setError(!Object.values(val).length))
            .catch(() => setError(true))
    }, [form, formVal])

    return (
        <Modal
            centered={true}
            title="Ваш отзыв"
            open={isOpen}
            onCancel={() => setOpenFeedModal(false)}
            footer={[
                isError ? <Button key="ok" disabled={true} size='large'
                >
                    Опубликовать
                </Button> :
                    <Button
                        data-test-id='new-review-submit-button'
                        key="ok" type="primary" size='large'
                        onClick={handleForm}>
                        Опубликовать
                    </Button>,
            ]}
            width={539}
            maskStyle={{
                backdropFilter: 'blur(3px)',
                background: 'var(--mask-bg)'
            }}
            className={classes.modal_form}
        >
            <Form
                form={form}
                name="normal_login"
                onFinish={onFinish}
                size='large'
            >
                <Form.Item
                    name="rating"
                    rules={[
                        { required: true, message: '' },
                    ]}
                >
                    <RateComponent disabled={false} size={24}
                        setRating={(rate) => form.setFieldValue('rating', rate)} />
                </Form.Item>
                <Form.Item
                    name="message"
                >
                    <TextArea
                        placeholder="Расскажите, почему Вам понравилось наше приложение"
                        autoSize={{ minRows: 1 }} />
                </Form.Item>
            </Form>
        </Modal>
    );
};
