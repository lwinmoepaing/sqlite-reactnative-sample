import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

//

const PlaceDetailScreen = ({ navigation, route }) => {
	const placeTitle = route.params?.placeTitle
	const placeId = route.params?.placeId
	// Set Navigaition Options
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: placeTitle,
		})
	})

	return (
		<View>
			<Text> PlaceDetailScreen {placeId}</Text>
		</View>
	)
}

const styles = StyleSheet.create({})

export default PlaceDetailScreen
