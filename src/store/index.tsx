import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
/* tslint:disable-next-line */
import { composeWithDevTools } from 'redux-devtools-extension';

import { sessionReducer } from './session/reducers';

const rootReducer = combineReducers({
  session: sessionReducer
});

export type AppState = ReturnType<typeof rootReducer>;

const configureStore = () => {
  const middleWares = [thunk];
  const middleWareEnhancer = applyMiddleware(...middleWares);

  const store = createStore(
    rootReducer, 
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
};

export default configureStore;