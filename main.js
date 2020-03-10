let ajaxCall = function(){
	let savedCityName = localStorage.getItem('city');
	// pre-fills input tag 
	document.querySelector('#city').value = savedCityName;
	// runs ajax
	$.ajax({
		method: "GET",
		url: "http://api.weatherbit.io/v2.0/current",
		data: {
			key: "5a28f3938f5b4ea29342f558d1a6490b",
			city: savedCityName,
			units: "I"	
		}
	})
	.done(function(response){
		displayResults(response);
	})
	.fail(function(){
		console.log('Error!');
	});
}

let displayResults = function(response){
	let temp = response.data[0].temp;
	let description = response.data[0].weather.description;
	let feelsLike = response.data[0].app_temp;
	$('#weather').html(" " + temp + '&deg' + ' '+ description + '. Feels like ' + feelsLike + '&deg');
}	

// this runs FIRST
if(localStorage.getItem("city")) {
	ajaxCall();
}
else{
	localStorage.setItem("city", "LosAngeles,CA");
	ajaxCall();
}

// when city is changed
$('#city').on('change', function(){
	let cityInput = document.querySelector('#city').value;
	localStorage.setItem('city', cityInput)
	ajaxCall();
})

// when item text is clicked
$('ul').on('click','.list-item', function(){
	console.log($(this))
	$(this).toggleClass('line');
	// changes box color too
	$(this).prev().toggleClass('gray')
})
// when checkbox is clicked
$('ul').on('click','.checkbox', function(){
	event.stopPropagation();
	$(this).parent().fadeOut(500)
})

// when form is submitted
$('#form').submit(function(event){
	event.preventDefault();
	$('ul').append($('<li><span class="checkbox"><i class="far fa-square"></i> </span><span class="list-item"></span></li>'));
	$( "ul li:last-child .list-item").html($('#item-input').val());
	$('#item-input').val('');
})

// when plus sign is  clicked
$('#plus-sign').on('click', function(){
	$('#form').slideToggle(400)
})