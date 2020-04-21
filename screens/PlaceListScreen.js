import React, { useCallback, useEffect } from 'react'
import { View, StyleSheet, Platform, FlatList } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CustomHeaderButton from '../components/UI/HeaderButton'
import PlaceItem from '../components/Place/PlaceItem'
import { useSelector, useDispatch } from 'react-redux'

// Actions
import * as placeActions from '../store/action/place'

const PlaceListScreen = ({ navigation }) => {
	// Dispatch
	const dispatch = useDispatch()

	// State
	const places = useSelector((state) => state.places.places)

	// Initial Loaded Data
	useEffect(() => {
		dispatch(placeActions.loadedData())
	}, [])

	// Set Navigation Options
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: 'All Places',
			headerRight: () => (
				<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
					<Item
						title="Add Place"
						iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
						onPress={() => navigation.navigate('NewPlace')}
					/>
				</HeaderButtons>
			),
		})
	})

	// Go Detail
	const goDetail = useCallback(
		(id, title) => {
			navigation.navigate('PlaceDetail', {
				placeId: id,
				placeTitle: title,
			})
		},
		[navigation]
	)

	return (
		<View>
			<FlatList
				data={places}
				keyExtractor={(item) => item.id}
				renderItem={(itemData) => (
					<PlaceItem
						image={itemData.item.imageUri}
						title={itemData.item.title}
						address={'Address'}
						onSelect={() => goDetail(itemData.item.id, itemData.item.title)}
					/>
				)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({})

export default PlaceListScreen
