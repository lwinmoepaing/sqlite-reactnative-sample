import React, { useState } from 'react'
import {
	View,
	TextInput,
	Text,
	StyleSheet,
	ScrollView,
	Button,
	Alert,
} from 'react-native'
import { useDispatch } from 'react-redux'
import * as Permissions from 'expo-permissions'

// Theme
import Color from '../constants/Color'

// Actions
import * as placeActions from '../store/action/place'

// Components
import ImgPicker from '../components/Common/ImagePicker'

const NewPlaceScreen = ({ navigation }) => {
	// Dispatch
	const dispatch = useDispatch()

	// States
	const [title, setTitle] = useState('')

	// Set Navigation Options
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: 'Add Place',
		})
	})

	const textChangeHandler = (val) => {
		setTitle(val)
	}

	const submitHandler = () => {
		dispatch(placeActions.addPlace(title))
		navigation.goBack()
	}

	return (
		<ScrollView>
			<View style={styles.form}>
				<Text style={styles.label}> Title </Text>
				<TextInput
					style={styles.textInput}
					value={title}
					onChangeText={textChangeHandler}
				/>
				<ImgPicker />
				<Button
					title="Add New Place"
					onPress={submitHandler}
					color={Color.primary}
				/>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	form: {
		margin: 20,
	},
	label: {
		fontSize: 18,
		marginBottom: 15,
	},
	textInput: {
		borderBottomColor: '#cccccc',
		borderBottomWidth: 1,
		marginBottom: 15,
		paddingVertical: 4,
		paddingHorizontal: 2,
	},
})

export default NewPlaceScreen
