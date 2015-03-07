(function() {
  'use strict';
  /*global google, downloadGoogleSpreadsheet*/

  var SPREADSHEET_KEY = '1LNtQpTA93X-CYaQVnZ5EBLDDRJ7es1wyplfpRpI9sxU';

  var mapCanvas = document.getElementById('map-canvas');
  checkRequiredThings();

  google.maps.event.addDomListener(window, 'load', initializeMap);

  var map, info;

  function initializeMap() {
    var mapOptions = {
      center: { lat: 46.9998691, lng: 28.8581765},
      zoom: 12
    };

    map = new google.maps.Map(mapCanvas, mapOptions);
    info = new google.maps.InfoWindow({});

    console.log('loading spreadsheet', SPREADSHEET_KEY);
    downloadGoogleSpreadsheet(SPREADSHEET_KEY, drawMarkers);
  }

  function drawMarkers(error, rows) {
    if (error) throw error;

    console.log('initial rows', rows);

    rows = rows.slice(1).map(function(row) {
      return {
        name: row[0],
        phoneNumber: row[1],
        lat: parseFloat(row[2]),
        long: parseFloat(row[3]),
        description: row[4]
      };
    });

    console.log('prepared rows', rows);

    rows.forEach(function rowIterator(cabinet) {
      var myLatlng = new google.maps.LatLng(cabinet.lat, cabinet.long);

      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: cabinet.name,
        icon: 'http://metropediatricdental.com/wp-content/uploads/2014/07/youtube-tooth.png'
      });

      google.maps.event.addListener(marker, 'click', function() {
        info.setContent('<div id="info">' +
          'Here we’re displaying useful information about ' + cabinet.name + ':' +
          '<ul>' +
          '<li>phone number: ' + cabinet.phoneNumber + '</li>' +
          '<li>description: ' + cabinet.description + '</li>' +
          '</ul>' +
          '</div>');
        info.open(map, marker);
      });
    });
  }

  function checkRequiredThings() {
   /*jshint maxcomplexity:6*/
    if (!mapCanvas) throw Error('#map-canvas is required');

    var errorMessage = 'downloadGoogleSpreadsheet() is required. ' +
      'Please include http://gurdiga.github.io/gsheet-downloader/gsheet-downloader.min.js.';
    if (typeof downloadGoogleSpreadsheet !== 'function') throw new Error(errorMessage);

    errorMessage = 'Google Maps library is required. Please check ' +
      'https://developers.google.com/maps/documentation/javascript/tutorial.';
    if (!google || !google.maps || typeof google.maps.Map !== 'function') throw new Error(errorMessage);
  }
}());
