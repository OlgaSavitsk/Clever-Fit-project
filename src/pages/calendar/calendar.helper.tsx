type TrainingBadgeColor = {
    color: string,
    name: string
}

const trainingBadgeColor: TrainingBadgeColor[] = [
    { color: 'red', name: 'Ноги' },
    { color: 'yellow', name: 'Силовая' },
    { color: 'cyan', name: 'Руки' },
    { color: 'green', name: 'Грудь' },
    { color: 'orange', name: 'Спина' }
]


export const setColor = (trainingName: string) => trainingBadgeColor
        .find((training: TrainingBadgeColor) => training.name === trainingName)?.color