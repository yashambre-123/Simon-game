var buttons=["green","red","yellow","blue"];
var game_pattern=[];
var user_clicked_pattern=[];
var game_stage=1;
var started=false;


function computer_play() {
  user_clicked_pattern=[];
  game_stage++;
  var random_number=Math.random();
  random_number=random_number*4;
  random_number=Math.floor(random_number);
  var color_chosen=buttons[random_number];
  game_pattern.push(color_chosen);
  $("#"+color_chosen).fadeOut(100).fadeIn(100);
  var song=new Audio(color_chosen+".mp3");
  song.play();
}
function checking_process(level) {
  if (user_clicked_pattern[level]===game_pattern[level]) {
    if (user_clicked_pattern.length===game_pattern.length) {
      setTimeout(function() {
        $(".title").text("Level "+game_stage);
        computer_play();
      },1000);
    }
  }
  else {
    var song2=new Audio("wrong.mp3");
    song2.play();
    $(".title").text("Game over, Press any key to restart");
    var game_over=$("body");
    game_over.addClass("game_over_color");
    setTimeout(function() {
      game_over.removeClass("game_over_color");
    },1000);
  }
}
$(document).keypress(function() {
  if (!started) {
    game_pattern=[];
    game_stage=1;
    $(".title").text("Level "+game_stage);
    computer_play();
  }
});
$(".btn").click(function() {
  var user_chosen_color=$(this).attr("id");
  user_clicked_pattern.push(user_chosen_color);
  var song1=new Audio(user_chosen_color+".mp3");
  song1.play();
  var user_clicked_active=$("#"+user_chosen_color);
  user_clicked_active.addClass("pressed");
  setTimeout(function() {
    user_clicked_active.removeClass("pressed");
  },100);
  checking_process(user_clicked_pattern.length-1);
});
