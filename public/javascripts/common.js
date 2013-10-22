var xmlhttp;

function initXmlHttp(callBack){
	if (window.XMLHttpRequest){
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else{
		// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=callBack;
}

function isEmpty(str) {
	return (!str || 0 === str.length);
}

function isBlank(str) {
	return (!str || /^\s*$/.test(str));
}

function isAlphaNumeric(str){
	var pat=/^[a-zA-Z0-9]*$/i;
	return (pat.test(str));
}

function isValidTitle(str){
	var pat=/^[a-zA-Z][a-zA-Z0-9]*$/i;
	return (pat.test(str));
}

function isNumeric(str){
	return (/^\d+$/.test(str));
}

function isNumber(str){
	return(/^\d+\.?\d*$/.test(str))
}

function load(){
	//document.getElementById("newProductId").focus();
}

function initSuggestionBox(){
	var searchElem=document.getElementById("productSearchText");
	var suggestionElem=document.getElementById("searchSuggestionTable");
	var left=searchElem.getBoundingClientRect().left;
	var top=searchElem.getBoundingClientRect().top;
	suggestionElem.style.left=left+'px';
	suggestionElem.style.top=top+25+'px';
	suggestionElem.style.display='inline';
	suggestionElem.style.backgroundColor=getWhiteColor();
	selectedSugPost=0;
}

function hideSuggestionBox(){
	var suggestionElem=document.getElementById("searchSuggestionTable");
	suggestionElem.style.display='none';
	selectedSugPost=0;
}