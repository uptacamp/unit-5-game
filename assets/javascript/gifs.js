'use strict'


var Images = {
  strTextInput: '',
  returned_GIF_URLs: [],
  saved_GIF_URLs: [],
  
  TextInput: function (s) {
    Images.strTextInput = $('#search').val()
    console.log(Images.strTextInput);
    Images.ApiSearch(Images.strTextInput);
  },

  DisplaySearchResults: function (item, index){
   // $('.returned_gif_section').append("<td class='returned_gif' id='" + item + "'><img src ='" + item + "' id='"+ index +"'></td>");
 
 
 
 //$('.returned_gif_section').append("<div class='card mb-4 shadow-sm'>")

 $('.returned_gif_section').append("<svg class='returned_gif' width='200' height='200'><image href ='" + item + "' id='"+ index +"' /></svg>") 

   
  },
  
  SaveToStitch: function () {

    $(this).removeClass();
    $(this).addClass("saved_gif");
    $(this).appendTo(".saved_gif_section");
    
    Images.saved_GIF_URLs.push($(this).attr("id"));
    console.log("images saved to stitch: " + Images.saved_GIF_URLs.length);
    
  },

  RemoveFromStitch: function () {
    console.log('remove from stitch');
    $(this).removeClass();
    $(this).addClass("returned_gif");
    $(this).appendTo(".returned_gif_section");
  },

  DisplayDraftStitch: function (item){
    $('.saved_gif_section').empty();
    $('.saved_gif_section').append("<div class='returned_gif'><img src ='" + item + "'></div>");
  },

 

  GenerateSavedStitchHTML: function (){
    var OpenWindow = window.open('','_blank','width=1024,height=768,resizable=1');
    OpenWindow.document.write('<html><head><title>New window</title><link rel="stylesheet" type="text/css" href="style.css"></head><body>');
    console.log("generateSavedStitchHTML")
    console.log(Images.saved_GIF_URLs.length)
    var i;
    for (i = 0; i < Images.saved_GIF_URLs.length; i++) {
      OpenWindow.document.write('<img src=' + Images.saved_GIF_URLs[i] + ">")
    }
    OpenWindow.document.write('</body><html>');    

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
        Images.returned_GIF_URLs = [];
        $('.returned_gif_section').empty
        var i = 0;
        for (i = 0; i < SearchResponse.data.length; i++) {
         var GIF_URL = SearchResponse.data[i].images.fixed_height_small.url
         Images.returned_GIF_URLs.push(GIF_URL);
         
        }
       Images.returned_GIF_URLs.forEach(Images.DisplaySearchResults);
       $("#instructions_label").toggleClass("section_header_visible");
       $("#your_stitch_section").toggleClass("section_header_visible");
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
  $(".returned_gif_section").on('click', ".returned_gif", Images.SaveToStitch);
  $("#display_stitch_button").on("click", Images.GenerateSavedStitchHTML)
  $(".saved_gif_section").on('click', '.saved_gif', Images.RemoveFromStitch);
  
});
