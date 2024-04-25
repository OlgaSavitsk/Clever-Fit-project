import { UserOutlined } from '@ant-design/icons';
import { RateComponent } from '@components/index';
import { FeedbacksResponse } from '@redux/feedbacks';
import { handleFormate } from '@utils/index';
import { Avatar, Card, Comment, List, Typography } from 'antd';

import 'antd/dist/antd.css';
import classes from './index.module.css';

type ListProps = {
    comments: FeedbacksResponse[] | undefined
    loadButton: React.ReactNode
}

const { Meta } = Card;

export const CommentList: React.FC<ListProps> = ({ comments, loadButton }: ListProps) => (
    <List
        className={classes.list}
        dataSource={comments}
        itemLayout="horizontal"
        loadMore={loadButton}
        renderItem={(item) =>
            <Comment
                className={classes.comment}
                author={
                    <RateComponent disabled={true} defaultValue={item.rating} />
                }
                avatar={
                    <Meta
                        className={classes.avatar}
                        avatar={item.imageSrc ?
                            <Avatar src={item.imageSrc} style={{width: 42, height: 42}} /> :
                            <Avatar
                                size={42}
                                icon={<UserOutlined />}
                                style={{ backgroundColor: '#F5F5F5' }} />}
                        title={item.fullName ?? 'Пользователь'}
                    />
                }
                content={
                    <Typography.Text
                        className={classes.content}>
                        {item.message}
                    </Typography.Text>
                }
                datetime={<Typography.Text
                    className={classes.date}>
                    {handleFormate(item.createdAt)}
                </Typography.Text>}
            />
        }
    />
);
