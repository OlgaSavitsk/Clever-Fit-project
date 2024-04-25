import { apiService } from '.';

export function signUp<T>(data: T): Promise<void> {
   return apiService.post('/auth/registration', data)
} 

export function signIn<T>(data: T): Promise<void> {
   return apiService.post('/auth/login', data)
} 

export function checkEmail<T>(data: T): Promise<void> {
   return apiService.post('/auth/check-email', data)
} 

export function confirmEmail<T>(data: T): Promise<void> {
   return apiService.post('/auth/confirm-email', data)
}

export function changePassword<T>(data: T): Promise<void> {
   return apiService.post('auth/change-password', data)
} 