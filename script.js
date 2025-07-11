const currentTimeDisplay = document.getElementById('current-time');
const stopwatchDisplay = document.getElementById('stopwatch-display');
const startStopBtn = document.getElementById('start-stop-btn');
const historyLog = document.getElementById('history-log');

let stopwatchInterval;
let startTime;
let elapsedTime = 0;
let running = false;

function updateCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    currentTimeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

function formatTime(time) {
    const date = new Date(time);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = Math.floor(date.getUTCMilliseconds() / 100);
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

function addHistory(text, type) {
    const historyItem = document.createElement('p');
    historyItem.textContent = text;
    historyItem.classList.add(type);
    historyLog.appendChild(historyItem);
    historyLog.scrollTop = historyLog.scrollHeight; // Auto-scroll to bottom
}

function startStop() {
    if (running) {
        // Stop the stopwatch
        running = false;
        clearInterval(stopwatchInterval);
        startStopBtn.textContent = 'Start';

        const now = new Date();
        addHistory(`Stop:  ${formatDateTime(now)} - ${formatTime(elapsedTime)}`, 'history-stop');

    } else {
        // Start the stopwatch
        running = true;
        
        // Reset timer and display right before starting
        elapsedTime = 0;
        stopwatchDisplay.textContent = formatTime(elapsedTime);

        startTime = Date.now();
        stopwatchInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            stopwatchDisplay.textContent = formatTime(elapsedTime);
        }, 10);
        startStopBtn.textContent = 'Stop';

        const now = new Date();
        addHistory(`Start: ${formatDateTime(now)} - ${formatTime(0)}`, 'history-start');
    }
}

startStopBtn.addEventListener('click', startStop);

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault(); // Prevent page scroll
        startStopBtn.click();
    }
});

setInterval(updateCurrentTime, 1000);
updateCurrentTime();
stopwatchDisplay.textContent = formatTime(0);