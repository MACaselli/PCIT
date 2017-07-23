export default {
	name: 'Client',
	primaryKey: 'id',
	properties: {
		id: 'int',
		name: 'string',
		phone: 'string',
		shift: 'string',
		email: {type: 'string', optional: true },
		gender: { type:'string', optional: true },
		DOB: {type: 'date', optional: true },
		sessions: { type: 'list', objectType: 'Session' }
	}
}