  const s = document.querySelector(".s");
      const m = document.querySelector(".m");
      const h = document.querySelector(".h");
      const ms = document.querySelector(".ms");

      const start = document.querySelector(".start");
      const pause = document.querySelector(".pause");
      const reset = document.querySelector(".reset");
      const lap = document.querySelector(".lap");
      const lapList = document.querySelector(".lap-list");

      let seconds = 0;
      let minutes = 0;
      let hours = 0;
      let milliseconds = 0;

      let interval = null;
      let lapCount = 1;

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
            : milliseconds;
      }

      start.addEventListener("click", function () {
        if (interval) return; // prevent multiple intervals

        interval = setInterval(() => {
          milliseconds += 10;

          if (milliseconds >= 1000) {
            milliseconds = 0;
            seconds++;
          }

          if (seconds >= 60) {
            seconds = 0;
            minutes++;
          }

          if (minutes >= 60) {
            minutes = 0;
            hours++;
          }

          updateDom();
        }, 10);
      });

      pause.addEventListener("click", function () {
        clearInterval(interval);
        interval = null;
      });

      reset.addEventListener("click", function () {
        clearInterval(interval);
        interval = null;
        seconds = minutes = hours = milliseconds = 0;
        updateDom();
        lapList.innerHTML = "";
        lapCount = 1;
      });

      lap.addEventListener("click", function () {
        if (!interval) return; // don't add lap if timer not running
        const li = document.createElement("p");
        li.innerText = `Lap-${lapCount} : ${h.innerText}:${m.innerText}:${s.innerText}:${ms.innerText}`;
        lapList.appendChild(li);
        lapCount++;
      });

      // init
      updateDom();