import { FeedbacksResponse } from '@redux/feedbacks';

import apiService from './api.service';

export function getFeedbacks(): Promise<FeedbacksResponse[]> {
    return apiService.get('/feedback');
}

export function postFeedback<T>(data: T): Promise<void> {
    return apiService.post('/feedback', data);
}
