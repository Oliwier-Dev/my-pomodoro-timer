const ui = {
    workOption:      document.querySelector("#workOption"),
    shortBreakOpt:   document.querySelector("#shortBreakOption"),
    longBreakOpt:    document.querySelector("#longBreakOption"),
    timerContainer:  document.querySelector("#timerContainer"),
    timer:           document.querySelector("#display"),
    label:           document.querySelector("#label"),
    timerInput:      document.querySelector("#timerInput"),
    startBtn:        document.querySelector("#startBtn"),
    stopSound:       document.querySelector("#stopSound")
};

// Config

let focusSec = 25 * 60;
let defaultFocusSec = focusSec;
let shortBreakSec = 5 * 60;
let longBreakSec = 15 * 60;

let sessionCount = 0;
let startedTimer = false;

let currentInterval = null;

const alarmSound = new Audio("done.mp3");

function playSound() {
    alarmSound.play();
}

// Function helper

function clearCurrentTimer() {
    if (currentInterval !== null) {
        clearInterval(currentInterval);
        currentInterval = null;
    }
};

function startTimer() {
    clearCurrentTimer();
    currentInterval = setInterval(updateTimer, 1000);
}

function startTimerS() {
    clearCurrentTimer();
    currentInterval = setInterval(startShortBreak, 1000);
}

function startTimerL() {
    clearCurrentTimer();
    currentInterval = setInterval(startLongBreak, 1000);
}

// Hide the input

function hideInput() {
    ui.timer.style.display = "block";
    ui.timerInput.classList.add("hidden");
    ui.label.classList.add("hidden");
}

// Event listeners
// Work option event listener

ui.workOption.addEventListener("click", () => {
    clearCurrentTimer();;
    const inputMin = Number(ui.timerInput.value);

    if (!isNaN(inputMin) && inputMin > 0) {
        focusSec = inputMin * 60;
        defaultFocusSec = focusSec;
    } 
    
    hideInput();

    startedTimer = true;
    startTimer();
});

// Shortbreak event listener

ui.shortBreakOpt.addEventListener("click", () => {
    clearCurrentTimer();
    hideInput();
    startTimerS();
});

// Longbreak event listener

ui.longBreakOpt.addEventListener("click", () => {
    clearCurrentTimer();
    hideInput();
    startTimerL();
});


ui.stopSound.addEventListener("click", () => {
    alarmSound.pause();
    alarmSound.currentTime = 0;
});

ui.timerContainer.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputMin = Number(ui.timerInput.value);

    if (!isNaN(inputMin) && inputMin > 0) {
        focusSec = inputMin * 60;
        defaultFocusSec = focusSec;
        ui.timerInput.value = "";

        hideInput();
    } else {
        alert("Incorrect format...");
        return;
    }

    if (!startedTimer) {
        startedTimer = true;
        startTimer();
    }
});

// Focus block

function updateTimer() {
    const minutes = Math.floor(focusSec / 60);
    const seconds = focusSec % 60;

    ui.timer.textContent = `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;

    if (sessionCount === 4) {
        startTimerL();
        sessionCount = 0;
        playSound();
        focusSec = defaultFocusSec;
        return;
    } else if (focusSec === 0) {
        startTimerS();
        sessionCount++;
        playSound();
        focusSec = defaultFocusSec;
    } else {
        focusSec--;
    }
}

// Short break

function startShortBreak() {
    const minutes = Math.floor(shortBreakSec / 60);
    const seconds = shortBreakSec % 60;

    ui.timer.textContent = `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;

    if (shortBreakSec === 0) {
        startTimer();
        playSound();
        shortBreakSec = 5 * 60;
    } else {
        shortBreakSec--;
    }
};

// Long break

function startLongBreak() {
    const minutes = Math.floor(longBreakSec / 60);
    const seconds = longBreakSec % 60;

    ui.timer.textContent = `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;

    if (longBreakSec === 0) {
        clearCurrentTimer(); // stop completely
        startedTimer = false;
        playSound();
        longBreakSec = 15 * 60;
    } else {
        longBreakSec--;
    }
}