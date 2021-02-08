//Secret Number
let secretNumber = Math.trunc(Math.random() * 20) + 1;

//Scoring
let score = 20;

//Game Logic Event Handler
document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  //When there is no input
  if (!guess) {
    document.querySelector(".message").textContent = "⛔ No Number!";
    //Player Wins
  } else if (guess === secretNumber) {
    document.querySelector(".number").textContent = secretNumber;
    document.querySelector(".message").textContent = "🎉 Corrent Number";
    //Manupulating the css
    document.querySelector("body").style.backgroundColor = "#60b347";

    document.querySelector(".number").style.width = "30rem";
  }
  //   Guess is too High
  else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector(".message").textContent = "📈 Too High!";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "😥 You Lost The Game!";
      document.querySelector(".score").textContent = 0;
    }
  }
  //   Guess is too Low
  else if (guess < secretNumber) {
    if (score > 1) {
      document.querySelector(".message").textContent = "📉 Too Low!";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "😥 You Lost The Game!";
      document.querySelector(".score").textContent = 0;
    }
  }
});

//Play Again Functionality
document.querySelector(".again").addEventListener("click", function () {
  //Restoring all values
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;

  //Restoring initial condition of message
  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  document.querySelector(".score").textContent = score;

  //Restoring styles
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});
