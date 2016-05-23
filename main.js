
window.onload = function() {
	
	main();
	
	$('#info')[0].click();
  	
	var txt = document.getElementById('txt');
	txt.value = main + '';

	$('#link').click(function(code){

	  	this.href = 'data:text/javascript;charset=utf-8,'
	    + encodeURIComponent(txt.value);

	});

	$("#submit").click(function(){

		var txt = $('#txt');
		txt.html('');
				
		main(this);

		txt.value = main + '';
		txt.text(txt.value);


	});
};



function main(){
	
	//Global vars from html form values
  	var user_id = $("#user_id").val();
	console.log(user_id);
  	var table_name = $("#table_name").val();
	console.log(table_name);
 	var json_url = $("#json_url").val();
	console.log(json_url);
	//
	
	////////////////////////////////////////////////////////////////////////////////////////////
	//UI Setup _________________________________________________________________________________

	var cdbidlist = document.getElementsByClassName("tltab");

	for (var i=0; i<cdbidlist.length; i++) {

		cdbidlist[i].onmouseover=function() { //tl hover
			this.title+=" sfhover"; //tl hover
		};
		cdbidlist[i].onmouseout=function() {
			this.title=this.title.replace(new RegExp(" sfhover\\\\b"), "");
		};
	}
	var map = $('#map'); 
	map.click(function(){ //click on map to close gallery
		var mainlabel = $('#mainlabel');
		mainlabel.removeClass('search');
		mainlabel.removeClass('point');
		mainlabel.removeClass('expand');
		mainlabel.removeClass('list');
		mainlabel.addClass('point');
		$('lightbox > img').remove();
    	$("#menu div div").slideUp(100); // hiding dropdown
      	$("#menu .selected").removeClass("selected");
		$('#map').css('z-index', '0');
	});
	$('#info').click(function(e, data){
		
		var mainlabel = $('#mainlabel');
		mainlabel.html('');
		mainlabel.removeClass('search');
		mainlabel.removeClass('point');
		mainlabel.removeClass('expand');
		mainlabel.removeClass('list');
    	$("#menu div div").slideUp(100); // hiding dropdown
     	$("#menu .selected").removeClass("selected");
		var helplabel = $('#helplabel');
		helplabel.removeClass('one');
		helplabel.removeClass('two');
		helplabel.removeClass('three');
		helplabel.addClass('one');
		helplabel.html('');
		helplabel.append('<help><h3 id="title"></h3><h4 id="blurb">Three ways to navigate the site</h4><br><hide><h6> The code for running the pu.bli.sh framework is on <a href="https://github.com/tbushman/pu.bli.sh" target="_blank" >GitHub</a>.</h6></hide></help><a href="#" id="about" class="info"></a><steps><one><a href="#" id="one"><h1>1</h1></a></one><two><a href="#" id="two"><h1>2</h1></a></two><three><a href="#" id="three"><h1>3</h1></a></three><four><a href="#" id="four"><h7>x</h7></a></four></steps>');
		$('hide').hide();
		$('#about').click(function(){
			
			helplabel.removeClass('one');
			helplabel.removeClass('two');
			helplabel.removeClass('three');
			helplabel.addClass('one');
			$('hide').show();
			
		});
		$('#one').click(function(){
			
			$('.leaflet-control-zoom-in')[0].click();
			$('hide').hide();
			helplabel.removeClass('one');
			helplabel.removeClass('two');
			helplabel.removeClass('three');
			helplabel.addClass('one');
			$('#two').removeClass('highlight');
			$('#three').removeClass('highlight');
			$('#one').removeClass('highlight');
			$('#one').addClass('highlight');
			$('#blurb').html('');
			$('#title').html('');
			$('#blurb').append('Use zoom, click on map features');
			$('#title').append('MAP');
	    	$("#menu div div").slideUp(100); // hiding dropdown
	     	$("#menu .selected").removeClass("selected");
			$('.leaflet-control-zoom-out')[0].click();
			
		});
		$('#two').click(function(){
			
			$('hide').hide();
			helplabel.removeClass('one');
			helplabel.removeClass('two');
			helplabel.removeClass('three');
			helplabel.addClass('two');
			$('#two').removeClass('highlight');
			$('#three').removeClass('highlight');
			$('#one').removeClass('highlight');
			$('#two').addClass('highlight');
			$('#blurb').html('');
			$('#title').html('');
			$('#blurb').append('Click timeline / Arrows');
			$('#title').append('TIMELINE');
	    	$("#menu div div").slideUp(100); // hiding dropdown
	     	$("#menu .selected").removeClass("selected");
			$('.go').click();
			
		});
		$('#three').click(function(){
			
			$('hide').hide();
			helplabel.removeClass('one');
			helplabel.removeClass('two');
			helplabel.removeClass('three');
			helplabel.addClass('three');
			$('#two').removeClass('highlight');
			$('#three').removeClass('highlight');
			$('#one').removeClass('highlight');
			$('#three').addClass('highlight');
			$('#blurb').html('');
			$('#title').html('');
			$('#blurb').append('Dropdown Menu / Search functions');
			$('#title').append('MENU');
			$('#menu > li > a').click();
			
		});
		$('#four').click(function(){
		
			$('hide').hide();
			helplabel.removeClass('one');
			helplabel.removeClass('two');
			helplabel.removeClass('three');
			helplabel.html('');
	    	$("#menu div div").slideUp(100); // hiding dropdown
	     	$("#menu .selected").removeClass("selected");
		});
		e.stopPropagation();
	});
	$('.go').click(function(){ //click on the refresh symbol to instantiate timeline.

		var mainlabel = $('#mainlabel');
		mainlabel.removeClass('search');
		mainlabel.removeClass('point');
		mainlabel.removeClass('expand');
		mainlabel.removeClass('list');
		$('#mainlabel').html('');
		var cdbid = [$(this).attr('id')];

		$("#"+cdbid+".tltab").click();

	});
	$('#cv').click(function(){ //click on 'CV' to append pdf to gallery

  		$("#menu div div").slideUp(100); // hiding dropdown
   		$("#menu .selected").removeClass("selected");
		var helplabel = $('#helplabel');
		helplabel.removeClass('one');
		helplabel.removeClass('two');
		helplabel.removeClass('three');
		helplabel.html('');
		var mainlabel = $('#mainlabel');
		mainlabel.html('');
		mainlabel.removeClass('search');
		mainlabel.removeClass('point');
		mainlabel.removeClass('expand');
		mainlabel.removeClass('list');
		mainlabel.addClass('expand');
		mainlabel.append('<embed src="images/cv2015.pdf" type ="application/pdf" width="100%" height="100%" alt="pdf"></embed>').appendTo('#mainlabel');
	});
	$('#contact').click(function(){ //click on 'ABOUT' for short intro and external links

      	$("#menu div div").slideUp(100); // hiding dropdown
      	$("#menu .selected").removeClass("selected");
		var helplabel = $('#helplabel');
		helplabel.removeClass('one');
		helplabel.removeClass('two');
		helplabel.removeClass('three');
		helplabel.html('');
		var mainlabel = $('#mainlabel');
		mainlabel.html('');
		mainlabel.removeClass('search');
		mainlabel.removeClass('point');
		mainlabel.removeClass('expand');
		mainlabel.removeClass('list');
		mainlabel.addClass('point');
		$.get("http://"+user_id+".cartodb.com/api/v2/sql?q=select cartodb_id, name, title, description, pic1, pic2, pic3, pic4, pic5, datebegin, dateend, title, place, link, linktext, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM "+table_name+" ORDER BY datebegin", function(ret) {

			var item = ret.rows[0];
			var title = item.title;
			var image = item.pic1;
			var blurb = item.description;
			var link = item.link;
			$('#mainlabel').html('<here><h2 id="external"></h2><h6><a href="mailto:thex@pu.bli.sh?Subject=Design%20Services%20Request" target="_top">thex@pu.bli.sh</a> | 801-940-3464</h6></here><there><h4 id="blurb"></h4></there>');
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
		var helplabel = $('#helplabel');
		helplabel.removeClass('one');
		helplabel.removeClass('two');
		helplabel.removeClass('three');
		helplabel.html('');
		mainlabel.removeClass('expand');
		mainlabel.removeClass('point');
		mainlabel.removeClass('search');
		mainlabel.addClass('expand');
		mainlabel.append('<text><here><h2 id="external"></h2></here><there><h4 id="blurb"></h4></there></text><lightbox></lightbox><images></images>'); //prepare substrates
		$.get("http://"+user_id+".cartodb.com/api/v2/sql?q=select cartodb_id, name, title, description, pic1_thumb, pic2_thumb, pic3_thumb, pic4_thumb, pic5_thumb, iframe_thumb, datebegin, dateend, title, place, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM "+table_name+"", function(ret) {
			var list = ret.rows;
			var i = 0;
  			for (i in list){

				item = ret.rows[i];
				var lightboxobject = $('<a href="#'+item.cartodb_id+'" id="'+item.cartodb_id+'" class="items pic1" name="'+item.title+'"><img src="'+item.pic1_thumb+'"></img></a><a href="#'+item.cartodb_id+'" id="'+item.cartodb_id+'" class="items pic2" name="'+item.title+'"><img src="'+item.pic2_thumb+'"></img></a><a href="#'+item.cartodb_id+'" id="'+item.cartodb_id+'" class="items pic3" name="'+item.title+'"><img src="'+item.pic3_thumb+'"></img></a><a href="#'+item.cartodb_id+'" id="'+item.cartodb_id+'" class="items pic4" name="'+item.title+'"><img src="'+item.pic4_thumb+'"></img></a><a href="#'+item.cartodb_id+'" id="'+item.cartodb_id+'" class="items pic5" name="'+item.title+'"><img src="'+item.pic5_thumb+'"></img></a><a href="#'+item.cartodb_id+'" id="'+item.cartodb_id+'" class="items iframe" name="'+item.title+'"><img src="'+item.iframe_thumb+'"></img></a>');
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

			$("iframe").each(function(){
				if ($(this).attr("src") == "null") {
					$(this).remove();
					$('images a:empty').remove();
				}
				else {

					$(this).show();
					return true;
				}
			});

			$('lightbox').append('<img src="images/landing_branding-01.svg" style="width:100%"></img>'); //intro image

			$('.iframe').hover(function(){

				$('#external').html('');
				var currentId = $(this).attr('name');
				$('#external').append(currentId); //display item name on hover	

				$('.iframe').off('click').on('click', function(e) {

					$('#blurb').html('');
					$('lightbox').html('');
					var clicked = [$(this).attr('id')];
					var sql_init = new cartodb.SQL({ user: ''+user_id+'' });
					//get pic1 where cartodb_id = 'clicked'
					var sql_select = "SELECT cartodb_id, name, description, iframe, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM "+table_name+" WHERE cartodb_id = "+ clicked +"";
					sql_init.execute(sql_select).done(function(ret){

						var item = ret.rows[0];
						var iframe = item.iframe;
						var blurb = item.description;
						var height = $('lightbox').css('height');
						var width = $('lightbox').css('width');
						$('lightbox').append('<embed src="'+iframe+'" type ="iframe" width="'+width+'" height="'+height+'" alt="'+iframe+'"></embed>');
						$('#blurb').append(blurb);

					});
					e.preventDefault();

				});			

			});

			$('.pic1').hover(function(){

				$('#external').html('');
				var currentId = $(this).attr('name');
				$('#external').append(currentId); //display item name on hover				

				$('.pic1').off('click').on('click',function(e){

					$('#blurb').html('');
					$('lightbox').html('');
					var clicked = [$(this).attr('id')];
					var sql_init = new cartodb.SQL({ user: ''+user_id+'' });
					//get pic1 where cartodb_id = 'clicked'
					var sql_select = "SELECT cartodb_id, name, description, pic1, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM "+table_name+" WHERE cartodb_id = "+ clicked +"";
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
					$('lightbox').html('');
					var clicked = [$(this).attr('id')];
					var sql_init = new cartodb.SQL({ user: ''+user_id+'' });
					var sql_select = "SELECT cartodb_id, name, description, pic2, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM "+table_name+" WHERE cartodb_id = "+ clicked +"";
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
					$('lightbox').html('');
					var clicked = [$(this).attr('id')];
					var sql_init = new cartodb.SQL({ user: ''+user_id+'' });
					var sql_select = "SELECT cartodb_id, name, description, pic3, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM "+table_name+" WHERE cartodb_id = "+ clicked +"";
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
					$('lightbox').html('');
					var clicked = [$(this).attr('id')];
					var sql_init = new cartodb.SQL({ user: ''+user_id+'' });
					var sql_select = "SELECT cartodb_id, name, description, pic4, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM "+table_name+" WHERE cartodb_id = "+ clicked +"";
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
					$('lightbox').html('');
					var clicked = [$(this).attr('id')];
					var sql_init = new cartodb.SQL({ user: ''+user_id+'' });
					var sql_select = "SELECT cartodb_id, name, description, pic5, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM "+table_name+" WHERE cartodb_id = "+ clicked +"";
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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//MAP/TL setup/functions__________________________________________________________________________________________

	var map;

	//leaflet map
	map = new L.map('map', { //Leaflet map
	  	zoomControl: true,
	  	center: [40.75, -111.9],
	  	zoom: 11,
		minZoom: 2,
	  	maxZoom: 14
	});

	// add a base layer with names layer
	//Stamen option
	/*	var options2 = {
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Map tiles by <a href="http://maps.stamen.com/#terrain/12/37.7707/-122.3781">Stamen Design</a>, under CC BY 3.0., &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
	};  

	L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', options2).addTo(map); //Stamen Watercolor
	L.tileLayer('http://{s}.tiles.mapbox.com/v3/tbushman.i6fcm2a5/{z}/{x}/{y}.png').addTo(map); //Place/Water labels TileMill
	*/	
	//Mapbox option (courtesy acct tbushman)
	var options3 = {
		attribution: 'Map tiles by <a href="http://mapbox.com/">Mapbox</a><a href="http://cartodb.com/attributions"</a>'
	};  
	L.tileLayer('http://{s}.tiles.mapbox.com/v3/tbushman.iba1gl27/{z}/{x}/{y}.png', options3).addTo(map); //Mapbox Terrain Attribution

	//define CartoDB api url
	var layerUrl = json_url; //CartoDB .json from global var
	console.log(layerUrl);

	var lyr1 = [];
	cartodb.createLayer(map, layerUrl)
	.addTo(map)
	.on('done', function(layer){
		var subLayerOptions = {
			sql: "SELECT * FROM "+table_name+"",
			interactivity: 'cartodb_id'
		};
		var sublayer = layer.getSubLayer(0);
		sublayer.setInteraction(true);
		addCursorInteraction(sublayer);
		addTimeline();

		lyr1.push(sublayer);

		var sql = new cartodb.SQL({ user: ''+user_id+'' });

		var sql_select = 'select cartodb_id, name, description, pic1, pic2, pic3, pic4, pic5, datebegin, dateend, title, place, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM '+table_name+' ORDER BY dateend DESC';
		console.log(sql_select);

		sql.execute(sql_select).done(function(ret){

			LayerSelect(sql_select); //Map selection . For now , TL instantiation is manual .

		});
	});
	//lyr1 createD
	function LayerSelect(sql_select) {

		var sql_init = new cartodb.SQL({ user: ''+user_id+'' });
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

			var sql_get = 'select cartodb_id, name, description, link, linktext, pic1, pic2, pic3, pic4, pic5, iframe, iframe_thumb, pic1_thumb, pic2_thumb, pic3_thumb, pic4_thumb, pic5_thumb, datebegin, dateend, title, place, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM '+table_name+' WHERE cartodb_id='+ cdbid +'';
			console.log(sql_get);

			TlSelect(sql_get); //Infowindow for TL

		});
		lyr1[0].setSQL(sql_select);					
		return true;
	};

	function TlSelect(sql_get) {

		var sql_init = new cartodb.SQL({ user: ''+user_id+'' });
		sql_init.execute(sql_get).done(function(ret){
			var item = ret.rows[0];
			console.log(item);
			var lat = item.lat;
		   	delete item.lat;
		   	var lon = item.lon;
		   	delete item.lon;
		   	var zoom = map.getZoom(zoom);
		   	console.log(zoom);
		 	map.setView(new L.LatLng(lat, lon), zoom+1); //zoom to single feature

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

			var mainlabel = $('#mainlabel');
			mainlabel.html('');
			mainlabel.removeClass('search');
			mainlabel.removeClass('point');
			mainlabel.removeClass('expand');
			mainlabel.removeClass('list');
			mainlabel.addClass('point');
			//'#mainlabel' becomes a map tooltip

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

			var lightboxobject = $('<a href="#'+item.cartodb_id+'" id="'+item.cartodb_id+'" class="items pic1" name="'+item.title+'"><img src="'+item.pic1_thumb+'"></img></a><a href="#'+item.cartodb_id+'" id="'+item.cartodb_id+'" class="items pic2" name="'+item.title+'"><img src="'+item.pic2_thumb+'"></img></a><a href="#'+item.cartodb_id+'" id="'+item.cartodb_id+'" class="items pic3" name="'+item.title+'"><img src="'+item.pic3_thumb+'"></img></a><a href="#'+item.cartodb_id+'" id="'+item.cartodb_id+'" class="items pic4" name="'+item.title+'"><img src="'+item.pic4_thumb+'"></img></a><a href="#'+item.cartodb_id+'" id="'+item.cartodb_id+'" class="items pic5" name="'+item.title+'"><img src="'+item.pic5_thumb+'"></img></a><a href="#'+item.cartodb_id+'" id="'+item.cartodb_id+'" class="items iframe" name="'+item.title+'"><img src="'+item.iframe_thumb+'"></img></a>');
			$('images').append(lightboxobject);	// all thumbails from single feature . For now , up to five .

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

			$("iframe").each(function(){
				if ($(this).attr("src") == "null") {
					$(this).remove();
					$('images a:empty').remove();
				}
				else {

					$(this).show();
					return true;
				}
			});

			$('.iframe').hover(function(){

				$('#external').html('');
				var currentId = $(this).attr('name');
				$('#external').append(currentId); //display item name on hover	

				$('.iframe').off('click').on('click', function(e) {

					var mainlabel = $('#mainlabel');
					mainlabel.removeClass('search');
					mainlabel.removeClass('point');
					mainlabel.removeClass('expand');
					mainlabel.removeClass('list');
					mainlabel.addClass('expand');
					$('#blurb').html('');
					$('lightbox').html('');
					var clicked = [$(this).attr('id')];
					var sql_init = new cartodb.SQL({ user: ''+user_id+'' });
					//get pic1 where cartodb_id = 'clicked'
					var sql_select = "SELECT cartodb_id, name, description, iframe, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM "+table_name+" WHERE cartodb_id = "+ clicked +"";
					sql_init.execute(sql_select).done(function(ret){

						var item = ret.rows[0];
						var iframe = item.iframe;
						var height = $('lightbox').css('height');
						var width = $('lightbox').css('width');
						$('lightbox').append('<embed src="'+iframe+'" type ="iframe" width="'+width+'" height="'+height+'" alt="'+iframe+'"></embed>');
						$('#blurb').append(blurb);

					});
					e.preventDefault();

				});			

			});
			$('.pic1').hover(function(){

				$('#external').html('');
				var currentId = $(this).attr('name');
				$('#external').append(currentId); //display item name on hover				

				$('.pic1').off('click').on('click',function(e){

					var mainlabel = $('#mainlabel');
					mainlabel.removeClass('search');
					mainlabel.removeClass('point');
					mainlabel.removeClass('expand');
					mainlabel.removeClass('list');
					mainlabel.addClass('expand');
					//gallery substrate
					$('lightbox').html('');
					var clicked = [$(this).attr('id')];
					var sql_init = new cartodb.SQL({ user: ''+user_id+'' });
					//get pic1 where cartodb_id = 'clicked'
					var sql_select = "SELECT cartodb_id, name, description, pic1, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM "+table_name+" WHERE cartodb_id = "+ clicked +"";
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
					var mainlabel = $('#mainlabel');
					mainlabel.removeClass('search');
					mainlabel.removeClass('point');
					mainlabel.removeClass('expand');
					mainlabel.removeClass('list');
					mainlabel.addClass('expand');
					$('lightbox').html('');
					var clicked = [$(this).attr('id')];
					var sql_init = new cartodb.SQL({ user: ''+user_id+'' });
					var sql_select = "SELECT cartodb_id, name, description, pic2, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM "+table_name+" WHERE cartodb_id = "+ clicked +"";
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
					var mainlabel = $('#mainlabel');
					mainlabel.removeClass('search');
					mainlabel.removeClass('point');
					mainlabel.removeClass('expand');
					mainlabel.removeClass('list');
					mainlabel.addClass('expand');
					$('lightbox').html('');
					var clicked = [$(this).attr('id')];
					var sql_init = new cartodb.SQL({ user: ''+user_id+'' });
					var sql_select = "SELECT cartodb_id, name, description, pic3, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM "+table_name+" WHERE cartodb_id = "+ clicked +"";
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
					var mainlabel = $('#mainlabel');
					mainlabel.removeClass('search');
					mainlabel.removeClass('point');
					mainlabel.removeClass('expand');
					mainlabel.removeClass('list');
					mainlabel.addClass('expand');
					$('lightbox').html('');
					var clicked = [$(this).attr('id')];
					var sql_init = new cartodb.SQL({ user: ''+user_id+'' });
					var sql_select = "SELECT cartodb_id, name, description, pic4, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM "+table_name+" WHERE cartodb_id = "+ clicked +"";
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
					var mainlabel = $('#mainlabel');
					mainlabel.removeClass('search');
					mainlabel.removeClass('point');
					mainlabel.removeClass('expand');
					mainlabel.removeClass('list');
					mainlabel.addClass('expand');
					$('lightbox').html('');
					var clicked = [$(this).attr('id')];
					var sql_init = new cartodb.SQL({ user: ''+user_id+'' });
					var sql_select = "SELECT cartodb_id, name, description, pic5, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM "+table_name+" WHERE cartodb_id = "+ clicked +"";
					sql_init.execute(sql_select).done(function(ret){

						var item = ret.rows[0];
						var pic5 = item.pic5;
						$('lightbox').append('<img src="'+pic5+'"></img>');

					});
					e.preventDefault();
				});
			});			
		});
		$('#map').css('z-index', '0');
		return true;
	}
	$('#next').click(function (e, latlon, pxPos, data, layer, event){ //to move timeline left in 10% increments

		var datebegin = [$('.selected').attr('alt')];

		var sql = new cartodb.SQL({ user: ''+user_id+'' });

		var sql_select = "select cartodb_id, name, description, pic1, pic2, pic3, pic4, pic5, datebegin, dateend, title, place, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM "+table_name+" WHERE datebegin >'"+datebegin+"' ORDER BY datebegin ASC";
		console.log(sql_select);
		//each button has it's begin date encoded in the 'alt' attr. 
		sql.execute(sql_select).done(function(ret){ //return all later records in ascending order.

			var cdbid = ret.rows[0].cartodb_id; //first in list is next on tl

			var helplabel = $('#helplabel');
			helplabel.removeClass('one');
			helplabel.removeClass('two');
			helplabel.removeClass('three');
			helplabel.html('');
			var mainlabel = $('#mainlabel');
			mainlabel.html('');
			mainlabel.removeClass('search');
			mainlabel.removeClass('point');
			mainlabel.removeClass('expand');
			mainlabel.removeClass('list');
			mainlabel.addClass('point');

			$("#"+cdbid+".tltab").click();

		});
		return true;
	});
	$('#prev').click(function (e, latlon, pxPos, data, layer, event){ //to move timeline right in 10% increments

		var datebegin = [$('.selected').attr('alt')];

		var sql = new cartodb.SQL({ user: ''+user_id+'' });

		var sql_select = "select cartodb_id, name, description, pic1, pic2, pic3, pic4, pic5, datebegin, dateend, title, place, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM "+table_name+" WHERE datebegin <'"+datebegin+"' ORDER BY datebegin DESC";
		console.log(sql_select);

		sql.execute(sql_select).done(function(ret){ //return all earlier records in descending order.

			var cdbid = ret.rows[0].cartodb_id; //first in list is one previous on tl

			var helplabel = $('#helplabel');
			helplabel.removeClass('one');
			helplabel.removeClass('two');
			helplabel.removeClass('three');
			helplabel.html('');
			var mainlabel = $('#mainlabel');
			mainlabel.html('');
			mainlabel.removeClass('search');
			mainlabel.removeClass('point');
			mainlabel.removeClass('expand');
			mainlabel.removeClass('list');
			mainlabel.addClass('point');

			$("#"+cdbid+".tltab").click();

		});
		return true;

	});

	//search///////////////////////////////////////////////////////////////////////////////////////
	$( "input" ).autocomplete({

		source: function(request, response) { 

			var sql_search = new cartodb.SQL({ user: ''+user_id+'' });
			//ilike sql
			sql_search.execute("select cartodb_id, name, title, place, (name ilike'%"+request.term +"%') AS full_match from "+table_name+" where name ilike '%" + request.term + "%' OR place ilike '%"+request.term +"%' OR title ilike '%"+request.term +"%' ORDER BY title ", function(ret) { 

				var list = ret.rows;

				var helplabel = $('#helplabel');
				helplabel.removeClass('one');
				helplabel.removeClass('two');
				helplabel.removeClass('three');
				helplabel.html('');
				var mainlabel = $('#mainlabel');
				mainlabel.html('');
				mainlabel.removeClass('search');
				mainlabel.removeClass('point');
				mainlabel.removeClass('expand');
				mainlabel.removeClass('list');
				mainlabel.addClass('search');
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

	function addTimeline(){ //Build TL

		//get all features, ordered
		$.get("http://"+user_id+".cartodb.com/api/v2/sql?q=select cartodb_id, name, title, description, pic1, pic2, pic3, pic4, pic5, datebegin, dateend, title, place, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM "+table_name+" ORDER BY dateend desc", function(ret) {

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

			for ( i in list ) { //tl button configuration

				var datebegin = new Date(ret.rows[i].datebegin);
				console.log(datebegin);
				var yearbeginint = datebegin.getFullYear();
				var monthbegin = datebegin.getMonth();
				var yearbegin = yearbeginint+(monthbegin/12); //Decimal year
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
				$('#wrapper').append('<a href="#'+ret.rows[i].cartodb_id+'" id="'+ret.rows[i].cartodb_id+'" class="tltab cartodb_id" onclick="return false" name="'+tabposition*10+'" alt="'+ret.rows[i].datebegin+'"><span>'+ret.rows[i].title+'</span></a>');

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
					var sql_select = 'select cartodb_id, name, description, link, linktext, pic1, pic2, pic3, pic4, pic5, datebegin, dateend, title, place, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM '+table_name+' WHERE cartodb_id='+cdbid+'';
					LayerSelect(sql_select);
				});
			}
			wrapper.show();
		});
	};


	//////////////////////////////////////////////////////////////////////////////////////


	//DEMARCATION


	////////////////////////////////////////////////////////////////////////////////


	//*/ALWAYS KEEP THIS AT THE END!!*//*/*//*/*//
	function addCursorInteraction(sublayer){

		var hovers = [];
	    //1 is the points: 'pointer' when mouse over
	    sublayer.bind('featureOver', function(e, latlon, pxPos, data, layer) {
	          hovers[layer] = 1;
	          if(_.any(hovers)) {
	            $('#map').css('cursor', 'pointer');
				$('#map').css('z-index', '0');
	          }
	    });
	    //0 is the base layer. Cursor 'auto' if mouse over
	    sublayer.bind('featureOut', function(m, layer) {
	          hovers[layer] = 0;
	          if(!_.any(hovers)) {
	            $('#map').css('cursor', 'auto');
				$('#map').css('z-index', '0');
	          }
	    });

	    //when feature clicked, move to location, then append items to sidepanel:
	    sublayer.bind('featureClick', function (e, latlon, pxPos, data, layer) {

			var mainlabel = $('#mainlabel');

			var sql_init = new cartodb.SQL({ user: ''+user_id+'' });
			var sql_select = 'select cartodb_id, name, description, pic1, pic2, pic3, pic4, pic5, datebegin, dateend, title, place, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM '+table_name+' WHERE cartodb_id='+ data.cartodb_id ;
			console.log(sql_select);
			sql_init.execute(sql_select).done(function(ret){

				mainlabel.html('');
				mainlabel.removeClass('search');
				mainlabel.removeClass('point');
				mainlabel.removeClass('expand');
				mainlabel.removeClass('list');
				$('images').remove();
				var item = ret.rows[0]; //return top-clicked feature attribute data
		   		var lat = item.lat;
		   		delete item.lat;
		   		var lon = item.lon;
		   		delete item.lon;
		   		var zoom = map.getZoom(zoom);
		   		console.log(zoom);
		 		map.setView(new L.LatLng(lat, lon), 11); //zoom to top-clicked feature

				var sql_init = new cartodb.SQL({ user: ''+user_id+'' });
				//pixel distance from selected feature sql query
				var bounds_select = "select cartodb_id, name, title, description, pic1, pic2, pic3, pic4, pic5, datebegin, dateend from "+table_name+" where st_distance( the_geom, st_GeomFromText('POINT("+lon+" "+lat+")', 4326), true ) < (SELECT CDB_XYZ_Resolution("+zoom+")*(("+zoom+")*1.15)) ";
				//query for euclidian nearby features
				sql_init.execute(bounds_select).done(function(ret) {

					var list = ret.rows;

					if (list.length > 1 ) {

						var i = 0;

						mainlabel.addClass('list');
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
						mainlabel.html('');
						mainlabel.removeClass('search');
						mainlabel.removeClass('point');
						mainlabel.removeClass('expand');
						mainlabel.removeClass('list');
						mainlabel.addClass('point');
						//single feature cartodb_id query
						$.get("http://"+user_id+".cartodb.com/api/v2/sql?q=select cartodb_id, name, title, description, pic1, pic2, pic3, pic4, pic5, datebegin, dateend, title, place, ST_X(the_geom) lon, ST_Y(the_geom) lat FROM "+table_name+" WHERE cartodb_id="+data.cartodb_id, function(ret) {						var cdbid = list[0].cartodb_id;

							var cdbid = ret.rows[0].cartodb_id;
							$('#'+cdbid+'.tltab').click();

						});
					}
				});	
			});
			$('#map').css('z-index', '0'); // map must always be layer 0 .
			return true;

		});
	}
};    



	
