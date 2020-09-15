//https://www.google.com/maps/@17.3650257,110.068687,5.41z
	var map = L.map('map').setView([17.3650257, 110.068687], 6);

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/light-v9',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(map);


	// control that shows state info on hover
	var info = L.control();

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};

	info.update = function (props) {
		this._div.innerHTML = '<h4>Mật độ dân số</h4>' +  (props ?
			'<b>' + props.name + '</b><br />' + props.mat_do_dan + ' people / mi<sup>2</sup>'
			: ' ');
	};

	info.addTo(map);


	// get color depending on population density value
	function getColor(d) {
		return d > 4025 ? '#bd0026' :
		d > 722 ? '#bd0026' :
				d > 392  ? '#f03b20' :
				d > 208  ? '#fd8d3c' :
				d > 122  ? '#fecc5c' :
				d > 48   ? '#f5f54d' :
				'#fce0e0';
							
	}

	function style(feature) {
		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.8,
			fillColor: getColor(feature.properties.mat_do_dan)
		};
	}

	function highlightFeature(e) {
		var layer = e.target;

		layer.setStyle({
			weight: 5,
			color: '#666',
			dashArray: '',
			fillOpacity: 0.7
		});

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}

		info.update(layer.feature.properties);
	}

	var geojson;

	function resetHighlight(e) {
		geojson.resetStyle(e.target);
		info.update();
	}

	function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());
	}

	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature
		});
	}

	// geojson = L.geoJson(statesData, {
	// 	style: style,
	// 	onEachFeature: onEachFeature
	// }).addTo(map);

	/* var geojson = new L.GeoJSON.AJAX("us.json",{
		style: style,
		onEachFeature: onEachFeature
	}).addTo(map); */

	var geojson = new L.GeoJSON.AJAX("leaflet/ds2_2016.json",{
		style: style,
		onEachFeature: onEachFeature
	}).addTo(map);

	// var jsonTest = new L.GeoJSON.AJAX(["leaflet/ds2018_low.geojson"],{onEachFeature:popUp}).addTo(mymap);

	map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');


	var legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {

		var div = L.DomUtil.create('div', 'info legend'),
			grades = [48, 122, 208, 392, 722, 4025],
			labels = [],
			from, to;

		for (var i = 0; i < grades.length; i++) {
			from = grades[i];
			to = grades[i + 1];

			labels.push(
				'<i style="background:' + getColor(from + 1) + '"></i> ' +
				from + (to ? '&ndash;' + to : '+'));
		}

		div.innerHTML = labels.join('<br>');
		return div;
	};

	legend.addTo(map);