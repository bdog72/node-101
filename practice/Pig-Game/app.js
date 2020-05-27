//
//
let scores, roundScore, activePlayer, gamePlaying;

init();
console.log(123);

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    // Random Number
    let dice = Math.floor(Math.random() * 6) + 1;

    const diceDom = document.querySelector('.dice');
    diceDom.style.display = 'block';
    diceDom.src = `dice-${dice}.png`;

    if (dice !== 1) {
      // Add score
      roundScore += dice;
      document.querySelector(
        `#current-${activePlayer}`
      ).textContent = roundScore;
    } else {
      // Next Player
      nextPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector(`#score-${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= 20) {
      document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.add('winner');
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.remove('active');

      gamePlaying = false;
    } else {
      // Next Player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('#name-0').textContent = 'Player-1';
  document.querySelector('#name-1').textContent = 'Player-2';

  document.querySelector(`.player-0-panel`).classList.remove('winner');
  document.querySelector(`.player-1-panel`).classList.remove('winner');
  document.querySelector(`.player-0-panel`).classList.remove('active');
  document.querySelector(`.player-1-panel`).classList.remove('active');
  document.querySelector(`.player-0-panel`).classList.add('active');
}
