import dayjs, { Dayjs } from 'dayjs';

const numberWeekDays = 7;
const numberMonthDays = 28;

const getLastDayOfWeek = () => {
    const date = dayjs();
    const day = date.day();

    const diff = date.get('date') - day + numberWeekDays;

    return dayjs().set('date', diff);
};

const setDate = (date: Dayjs, index: number) => {
    const dateValue = date.set('date', date.get('date') - index);

    return dateValue;
};

export const getWeekRange = () =>
    [...Array(numberWeekDays).keys()].map((index) => {
        const date = dayjs();

        return setDate(date, index);
    });

export const getMonthRange = () =>
    [...Array(numberMonthDays).keys()].map((index) => {
        const date = getLastDayOfWeek();

        return setDate(date, index);
    });
