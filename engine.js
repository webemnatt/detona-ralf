const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    hitPosition: 0,
    result: 0,
    currentTime: 60,
    timerId: null,
    countDownTimerId: null,
  },
  actions: {
    startTimers: function() {
      this.timerId = setInterval(randomSquare, 1000);
      this.countDownTimerId = setInterval(countDown, 1000);
    }
  }
};

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.timerId);
    clearInterval(state.actions.countDownTimerId);
    alert(`Game over! Seu resultado foi: ${state.values.result}`);

    state.values.result = 0;
    state.view.score.textContent = state.values.result;
  }
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * state.view.squares.length);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
      }
    });
  });
}

function startGame() {
  addListenerHitBox();
  state.actions.startTimers();
}

startGame();
