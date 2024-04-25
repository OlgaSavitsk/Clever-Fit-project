import { TrainingFormValue } from '@pages/calendar/types';
import { TrainingResponse } from '@redux/training';

export enum PalsTypes {
    GET_TRAINING_PALS = 'GET_TRAINING_PALS',
    SET_TRAINING_PALS = 'SET_TRAINING_PALS',
    GET_USER_JOINT_LIST = 'GET_USER_JOINT_LIST',
    GET_INVITE = 'GET_INVITE',
    SET_INVITE = 'SET_INVITE',
    CREATE_INVITE_REQUEST = 'CREATE_INVITE_REQUEST',
    CREATE_INVITE_SUCCESS = 'CREATE_INVITE_SUCCESS',
    RESPONSE_INVITE_REQUEST = 'RESPONSE_INVITE_REQUEST',
    RESPONSE_INVITE_SUCCESS = 'RESPONSE_INVITE_SUCCESS',
    CANCEL_INVITE_REQUEST = 'CANCEL_INVITE_REQUEST',
    CANCEL_INVITE_SUCCESS = 'CANCEL_INVITE_SUCCESS',
    SET_USER_JOINT_LIST = 'SET_USER_JOINT_LIST',
}

export type PalsState = {
    pals: TrainingPalsResponse[];
    invites: InviteResponse[];
    joinList: TrainingPalsResponse[];
    createdInvite: InviteResponse | null
};

export type PalsAction<Payload> = {
    type: PalsTypes;
    payload: Payload;
};

export type TrainingReducer = (state: PalsState, actions: PalsAction<PalsState>) => PalsState;

export type TrainingPalsResponse = {
    id: string;
    name: string;
    trainingType: string;
    imageSrc: string | null;
    avgWeightInWeek: number;
    inviteId: string;
    status: 'accepted' | 'pending' | 'rejected' | string;
};

export type InviteResponse = {
    _id: string;
    from: InviteUserFrom;
    training: TrainingResponse;
    status: 'accepted' | 'pending' | 'rejected' | string;
    createdAt: number;
    to: {
        _id: string;
        firstName: string;
        lastName: string;
        imageSrc: string;
    };
};

export type InviteUserFrom = {
    _id: string;
    firstName: string | null;
    lastName: string | null;
    imageSrc: string | null;
};

export type InviteRequest = {
    to: string;
    trainingId: string | undefined;
};

export type InvitePayload = {
    id: string;
    training: TrainingFormValue | TrainingResponse;
};

export type JointListPayload = {
    trainingType: string;
};

export type InviteResponseRequest = {
    id: string;
    status: 'accepted' | 'rejected';
};
