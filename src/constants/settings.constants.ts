export type SettingsTariff = {
    title: string;
    tariffFree: boolean;
    tariffPro: boolean;
};

export const settingsTariff: SettingsTariff[] = [
    {
        title: 'Статистика за месяц',
        tariffFree: true,
        tariffPro: true,
    },
    {
        title: 'Статистика за всё время',
        tariffFree: false,
        tariffPro: true,
    },
    {
        title: 'Совместные тренировки',
        tariffFree: true,
        tariffPro: true,
    },
    {
        title: 'Участие в марафонах',
        tariffFree: false,
        tariffPro: true,
    },
    {
        title: 'Приложение iOS',
        tariffFree: false,
        tariffPro: true,
    },
    {
        title: 'Приложение Android',
        tariffFree: false,
        tariffPro: true,
    },
    {
        title: 'Индивидуальный Chat GPT',
        tariffFree: false,
        tariffPro: true,
    },
];
