'use strict'

var Images = {
  strTextInput: '',

  TextInput: function (s) {
    Images.strTextInput = $('#search').val()
    console.log(Images.strTextInput);
    Images.ApiSearch(Images.strTextInput);
  },

  SaveToStitch: function (index) {
    console.log('savetostitch');
    $(this).removeClass();
    $(this).addClass("selected_gif");
    $(this).appendTo(".saved_gif_section");
  },

  ApiSearch: function (search_term) {
    $('.returned_gif_section').empty();
    var restCall = 'https://api.giphy.com/v1/gifs/search';
    console.log("call attempted");

    $.ajax({
      url: restCall,
      data: {
        'api_key': 'rDQXG5no36qCzCRBgyF8udasAaiPvRA1',
        'q': search_term,
        'limit': 10
      },
      success: function (SearchResponse) {
        $('.returned_gif_section').empty
        var i = 0;
        for (i = 0; i < SearchResponse.data.length; i++) {
          var GIF_URL = SearchResponse.data[i].images.downsized.url
          $('.returned_gif_section').append("<div class='returned_gif'><img src ='" + GIF_URL + "'></div>");
        }
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
  $(".returned_gif_section").on('click', '.returned_gif', Images.SaveToStitch);


});
