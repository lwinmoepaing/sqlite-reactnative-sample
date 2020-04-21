import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import ENV from '../../env'

const MapPreview = (props) => {
	const API_KEY = ENV.googleApiKey
	const mapSize = '400x200'
	let mapPreviewUrl

	if (props.location) {
		const { lat, lng } = props.location
		mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=${mapSize}&maptype=roadmap&markers=color:red%7Clabel:C%7C${lat},${lng}&key=${API_KEY}`
	}

	useEffect(() => {
		console.log(mapPreviewUrl)
	}, [props.location])

	return (
		<View style={{ ...styles.mapPreview, ...props.style }}>
			<Text> Map Preview </Text>
			{props.location ? (
				<Image style={styles.mapImage} source={{ uri: mapPreviewUrl }} />
			) : (
				props.children
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	mapPreview: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	mapImage: {
		width: '100%',
		height: '100%',
	},
})

export default MapPreview
