
var format = function(date,model){
	var year = "";
	var month = "";
	var day = "";
	if(model === "YYYYMMDD"){
		year = date.getFullYear().toString();
		month = date.getMonth()+1;
		if(month < 10){
			month = "0"+month;
		}
		day = date.getDay();
		if(day< 10){
			day = "0"+day;
		}
		return year+month+day;
	}else{
		return "0";
	}
}

exports.format = format;