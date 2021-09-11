import {store} from "../Store";

store.subscribe(() => {
  // console.log("Printing REDUX store (for debugging):");
  // console.log(store.getState().conversation.currentConversation);
});
