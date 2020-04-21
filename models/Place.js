class Place {
	constructor(id, title, imageUri, lat = 0, lng = 0) {
		this.id = id
		this.title = title
		this.imageUri = imageUri
		this.lat = lat
		this.lng = lng
	}
}

export default Place
