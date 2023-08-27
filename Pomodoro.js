const inputBox = document.getElementById("input-box");
const fullscreenToggle = document.getElementsByClassName("fullscreen-toggle")[0];
const clickSound = document.getElementById("sound-effect");
const typingText = document.getElementsByClassName("typing-text")[0];
const listContainer = document.getElementById("list-container");
const btn = document.getElementById("btn1");
let focusButton = document.getElementById("focus");
let buttons = document.querySelectorAll(".btn");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");
let startBtn = document.getElementById("btn-start");
let reset = document.getElementById("btn-reset");
let pause = document.getElementById("btn-pause");
let time = document.getElementById("time");
let set;
let isFocus = true;
let isBreak = false;
let count = 59;
let active = "focus";
let paused = true;
let minCount = 24;
time.textContent = `${minCount + 1}:00`;
const text1 = "Let's dive in and make the most of this Pomodoro! You've got this!";
const text2 = "Pomodoro complete! Give yourself a pat on the back for a job well done!";
const text3 = "Step back, relax, and enjoy this short break. You've earned it!";

function textAnimation(index, text) {
    if (index <= text.length) {
        typingText.textContent = text.substring(0, index);
        setTimeout(() => textAnimation(index + 1, text), 100);
    }
}
const appendZero = (value) => {
    value = value < 10 ? `0${value}` : value;
    return value;
}

reset.addEventListener("click", (resetTime = () => {
    pauseTimer();
    switch (active) {
        case "long":
            minCount = 14;
            break;
        case "short":
            minCount = 4;
            break;
        default:
            minCount = 24;
            break;
    }
    count = 59;
    time.textContent = `${minCount + 1}:00`;
})
);

const removeFocus = () => {
    buttons.forEach((btn) => {
        btn.classList.remove("btn-focus");
    });
}


focusButton.addEventListener("click", () => {
    removeFocus();
    focusButton.classList.add("btn-focus");
    isFocus = true;
    isBreak = false;
    typingText.textContent = "";
    pauseTimer();
    minCount = 24;
    count = 59;
    time.textContent = `${minCount + 1}:00`;
});


shortBreakButton.addEventListener("click", () => {
    active = "short";
    removeFocus();
    shortBreakButton.classList.add("btn-focus");
    isFocus = false;
    isBreak = true;
    typingText.textContent = "";
    pauseTimer();
    minCount = 4;
    count = 59;
    time.textContent = `${appendZero(minCount + 1)}:00`;
});


longBreakButton.addEventListener("click", () => {
    active = "long";
    removeFocus();
    longBreakButton.classList.add("btn-focus");
    isFocus = false;
    isBreak = true;
    typingText.textContent = "";
    pauseTimer();
    minCount = 14;
    count = 59;
    time.textContent = `${minCount + 1}:00`;
});


pause.addEventListener("click", (pauseTimer = () => {
    paused = true;
    clearInterval(set);
    startBtn.classList.remove("hide");
    pause.classList.remove("show");
    reset.classList.remove("show");
})
);

startBtn.addEventListener("click", () => {
    reset.classList.add("show");
    pause.classList.add("show");
    startBtn.classList.add("hide");
    startBtn.classList.remove("show");
    if (isFocus == true) {
        textAnimation(0, text1);
    }
    else {
        textAnimation(0, text3);
    }
    if (paused) {
        paused = false;
        time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
        set = setInterval(() => {
            count--;
            time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
            if (count == 0) {
                if (minCount != 0) {
                    minCount--;
                    count = 60;
                } else {
                    clearInterval(set);
                    clickSound.play();
                    if (isFocus == true) textAnimation(0, text2);
                    startBtn.classList.add("show");
                    reset.classList.add("hide");
                    pause.classList.add("hide");
                    reset.classList.remove("show");
                    pause.classList.remove("show");
                }
            }
        }, 1000);
    }
})

btn.addEventListener("click", () => {
    if (inputBox.value === '') {
        alert("Cannot add empty task");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
});
listContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);


function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}


fullscreenToggle.addEventListener("click", () => {
    if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            document.documentElement.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }
});

showTask();
