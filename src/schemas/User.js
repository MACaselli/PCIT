export default {
	name: 'User',
	primaryKey: 'id',
	properties: {
		id: 'int',
		clients: {type: 'list', objectType: 'Client'}
	}
}