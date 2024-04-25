import { DEFAULT_STORAGE_CONFIG, LocalStorageKey } from '@constants/index';
import { getStorageValue } from '@hooks/index';
import { store } from '@redux/configure-store';
import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';

const createHeaderConfig = (config: InternalAxiosRequestConfig) => {
    const { accessToken } = getStorageValue(LocalStorageKey.authToken, DEFAULT_STORAGE_CONFIG);
    const currentToken = store.getState().authStore.token;
    const token = currentToken || accessToken;
    const configOptions = { ...config };

    if (token) {
        configOptions.headers.Authorization = `Bearer ${token}`;
    }

    return config;
};

class ApiClient {
    private api: AxiosInstance;

    constructor(axiosConfig: AxiosRequestConfig) {
        this.api = axios.create(axiosConfig);
        this.api.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => createHeaderConfig(config),
            (error: AxiosError): Promise<AxiosError> => Promise.reject(error),
        );
        this.api.interceptors.response.use((response: AxiosResponse) => response);
    }

    get<T>(url: string, params: unknown = {}, requestConfig?: AxiosRequestConfig): Promise<T> {
        return this.api({
            method: 'get',
            url,
            params,
            ...requestConfig
        });
    }

    post<T>(url: string, data: unknown = {}, requestConfig?: AxiosRequestConfig): Promise<T> {
        return this.api({
            method: 'post',
            url,
            data,
            ...requestConfig
        });
    }

    put(url: string, data: unknown = {}, requestConfig?: AxiosRequestConfig): Promise<void> {
        return this.api({
            method: 'put',
            url,
            data,
            ...requestConfig
        });
    }

    delete(url: string, data: unknown = {}, requestConfig?: AxiosRequestConfig): Promise<void> {
        return this.api({
            method: 'delete',
            url,
            data,
            ...requestConfig
        });
    }
}

const apiClient = new ApiClient({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    responseType: 'json',
});

export default apiClient;
