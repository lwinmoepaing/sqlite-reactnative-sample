import React, { useState } from 'react'
import {
	View,
	Text,
	ActivityIndicator,
	StyleSheet,
	Button,
	Alert,
} from 'react-native'
import * as Permission from 'expo-permissions'
import * as Location from 'expo-location'
// Theme
import Color from '../../constants/Color'
import MapPreview from './MapPreview'

const LocationPicker = () => {
	const [pickedLoaction, setPickedLoaction] = useState(null)
	const [isFetching, setIsFetching] = useState(false)

	const verifyPermission = async () => {
		const result = await Permission.askAsync(Permission.LOCATION)

		if (result.status !== 'granted') {
			Alert.alert(
				'Insufficient Permission',
				'You had to grant location Permission!!',
				[{ text: 'Okay' }]
			)
			return false
		}
		return true
	}

	const geolocationHandler = async () => {
		const hasPermission = await verifyPermission()

		if (!hasPermission) {
			return
		}

		try {
			setIsFetching(true)
			setPickedLoaction(null)
			const location = await Location.getCurrentPositionAsync({ timeout: 5000 })
			const lat = location.coords.latitude
			const lng = location.coords.longitude
			setPickedLoaction({
				lat,
				lng,
			})
			setIsFetching(false)
		} catch (e) {
			setIsFetching(false)
			Alert.alert(
				'Counld not fetch loaction!',
				'Please try again later or pick a location on map.',
				[{ text: 'Okay' }]
			)
			console.log(e)
		}
	}

	return (
		<View style={styles.container}>
			<MapPreview style={styles.mapPreview} location={pickedLoaction}>
				{isFetching ? (
					<ActivityIndicator size="large" color={Color.primary} />
				) : (
					<Text> Not Found Place</Text>
				)}
			</MapPreview>

			<Button
				color={Color.primary}
				title="Get User Location"
				onPress={geolocationHandler}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 10,
	},
	mapPreview: {
		width: '100%',
		height: 150,
		borderColor: '#888',
		borderWidth: 1,
		marginBottom: 10,
	},
})

export default LocationPicker
