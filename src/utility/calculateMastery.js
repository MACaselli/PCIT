export default function calculateMastery(type, fields){
	switch(type){
		case "CDI": {
			const {behaviorDescription, reflection, labeledPraise, question, commands, negativeTalk} = fields;
			if (behaviorDescription.value >= 10 && reflection.value >= 10 && labeledPraise.value >= 10 && question.value < 3 && commands.value < 3 && negativeTalk.value < 3){
				return true;
			} else {
				return false;
			}
		}
		default:
			return false;
	}
}