const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

function getRandomNum() {
  return Math.floor(Math.random() * (3 - 1 +1)) + 1;
}

function getComputerSelection() {
  let randomMove = getRandomNum();

  if (randomMove === 1) {
    randomMove = ROCK;
  } else if (randomMove === 2) {
    randomMove = PAPER;
  } else {
    randomMove = SCISSORS;
  }
  return randomMove;
}

function getPlayerSelection() {
    let userMove = prompt("Choose rock, paper or scissors").toLowerCase();
    return userMove;
}

function getRoundResult(playerSelection, computerSelection) {
  let roundResult = ""

  if (playerSelection === computerSelection) {
    roundResult = "tie";
  } else if (playerSelection === ROCK) {
    if (computerSelection === PAPER) {
      roundResult = "loss";
    } else if (computerSelection === SCISSORS) {
      roundResult = "win";
    }
  } else if (playerSelection === PAPER) {
    if (computerSelection === ROCK) {
      roundResult = "win";
    } else if (computerSelection === SCISSORS) {
      roundResult = "loss";
    }
  } else if (playerSelection === SCISSORS) {
    if (computerSelection === ROCK) {
      roundResult = "loss";
    } else if (computerSelection === PAPER) {
      roundResult = "win";
    }
  }
  return roundResult;
}

function showRoundWin(playerMove, computerMove) {
  console.log(`You win this round! ${playerMove} beats ${computerMove}`);
}

function showRoundLoss(playerMove, computerMove) {
  console.log(`You lose this round! ${computerMove} beats ${playerMove}`);
}

function showRoundTie(playerMove) {
  console.log(`It's a tie! You both choose ${playerMove}`);
}

function showInvalidMessage() {
  console.log("Please choose rock, paper or scissors");
}

function showGameTie(playerScore, computerScore) {
  console.log(`You tied with the computer! `+
      `You: ${playerScore} | Computer: ${computerScore}`);
}

function showGameWin(playerScore, computerScore) {
  console.log(`You won the most rounds! `+
      `You: ${playerScore} | Computer: ${computerScore}`);
}

function showGameLoss(playerScore, computerScore) {
  console.log(`You lost the most rounds! `+
      `You: ${playerScore} | Computer: ${computerScore}`);
}
      
function checkRoundWinner(userSelection, computerSelection, roundResult) {
  let winner = "";

  if (roundResult === "win") {
    showRoundWin(userSelection, computerSelection);
    winner = "player";
  } else if (roundResult === "loss") {
    showRoundLoss(userSelection, computerSelection);
    winner = "computer";
  } else if (roundResult === "tie") {
    showRoundTie(userSelection);
    winner = "tie";
  } else {
    showInvalidMessage();
  }
  return winner;
}

function checkOverallWinner(playerScore, computerScore) {
  if (playerScore === computerScore) {
     showGameTie(playerScore, computerScore);
  } else if (playerScore > computerScore) {
    showGameWin(playerScore, computerScore);
  } else {
    showGameLoss(playerScore, computerScore);
  }
}

/*function playGame() {
  let playerScore = 0;
  let computerScore = 0;

  for (let i = 0; i < 5; i++) {
    let userSelection = getPlayerSelection();
    let compSelection = getComputerSelection();
    let result = getRoundResult(userSelection, compSelection);
    let winner = checkRoundWinner(userSelection, compSelection, result);
              
    if (winner === "player") {
      playerScore++;
    } else if (winner === "computer") {
      computerScore++;
    } else if (winner === "tie") {
      continue;
    } else {
      i--; //invalid user input, repeat round
    }
  }
  checkOverallWinner(playerScore, computerScore);
}

playGame();*/