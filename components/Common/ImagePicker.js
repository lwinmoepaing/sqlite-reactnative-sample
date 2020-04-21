import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { View, Text, Image, StyleSheet, Button, Alert } from 'react-native'
import * as Permissions from 'expo-permissions'
// Theme
import Color from '../../constants/Color'

const ImgPicker = (props) => {
	// State
	const [pickedImage, setPickedImage] = useState(null)

	// Verify Permission
	const verifyPermissions = async () => {
		const result = await Permissions.askAsync(Permissions.CAMERA_ROLL)

		if (result.status !== 'granted') {
			Alert.alert(
				'Insufficient Permissions',
				'You need to grant camera permission to use app!!',
				[{ text: 'Okay' }]
			)
			return false
		}
		return true
	}

	const takeImageHandler = async () => {
		// Handle Validator
		const hasPermission = await verifyPermissions()
		if (!hasPermission) return

		// If has Permission
		const image = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5,
		})
		setPickedImage(image.uri)

		// To do parent function
		props.onImageTaken(image.uri)
	}

	return (
		<View style={styles.imagePicker}>
			<View style={styles.imagePreview}>
				{!pickedImage ? (
					<Text> No Image picked yet. </Text>
				) : (
					<Image style={styles.image} source={{ uri: pickedImage }} />
				)}
			</View>
			<Button
				title="Take Image"
				color={Color.primary}
				onPress={takeImageHandler}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	imagePicker: {
		alignItems: 'center',
		marginBottom: 15,
	},
	imagePreview: {
		width: '100%',
		height: 200,
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#ccc',
		borderWidth: 1,
	},
	image: {
		width: '100%',
		height: '100%',
	},
})

export default ImgPicker
