export default {
	name: "Form",
	properties: {
		type: "string",
		attendee: "Guardian",
		fields: { type: "list", objectType: "Field" },
		sequences: { type: "list", objectType: "Sequence" }
	}
};