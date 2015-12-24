
WebFontConfig = {
  google: { families: [ 'Yantramanav:400,200,100,300,500,600,700:latin' ] }
};
(function() {
  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();

 
jQuery(window).load(function() {
	$('#signoff').hide();	
	//Drop-down menu
    $("#menu > li > a").click(function (e) { // binding onclick
        if ($(this).parent().hasClass('selected')) {
            $("#menu div div").slideUp(100); // hiding popups
            $("#menu .selected").removeClass("selected");
			$('#description').show();

        } else {
            $("#menu div div").slideUp(100); // hiding popups
            $("#menu .selected").removeClass("selected");

            if ($(this).next(".dropdown").length) {
                $(this).parent().addClass("selected"); // display popup
                $(this).next(".dropdown").children().slideDown(200);
				$('#description').hide();
            }
        }
        e.stopPropagation();
    });
	$("body").click(function () { // binding onclick to body
	    $("#menu div div").slideUp(100); // hiding popups
	    $("#menu .selected").removeClass("selected");
		$('#description').show();
	}); 
	$("#about").click(function () {
		$('#signoff').hide();	
		$('#catchphrase').html("");		
		location.reload();
	});
	$("#resume").click(function (){
		$('#catchphrase').html("");		
		$('what').html("");		
		$("why").html("");
		var url = "http://www.slideshare.net/slideshow/embed_code/key/DSh0iY9IQLwFaz";
	    $('<iframe />', {
		        name: 'frame',
		        id:   'frame',
		        width: '477px',
		        height: '510px',
		        frameborder: '0',
		        seamless: 'seamless',
		        scrolling: 'no',
		        allowtransparency:'true', 
		        allowfullscreen:'true',
		        src: url
		        }).appendTo('why');
	});

});



function main() {
	//Timeline JS
	var options = {
	    hash_bookmark: false,
	    initial_zoom: 1,
		timenav_position: 'top'
	  };
  	var timeline;
	timeline = new TL.Timeline('timeline-embed',
	'https://docs.google.com/spreadsheets/d/1UplTJNeC-vGyXjvty5yaAIdQjPP6ACNPjcufswrFT1g/pubhtml', options);
  
    //Leaflet Map
	var map;

  	//leaflet map
  	map = L.map('map', {
    	zoomControl: true,
    	center: [20, -100],
    	zoom: 3,
		minZoom: 2,
    	maxZoom: 18
  	});
  
  
  	// add a base layer with names layer
	var options2 = {
  		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Map tiles by <a href="http://maps.stamen.com/#terrain/12/37.7707/-122.3781">Stamen Design</a>, under CC BY 3.0., &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
	};  
	L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', options2).addTo(map);
	L.tileLayer('http://{s}.tiles.mapbox.com/v3/tbushman.i6fcm2a5/{z}/{x}/{y}.png').addTo(map); //names
  	//as an alternative basemap, use: 
  
  	//L.tileLayer('http://{s}.tiles.mapbox.com/v3/tbushman.cii3lpj0k003a99lwsbmu9r67/{z}/{x}/{y}.png').addTo(map);
  
  	//define CartoDB api url
  	var layerUrl = 'https://tbushman.cartodb.com/api/v2/viz/2c8ad242-a11f-11e5-a138-0e674067d321/viz.json'; 
        
  	// create layer and add to the map, then add some interactivity
  	var lyr1 = [];//aka 'sublayers' in some other maps  
  	cartodb.createLayer(map, layerUrl)
   	.addTo(map)
   	.on('done', function(layer) {
    	var subLayerOptions = {
       		sql: "SELECT * FROM portfolio_tb",
		
       		interactivity: 'cartodb_id, timeline'
    	};
     	//create sublayer
    	var sublayer = layer.getSubLayer(0);
    	sublayer.setInteraction(true);
    	addCursorInteraction(sublayer);
     
    	lyr1.push(sublayer);

    	var sql = new cartodb.SQL({ user: 'tbushman' });

		//wire buttons (timeline)
		$('.tl-timemarker').click(function (sql_select, e, latlon, pxPos, data, layer){
        	$('#external').html("");
        	$('#catchphrase').html("");
			$('what').html("");
			$('why').html("");
			$('.tl-timemarker').removeClass('selected');
	    	$(this).addClass('selected');
			var sql_init = new cartodb.SQL({ user: 'tbushman' });
			var clicked = [$(this).attr('id')];
			var sql_select = "SELECT cartodb_id, name, timeline, description, buttonid, pic1, pic2, pic3, pic4, pic5, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM portfolio_tb WHERE timeline = '"+clicked+"'";
			sql_init.execute(sql_select).done(function(ret){
				var list = ret.rows[0];
				var lat = list.lat;
				delete list.lat;
				var lon = list.lon;
				delete list.lon;
				map.setView(new L.LatLng(lat, lon),9);
				
				var name = list.name;
		    	console.log(name);
				var pic1 = list.pic1;
				console.log(pic1);
				var pic2 = list.pic2;
				console.log(pic2);
				var pic3 = list.pic3;
				console.log(pic3);
				var pic4 = list.pic4;
				console.log(pic4);
				var pic5 = list.pic5;
				console.log(pic5);
		    	var description = list.description;
		    	console.log(description);
		    	var link = list.link;
		    	console.log(link);
		    	var content = $('<h2>' + name + '</h2><here><div id="'+list.cartodb_id+'" class="pic1"><a href="#" ><img class="items pic1" src="'+pic1+'"></img></a></div><div id="'+list.cartodb_id+'" class="pic2"><a href="#" ><img class="items pic2" src="'+pic2+'"></img></a></div><div id="'+list.cartodb_id+'" class="pic3"><a href="#" ><img class="items pic3" src="'+pic3+'"></img></a></div><div id="'+list.cartodb_id+'" class="pic4"><a href="#" ><img class="items pic4" src="'+pic4+'"></img></a></div><div id="'+list.cartodb_id+'" class="pic5"><a href="#" ><img class="items pic5" src="'+pic5+'"></img></a></div></here><h4>'+ description +'</h4><a href="' + link + '" target="_blank">Click here for more info.</a>');
				console.log(content);
				$('what').html("");
				$('what').append(content);
				$(".items").each(function(){     
					if ($(this).attr("src") == "null") {
				    	$(this).remove();
						$('here div a:empty').parent().remove();
					}
					else  {     
						$(this).show();
						return true;
	     			}
			    });
				
				$('.pic1').on('click', function () {
					$('why').html("");
					$.get("http://tbushman.cartodb.com/api/v2/sql?q=SELECT cartodb_id, pic1 FROM portfolio_tb WHERE cartodb_id="  + $(this).attr('id'), function(ret) {
						var list = ret.rows[0];
						var pic1 = list.pic1;
						console.log(pic1);
						$('why').append('<there><img src="'+pic1+'"></img></there>');
					});
				});
				$('.pic2').on('click', function () {
					$('why').html("");
					$.get("http://tbushman.cartodb.com/api/v2/sql?q=SELECT cartodb_id, pic2 FROM portfolio_tb WHERE cartodb_id="  + $(this).attr('id'), function(ret) {
						var list = ret.rows[0];
						var pic2 = list.pic2;
						console.log(pic1);
						$('why').append('<there><img src="'+pic2+'"></img></there>');
					});
				});
				$('.pic3').on('click', function () {
					$('why').html("");
					$.get("http://tbushman.cartodb.com/api/v2/sql?q=SELECT cartodb_id, pic2 FROM portfolio_tb WHERE cartodb_id="  + $(this).attr('id'), function(ret) {
						var list = ret.rows[0];
						var pic2 = list.pic2;
						console.log(pic1);
						$('why').append('<there><img src="'+pic3+'"></img></there>');
					});
				});
				$('.pic4').on('click', function () {
					$('why').html("");
					$.get("http://tbushman.cartodb.com/api/v2/sql?q=SELECT cartodb_id, pic2 FROM portfolio_tb WHERE cartodb_id="  + $(this).attr('id'), function(ret) {
						var list = ret.rows[0];
						var pic2 = list.pic2;
						console.log(pic1);
						$('why').append('<there><img src="'+pic4+'"></img></there>');
					});
				});
				$('.pic5').on('click', function () {
					$('why').html("");
					$.get("http://tbushman.cartodb.com/api/v2/sql?q=SELECT cartodb_id, pic2 FROM portfolio_tb WHERE cartodb_id="  + $(this).attr('id'), function(ret) {
						var list = ret.rows[0];
						var pic2 = list.pic2;
						console.log(pic1);
						$('why').append('<there><img src="'+pic5+'"></img></there>');
					});
				});
			});
			return false;
		});
		//wire buttons (menu)
		$("#gallery").click(function (e, latlon, pxPos, data, layer) {
			$('#catchphrase').show();
			$('#catchphrase').html("");
			$('what').html("");
			$('why').html("");
			$('why').append('<there><img src="http://pu.bli.sh/manyone/icons/landing_branding-01.svg" alt=""></img></there>').appendTo('why');
			$.get("http://tbushman.cartodb.com/api/v2/sql?q=SELECT cartodb_id, name, timeline, description, buttonid, pic1, pic2, pic3, pic4, pic5, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM portfolio_tb", function(ret) {
				var list = ret.rows;
	    		$('what').html("<here></here>");
	    		var i = 0;
	    		for (i in list){

	        		$('here').append('<div id="'+list[i].cartodb_id+'" class="pic1" name="'+ret.rows[i].name+'"><a href="#'+ret.rows[i].cartodb_id+'" class="pic1" id="'+list[i].cartodb_id+'"><img class="pic1" id="'+list[i].cartodb_id+'" src="'+list[i].pic1+'"></img></a></div><div id="'+list[i].cartodb_id+'" class="pic2" name="'+ret.rows[i].name+'"><a href="#'+ret.rows[i].cartodb_id+'" ><img class="items pic2" id="'+list[i].cartodb_id+'" src="'+list[i].pic2+'"></img></a></div><div id="'+list[i].cartodb_id+'" class="pic3"><a href="#'+ret.rows[i].cartodb_id+'" ><img class="items pic3" id="'+list[i].cartodb_id+'" src="'+list[i].pic3+'"></img></a></div><div id="'+list[i].cartodb_id+'" class="pic4" name="'+ret.rows[i].name+'"><a href="#'+ret.rows[i].cartodb_id+'" ><img class="items pic4" id="'+list[i].cartodb_id+'" src="'+list[i].pic4+'"></img></a></div><div id="'+list[i].cartodb_id+'" class="pic5" name="'+ret.rows[i].name+'"><a href="#'+ret.rows[i].cartodb_id+'" ><img class="items pic5" id="'+list[i].cartodb_id+'" src="'+list[i].pic5+'"></img></a></div>');
				}
				$(".items").each(function(){     
					if ($(this).attr("src") == "null") {
				    	$(this).remove();
						$('here div a:empty').parent().remove();
					}
					else  {     
						$(this).show();
						return true;
	     			}
			    });

				$('.pic1').hover(function(){
					$('#external').show();
					$('#external').html('');
					var currentId = $(this).attr('name');
					$('#external').append(currentId);					
					$('.pic1').off('click').on('click',function(){
						$('why').html("");
						$('#catchphrase').show();
						$('#catchphrase').html("");
						$('#external').html("");
						$('.tl-timemarker').removeClass('selected');
			    		$(this).addClass('selected');
						var sql_init = new cartodb.SQL({ user: 'tbushman' });
						var clicked = [$(this).attr('id')];
						var sql_select = "SELECT cartodb_id, name, timeline, description, buttonid, pic1, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM portfolio_tb WHERE cartodb_id = "+ $(this).attr('id');
						sql_init.execute(sql_select).done(function(ret, event){
							var list = ret.rows[0];
							var lat = list.lat;
							delete list.lat;
							var lon = list.lon;
							delete list.lon;
							map.setView(new L.LatLng(lat, lon),9);
							var pic1 = list.pic1;
							var name = list.name;
							console.log(pic1);
							console.log(name);
							$('why').append('<there><img src="'+ret.rows[0].pic1+'"></img></there>');
							$('#catchphrase').append(name);
							$('#external').append('<a href='+link+' target="_blank">External link</a>');
			    		});
					//	lyr1[0].setSQL(sql_select);
						return false;
					});
				});
				
				$('.pic2').hover(function(){
					$('#external').show();
					$('#external').html('');
					var currentId = $(this).attr('name');
					$('#external').append(currentId);					
					$('.pic2').off('click').on('click',function(){
						$('why').html("");
						$('#catchphrase').show();
						$('#catchphrase').html("");
						$('#external').html("");
						$('.tl-timemarker').removeClass('selected');
			    		$(this).addClass('selected');
						var sql_init = new cartodb.SQL({ user: 'tbushman' });
						var clicked = [$(this).attr('id')];
						var sql_select = "SELECT cartodb_id, name, timeline, description, buttonid, pic2, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM portfolio_tb WHERE cartodb_id = "+ $(this).attr('id');
						sql_init.execute(sql_select).done(function(ret){
							var list = ret.rows[0];
							var lat = list.lat;
							delete list.lat;
							var lon = list.lon;
							delete list.lon;
							map.setView(new L.LatLng(lat, lon),9);
							var pic2 = list.pic2;
							var name = list.name;
							console.log(pic2);
							console.log(name);
							$('why').append('<there><img src="'+pic2+'"></img></there>').appendTo('why');
							$('#catchphrase').append(name);
							$('#external').append('<a href='+link+' target="_blank">External link</a>');
			    		});
						return false;
					});
				});
				
				$('.pic3').hover(function(){
					$('#external').show();
					$('#external').html('');
					var currentId = $(this).attr('name');
					$('#external').append(currentId);					
					$('.pic3').off('click').on('click',function(){
						$('why').html("");
						$('#catchphrase').show();
						$('#catchphrase').html("");
						$('#external').html("");
						$('.tl-timemarker').removeClass('selected');
			    		$(this).addClass('selected');
						var sql_init = new cartodb.SQL({ user: 'tbushman' });
						var clicked = [$(this).attr('id')];
						var sql_select = "SELECT cartodb_id, name, timeline, description, buttonid, pic3, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM portfolio_tb WHERE cartodb_id = "+ $(this).attr('id');
						sql_init.execute(sql_select).done(function(ret){
							var list = ret.rows[0];
							var lat = list.lat;
							delete list.lat;
							var lon = list.lon;
							delete list.lon;
							map.setView(new L.LatLng(lat, lon),9);
							var pic3 = list.pic3;
							var name = list.name;
							console.log(pic3);
							console.log(name);
							$('why').append('<there><img src="'+pic3+'"></img></there>').appendTo('why');
							$('#catchphrase').append(name);
							$('#external').append('<a href='+link+' target="_blank">External link</a>');
			    		});
						return false;
					});
				});
				
				$('.pic4').hover(function(){
					$('#external').show();
					$('#external').html('');
					var currentId = $(this).attr('name');
					$('#external').append(currentId);					
					$('.pic4').off('click').on('click',function(){
						$('why').html("");
						$('#catchphrase').show();
						$('#catchphrase').html("");
						$('#external').html("");
						$('.tl-timemarker').removeClass('selected');
			    		$(this).addClass('selected');
						var sql_init = new cartodb.SQL({ user: 'tbushman' });
						var clicked = [$(this).attr('id')];
						var sql_select = "SELECT cartodb_id, name, timeline, description, buttonid, pic4, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM portfolio_tb WHERE cartodb_id = "+ $(this).attr('id');
						sql_init.execute(sql_select).done(function(ret){
							var list = ret.rows[0];
							var lat = list.lat;
							delete list.lat;
							var lon = list.lon;
							delete list.lon;
							map.setView(new L.LatLng(lat, lon),9);
							var pic4 = list.pic4;
							var name = list.name;
							console.log(pic4);
							console.log(name);
							$('why').append('<there><img src="'+pic4+'"></img></there>').appendTo('why');
							$('#catchphrase').append(name);
							$('#external').append('<a href='+link+' target="_blank">External link</a>');
			    		});
						return false;
					});
				});
				
				$('.pic5').hover(function(){
					$('#external').show();
					$('#external').html('');
					var currentId = $(this).attr('name');
					$('#external').append(currentId);					
					$('.pic5').off('click').on('click',function(){
						$('why').html("");
						$('#catchphrase').show();
						$('#catchphrase').html("");
						$('#external').html("");
						$('.tl-timemarker').removeClass('selected');
			    		$(this).addClass('selected');
						var sql_init = new cartodb.SQL({ user: 'tbushman' });
						var clicked = [$(this).attr('id')];
						var sql_select = "SELECT cartodb_id, name, timeline, description, buttonid, pic5, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM portfolio_tb WHERE cartodb_id = "+ $(this).attr('id');
						sql_init.execute(sql_select).done(function(ret){
							var list = ret.rows[0];
							var lat = list.lat;
							delete list.lat;
							var lon = list.lon;
							delete list.lon;
							map.setView(new L.LatLng(lat, lon),9);
							var pic5 = list.pic5;
							var name = list.name;
							console.log(pic5);
							console.log(name);
							$('why').append('<there><img src="'+pic5+'"></img></there>').appendTo('why');
							//$('#catchphrase').append(name);
							$('#external').append('<a href='+link+' target="_blank">External link</a>');
			    		});
						return false;
					});
				});
				
		    });
		});
	});

function addCursorInteraction(sublayer) {
        
	var hovers = [];
    //1 is the points: 'pointer' when mouse over
        sublayer.bind('featureOver', function(e, latlon, pxPos, data, layer) {
          hovers[layer] = 1;
          if(_.any(hovers)) {
            $('#map').css('cursor', 'pointer');
          }
        });
       //0 is the base layer. Cursor 'auto' if mouse over
        sublayer.bind('featureOut', function(m, layer) {
          hovers[layer] = 0;
          if(!_.any(hovers)) {
            $('#map').css('cursor', 'auto');
          }
    });

        //when feature clicked, move to location, then append items to sidepanel:
    sublayer.bind('featureClick', function (e, latlon, pxPos, data, layer) {
		$.get("http://tbushman.cartodb.com/api/v2/sql?q=SELECT cartodb_id, name, timeline, description, buttonid, pic1, pic2, pic3, pic4, pic5, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM portfolio_tb WHERE cartodb_id = "+ data.cartodb_id , function(ret){
			var list = ret.rows[0];
		    var lat = ret.rows[0].lat;
		    delete ret.rows[0].lat;
		    var lon = ret.rows[0].lon;
		    delete ret.rows[0].lon;
		    var zoom = map.getZoom(zoom);
		    console.log(zoom);
		    map.setView(new L.LatLng(lat, lon)); 
        	$('#external').html("");
        	$('#catchphrase').html("");
            
              
           //This is the query for generating the list of nearby features
           //Determine if there are coincident features on click, then either append a list of features or a single features' attributes to the sidepanel
		   var sql = cartodb.SQL({ user: 'tbushman' });
           sql.execute("select cartodb_id, name, description, timeline from portfolio_tb where st_distance( the_geom, st_GeomFromText('POINT("+lon+" "+lat+")', 4326), true ) < (SELECT CDB_XYZ_Resolution("+zoom+")*(("+zoom+")*1.15)) ORDER BY name", function (ret) { //this query uses screen distance from a clicked (top) feature: the multiplier, 1.15, means that all points that fall within 1.15 times the marker width are counted as coincident. 
             
		   		var list = ret.rows;	
           		if (list.length > 1) {
                	$('what').html("");
                	$('why').html("");
                	$('what').html(list.length + " programs at this location:");
                	$('what').html("<ul></ul>");
                	var i = 0;
                	for (i in list){
                		var newelement = $('<li></li>');
                		newelement
                		.attr('id', ret.rows[i].timeline)
                		.html('<a href="#'+ret.rows[i].cartodb_id+'" class="cartodb_id tl-timemarker" id="'+ret.rows[i].timeline +'"> <h5 id="'+list[i].timeline+'">' +list[i].description +'</h5><h6 id="'+list[i].timeline+'">'+list[i].name +'</h6></a>');
                		$('ul').append(newelement);
                		map.setView(new L.LatLng(lat, lon), (zoom+2));
                	}
                	//Click on one of the list items
					$('.tl-timemarker').click(function (e, latlon, pxPos, data, layer){
						var clicked = [$(this).attr('id')];
							$('.tl-timemarker').removeClass('selected');
					    	$(this).addClass('selected');
							var sql_init = new cartodb.SQL({ user: 'tbushman' });
							sql_init.execute("SELECT cartodb_id, name, timeline, description, buttonid, pic1, pic2, pic3, pic4, pic5, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM portfolio_tb WHERE timeline = '"+clicked+"'", function(ret){
								var list = ret.rows[0];
								var lat = list.lat;
								delete list.lat;
								var lon = list.lon;
								delete list.lon;
								map.setView(new L.LatLng(lat, lon),9);
								$('what').html("");
								$('why').html("");

								var name = list.name;
						    	console.log(name);
								var pic1 = list.pic1;
								console.log(pic1);
								var pic2 = list.pic2;
								console.log(pic2);
								var pic3 = list.pic3;
								console.log(pic3);
								var pic4 = list.pic4;
								console.log(pic4);
								var pic5 = list.pic5;
								console.log(pic5);
						    	var description = list.description;
						    	console.log(description);
						    	var link = list.link;
						    	console.log(link);
						    	var content = $('<h2>' + name + '</h2><here><div id="'+list.cartodb_id+'" class="pic1"><a href="#" ><img class="items pic1" src="'+pic1+'"></img></a></div><div id="'+list.cartodb_id+'" class="pic2"><a href="#" ><img class="items pic2" src="'+pic2+'"></img></a></div><div id="'+list.cartodb_id+'" class="pic3"><a href="#" ><img class="items pic3" src="'+pic3+'"></img></a></div><div id="'+list.cartodb_id+'" class="pic4"><a href="#" ><img class="items pic4" src="'+pic4+'"></img></a></div><div id="'+list.cartodb_id+'" class="pic5"><a href="#" ><img class="items pic5" src="'+pic5+'"></img></a></div></here><h4>'+ description +'</h4><a href="' + link + '" target="_blank">Click here for more info.</a>');
								console.log(content);
								$('what').append(content);
								$(".items").each(function(){     
									if ($(this).attr("src") == "null") {
								    	$(this).remove();
										$('here div a:empty').parent().remove();
									}
									else  {     
										$(this).show();
										return true;
					     			}
							    });
								
								$('.pic1').on('click', function () {
									$('why').html("");
									$.get("http://tbushman.cartodb.com/api/v2/sql?q=SELECT cartodb_id, pic1 FROM portfolio_tb WHERE cartodb_id="  + $(this).attr('id'), function(ret) {
										var list = ret.rows[0];
										var pic1 = list.pic1;
										console.log(pic1);
										$('why').append('<there><img src="'+pic1+'"></img></there>');
									});
								});
								$('.pic2').on('click', function () {
									$('why').html("");
									$.get("http://tbushman.cartodb.com/api/v2/sql?q=SELECT cartodb_id, pic2 FROM portfolio_tb WHERE cartodb_id="  + $(this).attr('id'), function(ret) {
										var list = ret.rows[0];
										var pic2 = list.pic2;
										console.log(pic1);
										$('why').append('<there><img src="'+pic2+'"></img></there>');
									});
								});
								$('.pic3').on('click', function () {
									$('why').html("");
									$.get("http://tbushman.cartodb.com/api/v2/sql?q=SELECT cartodb_id, pic2 FROM portfolio_tb WHERE cartodb_id="  + $(this).attr('id'), function(ret) {
										var list = ret.rows[0];
										var pic2 = list.pic2;
										console.log(pic1);
										$('why').append('<there><img src="'+pic3+'"></img></there>');
									});
								});
								$('.pic4').on('click', function () {
									$('why').html("");
									$.get("http://tbushman.cartodb.com/api/v2/sql?q=SELECT cartodb_id, pic2 FROM portfolio_tb WHERE cartodb_id="  + $(this).attr('id'), function(ret) {
										var list = ret.rows[0];
										var pic2 = list.pic2;
										console.log(pic1);
										$('why').append('<there><img src="'+pic4+'"></img></there>');
									});
								});
								$('.pic5').on('click', function () {
									$('why').html("");
									$.get("http://tbushman.cartodb.com/api/v2/sql?q=SELECT cartodb_id, pic2 FROM portfolio_tb WHERE cartodb_id="  + $(this).attr('id'), function(ret) {
										var list = ret.rows[0];
										var pic2 = list.pic2;
										console.log(pic1);
										$('why').append('<there><img src="'+pic5+'"></img></there>');
									});
								});

							});
						});
            	}
             	else 
             	{
                //If no coincident features within resolution: append only single feature info (no list)
					$.get("http://tbushman.cartodb.com/api/v2/sql?q=SELECT cartodb_id, name, timeline, description, buttonid, pic1, pic2, pic3, pic4, pic5, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM portfolio_tb WHERE cartodb_id = "+ data.cartodb_id, function(ret){
						var list = ret.rows[0];
			    		var lat = list.lat;
			    		delete list.lat;
			    		var lon = list.lon;
			    		delete list.lon;
			    		map.setView(new L.LatLng(lat, lon),9);
						$('what').html("");
						$('why').html("");

						var name = list.name;
				    	console.log(name);
						var pic1 = list.pic1;
						console.log(pic1);
						var pic2 = list.pic2;
						console.log(pic2);
						var pic3 = list.pic3;
						console.log(pic3);
						var pic4 = list.pic4;
						console.log(pic4);
						var pic5 = list.pic5;
						console.log(pic5);
				    	var description = list.description;
				    	console.log(description);
				    	var link = list.link;
				    	console.log(link);
				    	var content = $('<h2>' + name + '</h2><here><div id="'+list.cartodb_id+'" class="pic1"><a href="#" ><img class="items pic1" src="'+pic1+'"></img></a></div><div id="'+list.cartodb_id+'" class="pic2"><a href="#" ><img class="items pic2" src="'+pic2+'"></img></a></div><div id="'+list.cartodb_id+'" class="pic3"><a href="#" ><img class="items pic3" src="'+pic3+'"></img></a></div><div id="'+list.cartodb_id+'" class="pic4"><a href="#" ><img class="items pic4" src="'+pic4+'"></img></a></div><div id="'+list.cartodb_id+'" class="pic5"><a href="#" ><img class="items pic5" src="'+pic5+'"></img></a></div></here><h4>'+ description +'</h4><a href="' + link + '" target="_blank">Click here for more info.</a>');
						console.log(content);
						$('what').append(content);
						$(".items").each(function(){     
							if ($(this).attr("src") == "null") {
						    	$(this).remove();
								$('here div a:empty').parent().remove();
							}
							else  {     
								$(this).show();
								return true;
			     			}
					    });
						
						$('.pic1').on('click', function () {
							$('why').html("");
							$.get("http://tbushman.cartodb.com/api/v2/sql?q=SELECT cartodb_id, pic1 FROM portfolio_tb WHERE cartodb_id="  + $(this).attr('id'), function(ret) {
								var list = ret.rows[0];
								var pic1 = list.pic1;
								console.log(pic1);
								$('why').append('<there><img src="'+pic1+'"></img></there>');
							});
						});
						$('.pic2').on('click', function () {
							$('why').html("");
							$.get("http://tbushman.cartodb.com/api/v2/sql?q=SELECT cartodb_id, pic2 FROM portfolio_tb WHERE cartodb_id="  + $(this).attr('id'), function(ret) {
								var list = ret.rows[0];
								var pic2 = list.pic2;
								console.log(pic1);
								$('why').append('<there><img src="'+pic2+'"></img></there>');
							});
						});
						$('.pic3').on('click', function () {
							$('why').html("");
							$.get("http://tbushman.cartodb.com/api/v2/sql?q=SELECT cartodb_id, pic2 FROM portfolio_tb WHERE cartodb_id="  + $(this).attr('id'), function(ret) {
								var list = ret.rows[0];
								var pic2 = list.pic2;
								console.log(pic1);
								$('why').append('<there><img src="'+pic3+'"></img></there>');
							});
						});
						$('.pic4').on('click', function () {
							$('why').html("");
							$.get("http://tbushman.cartodb.com/api/v2/sql?q=SELECT cartodb_id, pic2 FROM portfolio_tb WHERE cartodb_id="  + $(this).attr('id'), function(ret) {
								var list = ret.rows[0];
								var pic2 = list.pic2;
								console.log(pic1);
								$('why').append('<there><img src="'+pic4+'"></img></there>');
							});
						});
						$('.pic5').on('click', function () {
							$('why').html("");
							$.get("http://tbushman.cartodb.com/api/v2/sql?q=SELECT cartodb_id, pic2 FROM portfolio_tb WHERE cartodb_id="  + $(this).attr('id'), function(ret) {
								var list = ret.rows[0];
								var pic2 = list.pic2;
								console.log(pic1);
								$('why').append('<there><img src="'+pic5+'"></img></there>');
							});
						});
					});
            	};
        	});
		});
	});
	$('#catchphrase').hide();		 
}
}                 
               
window.onload = main;
