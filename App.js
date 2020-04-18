import React from 'react'
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
// Reducers
import placeReducer from './store/reducer/place'
// Navigator
import PlaceNavigator from './navigators/PlaceNavigator'

const rootReducer = combineReducers({
	places: placeReducer,
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
	return (
		<Provider store={store}>
			<PlaceNavigator />
		</Provider>
	)
}
