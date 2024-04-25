import { FeedbacksResponse } from '@redux/feedbacks';

const sort = (data: FeedbacksResponse[], action: CallableFunction): FeedbacksResponse[] => {
    const sorted = data.sort((a: FeedbacksResponse, b: FeedbacksResponse) =>
        action(a, b) ? -1 : 1,
    );

    return sorted;
};

const sortByDate = (a: FeedbacksResponse, b: FeedbacksResponse): boolean =>
    new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime();

export const handleSortDate = (data: FeedbacksResponse[]) => sort(data, sortByDate);
