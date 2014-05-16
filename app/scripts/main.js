//working

$(document).ready(function() {

setListPro.init();

});

var setListPro= {

	init: function() {
		this.initStyling();
		this.initEvents();
	},

	initStyling: function() {
		this.renderSong();
	},

	initEvents: function() {
		$(".songForm").on("submit", this.getAjax);
		$(".songsItem").on("click", this.inputSetList);

		// Delete song
		$(".playlistsItem").on("click", ".deleteSong", this.removeSong);
		// setListPro.addSong();
		// create playlist event
		// add song to playlist
		// pull up song tabs
		//bring up modal
	},

	inputSetList: function(data) {
    

      // var newSetList = {
      //   item: $(".playlistsItem").val(),
      // };

      $.ajaxSetup({
			beforeSend: function(xhr) {
				//had to do this to remove the Guitarparty-Api-Key otherwise post failed
		}
		})

     $.ajax({
              url:'http://tiy-fee-rest.herokuapp.com/collections/kesselrunners',
              type:'POST',
              data: data,
              dataType: 'json',
              error: function(data){
                alert('U FAIL');
              },
              success: function(data) {
                alert('YA SUCCESS!');

   //          $(".authorName").append(data.objects[0].authors[0].name);
			// $(".titleName").append(data.objects[0].title);
                   }
               }); //end ajax

  },


		getAjax : function(e){
		e.preventDefault();

		$.ajaxSetup({
			beforeSend: function(xhr) {
	        xhr.setRequestHeader('Guitarparty-Api-Key', API_KEY);
		}
		})

		var API_KEY = '8b002700ba331e00ee2408de1d1a3da5c43382d7';

		var html = '';
		var songTitle = $('.songTitleInput').val();
		var artist = $('.artistInput').val();

		var fullURL = "http://api.guitarparty.com/v2/songs/";

		$.ajax({

		url: fullURL,
		type: "GET",
		dataType: "json",
		data: {query: songTitle},
		success: function(data, dataType, jqXHR){
			console.log(data);

			if (data.objects.length === 1){
			
			var name = data.objects[0].authors[0].name;
			var title = data.objects[0].title;
			var chords = data.objects[0].body_chords_html;
			var someObj = {
					name: name,
					title: title,
					chords: chords
			};

			setListPro.inputSetList(someObj);
				var objects;
			setListPro.renderSong();

				$(".authorName").append(data.objects[0].authors[0].name);
				$(".titleName").append(data.objects[0].title);
				$(".chordsItem").append(data.objects[0].body_chords_html);

			} else 
				
				alert("We don't have that ish yo, stop asking!");
			 
			
			}

			//var name = data.objects[0].authors[0].name;
			//var title = data.objects[0].title;
			//var chords = data.objects[0].body_chords_html;
			//var someObj = {
			//		name: name,
			//		title: title,
			//		chords: chords
			//};

			//setListPro.inputSetList(someObj);
			//	var objects;
			//setListPro.renderSong();

			//$(".authorName").append(data.objects[0].authors[0].name);
			//$(".titleName").append(data.objects[0].title);
			//$(".chordsItem").append(data.objects[0].body_chords_html);


		

		});

	},

	render: function($el, template, data) {
	var tmpl = _.template(template, data);

	$el.html(tmpl);
	},

	renderSong : function(){
		$.ajax({
			url: 'http://tiy-fee-rest.herokuapp.com/collections/kesselrunners',
			type: "GET",
			data: "json",
			error: function(jqXHR, status, error) {
				console.log("render song failed");
			},
			success: function(data, dataType, jqXHR) {

				var obj = window.obj = data;
				setListPro.render($(".playlistsItem"), Templates.songs, obj);

			}
		});
	},

	appendTab : function(){
		//getAjax
		//rendertmpl....html
	},
	genSong : function(){
		var artist=$(".artistInput").val();
		var songTitle=$(".songTitleInput").val();
		var newSong= new Song(artist, songTitle);
		console.log(setlists);
		return newSong;
	},

	addSong : function(){
		$(".songForm").on("submit", function(event){
			event.preventDefault();
			setlists[0].songs.unshift(setListPro.genSong());
			console.log(setlists);//HOW WILL IT KNOW WHICH ARRAY TO PUSH TO?
		});
	},

	
	removeSong: function() {
		var $thisSong = $(this).closest("article");
	    var objId = $thisSong.data("objid");

		$.ajax({
			url: "http://tiy-fee-rest.herokuapp.com/collections/kesselrunners/" + objId,
			type: "DELETE",
			error: function(jqXHR, status, error) {
				console.log("remove song failed");
			},
			success: function(data) {
				console.log("song removed");
				setListPro.renderSong();
			}
		});
	},


	showTabs: function() {

	},

	updateSetlist: function() {

	},

}