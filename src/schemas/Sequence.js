export default {
	name: "Sequence",
	properties: {
		index: "int",
		fields: { type: "list", objectType: "Field" },
		timeOutLoops: { type: "list", objectType: "TimeOutLoop" }
	}
};