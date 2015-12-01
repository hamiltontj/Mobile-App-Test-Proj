	var xStart = 0;
	var xEnd = 0;
	var sidebarSensitivity = 20;
	var sidebarVisible = false;
	
	var calendarZoomed = false;
	
	var mapZoomLevel = 0;
	var calendarZoomLevel = 0;
	
	var  map;
	var latitud = 0;
	var longitud = 0;
	
	var storesXml = loadXml("stores.xml")
	var foodXml = loadXml("food.xml")
	
	var foodVisibleFlag = false;
	var storesVisableFlag = false;
	var markersArray = [];
	
	function loadXml(xmlUrl) {
		var xmlhttp;

		if (window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		} else {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.open("GET", xmlUrl, false);
		xmlhttp.send();
		xmlDoc = xmlhttp.responseXML;
		return xmlDoc;
	}
	
	function campusMapShortcut()
	{
		document.getElementById("mapsScreen").style.display = "none";
		document.getElementById("mapsNavBar").style.display = "none";
		document.getElementById("foodScreen").style.display = "none";
		document.getElementById("storeScreen").style.display = "none";
		document.getElementById("arcScreen").style.display = "none";
		document.getElementById("calendarScreen").style.display = "none";
		document.getElementById("landingScreen").style.display = "none";
		document.getElementById("campusMapsScreen").style.display = "initial";
		
		campusMapLocation(latitud, longitud);
		
		document.getElementById("layer1").innerHTML = " > Campus Map";
		document.getElementById("layer1").onclick = campusMapShortcut;
	}
	function mapShortcut()
	{
		document.getElementById("foodScreen").style.display = "none";
		document.getElementById("storeScreen").style.display = "none";
		document.getElementById("arcScreen").style.display = "none";
		document.getElementById("calendarScreen").style.display = "none";
		document.getElementById("landingScreen").style.display = "none";
		document.getElementById("campusMapsScreen").style.display = "none";
		document.getElementById("mapsScreen").style.display = "inline";
		document.getElementById("mapsNavBar").style.display = "inline";
		
		windowHeight = $(window).height();
		
		if(windowHeight > 300)
		{
			$("#googleMap").css("height", windowHeight - 60);
		}
		else
		{
			$("#googleMap").css("height", 600 - 30);
			alert("small window");
		}
		
		locateMe();
		
		document.getElementById("layer1").innerHTML = " > Map";
		document.getElementById("layer1").onclick = mapShortcut;
	}
	function foodShortcut()
	{
		document.getElementById("mapsScreen").style.display = "none";
		document.getElementById("mapsNavBar").style.display = "none";
		document.getElementById("campusMapsScreen").style.display = "none";
		document.getElementById("storeScreen").style.display = "none";
		document.getElementById("arcScreen").style.display = "none";
		document.getElementById("calendarScreen").style.display = "none";
		document.getElementById("landingScreen").style.display = "none";
		document.getElementById("foodScreen").style.display = "initial";
		
		document.getElementById("layer1").innerHTML = " > Food";
		document.getElementById("layer1").onclick = foodShortcut;
	}
	function storeShortcut()
	{
		document.getElementById("mapsScreen").style.display = "none";
		document.getElementById("mapsNavBar").style.display = "none";
		document.getElementById("campusMapsScreen").style.display = "none";
		document.getElementById("foodScreen").style.display = "none";
		document.getElementById("arcScreen").style.display = "none";
		document.getElementById("calendarScreen").style.display = "none";
		document.getElementById("landingScreen").style.display = "none";
		document.getElementById("storeScreen").style.display = "initial";
		
		document.getElementById("layer1").innerHTML = " > Store";
		document.getElementById("layer1").onclick = storeShortcut;
	}
	function arcShortcut()
	{
		document.getElementById("mapsScreen").style.display = "none";
		document.getElementById("mapsNavBar").style.display = "none";
		document.getElementById("campusMapsScreen").style.display = "none";
		document.getElementById("foodScreen").style.display = "none";
		document.getElementById("storeScreen").style.display = "none";
		document.getElementById("calendarScreen").style.display = "none";
		document.getElementById("landingScreen").style.display = "none";
		document.getElementById("arcScreen").style.display = "initial";
		
		document.getElementById("layer1").innerHTML = " > Arc";
		document.getElementById("layer1").onclick = arcShortcut;
	}
	function calendarShortcut()
	{
		document.getElementById("mapsScreen").style.display = "none";
		document.getElementById("mapsNavBar").style.display = "none";
		document.getElementById("campusMapsScreen").style.display = "none";
		document.getElementById("foodScreen").style.display = "none";
		document.getElementById("storeScreen").style.display = "none";
		document.getElementById("arcScreen").style.display = "none";
		document.getElementById("landingScreen").style.display = "none";
		document.getElementById("calendarScreen").style.display = "initial";
		
		document.getElementById("layer1").innerHTML = " > Calendar";
		document.getElementById("layer1").onclick = calendarShortcut;		
	}
	function homeShortcut()
	{
		document.getElementById("mapsScreen").style.display = "none";
		document.getElementById("mapsNavBar").style.display = "none";
		document.getElementById("campusMapsScreen").style.display = "none";
		document.getElementById("foodScreen").style.display = "none";
		document.getElementById("storeScreen").style.display = "none";
		document.getElementById("arcScreen").style.display = "none";
		document.getElementById("calendarScreen").style.display = "none";
		document.getElementById("landingScreen").style.display = "initial";
		
		document.getElementById("layer1").innerHTML = "";
		document.getElementById("layer1").onclick = "";
	}

	
	function campusMapZoom()
	{
		document.getElementById("mapContainer").style.width = "100%";
		document.getElementById("mapContainer").style.height = "100%";
		document.getElementById("mapContainer").style.overflow = "scroll";
		
		if(mapZoomLevel == 2)
		{
			document.getElementById("mapImg").style.width = "400%";
			mapZoomLevel = 3;
		}
		else if(mapZoomLevel == 1)
		{
			document.getElementById("mapImg").style.width = "300%";
			mapZoomLevel = 2;
		}		
		else if(mapZoomLevel == 0)
		{
			document.getElementById("mapImg").style.width = "200%";
			mapZoomLevel = 1;
		}
		else
		{
			document.getElementById("mapContainer").style.width = "auto";
			document.getElementById("mapContainer").style.height = "auto";
			document.getElementById("mapContainer").style.overflow = "visible";
			document.getElementById("mapImg").style.width = "100%";
			
			mapZoomLevel = 0;
		}
		
		//document.getElementById("mapContainer").style.width = "auto";		
	}
	function campusMapLocation(x, y)
	{
		//41.070838, -80.034650 top right
		//41.058526, -80.035698 bottom right
		//41.062280, -80.054511 furthest left
		//41.063118, -80.032735 furthest right
		
		//41.064682, -80.0445805 middleish
		
		//Bounding box topleft topright bottomleft bottomright
		//41.070838, -80.054511
		//41.070838, -80.034650
		//41.058526, -80.054511
		//41.058526, -80.034650
		if(41.070838 > x && x > 41.058526 && -80.034650 > y && y > -80.054511)
		{
			//alert("inside map");
			//draw person on map screen
		}
		else
		{
			//alert("not inside map" + x + "," + y);
		}
	}
	
	
	function createMarkers(xmlDoc, image) 
	{
		var items = xmlDoc.getElementsByTagName('point');

		for (var i = 0; i < items.length; i++) 
		{

			var lat = items[i].getElementsByTagName('latitud')[0].childNodes[0];
			var long = items[i].getElementsByTagName('longitud')[0].childNodes[0];
			var latlng = new google.maps.LatLng(lat.nodeValue, long.nodeValue);

			var name = items[i].getElementsByTagName('name')[0].childNodes[0].nodeValue;
			var address = items[i].getElementsByTagName('address')[0].childNodes[0].nodeValue;
			var phone = items[i].getElementsByTagName('phone')[0].childNodes[0].nodeValue;

			addMarker(map, name, address, phone, latlng, image);
		}
	}


	function addMarker(map, name, address, phone, latlng, image) {

		var contentString = '';
		contentString += '<div>';
		contentString += '<b>Name:</b>' + name + '<br/>';
		contentString += '<b>Address:</b>' + address + '<br/>';
		contentString += '<b>Phone:</b>' + phone + '<br/>';
		contentString += '</div>';
		
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});

		var markerPoint = new google.maps.Marker({
			position: latlng,
			map: map,
			icon: image,
			title: name
		});

		google.maps.event.addListener(markerPoint, 'click', function() {
			infowindow.open(map, markerPoint);
		});

		markersArray.push(markerPoint);

	}

	function locateMe() 
	{
		if (navigator.geolocation) 
		{
			navigator.geolocation.getCurrentPosition(coordinates, errors,
			{
				maximumAge: 3000,
				timeout: 15000,
				enableHighAccuracy: true
			});

		} 
		else 
		{
			alert("Oops! Your browser does not support geolocation. Chrome download, it's free!");
		}

	}

	function coordinates(position)
	{
		latitud = position.coords.latitude;
		longitud = position.coords.longitude;
		loadMap();
	}

	function errors(err) 
	{
		if (err.code == 0) {
			alert("Oops! Something has gone wrong");
		}
		if (err.code == 1) {
			alert("Oops! you have not agreed to share your position");
		}
		if (err.code == 2) {
			alert("Oops! Can not get the current position");
		}
		if (err.code == 3) {
			alert("Oops! We have exceeded the timeout");
		}
	}

	function loadMap() 
	{
		var latlon = new google.maps.LatLng(latitud, longitud);
		var myOptions = 
		{

			zoom: 15,
			center: latlon,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map(document.getElementById('googleMap'), myOptions);
		
		var coorMarker = new google.maps.LatLng(latitud, longitud);

		marker = new google.maps.Marker(
		{

			position: coorMarker,
			map: map,
			icon: 'images/location_b.svg',
			title: "Where am I?"
		});
}

	function showMyPoints(xmlDoc, image) {
		createMarkers(xmlDoc, image);
	}
	function removePoints() 
	{
		if (markersArray) {
			for (i in markersArray) {
				markersArray[i].setMap(null);
			}
			markersArray.length = 0;
		}

	}
	
	function calendarZoom()
	{
		/*
		if(!calendarZoomed)
		{
			document.getElementById("calendarImg").src = "images/AcademicCalendar.png";
			//document.getElementById("calendarContainer").style.height = "100%";
		}
		else
		{
			document.getElementById("calendarImg").src = "images/AcademicCalendarSmall.png";
			//document.getElementById("calendarContainer").style.height = "399px";
		}
		calendarZoomed = !calendarZoomed;
		*/
		
		
		document.getElementById("calendarContainerHider").style.width = "100%";
		document.getElementById("calendarContainer").style.width = "100%";
		document.getElementById("calendarContainer").style.overflow = "scroll";
		
		if(calendarZoomLevel == 1)
		{
			document.getElementById("calendarContainerHider").style.height = "2149px";
			document.getElementById("calendarContainer").style.height = "2149px";
			document.getElementById("calendarImg").style.width = "850px";
			calendarZoomLevel = 2;
		}
		else if(calendarZoomLevel == 0)
		{
			document.getElementById("calendarImg").src = "images/AcademicCalendar.png";
			//document.getElementById("calendarContainer").style.height = "100%";
			calendarZoomLevel = 1;
		}		
		else
		{
			document.getElementById("calendarImg").src = "images/AcademicCalendarSmall.png";
			document.getElementById("calendarContainer").style.width = "auto";
			document.getElementById("calendarContainer").style.height = "auto";
			document.getElementById("calendarContainer").style.overflow = "visible";
			
			document.getElementById("calendarContainerHider").style.width = "auto";
			document.getElementById("calendarContainerHider").style.height = "auto";
			
			document.getElementById("calendarImg").style.width = "100%";
			
			calendarZoomLevel = 0;
		}
	}
	
	function getWeather()
	{
		updateWeather();
		setInterval(updateWeather, 300000);
	}
	function updateWeather()
	{
		$(document).ready(function() {
			$.simpleWeather({
				location: '', woeid: '2494716',unit: 'f',
				success: function(weather) {
					currWeather = "It is currently " + weather.temp + '&deg;' + weather.units.temp + " and " + weather.currently + " in Slppery Rock";
					document.getElementById("weather").innerHTML = currWeather;
				},
				error: function(error) {
					document.getElementById("weather").innerHTML = "Error Getting Weather";
				}
			});
		});
	}
	
	function sidebar(event)
	{
		xStart = event.clientX;
	}
	function sidebarPullout(event)
	{
		xEnd = event.clientX;
		if(xStart < sidebarSensitivity && xEnd > xStart + sidebarSensitivity)
		{
			sidebarToggle()
		}
	}
	function sidebarCollapse(event)
	{
		xEnd = event.clientX;
		if(xEnd < xStart - sidebarSensitivity)
		{
			sidebarToggle()
		}
	}
	function sidebarToggle()
	{
		if(!sidebarVisible)
		{
			document.getElementById("sidebar").style.display = "initial";
		}
		else
		{
			document.getElementById("sidebar").style.display = "none";
		}
		sidebarVisible = !sidebarVisible;
	}
	
	function setup()
	{
		//document.getElementById("sidebarPulloutZone").style.width = "100%";
		getWeather();
		locateMe();
	}