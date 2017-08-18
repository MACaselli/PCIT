export default {
	name: 'Session',
	primaryKey: 'id',
	properties: {
		id: 'int',
		date: 'string',
		daysofhomework: { type: 'list', objectType: 'DOH' },
		ecbiscores: { type: 'list', objectType: 'ECBI' },
		forms: { type: 'list', objectType: 'Form' },
		guardians: { type: 'list', objectType: 'Guardian' }
	}
}