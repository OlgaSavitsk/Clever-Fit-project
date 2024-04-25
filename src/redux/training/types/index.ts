export enum TrainingTypes {
    GET_TRAINING = 'GET_TRAINING',
    SET_TRAINING = 'SET_TRAINING',
    GET_TRAINING_LIST = 'GET_TRAINING_LIST',
    SET_TRAINING_LIST = 'SET_TRAINING_LIST',
    POST_TRAINING_REQUEST = 'POST_TRAINING_REQUEST',
    POST_TRAINING_SUCCESS = 'POST_TRAINING_SUCCESS',
    PUT_TRAINING_REQUEST = 'PUT_TRAINING_REQUEST',
    PUT_TRAINING_SUCCESS = 'PUT_TRAINING_SUCCESS',
}

export type TrainingState = {
    trainings: TrainingResponse[];
    trainingsList: TrainingListResponse[];
    statusCode: number | undefined;
};

export type TrainingAction<Payload> = {
    type: TrainingTypes;
    payload: Payload;
};

export type TrainingReducer = (
    state: TrainingState,
    actions: TrainingAction<TrainingState>,
) => TrainingState;

export type TrainingResponse = {
    _id?: string;
    name: string;
    date: number;
    isImplementation: boolean;
    userId?: string;
    parameters: {
        repeat: boolean;
        period: number | null;
        jointTraining: boolean;
        participants: string[];
    };
    exercises: Exercises[];
};

export type Exercises = {
    _id: string;
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation?: boolean;
};

export type TrainingListResponse = {
    name: string;
    key: string;
};

export type TrainingPayload = {
    name: string;
    date: number;
    exercises: Exercises;
};

export type TrainingError = {
    statusCode: number;
    error: string;
    message: string;
};
