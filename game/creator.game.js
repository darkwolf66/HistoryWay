
$(document).ready(function() {
	history = new Array();
	


});


var Creator = function(){
	var history;
	var details;
	this.getHistory = function(){
		return history;
	}
	this.getDetails = function(){
		return details;
	}
	this.startCreator = function(){
		$("#main-title").html(details.title+"<small> HistoryWay</small>");
		$(".alert-event").html('');
		$("#main")
		.empty()
		.attr("class","jumbotron");
		if(now.image != null){
			if(now.image.resize == "responsive"){
				$("#main").append("<img class=\"img-responsive\" id=\"img-now\" src=\""+now.image.url+"\">");
			}else{
				if(now.image.width != null){
					$("#img-now").css("width",now.image.width+"px");
				}
				if(now.image.height != null){
					$("#img-now").css("height",now.image.height+"px");
				}
			}
		}
		$("#main")
		.append("<div class=\"panel panel-default\">"+
		"<div class=\"panel-body\">"+now.text+"</div>"+
		"</div>");
		answerGen();	
		$("#main")
		.append("</div>"+"</div>"+"</div>");
		$("#details-container").html("<div class=\"panel panel-default\">\
		  <div class=\"panel-body\" id=\"details\">\
		  </div>\
		</div>");
		if(details.author != null && details.author != ""){
			$("#details").html("<small>Autor:</small> "+details.author);
		}else{
			$("#details").html("<small>Autor:</small> Não informado!");
		}
		if(details.website != null && details.website != ""){
			$("#details").append(" - <small>Website:</small> "+details.website);
		}
		if(details.facebook != null && details.facebook != ""){
			$("#details").append(" - <small>Facebook:</small> "+details.facebook);
		}
		if(details.twitter != null && details.twitter != ""){
			$("#details").append(" - <small>Twitter:</small> "+details.twitter);
		}
		$("#details").append("<br><button type=\"button\" class=\"btn btn-default\">Load</button>");
		$("#details").append("<button type=\"button\" class=\"btn btn-default\">Save</button>");
	}
}
