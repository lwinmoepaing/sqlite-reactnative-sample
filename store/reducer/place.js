import { ADD_PLACE, SET_PLACE } from '../action/place'
import Place from '../../models/Place'

const initialState = {
	places: [],
}

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_PLACE:
			const newPlace = new Place(
				action.placeData.id,
				action.placeData.title,
				action.placeData.image
			)
			return {
				...state,
				places: state.places.concat(newPlace),
			}
		case SET_PLACE:
			const places = action.places.map(
				(place) =>
					new Place(
						place.id.toString(),
						place.title,
						place.imageUri,
						place.lat,
						place.lng
					)
			)
			return {
				...state,
				places,
			}
		default:
			return state
	}
}
