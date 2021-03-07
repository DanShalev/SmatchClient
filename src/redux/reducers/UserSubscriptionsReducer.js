import { ADD_USER_SUBSCRIPTION, RESET_SUBSCRIPTIONS, UPDATE_CURRENT_VIEWED_SUBSCRIPTION } from "../actions/actions";

const initialState = {
  currentSubscriptionId: null,  // Id of grouped being viewed (while in match/swipe screens)
  subscriptions: {}
};

const userSubscriptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_SUBSCRIPTION:
      return {
      ...state,
        subscriptions: {
          ...state.subscriptions,
          [action.payload.subscriptionId]: {...action.payload}
        }
    }
    case UPDATE_CURRENT_VIEWED_SUBSCRIPTION:
      return {
        ...state,
        currentSubscriptionId: action.payload
      }
    case RESET_SUBSCRIPTIONS:
      return initialState;
    default:
      return state;
  }
}

export default userSubscriptionsReducer;
