import {
    ADD_PROFILE, REMOVE_FIRST_PROFILE,
} from "../actions/actions";

const initialState = {
    profiles: {},
};

const profilesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PROFILE:
            if (!state.profiles[action.currentGroupId]) {
                state.profiles[action.currentGroupId] = [];
            }
            let currentProfiles = state.profiles[action.currentGroupId];
            if (!currentProfiles.some((e) => e.id === action.payload.id)) {
                currentProfiles = [...currentProfiles, action.payload];
                return {
                    profiles: {
                        ...state.profiles,
                        [action.currentGroupId]: [...currentProfiles],
                    },
                };
            } else {
                return state;
            }
        case REMOVE_FIRST_PROFILE:
            return {
                profiles: {
                    ...state.profiles,
                    [action.currentGroupId]: state.profiles[action.currentGroupId].slice(1),
                },
            };
        default:
            return state;
    }
};

export default profilesReducer;
