export default {
	name: 'Form',
	primaryKey: 'id',
	properties: {
		id: 'int',
		type: 'string',
		date: 'date',
		attendees: { type: 'list', objectType: 'Guardian' },
	}
}