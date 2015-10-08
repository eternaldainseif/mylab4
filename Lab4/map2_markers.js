/*
This is the java script which contains the logic to display markers in a map in the HTML
Ideally the logic is written inside the controller function.
All application logic related to maps should be written in javascript file
*/

/*
The first step is to define an array of places. 
We have hard coded it here, but in real life we read it from a JSON file or database
We want to display these places as markers on the map
Each place has a name, description, latitude and longitude
So places is an array of locations 
Each location is defined inside the {}
*/

var places = [
              {
                  name : 'Clementi Mall',
                  desc : 'A Mall in Clementi',
                  lat : 1.2888, 
                  long :103.8054
              },
              {
                  name : 'Star Vista',
                  desc : 'Mall Near Buona Vista',
                  lat : 1.352083,
                  long : 103.819836
              },
              {
                  name : 'Plaza Singapura',
                  desc : 'Mall in Singapore',
                  lat : 1.3007,
                  long : 103.8449
              },
              {
                  name : 'Changi Airport',
                  desc : 'Airport in SG!',
                  lat : 1.3592,
                  long : 103.9894
              }
      ];

    var app = angular.module("mapApp", []); // create module
    app.controller("MapController", function($scope){ // register controller
    
    
  // $scope.message = "Displaying Markers on a Google Map";
  // create the map
    var mapOptions = {
                  zoom: 10,
                  center: new google.maps.LatLng(1.3,103.8),
                  mapTypeId: google.maps.MapTypeId.ROADMAP
    }
   $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

});
    
/* Now we have do define the controller function to do something (some work) and pass the scope
Scope is a parameter for the function. It is denoted using $scope. 
Scope is basically a glue between the HTML file and Script.js, a way to send data to HTML for display
*/

    
    
   
/*
    In order to display a map, we have to first declare a variable mapOptions.
    mapOptions will help us define many parameters related to the map
    There are two required options for every map: center and zoom.
    Here we set the zoom of the map to 10
    Center is at Singapore, i.e. the map will be zoomed at Singapore.
    Type of map is initiated using mapTypeID, in this case we display a road map
    You can check for more options in this link 
    https://developers.google.com/maps/documentation/javascript/examples/control-options
*/




/*
    Remember in the HTML file we will display the map in the HTML node <div id = map>
    We get the refernce to this node using document.getElementById (which is the name of div id, i.e. map)
    We use the following piece of code to display a map in the HTML at the node <div id = map>
    We need to use $scope.map, because the map will be displayed in HTML
*/



/*
   Now we will start coding the logic for displaying markers on the map
   First step is create an empty array, which will store all the markers
   Remember this array will be accessed in HTML to show each marker using ng-repeat
   So attach scope to markers array
*/

app.controller("MarkerController", function($scope){
            $scope.markers = [];
            var infoWindow = new google.maps.InfoWindow();
  
           
/*
   Next You need to create a variable infoWindow, and initialize it. 
   infoWindow in google maps is used to show information associated with the marker
   ideally, when you click a marker the infowindow will pop up and display some information
*/
           
              
  
/*
   Next You need to create markers. So you write a function to do so. 
   We need to create 4 markers, so writing a function helps us to call the function whenever we need 
   to create a marker. We do not want to repeat the same code to create 4 markers. 
   The function takes a parameter as input which is info
   info will contain information about the marker, i.e.
   location and other contents (that we have declared in places)
   The function definition is given below
*/


              var createMarker = function (info){
  
  /*
   Next You need to create a marker using the following code. It should have the following parameters 
   map - which should define our map which is $scope.map
   position, i.e. where the marker should be displayed, info will be used to each attribute of the location
   title of the marker, which is the name - this is a tooltip,a nd very useful in maps
   info contains all information that we have defined in places []
   each attribute is accessed using the attribute name 
*/
       

                  var marker = new google.maps.Marker({
                      map: $scope.map,
                      position: new google.maps.LatLng(info.lat, info.long),
                      title: info.name
                  });  // end of creating markers
                  
  /*
  Now each marker has some content associated to it, i.e. desc, lat and long, which we want to display
  marker.content is used to consolidate all information about the marker together
  For example, the marker for changi airport has a name, description, latitude, longitude
 */
marker.content = "description" + info.desc + '<br />' + "latitude" + info.lat + ' E,' + "longitude" +  info.long +  ' N';
      

  /*
   Now we have to handle the event, i.e. clicking markers
   We add a listener. The listener has the following parameters
   marker - to know which marker is clicked
   click - type of event 
   function - to do something, i.e. what will happen when a marker is clicked 
   Rememeber openInfoWindow($event, marker) in HTML file - we write the logic here
   There is no need to define the function. 
   So when a marker is clicked an event happens, so the following code is executed
*/

                  google.maps.event.addListener(marker, 'click', function(){
                  
 /*
 when a marker is clicked, 
 First we setContents to the infoWindow, using infoWindow.setContent
 we have already initialized infoWindow above, so details should be displayed in the infoWindow
 We have already defined marker.content above 
  Then we will open the window. open takes two parameters, i.e. the map, and the marker which is clicked
  remember the marker is passed as a parameter from the HTML file
*/

                  infoWindow.setContent(marker.content);
                  infoWindow.open($scope.map, marker);
                  }); // this is the end of the listener function
    
/*

We have created markers, written the logic to handle click event and display infowindow.
Now we need to do write the code to put all markers in an array 
This code is used to push each marker into the markers array
So when you call the function create marker one marker will be pushed
Remember we need to push each marker to the markers array
 */
              
                  $scope.markers.push(marker);
                  
              }  // end of createMarkers function

  /*
   Now you need to create 4 markers, which you do using a for loop
   loop until places.length (which is equals to 4) because we have defined 4 places
   and then call createMarker function, the parameter to the function is the information about each marker.
   So all the steps in the create markers are executed for each marker.
   When the loop ends all the markers are pushed in the array
   */
     $scope.display = function(){
                     for (i = 0; i < places.length; i++){
                  createMarker(places[i]);
              }
            }

              
             
   // end of controller function

});



