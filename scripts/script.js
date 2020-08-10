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

function showRoundWin(playerMove, computerMove, resultMessage) {
  resultMessage.textContent = `You win this round, ${playerMove} beats ${computerMove}`;
}

function showRoundLoss(playerMove, computerMove, resultMessage) {
  resultMessage.textContent = `You lose this round, ${computerMove} beats ${playerMove}`;
}

function showRoundTie(playerMove, resultMessage) {
  resultMessage.textContent = `It's a draw, you both choose ${playerMove}`;
}

function showInvalidMessage() {
  console.log("Invalid input received");
}

function showGameTie(playerScore, computerScore, message) {
  message.textContent = `You tied with the computer! `+
      `You: ${playerScore} | Computer: ${computerScore}`;
}

function showGameWin(playerScore, computerScore, message) {
  message.textContent = `You won the most rounds! `+
      `You: ${playerScore} | Computer: ${computerScore}`;
}

function showGameLoss(playerScore, computerScore, message) {
  message.textContent = `You lost the most rounds! `+
      `You: ${playerScore} | Computer: ${computerScore}`;
}
      
function checkRoundWinner(userSelection, computerSelection, roundResult, resultMessage) {
  let winner = "";

  if (roundResult === "win") {
    showRoundWin(userSelection, computerSelection, resultMessage);
    winner = "player";
  } else if (roundResult === "loss") {
    showRoundLoss(userSelection, computerSelection, resultMessage);
    winner = "computer";
  } else if (roundResult === "tie") {
    showRoundTie(userSelection, resultMessage);
    winner = "tie";
  } else {
    showInvalidMessage();
  }
  return winner;
}

function checkOverallWinner(playerScore, computerScore, message) {
  if (playerScore === computerScore) {
     showGameTie(playerScore, computerScore, message);
  } else if (playerScore > computerScore) {
    showGameWin(playerScore, computerScore, message);
  } else {
    showGameLoss(playerScore, computerScore, message);
  }
}

function playRound(userSelection, resultMessage) {
  let computerSelection = getComputerSelection();
  let result = getRoundResult(userSelection, computerSelection);
  let winner = checkRoundWinner(userSelection, computerSelection, result, resultMessage);
  return winner;
}

function playGame() {
  let playerScore = 0;
  let compScore = 0;
  let drawCount = 0;

  const resultDisplay = document.querySelector('.result');
  const resultMessage = document.createElement('h3');
  resultMessage.textContent = "Choose a move below!";

  const choiceDisplay = document.querySelector('.choice');
  const choiceMessage = document.createElement('h3');
  choiceMessage.textContent = "Choose your move";

  const userContainer = document.querySelector('.userContainer');
  const userScore = document.querySelector('.playerscore');
  userScore.textContent = playerScore;

  const computerContainer = document.querySelector('.computerContainer');
  const computerScore = document.querySelector('.computerscore');
  computerScore.textContent = compScore;

  const drawContainer = document.querySelector('.drawContainer');
  const draws = document.querySelector('.draws');
  draws.textContent = drawCount;

  const buttons = document.querySelectorAll('button');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      let result = playRound(button.className, resultMessage);
      if (result === 'player') {
        playerScore++;
        userScore.textContent = playerScore;
      } else if (result === 'computer') {
        compScore++;
        computerScore.textContent = compScore;
      } else {
        drawCount++;
        draws.textContent = drawCount;
      }
      if (playerScore === 5 || compScore === 5) {
        buttons.forEach((button) => button.style.cssText = 'display: none');
        const reload = document.querySelector('.reload');
        reload.style.cssText = "display: flex";
        reload.addEventListener('click', () => {
          location.reload();
        });
        checkOverallWinner(playerScore, compScore, choiceMessage);
      }
    });
  });

  resultDisplay.appendChild(resultMessage);
  choiceDisplay.appendChild(choiceMessage);
  userContainer.appendChild(userScore);
  computerContainer.appendChild(computerScore);
  drawContainer.appendChild(draws);
}

playGame();