import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
/* tslint:disable-next-line */
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import { sessionReducer } from './session/reducer'

const rootReducer = combineReducers({
  session: sessionReducer
})

export type AppState = ReturnType<typeof rootReducer>

const configureStore = () => {
  const middleWares = [thunk]
  const middleWareEnhancer = applyMiddleware(...middleWares)

  const store = createStore(
    rootReducer, 
    composeWithDevTools(middleWareEnhancer)
  )

  return store
}

export default configureStore;