var runningHistory;
var main;
var Main = function(){
	this.startMode = function(){
		$("#main-title").html("HistoryWay");
		$("#details-container").empty();
		$("#main").attr("class","");
		$('#main').html("<div class=\"panel panel-default\">\
		        <div class=\"panel-heading\"><strong>Upload Files</strong> <small>Bootstrap files upload</small></div>\
		        <div class=\"panel-body\">\
		          <h4>Select files from your computer</h4>\
		          <form action=\"\" method=\"post\" enctype=\"multipart/form-data\" id=\"js-upload-form\">\
		            <div class=\"form-inline\">\
		              <div class=\"form-group\">\
		                <input type=\"file\" name=\"files[]\" id=\"js-upload-files\" multiple>\
		              </div>\
		              <button type=\"submit\" class=\"btn btn-sm btn-primary\" id=\"js-upload-submit\">Upload files</button>\
		            </div>\
		          </form>\
		          <!-- Drop Zone -->\
		          <h4>Or drag and drop files below</h4>\
		          <div class=\"upload-drop-zone\" id=\"drop-zone\">\
		            Just drag and drop files here\
		          </div>\
		        </div>\
	      	</div>");
		var dropZone = document.getElementById('drop-zone');
	    var uploadForm = document.getElementById('js-upload-form');
	    var startUpload = function(files) {
	    	if(files[0] == null){
	    		console.log("Nenhum arquivo para upar!");
				$(".alert-event").html("\
					<div class=\"alert alert-danger\">\
	  					<strong>Erro!</strong> Você precisa escolher um arquivo!\
					</div>");
			}else if(files[0].size/1024/1024 > 10){
				$(".alert-event").html("\
					<div class=\"alert alert-danger\">\
	  					<strong>Erro!</strong> Arquivo muito grande! "+(files[0].size/1024/1024).toFixed(2)+"MB de no maximo 10MB \
					</div>");
	    	}else if(files[0].name.indexOf(".json") !== -1){
	    		loadFile(files[0]);
	    	}else{
				console.log("Arquivo invalido!");
				$(".alert-event").html("\
					<div class=\"alert alert-danger\">\
	  					<strong>Erro!</strong> O arquivo precisa ser do tipo json!\
					</div>");
	    	}
	        
	    }
	    function loadFile(file){
	    	var reader = new FileReader();
			    reader.readAsText(file, "UTF-8");
			    reader.onload = function (evt) {
			        console.log("History Loaded!");
			        runningHistory = new History(JSON.parse(evt.target.result));
			        runningHistory.printNow();
			    }
			    reader.onerror = function (evt) {
			    	console.log("Ocorreu um erro!");
			    }
	    }
	    uploadForm.addEventListener('submit', function(e) {
	        var uploadFiles = document.getElementById('js-upload-files').files;
	        e.preventDefault()

	        startUpload(uploadFiles)
	    })

	    dropZone.ondrop = function(e) {
	        e.preventDefault();
	        this.className = 'upload-drop-zone';

	        startUpload(e.dataTransfer.files)
	    }

	    dropZone.ondragover = function() {
	        this.className = 'upload-drop-zone drop';
	        return false;
	    }

	    dropZone.ondragleave = function() {
	        this.className = 'upload-drop-zone';
	        return false;
	    }
	}
	this.startHistByJsonLink = function(url){
		console.log(url);
		$.getJSON(url, function(data) {
			runningHistory = new History(data);
		    runningHistory.printNow();
		});
	}
}
function urlGET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}
$(document).ready(function(){
	main = new Main();
	if(urlGET('hurl')){
		main.startHistByJsonLink(urlGET('hurl'));
	}else if(urlGET('hid')){
		main.startHistByJsonLink("./json/"+urlGET('hid')+".json");
	}else{
		main.startMode();
	}
});

var History = function (json){
	var details = json.details;
	var content = json.history;
	var nowId = 0;
	var now = json.history[nowId];
	var next = function(id){
		if(content[id] != null){
			now = content[id];
			return true;
		}else{
			console.log("Erro proxima pagina!");
			$(".alert-event").html("\
				<div class=\"alert alert-danger\">\
  					<strong>Erro!</strong> Contate o autor! não existe ação para esta resposta!\
				</div>");
			return false;
		}
	};
	this.getNow = function(){
		return now;
	};
	var executeNow = function(){
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
	this.printNow = function(){
		executeNow();
	};
	this.printNext = function(id){
		if(next(id)){
			executeNow();
		}
	};
	var answerGen = function(){
		if(now.answers != null){
			var generated = "<div class=\"list-group\">";		
			for (var i = now.answers.length - 1; i >= 0; i--) {
				generated = generated+"<a href=\"#main\" onclick=\"runningHistory.printNext("+now.answers[i].next+")\" class=\"list-group-item\">"+now.answers[i].text+"</a>";
			}
			$("#main").append(generated+"</div>")
		}
	}
}