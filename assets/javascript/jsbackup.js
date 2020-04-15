'use strict'

var characters =
  [{
    id: "0",
    health_points: "120",
    attack_power: "8",
    counter_attack_power: "15",
    name: "Obi Wan",
    image: 'assets/images/obi_wan.jpg',
    dead_image: 'assets/images/obi_wan_dead.jpg',
    birth_year: "tbd",
    swapiID: 10
  },

  {
    id: "1",
    health_points: "125",
    attack_power: "12",
    counter_attack_power: "5",
    name: "Luke Skywalker",
    image: 'assets/images/luke.jpg',
    dead_image: 'assets/images/luke_dead.jpg',
    birth_year: "tbd",
    swapiID: 1
  },

  {
    id: "2",
    health_points: "150",
    attack_power: "8",
    counter_attack_power: "20",
    name: "Darth Sidious",
    image: 'assets/images/darth_sidious.jpg',
    dead_image: 'assets/images/darth_sidious_dead.jpg',
    birth_year: "tbd",
    swapiID: 21
  },

  {
    id: "3",
    health_points: "185",
    attack_power: "7",
    counter_attack_power: "25",
    name: "Darth Maul",
    image: 'assets/images/darth_maul.jpg',
    dead_image: 'assets/images/darth_maul_dead.jpg',
    birth_year: "tbd",
    swapiID: 44
  }];

var my_character = "";
var my_character_index = "";
var my_opponent = "";
var my_opponent_index = "";
var my_attack_power = 0;
var my_counter_attack_power = 0;
var opponent_attack_power = 0;
var opponent_counter_attack_power = 0;


var game = {

  CreateCharacterCards: function (i) {

    $('#available_chars').append("<div class='available_character'" + "id=" + characters[i].id + ">" + "<img src=" + characters[i].image + ">" + "<p>" + characters[i].health_points +"/" + characters[i].birth_year + "</p>" + "</div>")
  },

  SetupGame: function () { 
    var i;
    for (i = 0; i < characters.length; i++) {
      game.ApiCall(i);
      
    }
   
    
    for (i = 0; i < characters.length; i++) {
      //game.CreateCharacterCards(i);
    }
    console.log("character cards created");
    $('#attack_result').text("Select a Player");
    
  

  },

  SelectPlayer: function () {
    $(".available_character").off();
    my_character_index = $(this).attr("id");
    my_attack_power = characters[my_character_index].attack_power
    $(this).removeClass();
    $(this).addClass("selected_character");
    $(".selected_character").appendTo(".my_character");
    $(".available_character").addClass("available_enemy");
    $(".available_enemy").appendTo("#enemies");
    $(".available_enemy").removeClass("available_character");
    $("#my_character_header").toggleClass("section_header_visible");
    $("#remaining_enemies_header").toggleClass("section_header_visible");
    $("#game_characters_header").removeClass();
    $("#game_characters_header").addClass("section_header_hidden");
    $('#attack_result').text("Select an enemy to battle")
  },

  SelectEnemy: function () {
    $('#enemies').off('click', '.available_enemy');
    my_opponent_index = $(this).attr("id");
    opponent_attack_power = characters[my_opponent_index].counter_attack_power
    console.log("opponent selected");
    $(this).removeClass();
    $(this).addClass("opponent");
    $(".opponent").appendTo("#my_opponent");
    $("#attack_button").toggleClass("button_visible");
    $("#battle_opponent_header").removeClass();
    $("#battle_opponent_header").addClass("section_header_visible");
    $("#attack_result").text(characters[my_opponent_index].name + " selected as battle opponent. Press Attack button to attack.");

  },

  Attack: function () {
    console.log("attacking");
    let str_attack_message = "You have attacked, causing " + my_attack_power + " damage. " + characters[my_opponent_index].name + " counterattacks, causing " + characters[my_opponent_index].counter_attack_power + " damage.";
    $("#attack_result").text(str_attack_message);
    game.CalculateHP();
  },

  CalculateHP: function () {
    characters[my_character_index].health_points = characters[my_character_index].health_points - opponent_attack_power;
    characters[my_opponent_index].health_points = characters[my_opponent_index].health_points - my_attack_power;
    
    //my player has been defeated after strike
    if (characters[my_character_index].health_points <= 0) {    
      characters[my_character_index].health_points = 0;
      $('#my_character').empty().append("<div class='selected_character'" + "id=" + characters[my_character_index].id + ">" + "<img src=" + characters[my_character_index].dead_image + ">" + "<p>" + characters[my_character_index].health_points + "</p>" + "</div>")
      $("#attack_button").toggleClass("button_visible");
      $("#attack_result").text("Your player had been defeated. Press Restart to play again");
      return;
    }
    
    //enemy is defeated after strike
    else if (characters[my_opponent_index].health_points <= 0) {      
      characters[my_opponent_index].health_points = 0
      $('#my_opponent').empty();
      $('#my_character').empty().append("<div class='selected_character'" + "id=" + characters[my_character_index].id + ">" + "<img src=" + characters[my_character_index].image + ">" + "<p>" + characters[my_character_index].health_points + "</p>" + "</div>")
      $("#attack_result").text("You have defeated " + characters[my_opponent_index].name + ". Select a new enemy to battle");
      $("#attack_button").toggleClass("button_visible");

     //no enemies remain, game over
      if ($('.available_enemy').length == 0) {
        console.log("game over");
        $("#attack_result").text("You Win!!! Press Restart to play again");
        return;
      }
      $("#enemies").on('click', '.available_enemy', game.SelectEnemy);
    }

    //my player and enemy are still alive after strike
    else {
      $('#my_character').empty().append("<div class='selected_character'" + "id=" + characters[my_character_index].id + ">" + "<img src=" + characters[my_character_index].image + ">" + "<p>" + characters[my_character_index].health_points + "</p>" + "</div>")
      $('#my_opponent').empty().append("<div class='opponent'" + "id=" + characters[my_opponent_index].id + ">" + "<img src=" + characters[my_opponent_index].image + ">" + "<p>" + characters[my_opponent_index].health_points + "</p>" + "</div>")
      my_attack_power = parseInt(my_attack_power, 10) + parseInt(characters[my_character_index].attack_power, 10)
    }
  },

  ResetGame: function () {
    location.reload();
  },

  ApiCall: function(i){
    var restCall = 'https://swapi.co/api/people/' + characters[i].swapiID + "/";
    console.log(restCall)

    $.ajax({
        url: restCall,
        success: function(info){
          characters[i].birth_year = info.birth_year;
        console.log(characters[i].birth_year);
        
          alert('AJAX successful');
        },
        error: function(){
          
          alert('Error')
        return false;}

    }).then(function(info) {

        game.CreateCharacterCards(i);
        
       
  
    })
    
    ;
  }

};

$(document).ready(function () {
  game.SetupGame();
  $(".available_character").on("click", game.SelectPlayer);
  $("#attack_button").on("click", game.Attack);
  $("#enemies").on('click', '.available_enemy', game.SelectEnemy);
  $("#reset_button").on('click', game.ResetGame);
});
