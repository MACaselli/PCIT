export default {
	name: 'Form',
	properties: {
		type: 'string',
		fields: { type: 'list', objectType: 'Field' },
		guardians: { type: 'list', objectType: 'Guardian' }
	}
}