var buttonColours = ["red", "blue", "green", "yellow", "orange", "pink"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

document.addEventListener("keypress", function(event) {
  if (!started) {
    document.querySelector("#level-title").textContent = "Level " + level;
    nextSequence();
    started = true;
  }
});

var buttons = document.querySelectorAll(".btn");
buttons.forEach(function(button) {
  button.addEventListener("click", function() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  });
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    document.body.classList.add("game-over");
    document.querySelector("#level-title").textContent = "Game Over, Press Any Key to Restart";
    setTimeout(function() {
      document.body.classList.remove("game-over");
    }, 200);
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  document.querySelector("#level-title").textContent = "Level " + level;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  var element = document.getElementById(randomChosenColour);
  fadeInAndOut(element);
  playSound(randomChosenColour);
}

function fadeInAndOut(element) {
  element.style.opacity = "1";
  setTimeout(function() {
    element.style.opacity = "0";
    setTimeout(function() {
      element.style.opacity = "1";
    }, 100);
  }, 100);
}

function animatePress(currentColor) {
  var element = document.getElementById(currentColor);
  element.classList.add("pressed");
  setTimeout(function() {
    element.classList.remove("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
