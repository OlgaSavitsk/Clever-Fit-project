
import { InviteStatus } from '@constants/index';

import { InviteResponse, PalsAction, PalsState, PalsTypes, TrainingPalsResponse } from '../types';

const initialState: PalsState = {
    pals: [],
    invites: [],
    joinList: [],
    createdInvite: null,
};

export const palsReducer = <T>(state = initialState, { type, payload }: PalsAction<T>) => {
    switch (type) {
        case PalsTypes.GET_TRAINING_PALS: {
            return state;
        }
        case PalsTypes.SET_TRAINING_PALS: {
            return {
                ...state,
                pals: payload as TrainingPalsResponse[],
            };
        }

        case PalsTypes.GET_INVITE: {
            return state;
        }
        case PalsTypes.SET_INVITE: {
            return {
                ...state,
                invites: [...(payload as InviteResponse[])],
            };
        }

        case PalsTypes.GET_USER_JOINT_LIST: {
            return state;
        }
        case PalsTypes.SET_USER_JOINT_LIST: {
            return {
                ...state,
                joinList: payload as TrainingPalsResponse[],
            };
        }
        case PalsTypes.CREATE_INVITE_REQUEST: {
            return state;
        }
        case PalsTypes.CREATE_INVITE_SUCCESS: {
            return { ...state, createdInvite: payload as InviteResponse };
        }

        case PalsTypes.RESPONSE_INVITE_REQUEST: {
            return state;
        }
        case PalsTypes.RESPONSE_INVITE_SUCCESS: {
            return {
                ...state,
                invites: state.invites.filter((invite) => invite.status !== InviteStatus.pending),
            };
        }

        case PalsTypes.CANCEL_INVITE_REQUEST: {
            return state;
        }
        case PalsTypes.CANCEL_INVITE_SUCCESS: {
            return {
                ...state,
                pals: state.pals.filter((pal) => pal.status !== (payload as InviteResponse).status),
            };
        }
        default:
            return state;
    }
};
