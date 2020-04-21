import * as FileSystem from 'expo-file-system'
import * as Db from '../../utils/db'

export const ADD_PLACE = 'ADD_PLACE'
export const SET_PLACE = 'SET_PLACE'

// Actions Methods
export const addPlace = (title, image) => {
	return async (dispatch) => {
		const imgName = image.split('/').pop()
		const newImagePath = FileSystem.documentDirectory + imgName

		try {
			await FileSystem.moveAsync({
				from: image,
				to: newImagePath,
			})

			const result = await Db.insertPlace(
				title,
				newImagePath,
				'Dummy Address',
				15.6,
				12.3
			)

			const id = result.insertId

			dispatch({
				type: ADD_PLACE,
				placeData: {
					id,
					title,
					image: newImagePath,
				},
			})
		} catch (e) {
			console.log(e)
		}
	}
}

export const loadedData = () => {
	return async (dispatch) => {
		try {
			const dbResponse = await Db.fetchPlaces()

			dispatch({
				type: SET_PLACE,
				places: dbResponse.rows._array,
			})
		} catch (error) {
			throw error
		}
	}
}
