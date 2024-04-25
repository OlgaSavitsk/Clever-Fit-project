export const transformPeriod = (value: number | null) => {
    switch (value) {
        case 1:
            return `Через ${value} день`;
        case 2:
        case 3:
        case 4:
            return `Через ${value} дня`;
        case 5:
        case 6:
            return `Через ${value} дней`;
        case 7:
            return '1 раз в неделю';
        default:
            return undefined;
    }
};

export const periodOptions = Array.from({ length: 7 }, (_, index) => index + 1)
