//The URIs of the REST endpoint
RAAURI = "https://prod-32.northeurope.logic.azure.com/workflows/0c0312db59ec48018e5224632d2fbffa/triggers/manual/paths/invoke/rest/v1/users?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=0ZLl1FFTT0E5DBEBzB7QJfvFKBeRI0SSDdyFK3686qc ";
CIAURI = "https://prod-31.northeurope.logic.azure.com/workflows/5e55d6f686f044189dac797833b5839f/triggers/manual/paths/invoke/rest/v1/users?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=JECABA79nbEnxMTo-xjX1TAXJpb6CuZukeD_Vqg12Jo ";

DIAURI0 = "https://prod-23.northeurope.logic.azure.com/workflows/c6116885ed054000902bd30b269309fe/triggers/manual/paths/invoke/rest/v1/users/";
DIAURI1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=03FgcdgiUOAoGFbPV_Z514TXMk0tk1zHwoIDBHGD-Dw";


//Handlers for button clicks
$(document).ready(function() {
 
	$("#retUsers").click(function(){

      		//Run the get asset list function
		getAssetList();

  	}); 

	//Handler for the new asset submission button
	$("#subNewForm").click(function(){

    	//Execute the submit new asset function
  	submitNewAsset();
    
  	}); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  
//Construct JSON Object for new item
	var subObj = {
		USR_Firstname: $('#USRFirstname').val(),
		USR_Surname: $('#USRSurname').val(),
		USR_AddressLine1: $('#USRAddressLine1').val(),
		USR_AddressLine2: $('#USRAddressLine2').val(),
		USR_AddressLine3: $('#USRAddressLine3').val(),
		USR_AddressLine4: $('#USRAddressLine4').val(),
		USR_DOB: $('#USRDOB').val(),
		USR_Joined: $('#USRJoined').val(),
		USR_Type: $('#USRType').val(),
		USR_Status: $('#USRStatus').val(),
		USR_Note: $('#USRNote').val()
	}

//Convert to a JSON String
	subObj = JSON.stringify(subObj);

//Post the JSON string to the endpoint, note the need to set the content type header
	$.post({
		url: CIAURI,
		data: subObj,
		contentType: 'application/json; charset=utf-8'
	}).done(function (response) {
	getAssetList();
	});
}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getAssetList(){	

//Replace the current HTML in that div with a loading message
 $('#AssetList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
 $.getJSON(RAAURI, function( data ) {

//Create an array to hold all the retrieved assets
 var items = [];

// items.push( "<hr />");
// items.push( "User Name: " + "<br/>");
// items.push( "<hr />");


//Iterate through the returned records and build HTML, incorporating the key values of the record in the data
 $.each( data, function( key, val ) {
 items.push( "<hr />");
 items.push( "User Name: <b>" + val["USR_Firstname"] + " " + val["USR_Surname"] + "</b>  DOB: " + val["USR_DOB"] + "<br/>");
 items.push( "Date Joined: " + val["USR_Joined"]+ "<br/>");
 items.push( "Address  : " + val["USR_AddressLine1"] + ", "+ val["USR_AddressLine2"] + ", "+ val["USR_AddressLine3"] +"<br/>");
 items.push( "Postcode : " + val["USR_AddressLine4"] + "<br/>");
 items.push( "Email    : " + val["USR_Note"] + "<br/>");
 items.push('<button type="button" id="subNewForm" class="btn-btndanger" onclick="deleteAsset('+val["USR_ID"]+')">Delete</button> <br/><br/>');
 items.push( "<hr />");
});

//Clear the assetlist div
$('#AssetList').empty();

//Append the contents of the items array to the AssetList Div
$( "<ul/>", {
"class": "my-new-list",
html: items.join( "" )
}).appendTo( "#AssetList" );
});
}

//A function to delete an asset with a specific ID.
//The id paramater is provided to the function as defined in the relevant onclick handler

function deleteAsset(id){

//DIA = DIAURI0 + id + DIAURI1;
//DIA = "https://prod-23.northeurope.logic.azure.com/workflows/c6116885ed054000902bd30b269309fe/triggers/manual/paths/invoke/rest/v1/users/3?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=03FgcdgiUOAoGFbPV_Z514TXMk0tk1zHwoIDBHGD-Dw ";
//const settings = {
//  "async": true,
//  "crossDomain": true,
//  "type": "DELETE",
//  "url": "https://prod-23.northeurope.logic.azure.com/workflows/c6116885ed054000902bd30b269309fe/triggers/manual/paths/invoke/rest/v1/users/20?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=03FgcdgiUOAoGFbPV_Z514TXMk0tk1zHwoIDBHGD-Dw",
//  "method": "DELETE"
//  }


//$.ajax(settings).done(function (response) {
//  console.log(response);
//  getAssetList();
//});

DIA = DIAURI0 + id + DIAURI1;

$.ajax({
type: "DELETE",
method: "DELETE",

//Note the need to concatenate the
//url: DIA,
 
url: DIA,
}).done(function( msg ) {
//On success, update the assetlist.

getAssetList();
});
}

