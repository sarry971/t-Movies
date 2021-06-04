$('.start').on('click',function(){
    var my_api_key = '54e9ff710694dbf0b1c8df953130a053';
    load_front(my_api_key);
});

var m;

function getdata(movie){
  
    var my_api_key = '54e9ff710694dbf0b1c8df953130a053';
    for (i = 0; i < 50; i++) {
        var title=movie[i];
        var m = load_photo(my_api_key,title);
        
      }
}



function load_photo(my_api_key,title){
    $.ajax({
        accepts: {
            async : false
          },
      type: 'GET',
      url:'https://api.themoviedb.org/3/search/movie?api_key='+my_api_key+'&query='+title,
  
      success: function(movie){
        if(movie.results.length<1){
          $('.fail').css('display','block');
          $('.results').css('display','none');
          $("#loader").delay(500).fadeOut();
        }
        else{
          $("#loader").fadeIn();
          $('.fail').css('display','none');
          $('.results').delay(1000).css('display','block');
          var movie_ids = movie.results[0].id;
          var movie_titles = movie.results[0].original_title;
          var posters = 'https://image.tmdb.org/t/p/original'+movie.results[0].poster_path;
          show_front(movie_ids,movie_titles,posters)
        }
      },
      error: function(){
        alert('Invalid Request');
        $("#loader").delay(500).fadeOut();
      },
    });
    
  }




// get the basic details of the movie from the API (based on the name of the movie)
function load_front(my_api_key){
    $.ajax({
      type: 'GET',
      url:'https://api.themoviedb.org/3/discover/movie?api_key='+my_api_key+'&sort_by=popularity.desc&page=1',
  
      success: function(movie){
        if(movie.results.length<1){
          $('.fail').css('display','block');
          $('.results').css('display','none');
          $("#loader").delay(500).fadeOut();
        }
        else{
          $("#loader").fadeIn();
          $('.fail').css('display','none');
          $('.results').delay(1000).css('display','block');
          var movie_ids = movie.results[0].id;
          var movie_titles = movie.results[0].original_title;
          var posters = 'https://image.tmdb.org/t/p/original'+movie.results[0].poster_path;
          show_front(movie_ids,movie_titles,posters)
        }
      },
      error: function(){
        alert('Invalid Request');
        $("#loader").delay(500).fadeOut();
      },
    });
  }
  
  
  
  
  function show_front(movie_ids,movie_titles,posters){
    
    detail = {
      'movie_ids':movie_ids,
      'titles':movie_titles,
      'posters':posters,
      
  }
  
  
  $.ajax({
    type:'POST',
    data:detail,
    url:"/movielist",
    dataType: 'html',
    complete: function(){
      $("#loader").delay(500).fadeOut();
    },
    success: function(response) {
      $('.results').html(response);
      $('#autoComplete').val('');
      $(window).scrollTop(0);
    }
  });
  }