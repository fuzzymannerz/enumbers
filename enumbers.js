/*///////////////////////////////////////
///          E-number Lookup          ///
///       by Fuzzy - thefuzz.xyz      ///
*////////////////////////////////////////

//Set vars
var elist = 'enum.json';

	$(document).ready(function(){
	// Make sure results and description aren't shown
	$('#results').hide();
	$('#description').hide();
	// Clear the text box by default and when clicking in it
	$('#searchbox').val("");
	$("#searchbox").focus();
	$('#searchbox').click(function() {
	$(this).val("")
	});
	// Listen for 'enter' button press on textbox
    $('#searchbox').keypress(function(e){
      if(e.keyCode==13)
      submission();
	}
    )});

	// Fetch E Number name list for autocomplete text box
	$.ajax({
	  url: elist,
	  dataType: 'json',
	  success: function(data){
	  var enumbers = [];
	  // Retrieve all enumber names from data array
      for (var index in data) {
      var namelist = data[index].name;
      enumbers.push(namelist);
      }
	// Set autocomplete settings
	$('#searchbox').autocomplete({
	lookup: enumbers,
	onSelect: function (suggestion) {
	$(this).val(suggestion.value);
	    $('#info').hide();
        $('#description').hide();
	submission();
	}
	});
	}});

// Upon form submission
function submission()
{

	// Fetch data list
	$.ajax({
	  url: elist,
	  dataType: 'json',
	  success: function(data){
	  	// Set the search var to be UPPERCASE
	  	var search = document.getElementById("searchbox").value.toUpperCase();
	  	// Return the name, contents and type
	  	$.each(data, function(i, v) {
	  	// Convert names to uppercase before searching to prevent end letters not being found
	  	var upperv = v.name.toUpperCase();
        if (upperv === search) {
        $('#info').hide();
        $('#description').hide();
		$('#name').html(v.name);
		$('#type').html('<span id="type"><strong>Type:</strong></span><br>' + v.type+'.');
		$('#contents').html('<span id="title">Contents:</span><br>' + v.content+'.');
		$('#results').slideDown();
		}

    	});

      },
  });
};

// When user asks what an e number is...
function toggledescription()
{
$('#description').slideToggle();
};