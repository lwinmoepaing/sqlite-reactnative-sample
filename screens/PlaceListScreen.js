import React, { useCallback } from 'react'
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CustomHeaderButton from '../components/UI/HeaderButton'
import PlaceItem from '../components/Place/PlaceItem'
import { useSelector } from 'react-redux'

const PlaceListScreen = ({ navigation }) => {
	// State
	const places = useSelector((state) => state.places.places)

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
						image={null}
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
