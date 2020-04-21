import React from 'react'
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
// Database
import * as Db from './utils/db'
// Reducers
import placeReducer from './store/reducer/place'
// Navigator
import PlaceNavigator from './navigators/PlaceNavigator'

const rootReducer = combineReducers({
	places: placeReducer,
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

Db.init()
	.then(() => {
		console.log('Initialization Database ')
	})
	.catch((error) => {
		console.log('Initialization Database Failed.')
		console.log(error)
	})

export default function App() {
	return (
		<Provider store={store}>
			<PlaceNavigator />
		</Provider>
	)
}
