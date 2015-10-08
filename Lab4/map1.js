/*
This is the java script which contains the logic to display a map in the HTML
Ideally the logic is written inside the controller function.
All application logic related to maps should be written in javascript file
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

    $scope.message = "Displaying a Google Map Focussed at Australia";
   
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

  // var mapOptions = {
  //                 zoom: 10,
  //                 center: new google.maps.LatLng(1.3, 103.8),
  //                 mapTypeId: google.maps.MapTypeId.ROADMAP
  //             }
              
  var mapOptions = {
                  zoom: 4,
                  center: new google.maps.LatLng(-25, 133),
                  mapTypeId: google.maps.MapTypeId.ROADMAP
              }
/*
    Remember in the HTML file we will display the map in the HTML node <div id = map>
    We get the refernce to this node using document.getElementById
    We use the following piece of code to display a map in the HTML at the node <div id = map>
    Ideally an instance of map object is created and the refernce of the HTML node is passed with mapOptions
*/


$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

 };

}());



