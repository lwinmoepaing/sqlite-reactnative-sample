import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('places.db')

// Initial Database
export const init = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL,imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
				[],
				() => {
					resolve()
				},
				(_, error) => {
					reject(error)
				}
			)
		})
	})

	return promise
}

// Create New Place
export const insertPlace = (title, imageUri, address, lat = 1.5, lng = 1.9) => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			const query =
				'INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)'
			tx.executeSql(
				query,
				[title, imageUri, address, lat, lng],
				(_, result) => {
					resolve(result)
				},
				(_, error) => {
					reject(error)
				}
			)
		})
	})

	return promise
}

// Fetch Places
export const fetchPlaces = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			const query = 'SELECT * FROM places'
			tx.executeSql(
				query,
				[],
				(_, result) => {
					resolve(result)
				},
				(_, error) => {
					reject(error)
				}
			)
		})
	})

	return promise
}
