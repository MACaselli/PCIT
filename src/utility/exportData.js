import _ from "lodash";
import RNFetchBlob from "react-native-fetch-blob";

export default function exportData(path, tree){
	let output = [handleSession(tree), _.map(tree.forms, (form) => handleForm(form)).join("\n\n")].join("\n\n");
	RNFetchBlob.fs.createFile(RNFetchBlob.fs.dirs.DocumentDir + `/${path}`, output, "utf8");
}

function handleSession(session){
	let output = [];
	let headers = ["Date", "Forms", "Guardians", "DOH", "ECBI"];
	let i = 0;
	const { date, forms, guardians, daysofhomework, ecbiscores } = session;

	output.push(headers);
	let defined = [forms, guardians, daysofhomework, ecbiscores].map((field) => checkDefined(field, i));
	while (defined.some((boolean) => boolean)) {
		let row = [];
		// Date
		row.push(i === 0 ? date : "");
		// Forms
		row.push(defined[0] ? forms[i].type : "");
		// Guardians
		row.push(defined[1] ? guardians[i].name : "");
		// Days of Homework
		row.push(defined[2] ? daysofhomework[i].Days : "");
		// ECBI
		row.push(defined[3] ? `I: ${ecbiscores[i].Intensity} P: ${ecbiscores[i].Problem}` : "");

		output.push(row);
		i += 1;
		defined = [forms, guardians, daysofhomework, ecbiscores].map((field) => checkDefined(field, i));
	}
	return output.join("\n");
}

function handleForm(form){
	let headers = ["Type"];
	let values = [form.type];
	switch(form.type){
		case "PDI":
			handlePDI(form);
			break;
		default:
			handleDefault(form);
	}

	function handlePDI(form){
		let sequence_list = [];
		_.each(form.sequences, (sequence, index) => {
			let field_list = [];
			_.each(sequence.fields, (field) => {
				if (index === "0") headers.push(field.name);
				field_list.push(field.value);
			});
			sequence_list.push(field_list);
		});
		values.push(sequence_list.join("\n"));
	}
	function handleDefault(form){
		_.each(form.fields, (field) => {
			headers.push(field.name);
			values.push(field.value);
		});
	}
	return [headers.map(header => convertCamelCase(header)), values].join("\n");
}

function checkDefined(field, index){
	console.log("checkDefined", index);
	return (typeof field[index] !== "undefined");
}

function arrayFill(quantity){
	return Array(quantity).fill("");
}

function convertCamelCase(str){
	let first = str.charAt(0).toUpperCase(); // Capitalize first letter
	let result = str.slice(1).replace( /([A-Z])/g, " $1" );
	return first + result;
}