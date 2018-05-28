import RNFetchBlob from "react-native-fetch-blob";

export default function exportData(tree){
	// RNFetchBlob.fs.createFile(RNFetchBlob.fs.dirs.DownloadDir + "/New.txt", "foo", "utf8");
	handleSession(tree);
}

function handleSession(session){
	let output = [];
	let headers = ["Date", "Forms", "Guardians", "DOH", "ECBI"];
	let i = 0;
	const { date, forms, guardians, daysofhomework, ecbiscores } = session;

	output.push(headers);
	while(typeof forms[i] !== "undefined" || typeof guardians[i] !== "undefined" || typeof daysofhomework[i] !== "undefined" || typeof ecbiscores[i] !== "undefined"){
		let row = [];
		// Date
		if (i === 0) row.push(date);
		else row.push("");
		// Forms
		if (typeof forms[i] !== "undefined") row.push(forms[i].type);
		else row.push("");
		// Guardians
		if (typeof guardians[i] !== "undefined") row.push(guardians[i].name);
		else row.push("");
		// Days of Homework
		if (typeof daysofhomework[i] !== "undefined") row.push(daysofhomework[i].Days);
		else row.push("");
		// ECBI
		if (typeof ecbiscores[i] !== "undefined") row.push(`I: ${ecbiscores[i].Intensity}, P: ${ecbiscores[i].Problem}`);
		else row.push("");

		output.push(row);
		i += 1;
	}
	console.log(output);
}

function arrayFill(quantity){
	return Array(quantity).fill("");
}
