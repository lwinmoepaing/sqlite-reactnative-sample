import React from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Platform } from 'react-native'
// Theme
import Color from '../constants/Color'
// Screens
import MapScreen from '../screens/MapScreen'
import NewPlaceScreen from '../screens/NewPlaceScreen'
import PlaceDetailScreen from '../screens/PlaceDetailScreen'
import PlaceListScreen from '../screens/PlaceListScreen'

// Declare Navigator For Each Screen
const Stack = createStackNavigator()

// Place Navigator
const placeNavigationOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Color.primary : 'white',
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary,
}

const PlaceNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={placeNavigationOptions}
			initialRouteName="Place"
		>
			<Stack.Screen name="Place" component={PlaceListScreen} />
			<Stack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
			<Stack.Screen name="Map" component={MapScreen} />
			<Stack.Screen name="NewPlace" component={NewPlaceScreen} />
		</Stack.Navigator>
	)
}

export default () => {
	return (
		<NavigationContainer>
			<PlaceNavigator />
		</NavigationContainer>
	)
}
