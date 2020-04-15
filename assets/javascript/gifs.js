'use strict'

var Images = {
  strTextInput: '',

  TextInput: function (s) {
    Images.strTextInput = $('#search').val()
    console.log(Images.strTextInput);
    Images.ApiSearch(Images.strTextInput);
  },


  ApiSearch: function (search_term) {
    var restCall = 'https://api.giphy.com/v1/gifs/search';
    console.log("call attempted");

    $.ajax({
      url: restCall,
      data: {
        'api_key': 'rDQXG5no36qCzCRBgyF8udasAaiPvRA1',
        'q': search_term,
      },
      success: function (SearchResponse) {
        // console.log(restCall)
        console.log(SearchResponse.data[0]);
        var GIF_URL = SearchResponse.data[0].images.downsized.url
        console.log(GIF_URL);

        $('.returned_gif').empty().append("<img src = '" + GIF_URL + "'>");

      },
      error: function () {

        console.log('Error')
        return false;
      }

    })
  }

};



$(document).ready(function () {
  
  console.log("page loaded");
  $("#search_button").on("click", Images.TextInput);


});
