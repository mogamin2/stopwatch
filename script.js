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
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
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

function formatDuration(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = String(time % 1000).padStart(3, '0');
    return ` -- ${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`;
}

function startStop() {
    if (running) {
        // Stop the stopwatch
        running = false;
        clearInterval(stopwatchInterval);
        startStopBtn.textContent = 'Start';

        const now = new Date();
        const historyItem = document.createElement('p');
        historyItem.textContent = `Stop:  ${formatDateTime(now)} - ${formatTime(elapsedTime)}${formatDuration(elapsedTime)}`;
        historyLog.appendChild(historyItem);

        elapsedTime = 0; // Reset for next start

    } else {
        // Start the stopwatch
        running = true;
        startTime = Date.now() - elapsedTime;
        stopwatchDisplay.textContent = formatTime(elapsedTime);
        stopwatchInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            stopwatchDisplay.textContent = formatTime(elapsedTime);
        }, 10);
        startStopBtn.textContent = 'Stop';

        const now = new Date();
        const historyItem = document.createElement('p');
        historyItem.textContent = `Start: ${formatDateTime(now)} - 00:00:00.000`;
        historyLog.appendChild(historyItem);
    }
}

startStopBtn.addEventListener('click', startStop);

setInterval(updateCurrentTime, 1000);
updateCurrentTime();
stopwatchDisplay.textContent = formatTime(0);