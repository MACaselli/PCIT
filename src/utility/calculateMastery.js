export default function calculateMastery(type, fields){
	switch(type){
		case "CDI": {
			const {behaviorDescription, reflection, labeledPraise, question, commands, negativeTalk} = fields;
			if (behaviorDescription >= 10 && reflection >= 10 && labeledPraise >= 10 && question < 3 && commands < 3 && negativeTalk < 3){
				return true;
			} else {
				return false;
			}
		}
		default:
			return false;
	}
}