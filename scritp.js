const s = document.querySelector(".s");
const m = document.querySelector(".m");
const h = document.querySelector(".h");
const ms = document.querySelector(".ms");

const start = document.querySelector(".start");
const pause = document.querySelector(".pause");
const reset = document.querySelector(".reset");
const lap = document.querySelector(".lap");
const lapList = document.querySelector(".lap-list");

let seconds = 55;
let minutes = 59;
let hours = 0;
let milliseconds = 0;

let interval = null;

reset.addEventListener("click", function () {
  clearInterval(interval);
  (seconds = 0), (minutes = 0), (hours = 0), (milliseconds = 0);
  updateDom();
  lapList.innerHTML = "";
});

function updateDom() {
  s.innerHTML = seconds < 10 ? "0" + seconds : seconds;
  m.innerHTML = minutes < 10 ? "0" + minutes : minutes;
  h.innerHTML = hours < 10 ? "0" + hours : hours;
  ms.innerHTML =
    milliseconds === 0
      ? "0000"
      : milliseconds < 100
      ? "00" + milliseconds
      : milliseconds < 1000
      ? "0" + milliseconds
      : "0000";
}

start.addEventListener("click", function () {
  interval = setInterval(() => {
    milliseconds += 10;

    if (milliseconds === 1000) {
      milliseconds = 0;
      seconds++;
    }

    if (seconds === 60) {
      seconds = 0;
      milliseconds = 0;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
      milliseconds = 0;
      seconds = 0;
      hours++;
    }

    updateDom();
  }, 10);
});

let lapCount = 1;
lap.addEventListener("click", function () {
  console.log(lapCount);
  const li = document.createElement("p");
  li.innerText = `Lap-${lapCount} : ${h.innerText}:${m.innerText}:${s.innerText}:${ms.innerText}`;
  lapList.appendChild(li);
  lapCount++;
});
