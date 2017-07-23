export default {
	name: 'Session',
	primaryKey: 'id',
	properties: {
		id: 'int',
		date: 'date',
		daysofhomework: 'int',
		ecbiscore: 'int',
		forms: { type: 'list', objectType: 'Form' }
	}
}