type Achive = {
    labelTabs: string;
    listLoadTitle: string;
    listFrequentTitle: string;
    cardsWithStatPerDay: {
        [key: string]: string;
    };
    cardsWithFrequentData: {
        [key: string]: string;
    };
};

export const config: Achive = {
    labelTabs: 'Тип тренировки:',
    listLoadTitle: 'Средняя силовая нагрузка по дням недели',
    listFrequentTitle: 'Самые частые упражнения по дням недели',
    cardsWithStatPerDay: {
        totalLoad: 'Общая нагрузка, кг',
        totalLoadPerDay: 'Нагрузка в день, кг',
        replaysPerDay: 'Количество повторений, раз',
        approachesPerDay: 'Подходы, раз',
    },
    cardsWithFrequentData: {
        trainingName: 'Самая частая тренировка',
        exerciseName: 'Самое частое упражнение',
    },
};
