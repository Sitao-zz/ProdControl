function getDate(){
	initXmlHttp(getDateCallBack);
	xmlhttp.open("GET","/products/date",true);
	xmlhttp.send();
}

function getDateCallBack(){
	if (xmlhttp.readyState==4 && xmlhttp.status==200){
		alert(xmlhttp.responseText);
//		var obj=JSON.parse('{"title":"My title"}');
//		var type=Object.prototype.toString.call(obj)
//		alert(type+" "+obj.title);
	}
}

function updateText(){
	var elem=document.getElementById('testInputText');
	elem.onkeyup=function(e){
		if(e.keyCode==13){
			var UI=document.getElementById('testInputText').value;
			document.getElementById('testOutputDiv').innerHTML='<input type="text" value="" id="testOutputText" readonly />';
			document.getElementById('testOutputText').value='you typed:' + UI;
		}else{
			var UI=document.getElementById('testInputText').value;
			document.getElementById('testOutputDiv').innerHTML='<input type="text" value="" id="testOutputText" readonly />';
			document.getElementById('testOutputText').value=UI;
		}
	}
}