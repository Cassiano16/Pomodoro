let minutes = document.querySelector("#minutes_input");
let timeOfPause = document.querySelector("#pause-time");
let times = document.querySelector("#times");
let start = document.querySelector("#start");
let timerRegress = document.querySelector("#timer");
let timerDisplay = document.querySelector("#center");
let reset = document.querySelector("#reset");
let pause = document.querySelector("#pause");
let sec;
let min;
let onBreak;
let final;
let cycleCount;
let totalCycles;
let deg = 360;
function twoDigits(x) {
  //put a 0 onside to number < 10
  if (x < 10) {
    return "0" + x;
  } else {
    return x;
  }
}

function minutes_f() {
  timerDisplay.innerHTML = `${twoDigits(Number(minutes.value))}:00`;
  min = Number(minutes.value) - 1;
  sec = 60;
  start.disabled = true;
  interval = setInterval(clock, 1000);
}

function break_f() {
  timerDisplay.innerHTML = `${twoDigits(Number(timeOfPause.value))}:00`;
  min = Number(timeOfPause.value) - 1;
  sec = 60;
  start.disabled = true;
  interval = setInterval(clock, 1000);
}

start.addEventListener("click", () => {
  if (minutes.value < 1) {
    alert("Please enter a valid number in the minutes input field.");
  } else if (timeOfPause.value < 1) {
    alert("Please enter a valid number in the break input field.");
  } else if (times.value < 1 || times.value == "") {
    onBreak = false;
    final = false;
    cycleCount = 0;
    totalCycles = 1;
    minutes_f();
  } else {
    onBreak = false;
    final = false;
    cycleCount = 0;
    totalCycles = Number(times.value);
    minutes_f();
  }
});
pause.addEventListener("click", () => {
  if (start.disabled || min == -1) {
    clearInterval(interval);
    start.disabled = false;
  } else {
    interval = setInterval(clock, 1000);
    start.disabled = true;
  }
});
reset.addEventListener("click", () => {
  clearInterval(interval);
  start.disabled = false;
  timerDisplay.innerHTML = `00:00`;
  min = -1;
  cycleCount = 0;
});
function clock() {
  sec--;
  if (sec == -1) {
    min--;
    sec = 59;
    document.timerRegress.style.background = `conic-gradient(#880e1c3f 360deg, #f03b3b 0deg);`;
  }
  if (min < 0) {
    clearInterval(interval); //pause interval
    start.disabled = false;
    if (!onBreak) {
      onBreak = true;
      break_f();
    } else {
      cycleCount++; // Increment the cycle count
      if (cycleCount < totalCycles) {
        onBreak = false;
        minutes_f(); // retart the cycle
      } else if (!final) {
        //final section
        final = true;
        minutes_f();
      }
    }
    return;
  }
  timerDisplay.innerHTML = `${twoDigits(min)}:${twoDigits(sec)}`;
}