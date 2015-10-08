/*
This is the java script which contains the logic for geocoding
i.e. converting a textual location into latitude and longitude
*/


(function() {
  angular
    .module("mapApp", []) // create module
    .controller("MapController", MapController); // register controller

  
/* Now we have do define the controller function to do something (some work) and pass the scope
Scope is a parameter for the function. It is denoted using $scope. 
Scope is basically a glue between the HTML file and Script.js, a way to send data to HTML for display
*/

  function MapController($scope) {
  
   
/*
    In order to display a map, we have to first declare a variable mapOptions.
    mapOptions will help us define many parameters related to the map
    There are two required options for every map: center and zoom.
    Here we set the zoom of the map
    Center is at Singapore, i.e. the map will be zoomed at Singapore.
    Type of map is initiated using mapTypeID, in this case we display a road map
    You can check for more options in this link 
    https://developers.google.com/maps/documentation/javascript/examples/control-options
*/
  var mapOptions = {
                  zoom: 10,
                  center: new google.maps.LatLng(1.3,103.8),
                  mapTypeId: google.maps.MapTypeId.ROADMAP
              }
/*
    Remember in the HTML file we will display the map in the HTML node <div id = map>
    We get the reference to this node using document.getElementById
    We use the following piece of code to display a map in the HTML at the node <div id = map>
    Ideally an instance of the map object is created and the reference of the HTML node is passed with mapOptions
*/
$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);


/*
   First we need to create a gecoder object.
   This will be used to convert a location into its location coordinates
*/

var geocoder = new google.maps.Geocoder();
/*
  Now we will define the function which is executed once the user clicks the submit button after entering a location
  The function will geocode the location, i.e. find its latitude and longitude
  Then it will display a marker on the map corresponding to the location
  The function has a parameter, which is the location entered by the user
*/
$scope.showLocation = function (location) {

/*
 The following piece of code including if and else statement will remain the same for all geocoding applications
 First we will call the GOOGLE Api's geocode function.
 For any other application only the name of the parameter will change in the code, everything else remains same
 The function will return a status and the result
*/
    geocoder.geocode( { 'address':location}, function(results, status)
    {
		
      /*
We will first check if the status is OK
OK means the geocoder was able to find location coordinates for the entered location
if it is true then we will store the result in a variable, which in this case is values
Then we will center the map to that location, i.e. focus to the location
For any other application, all the code will remain same
*/		
		
 		
        if (status == google.maps.GeocoderStatus.OK)
        {	
			
            $scope.value = results[0].geometry.location
            $scope.map.setCenter(results[0].geometry.location)
			
			


            /*
Once we have recieved the geocodes, we have to display a marker at that position
We do so by creating a marker, with two parameters
map: i.e. where the marker will be displayed
position: the geocordinates on the map where the marker should be displayed
*/
            var marker = new google.maps.Marker(
            {
                map: $scope.map,
                position: results[0].geometry.location,
				lat: results[0].geometry.location.lat(),
				lng: results[0].geometry.location.lng()
            });
        
		
		marker.content = "" + marker.lng + "" + marker.lat;
		
			
			google.maps.event.addListener(marker, 'click', function(){
			var infoWindow = new google.maps.InfoWindow();
			infoWindow.setContent(marker.content);
        	infoWindow.open($scope.map, marker);
		});
	

        } // end of if statement

                /*
If the status is not OK, ie. geocoder is not able to find the geocordinates 
we will display a message to the user with the status, i.e. what has actually gone wrong
why geocoder is not able to find the geocordinates of the location.
*/
    
              else
              {
                    alert("Geocode was not successful for the following reason: " + status);
                } // end of else statement

    
              }); // close the geocode function

			
        } // end of the showLocation function
   
 }; // end of controller function

}());



