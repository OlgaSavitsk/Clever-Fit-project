import { TrainingListResponse, TrainingResponse } from '@redux/training'

const getPopularTraining = (userTrainings: TrainingResponse[]): string | undefined => {
    let accSum = 0
    const popularTrainingType = userTrainings.reduce<TrainingResponse | null>((acc, currentTraining) => {
        const exerciseSum = currentTraining.exercises
            .map((exercise => exercise.approaches * exercise.replays * exercise.weight))
            .reduce((item, index) => item + index, 0)

        if (exerciseSum > accSum) {
            accSum = exerciseSum

            return currentTraining
        }

        return acc
    }, null)

    return popularTrainingType?.name
}

export const setTrainingType = (trainingList: TrainingListResponse[], userTrainings: TrainingResponse[]) => {
    const currentTrainingName = getPopularTraining(userTrainings)
    const type = trainingList.find(training => training.name === currentTrainingName)

    return type?.key
}