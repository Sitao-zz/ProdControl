function isValidProductId(id, feedbackDivId){
	var result=-1;
	if(id==='*'){
		document.getElementById(feedbackDivId).innerHTML="";
		return 0;
	}
	
	if(isEmpty(id) || isBlank(id)){
		document.getElementById(feedbackDivId).innerHTML="please enter a product id";
	}else if(!isNumeric(id)){
		document.getElementById(feedbackDivId).innerHTML="please enter a valid product id";
	}else{
		document.getElementById(feedbackDivId).innerHTML="";
		return 1;
	}
	
	return result;
}

function showCreateNew(){
	var html='<table>';
	html+='<tr><td width="70">Id</td><td><input id="newProductId" type="text" value="" name="Id" onKeyUp="validateProductId()" /></td><td><div id="newProductIdFeedBack"></td></tr>';
	html+='<tr><td>Title</td><td><input id="newProductTitle" type="text" value="" name="Title" onKeyUp="validateProductTitle()" /></td><td><div id="newProductTitleFeedBack"></td></tr>';
	html+='<tr><td>Price</td><td><input id="newProductPrice" type="text" value="" name="Pricing.Price" onKeyUp="validateProductPrice(true)" /></td><td><div id="newProductPriceFeedBack"></td></tr>';
	html+='<tr><td>Cost</td><td><input id="newProductCost" type="text" value="" name="Pricing.Cost" onKeyUp="validateProductCost(true)" /></td><td><div id="newProductCostFeedBack"></td></tr>';
	html+='<tr><td><input type="submit" value="Create" /></td></tr>';
	html+='</table>';
	document.getElementById('createNewDiv').innerHTML=html;
	document.getElementById("newProductId").focus();
}

function hideCreateNew(){
	var html='<table>';
	html+='<tr><td width="70">Id</td><td><input id="newProductId" type="text" value="" name="Id" onFocus="showCreateNew()" /></td></tr>';
	html+='</table>';
	document.getElementById('createNewDiv').innerHTML=html;
}

function validateProductId(){
	var id=document.getElementById('newProductId').value;
	if(isNumeric(id)){
		document.getElementById('newProductIdFeedBack').innerHTML='';
		return true;
	}else{
		document.getElementById('newProductIdFeedBack').innerHTML='<font color="red">Id invalid</font>';
		return false;
	}
}

function validateProductTitle(){
	var id=document.getElementById('newProductTitle').value;
	if(isValidTitle(id)){
		document.getElementById('newProductTitleFeedBack').innerHTML='';
		return true;
	}else{
		document.getElementById('newProductTitleFeedBack').innerHTML='<font color="red">Title invalid</font>';
		return false;
	}
}

function validateProductPrice(firstCall){
	var id=document.getElementById('newProductPrice').value;
	if(isNumber(id)){
		if(firstCall){
			if(validateProductCost(false)){
				if(validateNewPriceCost()){
					return true;
				}else{
					return false;
				}
			}else{
				document.getElementById('newProductPriceFeedBack').innerHTML='';
				return true;
			}
		}else{
			return true;
		}
	}else{
		document.getElementById('newProductPriceFeedBack').innerHTML='<font color="red">Price invalid</font>';
		return false;
	}
}

function validateProductCost(firstCall){
	var id=document.getElementById('newProductCost').value;
	if(isNumber(id)){
		document.getElementById('newProductCostFeedBack').innerHTML='';
		if(firstCall){
			if(validateProductPrice(false) && validateNewPriceCost()){
				return true;
			}	
		}else{
			return true;	
		}
	}else{
		document.getElementById('newProductCostFeedBack').innerHTML='<font color="red">Cost invalid</font>';
		return false;
	}
}

function validateNewPriceCost(){
	var price=parseFloat(document.getElementById('newProductPrice').value);
	var cost=parseFloat(document.getElementById('newProductCost').value);
	if(price>cost){
		document.getElementById('newProductPriceFeedBack').innerHTML='';
		return true;
	}else{
		document.getElementById('newProductPriceFeedBack').innerHTML='<font color="red">Price invalid</font>';
		return false;
	}
}

function highlightProduct(id){
	document.getElementById('productTable_'+id).style.backgroundColor=getHightlightColor();
	var sub=document.getElementById('productDetailTable_'+id);
	if(sub!=null){
		sub.style.backgroundColor=getHightlightColor();
	}
}

function downplayProduct(id){
	document.getElementById('productTable_'+id).style.backgroundColor=getDownplayColor();
	var sub=document.getElementById('productDetailTable_'+id);
	if(sub!=null){
		sub.style.backgroundColor=getDownplayColor();
	}
}

function highlightProductSug(id){
	document.getElementById('productSugId_'+id).style.backgroundColor=getGreyColor();
}

function downplayProductSug(id){
	document.getElementById('productSugId_'+id).style.backgroundColor=getWhiteColor();
}

function retrieveProductList(products){
	var html='';
	for(var i=0; i<products.length; i++){
		if(typeof products[i] !== 'undefined' && products[i] !== null){
			html+=retrieveProduct(products[i]);
		}
	}
	
	return html;
}

function retrieveProduct(product){
	var html='<table id="productTable_'+product.id+'" frame="above" cellspacing=​"0" cellpadding=​"0" onmouseover="highlightProduct('+product.id+')" onmouseout="downplayProduct('+product.id+')">';
	html+='<input id="productKey_'+product.id+'" type="hidden" value='+product.key+' name="Key"/>';
	html+='<tr id="productRow_'+product.id+'" onClick="toggleProductDetail('+product.id+')">';
	html+='<td width="30">ID:</td><td width="40"><label id="productId_'+product.id+'">'+product.id+'</label></td>';
	html+='<td width="30">Title:</td><td width="100"><label id="productTitle_'+product.id+'">'+product.title+'</label></td>';
	html+='<td width="70"><label id="deleteProduct_'+product.id+'" onClick="deleteProduct('+product.id+')">Delete</label></td>';
	html+='</tr>';
	html+='<tr><td colspan="5"><div id="productDetails_'+product.id+'"></div></td></tr>';
	html+='</table>';
	return html;
}

function retrieveProductDetailList(products){
	var html='';
	for(var i=0; i<products.length; i++){
		if(typeof products[i] !== 'undefined' && products[i] !== null){
			html+=retrieveProductDetail(products[i]);
		}
	}
	
	return html;
}

function retrieveProductDetail(product){
	var html='<table id="productDetailTable_'+product.id+'" cellspacing=​"0" cellpadding=​"0" onmouseover="highlightProduct('+product.id+')" onmouseout="downplayProduct('+product.id+')">';
	html+='<input id="productDetailKey_'+product.id+'" type="hidden" value='+product.key+' name="Key"/>';
	html+='<tr><td width="70">ID</td><td><input id="productDetailId_'+product.id+'" type="text" value='+product.id+' name="Id" readonly /></td></tr>';
	html+='<tr><td>Title</td><td><input id="productDetailTitle_'+product.id+'" type="text" value='+product.title+' name="Title" onKeyUp="updateProductTitle('+product.id+')" onChange="clearFeedBack(\'updateTitleFeedBack_'+product.id+'\')" /></td><td><div id="updateTitleFeedBack_'+product.id+'"/ ></td></tr>';
	html+='<tr><td>Price</td><td><input id="productDetailPrice_'+product.id+'" type="text" value='+product.pricing.price+' name="Pricing.Price" onKeyUp="updateProductPrice('+product.id+')" onChange="clearFeedBack(\'updatePriceFeedBack_'+product.id+'\')" /></td><td><div id="updatePriceFeedBack_'+product.id+'"/ ></td></tr>';
	html+='<tr><td>Cost</td><td><input id="productDetailCost_'+product.id+'" type="text" value='+product.pricing.cost+' name="Pricing.Cost" readonly /></td></tr>';
	html+='</table>';
	return html;
}

function retrieveProductIdList(products){
	var html='';
	for(var i=0; i<products.length; i++){
		if(typeof products[i] !== 'undefined' && products[i] !== null){
			html+=retrieveProductId(products[i]);
		}
	}
	
	return html;
}

function retrieveProductId(product){
	var html='<tr id="productSugId_'+product.id+'" onmouseover="highlightProductSug('+product.id+')" onmouseout="downplayProductSug('+product.id+')" onmousedown="selectSuggestion('+product.id+')"><td width="150"><label/>'+product.id+'</lable></td></tr>';
	return html;
}