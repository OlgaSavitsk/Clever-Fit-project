import { TrainingFormValue } from '@pages/calendar/types';
import { InviteRequest, InviteResponse, InviteResponseRequest, JointListPayload } from '@redux/pals';
import { TrainingListResponse, TrainingResponse } from '@redux/training';

import apiService from './api.service';

export function getTraining(): Promise<TrainingResponse[]> {
    return apiService.get('/training');
}

export function getTrainingList(): Promise<TrainingListResponse[]> {
    return apiService.get('/catalogs/training-list');
}

export function postTraining(data: TrainingFormValue): Promise<void> {
    return apiService.post('/training', data);
}

export function putTraining({ _id, ...trainings }: TrainingResponse): Promise<void> {
    return apiService.put(`/training/${_id}`, trainings);
}

export function getTrainingPals(): Promise<void> {
    return apiService.get('/catalogs/training-pals');
}

export function getUserJointList(data?: JointListPayload): Promise<void> {
    return apiService.get('/catalogs/user-joint-training-list', data);
}

export function getInvite(): Promise<void> {
    return apiService.get('/invite');
}

export function createInvite({ to, trainingId }: InviteRequest): Promise<InviteResponse> {
    return apiService.post<InviteResponse>('/invite', { to, trainingId });
}

export function responseInvite(data: InviteResponseRequest): Promise<void> {
    return apiService.put('/invite', data);
}

export function cancelInvite(inviteId : string): Promise<void> {
    return apiService.delete(`/invite/${inviteId }`);
}
