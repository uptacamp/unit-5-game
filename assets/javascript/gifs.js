'use strict'

 var Images = {
  
  ApiSearch: function(search_term){
    var restCall = 'https://api.giphy.com/v1/gifs/search';
    console.log("call attempted");

    $.ajax({
        url: restCall,
        data: {
          'api_key': 'rDQXG5no36qCzCRBgyF8udasAaiPvRA1',
          'q': search_term,
        },
        success: function(SearchResponse){
         // console.log(restCall)
          console.log(SearchResponse.data[0].title);
          var GIF_URL = SearchResponse.data[0].embed_url
          console.log (GIF_URL);
         // $('.returned_gif').append("<img src = "+ GIF_URL + ">");
         // $('.returned_gif').append("<img src = 'https://giphy.com/embed/Xjo8pbrphfVuw'>");
        },
        error: function(){
          
          console.log('Error')
        return false;}

    })
    //.then(function(info) {console.log(".then");         
    //});
  }

};

$(document).ready(function () {
  Images.ApiSearch("luke skywalker");
  console.log("page loaded");
 
});
