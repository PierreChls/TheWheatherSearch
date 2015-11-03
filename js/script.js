if(navigator.geolocation) {
	// L’API est disponible
	navigator.geolocation.getCurrentPosition(function(position) {
	// L’objet position contient les informations de géolocalisation
		var crd = position.coords;
		Latitude=crd.latitude;
		Longitude=crd.longitude;
			
	    geocode_map(Latitude, Longitude);
		create_map(Latitude, Longitude);
		initialize();        
	});
}
else{
	alert('La géolocalisation n’est pas prise en compte');
	document.getElementById('adress').innerHTML = "Votre géolocalisation est désactivée.";
}


Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = 0, len = this.length; i < len; i++) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

var Latitude, Longitude;
var geocoder;
var marker;
var mapOptions;
var map;
var cityname;
var geocoder;
var map;
var infoWindow = new google.maps.InfoWindow();
var content;

function geocode_map(Lat, Long){
	geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(Lat, Long);
	geocoder.geocode({'latLng': latlng}, function(results, status){
		if (status == google.maps.GeocoderStatus.OK){
			if (results[0]){
		    	cityname=results[0].address_components[2].long_name;
		        document.getElementById('adress').innerHTML = 'Nous sommes &agrave ' + cityname+'.';
			}
		    else{
		    	alert("address not found");
		    }
		}
		else{
			//document.getElementById("location").innerHTML="Geocoder failed due to: " + status;
			//alert("Geocoder failed due to: " + status);
		}
	});
}

function create_map(latitude, longitude){
	var mapOptions = {
		center: { lat: latitude, lng: longitude},
		zoom: 15, 
		styles : [
				    {
				        "featureType": "landscape",
				        "elementType": "labels",
				        "stylers": [
				            {
				                "visibility": "off"
				            }
				        ]
				    },
				    {
				        "featureType": "transit",
				        "elementType": "labels",
				        "stylers": [
				            {
				                "visibility": "off"
				            }
				        ]
				    },
				    {
				        "featureType": "poi",
				        "elementType": "labels",
				        "stylers": [
				            {
		                "visibility": "off"
				            }
				        ]
				    },
				    {
				        "featureType": "water",
				        "elementType": "labels",
				        "stylers": [
				            {
				                "visibility": "off"
				            }
				        ]
				    },
				    {
				        "featureType": "road",
				        "elementType": "labels.icon",
				        "stylers": [
				            {
				                "visibility": "off"
				            }
				        ]
				    },
				    {
				        "stylers": [
				            {
				                "hue": "#00aaff"
				            },
				            {
				                "saturation": -100
				            },
				            {
				                "gamma": 2.15
				            },
				            {
				                "lightness": 12
				            }
				        ]
				    },
				    {
				        "featureType": "road",
				        "elementType": "labels.text.fill",
				        "stylers": [
				            {
				                "visibility": "on"
				            },
				            {
				                "lightness": 24
				            }
				        ]
				    },
				    {
				        "featureType": "road",
				        "elementType": "geometry",
				        "stylers": [
				            {
				                "lightness": 57
				            }
				        ]
				    }
				]
		};
		map = new google.maps.Map(document.getElementById('map'),mapOptions);
		marker = new google.maps.Marker({position: {lat: latitude, lng: longitude}, map: map, animation:google.maps.Animation.BOUNCE, draggable:false});
}

function date_heure(){
	date = new Date;
	annee = date.getFullYear();
	moi = date.getMonth();
	mois = new Array('janvier', 'f&eacute;vrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'ao&ucirc;t', 'septembre', 'octobre', 'novembre', 'd&eacute;cembre');
	j = date.getDate();
	jour = date.getDay();
	jours = new Array('dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi');
	h = date.getHours();
	if(h>=20 && h<=23 || h>=0 && h<=5) {
		$(".sun").css('background', 'url(img/moon.svg) no-repeat scroll 0% 0% transparent');
	}
	if(h>=6 && h<20) {
		$(".sun").css('background', 'url(img/sun.svg) no-repeat scroll 0% 0% transparent');
	}
	if(h<10){
		h = "0"+h;
	}
	m = date.getMinutes();
	if(m<10){
		m = "0"+m;
	}
	if(moi>=3 && moi<=6){
		//printemps
		$('#season').css('background-image', 'url(img/season/spring.svg)');
	}
	if(moi>=6 && moi<=9){
		//été
		$('#season').css('background-image', 'url(img/season/summer.svg)');
	}
	if(moi>=9 && moi<=12){
		//automne
		$('#season').css('background-image', 'url(img/season/autumn.svg)');
	}
	if(moi==12 || moi<=3){
		//hiver
		$('#season').css('background-image', 'url(img/season/winter.svg)');
	}
		        
	document.getElementById('date').innerHTML = 'Nous sommes le '+jours[jour]+' '+j+' '+mois[moi]+' '+annee+' il est '+h+':'+m+'.';
}

// function to generate a random number range.
function randRange( minNum, maxNum) {
  return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}
			 
// function to generate drops
function createRain(nbDrop) {
    for( i=1;i<nbDrop;i++) {
	    var dropLeft = randRange(0,1600);
		var dropTop = randRange(-1000,1400);
		
		$('.rain').append('<div class="drop" id="drop'+i+'"></div>');
		$('#drop'+i).css('left',dropLeft);
		$('#drop'+i).css('top',dropTop);
	}
}

// function to generate clouds
function createClouds(nbCloud) {
	for( i=0;i<=nbCloud;i++) {
		$('#clouds').append('<div id="cloudx'+(i+1)+'" class="cloud x'+(i+1)+'"></div>');
	}
}

function hide_map(){
	$("#all_map").slideUp(1000);
	setTimeout(hide_map_during, 1000); 
}

function show_map(){
	$('#all_map').css('display', 'none;');
	$('#all_map').css('left', '0px');
	$('#all_map').css('display', 'block;');
	$("#all_map").slideUp(0);
	$("#all_map").slideDown(1000);
}
		
function hide_map_during(){
	$('#all_map').css('display', 'none;');
	$('#all_map').css('left', '-2000px');
	$('#all_map').css('display', 'block;');
	$("#all_map").slideDown(0);
}

function translate_weather(weather){
	if(weather=="Clear"){
		weather="dégagé";
	}
	if(weather=="Thunderstorm"){
		weather="orageux";
	}
	if(weather=="Drizzle"){
		weather="brumeux";
	}
	if(weather=="Rain"){
		weather="pluvieux";
	}
	if(weather=="Snow"){
		weather="enneigé";
	}
	if(weather=="Clouds"){
		weather="nuageux";
	}
	if(weather=="Extreme"){
		weather="extreme";
	}
	if(weather=="Additional" || weather=="Atmosphere"){
		weather="spécial";
	}
	
	return weather;
}

function weather_animation(id_weather, wind, clouds){
	var nbDrop;
	var nbCloud;
	if(id_weather>=300 && id_weather<=531){
		if(id_weather>=300 && id_weather<=321){
			if(id_weather==300 ){
				nbDrop = 10; 
			}
			if(id_weather==301){
				nbDrop = 50; 
			}
			if(id_weather>=302 && id_weather<=310){
				nbDrop = 80; 
			}
			if(id_weather==311){
				nbDrop = 100; 
			}
			if(id_weather>=312 && id_weather<=313){
				nbDrop = 120; 
			}
			if(id_weather>=314 && id_weather<=321){
				nbDrop = 180; 
			}
		}
			
		if(id_weather>=500 && id_weather<=531){
			if(id_weather==500 || id_weather==501){
				nbDrop = 200; 
			}
			if(id_weather==502 || id_weather==503){
				nbDrop = 300; 
			}
			if(id_weather==504){
				nbDrop = 400; 
			}
			if(id_weather>=511 && id_weather<=522){
				nbDrop = 800; 
			}
			if(id_weather==531){
				nbDrop = 1000; 
			}
		}
	}
	if(id_weather>=800 && id_weather<=804){
		if(id_weather==800){
			nbCloud = 0; 
		}
		if(id_weather==801){
			nbCloud = 1; 
			if(wind>=10 && wind<=25) {
					$(".x1").css('-webkit-animation', 'moveclouds 10s linear infinite');
					$(".x1").css('-mov-animation', 'moveclouds 10s linear infinite');
			}
			if(wind>=26 && wind<=65) {
				$(".x1").css('-webkit-animation', 'moveclouds 7s linear infinite');
				$(".x1").css('-mov-animation', 'moveclouds 7s linear infinite');
			}
			if(wind>=66 && wind<=200) {
				$(".x1").css('-webkit-animation', 'moveclouds 5s linear infinite');
				$(".x1").css('-mov-animation', 'moveclouds 5s linear infinite');
			}
		}
		if(id_weather==802){
			nbCloud = 2; 
			if(wind>=10 && wind<=25) {
				$(".x1").css('-webkit-animation', 'moveclouds 10s linear infinite');
				$(".x1").css('-mov-animation', 'moveclouds 10s linear infinite');
				$(".x2").css('-webkit-animation', 'moveclouds 20s linear infinite');
				$(".x2").css('-mov-animation', 'moveclouds 20s linear infinite');
			}
			if(wind>=26 && wind<=65) {
				$(".x1").css('-webkit-animation', 'moveclouds 7s linear infinite');
				$(".x1").css('-mov-animation', 'moveclouds 7s linear infinite');
				$(".x2").css('-webkit-animation', 'moveclouds 15s linear infinite');
				$(".x2").css('-mov-animation', 'moveclouds 15s linear infinite');
			}
			if(wind>=66 && wind<=200) {
				$(".x1").css('-webkit-animation', 'moveclouds 5s linear infinite');
				$(".x1").css('-mov-animation', 'moveclouds 5s linear infinite');
				$(".x2").css('-webkit-animation', 'moveclouds 10s linear infinite');
				$(".x2").css('-mov-animation', 'moveclouds 10s linear infinite');
			}
		}
		if(id_weather==803){
			nbCloud = 3; 
			if(wind>=10 && wind<=25) {
				$(".x1").css('-webkit-animation', 'moveclouds 10s linear infinite');
				$(".x1").css('-mov-animation', 'moveclouds 10s linear infinite');
				$(".x2").css('-webkit-animation', 'moveclouds 20s linear infinite');
				$(".x2").css('-mov-animation', 'moveclouds 20s linear infinite');
				$(".x3").css('-webkit-animation', 'moveclouds 15s linear infinite');
				$(".x3").css('-mov-animation', 'moveclouds 15s linear infinite');
			}
			if(wind>=26 && wind<=65) {
				$(".x1").css('-webkit-animation', 'moveclouds 7s linear infinite');
				$(".x1").css('-mov-animation', 'moveclouds 7s linear infinite');
				$(".x2").css('-webkit-animation', 'moveclouds 15s linear infinite');
				$(".x2").css('-mov-animation', 'moveclouds 15s linear infinite');
				$(".x3").css('-webkit-animation', 'moveclouds 11s linear infinite');
				$(".x3").css('-mov-animation', 'moveclouds 11s linear infinite');
			}
			if(wind>=66 && wind<=200) {
				$(".x1").css('-webkit-animation', 'moveclouds 5s linear infinite');
				$(".x1").css('-mov-animation', 'moveclouds 5s linear infinite');
				$(".x2").css('-webkit-animation', 'moveclouds 10s linear infinite');
				$(".x2").css('-mov-animation', 'moveclouds 10s linear infinite');
				$(".x3").css('-webkit-animation', 'moveclouds 8s linear infinite');
				$(".x3").css('-mov-animation', 'moveclouds 8s linear infinite');
			}
		}
		if(id_weather==804){
			nbCloud = 4; 
			if(wind>=10 && wind<=25) {
				$(".x1").css('-webkit-animation', 'moveclouds 10s linear infinite');
				$(".x1").css('-mov-animation', 'moveclouds 10s linear infinite');
				$(".x2").css('-webkit-animation', 'moveclouds 20s linear infinite');
				$(".x2").css('-mov-animation', 'moveclouds 20s linear infinite');
				$(".x3").css('-webkit-animation', 'moveclouds 15s linear infinite');
				$(".x3").css('-mov-animation', 'moveclouds 15s linear infinite');
				$(".x4").css('-webkit-animation', 'moveclouds 13s linear infinite');
				$(".x4").css('-mov-animation', 'moveclouds 13s linear infinite');
			}
			if(wind>=26 && wind<=65) {
				$(".x1").css('-webkit-animation', 'moveclouds 7s linear infinite');
				$(".x1").css('-mov-animation', 'moveclouds 7s linear infinite');
				$(".x2").css('-webkit-animation', 'moveclouds 15s linear infinite');
				$(".x2").css('-mov-animation', 'moveclouds 15s linear infinite');
				$(".x3").css('-webkit-animation', 'moveclouds 11s linear infinite');
				$(".x3").css('-mov-animation', 'moveclouds 11s linear infinite');
				$(".x4").css('-webkit-animation', 'moveclouds 9s linear infinite');
				$(".x4").css('-mov-animation', 'moveclouds 9s linear infinite');
			}
			if(wind>=66 && wind<=200) {
				$(".x1").css('-webkit-animation', 'moveclouds 5s linear infinite');
				$(".x1").css('-mov-animation', 'moveclouds 5s linear infinite');
				$(".x2").css('-webkit-animation', 'moveclouds 10s linear infinite');
				$(".x2").css('-mov-animation', 'moveclouds 10s linear infinite');
				$(".x3").css('-webkit-animation', 'moveclouds 8s linear infinite');
				$(".x3").css('-mov-animation', 'moveclouds 8s linear infinite');
				$(".x4").css('-webkit-animation', 'moveclouds 6s linear infinite');
				$(".x4").css('-mov-animation', 'moveclouds 6s linear infinite');
			}
		}
	}
	
	if(id_weather>=600 && id_weather<=622){
		$('.rain').append('<div id="snow"></div>');
	}
			
	if(clouds>=0 && (id_weather<800 && id_weather>804)){
		if(clouds==0){
			nbCloud = 0;
		}
		if(clouds>0 && clouds<30){
			nbCloud = 1;
		}
		if(clouds>=30 && clouds<50){
			nbCloud = 2;
		}
		if(clouds>=50 && clouds<70){
			nbCloud = 3;
		}
		if(clouds>=70){
			nbCloud = 4;
		}
	}
				
	createRain(nbDrop);
	createClouds(nbCloud);
}

function replaceDiacritics(str){
	var alphabet = { a:/[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/ig,
	    aa:/[\uA733]/ig,
	    ae:/[\u00E6\u01FD\u01E3]/ig,
	    ao:/[\uA735]/ig,
	    au:/[\uA737]/ig,
	    av:/[\uA739\uA73B]/ig,
	    ay:/[\uA73D]/ig,
	    b:/[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/ig,
	    c:/[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/ig,
	    d:/[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/ig,
	    dz:/[\u01F3\u01C6]/ig,
	    e:/[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/ig,
	    f:/[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/ig,
	    g:/[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/ig,
	    h:/[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/ig,
	    hv:/[\u0195]/ig,
	    i:/[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/ig,
	    j:/[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/ig,
	    k:/[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/ig,
	    l:/[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/ig,
	    lj:/[\u01C9]/ig,
	    m:/[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/ig,
	    n:/[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/ig,
	    nj:/[\u01CC]/ig,
	    o:/[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/ig,
	    oi:/[\u01A3]/ig,
	    ou:/[\u0223]/ig,
	    oo:/[\uA74F]/ig,
	    p:/[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/ig,
	    q:/[\u0071\u24E0\uFF51\u024B\uA757\uA759]/ig,
	    r:/[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/ig,
	    s:/[\u0073\u24E2\uFF53\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/ig,
	    ss:/[\u00DF\u1E9E]/ig,
	    t:/[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/ig,
	    tz:/[\uA729]/ig,
	    u:/[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/ig,
	    v:/[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/ig,
	    vy:/[\uA761]/ig,
	    w:/[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/ig,
	    x:/[\u0078\u24E7\uFF58\u1E8B\u1E8D]/ig,
	    y:/[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/ig,
	    z:/[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/ig,
	    '':/[\u0300\u0301\u0302\u0303\u0308]/ig
		};
		
		for (var letter in alphabet) {
			str = str.replace(alphabet[letter], letter);
		}
		return str;
}

function initialize() {
	var name;
	var celsius;
	var id_weather;
	var weather;
	var weather_description;
	var wind;
	var clouds;
	var nbDrop=0;
	var nbCloud=0;
			
	$("#open").css("display", "block");
		
	$(document).ready(function(){
		$.getJSON('http://api.openweathermap.org/data/2.5/weather?lat='+Latitude+'&lon='+Longitude, getData);
	});
			
	function getData(s){	
		name = s.name;
		celsius = s.main.temp - 273.15;
		id_weather = s.weather[0].id;
		weather = s.weather[0].main;
		weather_description = s.weather[0].description;
		wind = s.wind.speed;
		clouds = s.clouds.all;
				
		weather_animation(id_weather,  wind, clouds);

		weather=translate_weather(weather);
			
		date_heure();	
		
		document.getElementById('temp').innerHTML = 'Il fait ' + celsius.toFixed(0) + '&deg;C'+', le vent est de '+wind+'km/h.';
		document.getElementById('id_weather').innerHTML = 'Id : ' + id_weather;
		document.getElementById('weather').innerHTML = 'Le temps est ' + weather+'.';
		document.getElementById('weather_descrip').innerHTML = 'Description : ' + weather_description;
		document.getElementById('wind').innerHTML = 'Vent : ' + wind + 'km/h';
		document.getElementById('clouds_nb').innerHTML = 'Nuageux : ' + clouds;
	}	
}
		
function change_city(){
		
	$("#open").css("display", "block");
	$("div[id*=drop]").remove();
	$("div[id*=cloudx]").remove();
	$("#snow").remove();
		
	date_heure();
	
			
	var city = document.getElementById('new_city').value;
	  
	city=replaceDiacritics(city);
	  
	$.getJSON('http://api.openweathermap.org/data/2.5/weather?q='+city, getData);
		
	function getData(s){
		var name = s.name;
		var celsius = s.main.temp - 273.15;
		var id_weather = s.weather[0].id;
		var weather = s.weather[0].main;
		var weather_description = s.weather[0].description;
		var wind = s.wind.speed;
		var clouds = s.clouds.all;
		
		weather_animation(id_weather);
			
		weather=translate_weather(weather);
			
		Lat=s.coord.lat;
		Long=s.coord.lon;
		create_map(Lat, Long);     
		geocode_map(Lat, Long);
			
		document.getElementById('temp').innerHTML = 'Il fait ' + celsius.toFixed(0) + '&deg;C'+', le vent est de '+wind+'km/h.';
		document.getElementById('id_weather').innerHTML = 'Id : ' + id_weather;
		document.getElementById('weather').innerHTML = 'Le temps est ' + weather+'.';
		document.getElementById('weather_descrip').innerHTML = 'Description : ' + weather_description;
		document.getElementById('wind').innerHTML = 'Vent : ' + wind + 'km/h';
		document.getElementById('clouds_nb').innerHTML = 'Nuageux : ' + clouds;
			
	}
}