var searchProdIdOrig;
var selectedSugPost;
var suggestionList;

function deleteProduct(id){
	initXmlHttp(deleteProductCallBack);
	var request="/products/delete/"+id;
	xmlhttp.open("GET",request,true);
	xmlhttp.send();
}

function deleteProductCallBack(){
	if (xmlhttp.readyState==4 && xmlhttp.status==200){
		findProduct();
	}
}

function clearFeedBack(divId){
	document.getElementById(divId).innerHTML='';
}

function updateProductTitle(id){
	var elem=document.getElementById('productDetailTitle_'+id);
	elem.onkeyup=function(e){
		var title=document.getElementById('productDetailTitle_'+id).value;
		if(isValidTitle(title)){
			if(e.keyCode==13){
				initXmlHttp(updateProductTitleCallBack);
				var title=document.getElementById('productDetailTitle_'+id).value;
				var request="/products/update/"+id+"/title/"+title;
				xmlhttp.open("POST",request,true);
				xmlhttp.send();
			}else{
				document.getElementById('updateTitleFeedBack_'+id).innerHTML="";
			}
		}else{
			document.getElementById('updateTitleFeedBack_'+id).innerHTML='<font color="red" size="2">Title invalid</font>';
		}
	}
}

function updateProductTitleCallBack(){
	if (xmlhttp.readyState==4 && xmlhttp.status==200){
		if(!isEmpty(xmlhttp.responseText) && !isBlank(xmlhttp.responseText)){
			var result=JSON.parse(xmlhttp.responseText);
			var id=result.id;
			var msg=result.message;
			var origValue=result.origValue;
			if(isEmpty(result.message) || isBlank(result.message)){
				document.getElementById('updateTitleFeedBack_'+id).innerHTML='<font color="green" size="2">Modified</font>';
				document.getElementById('productTitle_'+id).innerHTML=document.getElementById('productDetailTitle_'+id).value;
				document.getElementById('productDetailPrice_'+id).focus();
			}else{
				document.getElementById('updateTitleFeedBack_'+id).innerHTML='<font color="red" size="2">'+msg+'</font>';
				document.getElementById('productDetailTitle_'+id).value=origValue;
				document.getElementById('productDetailTitle_'+id).focus();
			}
		}
	}
}

function updateProductPrice(id){
	var elem=document.getElementById('productDetailPrice_'+id);
	elem.onkeyup=function(e){
		var priceStr=document.getElementById('productDetailPrice_'+id).value;
		if(isNumber(priceStr)){
			var price=parseFloat(document.getElementById('productDetailPrice_'+id).value);
			var cost=parseFloat(document.getElementById('productDetailCost_'+id).value);
			if(price<=cost){
				document.getElementById('updatePriceFeedBack_'+id).innerHTML='<font color="red" size="2">Price invalid</font>';
			}else{
				if(e.keyCode==13){
					initXmlHttp(updateProductPriceCallBack);
					var price=document.getElementById('productDetailPrice_'+id).value;
					var request="/products/update/"+id+"/price/"+price;
					xmlhttp.open("POST",request,true);
					xmlhttp.send();
				}else{
					document.getElementById('updatePriceFeedBack_'+id).innerHTML="";
				}
			}
		}else{
			document.getElementById('updatePriceFeedBack_'+id).innerHTML='<font color="red" size="2">Price invalid</font>';
		}
	}
}

function updateProductPriceCallBack(){
	if (xmlhttp.readyState==4 && xmlhttp.status==200){
		if(!isEmpty(xmlhttp.responseText) && !isBlank(xmlhttp.responseText)){
			var result=JSON.parse(xmlhttp.responseText);
			var id=result.id;
			var msg=result.message;
			var origValue=result.origValue;
			if(isEmpty(result.message) || isBlank(result.message)){
				document.getElementById('updatePriceFeedBack_'+id).innerHTML='<font color="green" size="2">Modified</font>';
				document.getElementById('productDetailPrice_'+id).blur();
			}else{
				document.getElementById('updatePriceFeedBack_'+id).innerHTML='<font color="red" size="2">'+msg+'</font>';
				document.getElementById('productDetailPrice_'+id).value=origValue;
				document.getElementById('productDetailPrice_'+id).focus();
			}
		}
	}
}

function createNewProduct(){
	var form=document.getElementById('createNewForm');
	document.getElementById('createNewFeedback').style.visibility='hidden';
	document.getElementById('createNewFeedback').innerHTML='<p/>';
	if(validateNewProduct()){
		var product=retrieveProductObj(form);
		var data=JSON.stringify(product);
		initXmlHttp(createNewProductCallBack);
		var request="/products/create/"+data;
		xmlhttp.open("POST",request,true);
		xmlhttp.send();
	}
}

function createNewProductCallBack(){
	if (xmlhttp.readyState==4 && xmlhttp.status==200){
		if(!isEmpty(xmlhttp.responseText) && !isBlank(xmlhttp.responseText)){
			var result=JSON.parse(xmlhttp.responseText);
			var id=result.id;
			var msg=result.message;
			var origValue=result.origValue;
			if(isEmpty(result.message) || isBlank(result.message)){
				document.getElementById('createNewFeedback').style.visibility='visible';
				document.getElementById('createNewFeedback').innerHTML='<font color="green" size="2">Product '+id+' is created</font>';
				resetCreateNewForm();
			}else{
				document.getElementById('createNewFeedback').innerHTML='<font color="red" size="2">'+msg+'</font>';
			}
		}
	}
}

function clearSearchResult(){
	hideSuggestionBox();
	var id=document.getElementById('productSearchText').value;
	if(isEmpty(id) || isBlank(id)){
		document.getElementById('searchFeedBack').innerHTML="";
	}
}

function startSearch(){
	hideCreateNew();
	//findMatchId();
}

function selectSuggestion(id){
	var elem=document.getElementById('productSearchText');
	elem.value=id;
	findProduct();
}

function searchforProduct(){
	var elem=document.getElementById('productSearchText');
	elem.onkeyup=function(e){
		var code=e.keyCode;
		if(code===13){
			// enter key
			searchProdIdOrig=document.getElementById('productSearchText').value;
			hideSuggestionBox();
			findProduct();
		}else if(code===38){
			// up key
			if(document.getElementById('searchSuggestionTable').style.display!="none"){
				downplayCurrentPordId(selectedSugPost);
				selectedSugPost--;
				if(selectedSugPost<0){
					selectedSugPost=suggestionList.length;
				}
				setSelectedProdId(selectedSugPost);
			}else{
				searchProdIdOrig=document.getElementById('productSearchText').value;
				findMatchId();
			}
		}else if(code===40){
			// down key
			if(document.getElementById('searchSuggestionTable').style.display!="none"){
				downplayCurrentPordId(selectedSugPost);
				selectedSugPost++;
				if(selectedSugPost>suggestionList.length){
					selectedSugPost=0;
				}
				setSelectedProdId(selectedSugPost);
			}else{
				searchProdIdOrig=document.getElementById('productSearchText').value;
				findMatchId();
			}
		}else if(code===27){
			// escape key
			hideSuggestionBox();
			document.getElementById('productSearchText').value=searchProdIdOrig;
		}
		else{
			searchProdIdOrig=document.getElementById('productSearchText').value;
			findMatchId();
		}
	}
}

function downplayCurrentPordId(post){
	if(post>0 && post<=suggestionList.length){
		var id=suggestionList[post-1].id;
		downplayProductSug(id);
	}
}

function setSelectedProdId(post){
	if(post>=0 && post<=suggestionList.length){
		var elem=document.getElementById('productSearchText');
		if(post==0){
			elem.value=searchProdIdOrig;
		}else{
			var id=suggestionList[post-1].id;
			elem.value=id;
			highlightProductSug(id);
		}
	}
}

function findMatchId(){
	initXmlHttp(findMatchIdCallBack);
	var id=document.getElementById('productSearchText').value;
	var result=isValidProductId(id,'searchFeedBack');
	if(result>0){
		var request="/products/search/"+id;
		xmlhttp.open("POST",request,true);
		xmlhttp.send();
	}else if(result==0){
		var request="/products/search";
		xmlhttp.open("POST",request,true);
		xmlhttp.send();
	}else{
		hideSuggestionBox();
		document.getElementById('searchResultCountDiv').innerHTML='Search products';
	}
}

function findMatchIdCallBack(){
	if (xmlhttp.readyState==4 && xmlhttp.status==200){
		var response=xmlhttp.responseText;
		if(isEmpty(response) || isBlank(response)){
			document.getElementById('searchResultDiv').innerHTML="";
			document.getElementById('searchResultCountDiv').innerHTML='Search products: 0 product(s)';
			document.getElementById('searchFeedBack').innerHTML='';
		}else{
			var array=JSON.parse(response);
			var type=Object.prototype.toString.call(array)
			if (type == "[object Array]"){
				document.getElementById('searchResultCountDiv').innerHTML='Search products: '+array.length+' product(s)';
				if(array.length===0){
					hideSuggestionBox();
				}else{
					document.getElementById('searchSuggestionTable').innerHTML=retrieveProductIdList(array);
					initSuggestionBox();
					suggestionList=array;
				}
			}else{
				var id=xmlhttp.responseText;
				hideSuggestionBox();
				document.getElementById('searchResultDiv').innerHTML="";
				document.getElementById('searchResultCountDiv').innerHTML='Search products: 0 product(s)';
				document.getElementById('searchFeedBack').innerHTML='Product '+id+' could not be found';
			}
		}
	}
}

function findProduct(){
	initXmlHttp(findProductCallBack);
	var id=document.getElementById('productSearchText').value;
	var result=isValidProductId(id,'searchFeedBack');
	if(result>0){
		var request="/products/search/"+id;
		xmlhttp.open("POST",request,true);
		xmlhttp.send();
	}else if(result==0){
		var request="/products/search";
		xmlhttp.open("POST",request,true);
		xmlhttp.send();
	}else{
		document.getElementById('searchResultDiv').innerHTML="";
	}
}

function findProductCallBack(){
	if (xmlhttp.readyState==4 && xmlhttp.status==200){
		var response=xmlhttp.responseText;
		if(isEmpty(response) || isBlank(response)){
			document.getElementById('searchResultDiv').innerHTML="";
			document.getElementById('searchResultCountDiv').innerHTML='Search products: 0 product(s)';
			document.getElementById('searchFeedBack').innerHTML='';
		}else{
			var array=JSON.parse(response);
			var type=Object.prototype.toString.call(array)
			if (type == "[object Array]" && array.length > 0){
				document.getElementById('searchResultDiv').innerHTML=retrieveProductList(array);
				document.getElementById('searchResultCountDiv').innerHTML='Search products: '+array.length+' product(s)';
				
				if(array.length===1){
					toggleProductDetail(array[0].id);
				}else{
					document.getElementById('productSearchText').blur();
				}
			}else{
				var id=xmlhttp.responseText;
				document.getElementById('searchResultDiv').innerHTML="";
				document.getElementById('searchResultCountDiv').innerHTML='Search products: 0 product(s)';
				document.getElementById('searchFeedBack').innerHTML='Product '+id+' could not be found';
			}
		}
	}
}

function toggleProductDetail(id){
	var elem=document.getElementById('productDetailTable_'+id);
	if(elem==null){
		showProductDetail(id);
	}else{
		hideProductDetail(id);
	}
}

function hideProductDetail(id){
	document.getElementById('productDetails_'+id).innerHTML='';
}

function showProductDetail(id){
	initXmlHttp(showProductDetailCallBack);
	var request="/products/find/"+id;
	xmlhttp.open("POST",request,true);
	xmlhttp.send();
}

function showProductDetailCallBack(){
	if (xmlhttp.readyState==4 && xmlhttp.status==200){
		var array=JSON.parse(xmlhttp.responseText);
		var type=Object.prototype.toString.call(array)
		if (type == "[object Array]" && array.length > 0){
			id=array[0].id;
			document.getElementById('productDetails_'+id).innerHTML=retrieveProductDetailList(array);
			var elem=document.getElementById('productDetailTitle_'+id);
			if(elem!=null){
				elem.focus();
			}
		}else{
			alert("failed to retrieve");;
		}
	}
}