//loop with 

var cdbidlist = document.getElementsByClassName("tltab");

for (var i=0; i<cdbidlist.length; i++) {

	cdbidlist[i].onmouseover=function() { //tl hover
		this.title+=" sfhover"; //map hover
	};
	cdbidlist[i].onmouseout=function() {
		this.title=this.title.replace(new RegExp(" sfhover\\\\b"), "");
	};
}

		////////////////////////////////////////////////////////////////////////////////////////////
	

function main() {
	
	$("input").html(""); //trying to clear search input on load...	
	var map = $('#map'); 
	map.click(function(){ //click on map to close gallery
		$('#mainlabel').removeClass('expand');
		$('#mainlabel').removeClass('point');
		$('#mainlabel').removeClass('search');
		$('#mainlabel').addClass('point');
		$('lightbox > img').remove();
	});
	$('#cv').click(function(){ //click on 'CV' to append pdf to gallery
	
        $("#menu div div").slideUp(100); // hiding dropdown
        $("#menu .selected").removeClass("selected");
		$('#mainlabel').removeClass('expand');
		$('#mainlabel').removeClass('point');
		$('#mainlabel').removeClass('search');
		$('#mainlabel').addClass('expand');
		$('#mainlabel').html('');
		$('#mainlabel').append('<embed src="images/cv2015.pdf" type ="application/pdf" width="100%" height="100%" alt="pdf"></embed>').appendTo('#mainlabel');
	});
	$('#about').click(function(){ //click on 'ABOUT' for short intro and external links
	
        $("#menu div div").slideUp(100); // hiding dropdown
        $("#menu .selected").removeClass("selected");
		$('#mainlabel').removeClass('expand');
		$('#mainlabel').removeClass('point');
		$('#mainlabel').removeClass('search');
		$('#mainlabel').addClass('point');
		$.get("http://tbushman.cartodb.com/api/v2/sql?q=select cartodb_id, name, title, description, pic1, pic2, pic3, pic4, pic5, datebegin, dateend, monthbegin, monthend, title, place, link, linktext, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM portfolio_tb ORDER BY datebegin", function(ret) {
			
			var item = ret.rows[0];
			var title = item.title;
			var image = item.pic1;
			var blurb = item.description;
			var link = item.link;
			$('#mainlabel').html('<here><h2 id="external"></h2><h6><a href="mailto:thex@pu.bli.sh?Subject=Design%20Services%20Request" target="_top">THex</a> | 801-940-3464</h6></here><there><h4 id="blurb"></h4></there>');
			$('#external').append(title);
			$('#blurb').append(blurb);
			$('here').append('<a href="'+link+'">Go to GitHub</a>');
			//$('lightbox').append(image);
		
		});
	});
	$('#gallery').click(function(){ //init gallery
	
        $("#menu div div").slideUp(100); // hiding dropdown
        $("#menu .selected").removeClass("selected");
		var mainlabel = $('#mainlabel');
		mainlabel.html('');
		mainlabel.removeClass('expand');
		mainlabel.removeClass('point');
		mainlabel.removeClass('search');
		mainlabel.addClass('expand');
		mainlabel.append('<text><here><h2 id="external"></h2></here><there><h4 id="blurb"></h4></there></text><lightbox></lightbox><images></images>'); //prepare substrates
		$.get("http://tbushman.cartodb.com/api/v2/sql?q=select cartodb_id, name, title, description, pic1, pic2, pic3, pic4, pic5, datebegin, dateend, monthbegin, monthend, title, place, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM portfolio_tb", function(ret) {
			var list = ret.rows;
			var i = 0;
    		for (i in list){
					
				item = ret.rows[i];
				var lightboxobject = $('<a href="#'+item.cartodb_id+'" id="'+item.cartodb_id+'" class="items pic1" name="'+item.title+'"><img src="'+item.pic1+'"></img></a><a href="#'+item.cartodb_id+'" id="'+item.cartodb_id+'" class="items pic2" name="'+item.title+'"><img src="'+item.pic2+'"></img></a><a href="#'+item.cartodb_id+'" id="'+item.cartodb_id+'" class="items pic3" name="'+item.title+'"><img src="'+item.pic3+'"></img></a><a href="#'+item.cartodb_id+'" id="'+item.cartodb_id+'" class="items pic4" name="'+item.title+'"><img src="'+item.pic4+'"></img></a><a href="#'+item.cartodb_id+'" id="'+item.cartodb_id+'" class="items pic5" name="'+item.title+'"><img src="'+item.pic5+'"></img></a>');
				$('images').append(lightboxobject);	//thumbnail propagation
			
			}

			$("img").each(function(){  
				if ($(this).attr("src") == "null") { //remove empties
			    	$(this).remove();
					$('images a:empty').remove();
				}
				else  {     
					$(this).show();
					return true;
     			}
		    });
			
			$('lightbox').append('<img src="images/landing_branding-01.svg" style="width:100%"></img>'); //intro image
    		
			$('.pic1').hover(function(){

				$('#external').html('');
				var currentId = $(this).attr('name');
				$('#external').append(currentId); //display item name on hover				

				$('.pic1').off('click').on('click',function(e){
					
					$('#blurb').html('');
					$('lightbox > img').remove();
					var clicked = [$(this).attr('id')];
					var sql_init = new cartodb.SQL({ user: 'tbushman' });
					//get pic1 where cartodb_id = 'clicked'
					var sql_select = "SELECT cartodb_id, name, timeline, description, pic1, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM portfolio_tb WHERE cartodb_id = "+ clicked +"";
					sql_init.execute(sql_select).done(function(ret){
						
						var item = ret.rows[0];
						var pic1 = item.pic1;
						var blurb = item.description;
						$('lightbox').append('<img src="'+pic1+'"></img>');
						$('#blurb').append(blurb);
						
					});
					e.preventDefault();
				});
			});
    		$('.pic2').hover(function(){

				$('#external').html('');
				var currentId = $(this).attr('name');
				$('#external').append(currentId);					

				$('.pic2').off('click').on('click',function(e){
					$('#blurb').html('');
					$('lightbox > img').remove();
					var clicked = [$(this).attr('id')];
					var sql_init = new cartodb.SQL({ user: 'tbushman' });
					var sql_select = "SELECT cartodb_id, name, timeline, description, pic2, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM portfolio_tb WHERE cartodb_id = "+ clicked +"";
					sql_init.execute(sql_select).done(function(ret){
						
						var item = ret.rows[0];
						var pic2 = item.pic2;
						var blurb = item.description;
						$('lightbox').append('<img src="'+pic2+'"></img>');
						$('#blurb').append(blurb);
						
					});
					e.preventDefault();
				});
			});
    		$('.pic3').hover(function(){

				$('#external').html('');
				var currentId = $(this).attr('name');
				$('#external').append(currentId);					

				$('.pic3').off('click').on('click',function(e){
					$('#blurb').html('');
					$('lightbox > img').remove();
					var clicked = [$(this).attr('id')];
					var sql_init = new cartodb.SQL({ user: 'tbushman' });
					var sql_select = "SELECT cartodb_id, name, timeline, description, pic3, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM portfolio_tb WHERE cartodb_id = "+ clicked +"";
					sql_init.execute(sql_select).done(function(ret){
						
						var item = ret.rows[0];
						var pic3 = item.pic3;
						var blurb = item.description;
						$('lightbox').append('<img src="'+pic3+'"></img>');
						$('#blurb').append(blurb);
						
					});
					e.preventDefault();
				});
			});
    		$('.pic4').hover(function(){

				$('#external').html('');
				var currentId = $(this).attr('name');
				$('#external').append(currentId);					

				$('.pic4').off('click').on('click',function(e){
					$('#blurb').html('');
					$('lightbox > img').remove();
					var clicked = [$(this).attr('id')];
					var sql_init = new cartodb.SQL({ user: 'tbushman' });
					var sql_select = "SELECT cartodb_id, name, timeline, description, pic4, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM portfolio_tb WHERE cartodb_id = "+ clicked +"";
					sql_init.execute(sql_select).done(function(ret){
						
						var item = ret.rows[0];
						var pic4 = item.pic4;
						var blurb = item.description;
						$('lightbox').append('<img src="'+pic4+'"></img>');
						$('#blurb').append(blurb);
						
					});
					e.preventDefault();
				});
			});
    		$('.pic5').hover(function(){

				$('#external').html('');
				var currentId = $(this).attr('name');
				$('#external').append(currentId);					

				$('.pic5').off('click').on('click',function(e){
					$('#blurb').html('');
					$('lightbox > img').remove();
					var clicked = [$(this).attr('id')];
					var sql_init = new cartodb.SQL({ user: 'tbushman' });
					var sql_select = "SELECT cartodb_id, name, timeline, description, pic5, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM portfolio_tb WHERE cartodb_id = "+ clicked +"";
					sql_init.execute(sql_select).done(function(ret){
						
						var item = ret.rows[0];
						var pic5 = item.pic5;
						var blurb = item.description;
						$('lightbox').append('<img src="'+pic5+'"></img>');
						$('#blurb').append(blurb);
						
					});
					e.preventDefault();
				});
			});
		});
	});
	

	$("#menu > li > a").click(function (e, data) { // menu icon init dropdown

	    if ($(this).parent().hasClass('selected')) {

	        $("#menu div div").slideUp(100); // hiding dropdown
	        $("#menu .selected").removeClass("selected");

	    } 
		else 
		{
	        $("#menu div div").slideUp(100); // hiding dropdown
	        $("#menu .selected").removeClass("selected");

	        if ($(this).next(".dropdown").length) {

	            $(this).parent().addClass("selected"); // display dropdown
	            $(this).next(".dropdown").children().slideDown(200);

	    	}
	    }
	    e.stopPropagation();
	});
	
	var wrapper = $('#wrapper');
	console.log(wrapper);
	wrapper.css('left', 50+'%'); //'#wrapper' encloses the moving timeline, with initiation mid-screen

	var map;

	//leaflet map
	map = new L.map('map', { //Leaflet map
	  	zoomControl: true,
	  	center: [40.75, -111.9],
	  	zoom: 9,
		minZoom: 2,
	  	maxZoom: 18
	});
	//wip
	//define CartoDB api url
	// add a base layer with names layer
	var options2 = {
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Map tiles by <a href="http://maps.stamen.com/#terrain/12/37.7707/-122.3781">Stamen Design</a>, under CC BY 3.0., &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
	};  
	var options3 = {
		attribution: '&copy; Map tiles by <a href="http://mapbox.com/">Mapbox</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
	};  

//	L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', options2).addTo(map); //Stamen Watercolor
//	L.tileLayer('http://{s}.tiles.mapbox.com/v3/tbushman.i6fcm2a5/{z}/{x}/{y}.png').addTo(map); //Place/Water labels TileMill
	L.tileLayer('http://{s}.tiles.mapbox.com/v3/tbushman.iba1gl27/{z}/{x}/{y}.png', options3).addTo(map); //Mapbox Terrain Attribution

	var layerUrl = 'https://tbushman.cartodb.com/api/v2/viz/2c8ad242-a11f-11e5-a138-0e674067d321/viz.json'; //CartoDB .json
	console.log(layerUrl);

	var lyr1 = [];
	cartodb.createLayer(map, layerUrl)
	.addTo(map)
	.on('done', function(layer){
		var subLayerOptions = {
			sql: "SELECT * FROM portfolio_tb",
			interactivity: 'cartodb_id'
		};
		var sublayer = layer.getSubLayer(0);
		sublayer.setInteraction(true);
		addCursorInteraction(sublayer);
		addTimeline();
		lyr1.push(sublayer);

		var sql = new cartodb.SQL({ user: 'tbushman' });
		
		var sql_select = 'select cartodb_id, name, description, pic1, pic2, pic3, pic4, pic5, datebegin, dateend, monthbegin, monthend, title, place, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM portfolio_tb ORDER BY dateend DESC';
		console.log(sql_select);
		
		sql.execute(sql_select).done(function(ret){

			var first = ret.rows[0]; //get top feature
			console.log(first);
			var clic = first.cartodb_id;
			LayerSelect(sql_select);
			//$('#'+clic+'.tltab').click();
			
		});
	});
	//lyr1 createD
	function LayerSelect(sql_select) {

		var sql_init = new cartodb.SQL({ user: 'tbushman' });
		sql_init.execute(sql_select).done(function(ret){
			
			var first = ret.rows[0];
			console.log(first);
			var list = ret.rows;
			var cdbid = first.cartodb_id;
			console.log(cdbid);	
			var lat = first.lat;
			console.log(lat);
		   	delete first.lat;
		   	var lon = first.lon;
			console.log(lon);
		   	delete first.lon;
		   	var zoom = map.getZoom(zoom);
		   	console.log(zoom);
		 	map.setView(new L.LatLng(lat, lon), 11); //initial zoom/latlon
			
			var sql_get = 'select cartodb_id, name, description, link, linktext, pic1, pic2, pic3, pic4, pic5, datebegin, dateend, monthbegin, monthend, title, place, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM portfolio_tb WHERE cartodb_id='+ cdbid +'';
			console.log(sql_get);

			TlSelect(sql_get);
		});
		lyr1[0].setSQL(sql_select);					
		return true;
	};

	function TlSelect(sql_get) {

		$('#mainlabel').html("");
		$('#mainlabel').removeClass('expand');
		$('#mainlabel').removeClass('point');
		$('#mainlabel').removeClass('search');
		$('#mainlabel').addClass('point'); //'#mainlabel' becomes a map tooltip

		var sql_init = new cartodb.SQL({ user: 'tbushman' });
		sql_init.execute(sql_get).done(function(ret){
			var item = ret.rows[0];
			console.log(item);
			var lat = item.lat;
		   	delete item.lat;
		   	var lon = item.lon;
		   	delete item.lon;
		   	var zoom = map.getZoom(zoom);
		   	console.log(zoom);
		 	map.setView(new L.LatLng(lat, lon), 12); //zoom to single feature

			var item = ret.rows[0];
			var name = item.name;
	    	console.log(name);
			var datebegin = new Date(item.datebegin);
			console.log(datebegin);
			var yearbeginint = datebegin.getFullYear();
			var yearbegin = parseInt(yearbeginint);
			console.log(yearbegin);
			var monthbegin = datebegin.getMonth();
			console.log(monthbegin);
			var dateend = new Date(item.dateend);
			console.log(dateend);
			var yearendint = dateend.getFullYear();
			var monthend = dateend.getMonth();
			console.log(monthend);
			var yearend = parseInt(yearendint);
			console.log(yearend);

			var pic1 = item.pic1;
			console.log(pic1);
			var pic2 = item.pic2;
			console.log(pic2);
			var pic3 = item.pic3;
			console.log(pic3);
			var pic4 = item.pic4;
			console.log(pic4);
			var pic5 = item.pic5;
			console.log(pic5);
	    	var description = item.description;
	    	console.log(description);
	    	var link = item.link;
	    	console.log(link);
			var linktext = item.linktext;
			console.log(linktext);
			
			var header = $('<text><here><h2>' + name + '</h2><h6>'+(monthbegin+1)+'/'+yearbegin+' – '+(monthend+1)+'/'+yearend+'</h6></here><there><h4>'+ description +'</h4></there></text><lightbox></lightbox><images></images><a href="' + link + '" target="_blank">'+linktext+'</a>');
			console.log(header);
			$('#mainlabel').append(header); //Single feature attribute appendage

			var cdbid = item.cartodb_id;
			console.log(cdbid);				

			$('a').each(function(){ //remove empties
				if ($(this).attr("href") == "null") {
			    	$(this).remove();
					$('here a:empty').remove();
				}
				else  {     
					$(this).show();
					return true;
				}
		    });

			var lightboxobject = $('<a href="#'+item.cartodb_id+'" id="'+item.cartodb_id+'" class="items pic1" name="'+item.title+'"><img src="'+item.pic1+'"></img></a><a href="#'+item.cartodb_id+'" id="'+item.cartodb_id+'" class="items pic2" name="'+item.title+'"><img src="'+item.pic2+'"></img></a><a href="#'+item.cartodb_id+'" id="'+item.cartodb_id+'" class="items pic3" name="'+item.title+'"><img src="'+item.pic3+'"></img></a><a href="#'+item.cartodb_id+'" id="'+item.cartodb_id+'" class="items pic4" name="'+item.title+'"><img src="'+item.pic4+'"></img></a><a href="#'+item.cartodb_id+'" id="'+item.cartodb_id+'" class="items pic5" name="'+item.title+'"><img src="'+item.pic5+'"></img></a>');
			$('images').append(lightboxobject);	//thumbails from single feature

			$("img").each(function(){ //remove empties
				if ($(this).attr("src") == "null") {
			    	$(this).remove();
					$('images a:empty').remove();
				}
				else  {     
					$(this).show();
					return true;
     			}
		    });

			$('.pic1').hover(function(){

				$('#external').html('');
				var currentId = $(this).attr('name');
				$('#external').append(currentId); //display item name on hover				

				$('.pic1').off('click').on('click',function(e){

					$('#mainlabel').removeClass('expand');
					$('#mainlabel').removeClass('point');
					$('#mainlabel').removeClass('search');
					$('#mainlabel').addClass('expand'); //gallery substrate
					$('lightbox > img').remove();
					var clicked = [$(this).attr('id')];
					var sql_init = new cartodb.SQL({ user: 'tbushman' });
					//get pic1 where cartodb_id = 'clicked'
					var sql_select = "SELECT cartodb_id, name, timeline, description, pic1, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM portfolio_tb WHERE cartodb_id = "+ clicked +"";
					sql_init.execute(sql_select).done(function(ret){

						var item = ret.rows[0];
						var pic1 = item.pic1;
						$('lightbox').append('<img src="'+pic1+'"></img>');

					});
					e.preventDefault();
				});
			});
    		$('.pic2').hover(function(){

				$('#external').show();
				$('#external').html('');
				var currentId = $(this).attr('name');
				$('#external').append(currentId);					

				$('.pic2').off('click').on('click',function(e){
					$('#mainlabel').removeClass('expand');
					$('#mainlabel').removeClass('point');
					$('#mainlabel').removeClass('search');
					$('#mainlabel').addClass('expand');
					$('lightbox > img').remove();
					var clicked = [$(this).attr('id')];
					var sql_init = new cartodb.SQL({ user: 'tbushman' });
					var sql_select = "SELECT cartodb_id, name, timeline, description, pic2, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM portfolio_tb WHERE cartodb_id = "+ clicked +"";
					sql_init.execute(sql_select).done(function(ret){

						var item = ret.rows[0];
						var pic2 = item.pic2;
						$('lightbox').append('<img src="'+pic2+'"></img>');

					});
					e.preventDefault();
				});
			});
    		$('.pic3').hover(function(){

				$('#external').show();
				$('#external').html('');
				var currentId = $(this).attr('name');
				$('#external').append(currentId);					

				$('.pic3').off('click').on('click',function(e){
					$('#mainlabel').removeClass('expand');
					$('#mainlabel').removeClass('point');
					$('#mainlabel').removeClass('search');
					$('#mainlabel').addClass('expand');
					$('lightbox > img').remove();
					var clicked = [$(this).attr('id')];
					var sql_init = new cartodb.SQL({ user: 'tbushman' });
					var sql_select = "SELECT cartodb_id, name, timeline, description, pic3, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM portfolio_tb WHERE cartodb_id = "+ clicked +"";
					sql_init.execute(sql_select).done(function(ret){

						var item = ret.rows[0];
						var pic3 = item.pic3;
						$('lightbox').append('<img src="'+pic3+'"></img>');

					});
					e.preventDefault();
				});
			});
    		$('.pic4').hover(function(){

				$('#external').show();
				$('#external').html('');
				var currentId = $(this).attr('name');
				$('#external').append(currentId);					

				$('.pic4').off('click').on('click',function(e){
					$('#mainlabel').removeClass('expand');
					$('#mainlabel').removeClass('point');
					$('#mainlabel').removeClass('search');
					$('#mainlabel').addClass('expand');
					$('lightbox > img').remove();
					var clicked = [$(this).attr('id')];
					var sql_init = new cartodb.SQL({ user: 'tbushman' });
					var sql_select = "SELECT cartodb_id, name, timeline, description, pic4, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM portfolio_tb WHERE cartodb_id = "+ clicked +"";
					sql_init.execute(sql_select).done(function(ret){

						var item = ret.rows[0];
						var pic4 = item.pic4;
						$('lightbox').append('<img src="'+pic4+'"></img>');

					});
					e.preventDefault();
				});
			});
    		$('.pic5').hover(function(){

				$('#external').show();
				$('#external').html('');
				var currentId = $(this).attr('name');
				$('#external').append(currentId);					

				$('.pic5').off('click').on('click',function(e){
					$('#mainlabel').removeClass('expand');
					$('#mainlabel').removeClass('point');
					$('#mainlabel').removeClass('search');
					$('#mainlabel').addClass('expand');
					$('lightbox > img').remove();
					var clicked = [$(this).attr('id')];
					var sql_init = new cartodb.SQL({ user: 'tbushman' });
					var sql_select = "SELECT cartodb_id, name, timeline, description, pic5, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM portfolio_tb WHERE cartodb_id = "+ clicked +"";
					sql_init.execute(sql_select).done(function(ret){

						var item = ret.rows[0];
						var pic5 = item.pic5;
						$('lightbox').append('<img src="'+pic5+'"></img>');

					});
					e.preventDefault();
				});
			});
		});
	}
	$('#next').click(function (e, latlon, pxPos, data, layer, event){ //to move timeline left in 10% increments

		$('#mainlabel').hide();
		$('#mainlabel').html("");
		$('#mainlabel').removeClass('expand');
		$('#mainlabel').removeClass('point');
		$('#mainlabel').removeClass('search');
		$('images').html('');
		$('.tltab').removeClass('selected');
		var wrapper = $('#wrapper');
		console.log(wrapper);
		wrapper.hide();
		wrapper.animate({'left' : "-=10%"});
		wrapper.show();
		$('#mainlabel').show();
		event.stopPropagation();

	});
	$('#prev').click(function (e, latlon, pxPos, data, layer, event){ //to move timeline right in 10% increments

		$('#mainlabel').hide();
		$('#mainlabel').html("");
		$('#mainlabel').removeClass('expand');
		$('#mainlabel').removeClass('point');
		$('#mainlabel').removeClass('search');
		$('images').html('');
		$('.tltab').removeClass('selected');
		var wrapper = $('#wrapper');
		console.log(wrapper);
		wrapper.hide();
		wrapper.animate({'left' : "+=10%"});
		wrapper.show();
		$('#mainlabel').show();
		event.stopPropagation();

	});

//search///////////////////////////////////////////////////////////////////////////////////////
	$( "input" ).autocomplete({

		source: function(request, response) { 

			var sql_search = new cartodb.SQL({ user: 'tbushman' });
			sql_search.execute("select cartodb_id, name, title, place, (name ilike'%"+request.term +"%') AS full_match from portfolio_tb where name ilike '%" + request.term + "%' OR place ilike '%"+request.term +"%' OR title ilike '%"+request.term +"%' ORDER BY title ", function(ret) { 

				var list = ret.rows;

				$('#mainlabel').html('');
				$('#mainlabel').removeClass('expand');
				$('#mainlabel').removeClass('point');
				$('#mainlabel').removeClass('search');
				$('#mainlabel').addClass('search'); 
				$('images').remove();

				$('#mainlabel').append('<here><h6>'+list.length + ' matching search results:</h6></here>');
	        	$('#mainlabel').append('<there><ul></ul></there>');
				var i = 0;
				for (i in list) {

					var item = ret.rows[i];
					console.log(item);
					var clicked = item.cartodb_id;
					console.log(clicked);

					var $listelement = $('<a href="#'+clicked+'" id="'+clicked+'" class="cartodb_id"><h5>'+item.title+'</h5><h6>'+item.name+'</h6></a>');
					$('ul').append($listelement); //list of matching search queries
					$('#'+clicked+'').click(function(){

						var cdbid = [$(this).attr('id')];
						$("#"+cdbid+".tltab").click();
						
					});
				}
			});
		},	
		minLength: 2
	});
		
	/////////////UI

	function addTimeline(){

		//get all features, ordered
		$.get("http://tbushman.cartodb.com/api/v2/sql?q=select cartodb_id, name, title, description, pic1, pic2, pic3, pic4, pic5, datebegin, dateend, monthbegin, monthend, title, place, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM portfolio_tb ORDER BY dateend desc", function(ret) {

			var item = ret.rows[0]; //latest item .. should be an item that spans the timeline length, for getting min datebegin and max dateend
			console.log(item);
			var list = ret.rows;
			console.log(list);
			var length = list.length;
			console.log(length);
			var wrapper = $('#wrapper');
			wrapper.append('<div id="wrappertwo"></div>');
			wrapper.hide();
			
			var maxdate = new Date(item.dateend);
			var maxyearint = maxdate.getFullYear();
			console.log(maxyearint);
			var maxmonth = maxdate.getMonth();
			var maxyear = maxyearint+(maxmonth/12);
			console.log(maxyear);
			var mindate = new Date(ret.rows[0].datebegin);
			var yearzero = mindate.getFullYear();
			console.log(yearzero);
			var year = parseInt(yearzero);
			console.log(year);
			var minmonth = mindate.getMonth();
			console.log(minmonth);
			var minyear = yearzero+(minmonth/12);
			console.log(minyear);
			var tabnumber = (maxyearint+1) - yearzero;
			console.log(tabnumber);

			for (var i = 0; i < tabnumber; i++) {
				var increment = year+i;
				var $labels = $('<div/>', {
					id: "tllabel"+increment+"",
					class: "tllabel",
					text: ''+increment+''
				});
				$('#wrappertwo').append($labels);						
				$labels.css('left', i*10+'%');
			}

			for ( i in list ) {

				var datebegin = new Date(ret.rows[i].datebegin);
				console.log(datebegin);
				var yearbeginint = datebegin.getFullYear();
				var monthbegin = datebegin.getMonth();
				var yearbegin = yearbeginint+(monthbegin/12);
				console.log(yearbegin); //each timeline button css 'left' depends on var 'yearbegin'

				var dateend = new Date(ret.rows[i].dateend);
				console.log(dateend);
				var yearendint = dateend.getFullYear();
				var monthend = dateend.getMonth();
				var yearend = yearendint+(monthend/12);
				console.log(yearend); //each timeline button css 'width' depends on var 'yearend'

				var yduration = yearend - yearbegin;
				console.log(yduration);

				var tabposition = yearbegin - minyear +1; //screen position of each tl button relative to '#wrapper'
				//Append all buttons
				$('#wrapper').append('<a href="#'+ret.rows[i].cartodb_id+'" id="'+ret.rows[i].cartodb_id+'" class="tltab cartodb_id" onclick="return false" name="'+tabposition*10+'" alt="cartodb_id"><span>'+ret.rows[i].title+'</span></a>');

				var tl = $("#"+ ret.rows[i].cartodb_id+".tltab"); //each button 
				console.log(tl);
				tl.css('left',  tabposition*10+'%' ); //position
				tl.css('width', yduration*10+'%' );	//width

				tl.click(function(e, latlon, pxPos, layer, data, ret){ //each button

					$('.tltab').removeClass('selected');
					$(this).addClass('selected');

					var clic = $(this).attr('id');
					console.log(clic);

					var left = [$(this).attr('name')];
					console.log(left); //log position of clicked button, recorded in Append as attr('name')			
					var initmid = 50;
					console.log(initmid);
					var wrapleft = initmid - left ;
					console.log(wrapleft); //'#wrapper' position to put clicked button at map center

					var wrapper = $('#wrapper');
					wrapper.hide();
					wrapper.css('left','');				
					wrapper.attr('style', wrapper.attr('style') + 'left: '+wrapleft+'% !important'); //move '#wrapper' to position clicked button at map center
					wrapper.show();

					var cdbid = [$(this).attr('id')];
					var sql_select = 'select cartodb_id, name, description, link, linktext, pic1, pic2, pic3, pic4, pic5, datebegin, dateend, monthbegin, monthend, title, place, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM portfolio_tb WHERE cartodb_id='+cdbid+'';
					LayerSelect(sql_select);
				});
				//e.preventDefault();
			}
			wrapper.show();
		});
	};
	
	
	//////////////////////////////////////////////////////////////////////////////////////


	//DEMARCATION


	////////////////////////////////////////////////////////////////////////////////


	//*/ALWAYS KEEP THIS AT THE END!!*//*/*//*Map selection only*/*//it'll make sense later
	function addCursorInteraction(sublayer){
		
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

			var mainlabel = $('#mainlabel');
			mainlabel.html('');
			mainlabel.removeClass('search');
			mainlabel.removeClass('point');
			mainlabel.addClass('point');
			
			var sql_init = new cartodb.SQL({ user: 'tbushman' });
			var sql_select = 'select cartodb_id, name, description, pic1, pic2, pic3, pic4, pic5, datebegin, dateend, monthbegin, monthend, title, place, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM portfolio_tb WHERE cartodb_id='+ data.cartodb_id ;
			console.log(sql_select);
			sql_init.execute(sql_select).done(function(ret){

				$('images').remove();
				var item = ret.rows[0]; //return top-clicked feature attribute data
		   		var lat = item.lat;
		   		delete item.lat;
		   		var lon = item.lon;
		   		delete item.lon;
		   		var zoom = map.getZoom(zoom);
		   		console.log(zoom);
		 		map.setView(new L.LatLng(lat, lon), 11); //zoom to top-clicked feature

				var sql_init = new cartodb.SQL({ user: "tbushman" });
				var bounds_select = "select cartodb_id, name, title, description, pic1, pic2, pic3, pic4, pic5, datebegin, dateend, monthbegin, monthend from portfolio_tb where st_distance( the_geom, st_GeomFromText('POINT("+lon+" "+lat+")', 4326), true ) < (SELECT CDB_XYZ_Resolution("+zoom+")*(("+zoom+")*1.15)) ";
				//query for nearby features
				sql_init.execute(bounds_select).done(function(ret) {

					var list = ret.rows;

					if (list.length > 1 ) {

						var i = 0;

						mainlabel.append('<text><here><h6>'+list.length + ' records in this area:</h6></here></text>');
			        	$('text').append('<there><ul></ul></there>');
						for (i in list) {

							var item = ret.rows[i];
							console.log(item);

							var clicked = item.cartodb_id;
							console.log(clicked);
							
							//build feature list
							var $listelement = $('<a href="#'+clicked+'" id="'+clicked+'" class="cartodb_id"><h5>'+item.title+'</h5><h6>'+item.name+'</h6></a>');
							$('ul').append($listelement); //list of matching search queries
							$('#'+clicked+'').click(function(e){

								var cdbid = [$(this).attr('id')];
								$('#'+cdbid+'.tltab').click();

								e.preventDefault();
							});
						}
					}
					else 
					{
						$.get("http://tbushman.cartodb.com/api/v2/sql?q=select cartodb_id, name, title, description, pic1, pic2, pic3, pic4, pic5, datebegin, dateend, monthbegin, monthend, title, place, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM portfolio_tb WHERE cartodb_id="+data.cartodb_id, function(ret) {						var cdbid = list[0].cartodb_id;
							
							var cdbid = ret.rows[0].cartodb_id;
							$('#'+cdbid+'.tltab').click();
							
						});
					}
				});	
			});
		});
	}
}

window.onload = main;
