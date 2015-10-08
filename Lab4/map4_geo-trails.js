/*

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
    $scope.message = "Displaying a Google Map";
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
   Now we will define the search function which has two locations input by the user as the parameters
   Upon clicking the search button the search button the following function is executed
   Inside the function we call another function codeAdess which will geocode the locations
   and display the markers in the map. 
   
*/
var geocoder = new google.maps.Geocoder();
$scope.markers = [];
$scope.routes = []

/*
   Now we will define the search function which has two locations input by the user as the parameters
*/
$scope.search = function (address1,address2) {

   /*
  Ideally we need to geocode two locations. There is no point writing the same piece of code twice
   So we write a function and call it twice to geocode the locations
   But we pass different parameters to the function in each call
*/
 
  codeAddress(address1)
  codeAddress(address2)
; 
  
    
}

/*
 The following piece of code including if and else statement will remain the same for all geocoding applications
 First we will call the GOOGLE Api's geocode function.
 For any other application only the name of the parameter will change in the code, everything else remains same
 The function will return a status and the result
*/

var codeAddress = function (info){
  geocoder.geocode( {'address': info}, function(results, status)
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
            $scope.coordinate = results[0].geometry.location
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
                position: results[0].geometry.location
            });

          /*
We need to know the latitude and longitude of each marker
because we need to draw a line between them
We do so using the following code
*/
 

          $scope.markers.push(marker);

          var route = new google.maps.LatLng(         
              results[0].geometry.location.lat(),
              results[0].geometry.location.lng()
          );
          
                        /*
Now route (lat, lng) for each route is send to an array
which contains routes of all locations
*/
        $scope.routes.push(route)
   

          
             
        }
   });

}


              /*
Now we define the ShowLine() which is executed once the suer clicks to connect the markers
This code actually takes all the elements in the routes array 
and connect them using a line
The routes is the most important thing for this function
*/



$scope.showLine = function (){


  $scope.path1 = new google.maps.Polyline(
    {
              path: $scope.routes,
              strokeColor: "#FF0000",
              strokeOpacity: 1.0,
              strokeWeight: 2
    });
 
              /*
This code is used to put the line on the map
which connects the two markers
*/
     
  $scope.path1.setMap($scope.map); 

}



 }; // end of controller function

}());



