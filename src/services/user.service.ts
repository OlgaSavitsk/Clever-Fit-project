import { TariffPayment, UploadPayload, UserPayload, UserResponse } from '@redux/user';
import { AxiosProgressEvent } from 'axios';

import apiService from './api.service';

export function getUser(): Promise<UserResponse> {
    return apiService.get('/user/me');
}

export function updateUser(data: UserPayload) {
    return apiService.put('/user', data);
}

export function uploadFile(
    data: UploadPayload,
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) {
    return apiService.post(
        '/upload-image',
        { file: data },
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            ...{ onUploadProgress },
        },
    );
}

export function getTariffList(): Promise<UserResponse> {
    return apiService.get('/catalogs/tariff-list');
}

export function paymentTariff(data: TariffPayment) {
    return apiService.post('/tariff', data);
}
