import { RoutePath } from './routes.constants';

export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?!.*\W])[a-zA-Z\d]{8,}/;

export const tabItems = [
    { label: 'Вход', key: RoutePath.SignIn},
    { label: 'Регистрация', key: RoutePath.SignUp },
];

export const TIPS = 'Пароль не менее 8 символов, с заглавной буквой и цифрой';
