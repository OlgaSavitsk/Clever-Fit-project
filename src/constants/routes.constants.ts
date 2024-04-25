export enum RoutePath {
    Home = '/main',
    SignUp = '/auth/registration',
    SignUpSuccess = '/result/success',
    SignUpFailed = '/result/error-user-exist',
    SignIn = '/auth',
    SignInError = '/result/error-login',
    Error = '/result/error',
    CheckemailNoExist = '/result/error-check-email-no-exist',
    CheckemailError = '/result/error-check-email',
    ChangePasswordError = '/result/error-change-password',
    ChangePasswordSuccess = '/result/success-change-password',
    ConfirmEmail = '/auth/confirm-email',
    ResetPassword = '/auth/change-password',
    Feedbacks = '/feedbacks',
    Calendar = '/calendar',
    Profile = '/profile',
    Settings = '/settings',
    Trainings = '/training',
    Achievements = '/achievements'
}

export enum LayoutType {
    CONFIRM = 'confirm',
    RESET = 'reset',
}

type RoutesLayout = {
    [key in RoutePath]?: {
        layout: LayoutType;
    };
};

export const confirmLayout: RoutesLayout = {
    [RoutePath.ConfirmEmail]: {
        layout: LayoutType.CONFIRM,
    },
    [RoutePath.ResetPassword]: {
        layout: LayoutType.RESET,
    },
};
