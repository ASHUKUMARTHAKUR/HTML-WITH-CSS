let timeLeft = 10;
let totalTime = 10;
let countdownInterval = null;
let isRunning = false;

const timerDisplay = document.getElementById('timer-display');
const timerMessage = document.getElementById('timer-message');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const progressCircle = document.querySelector('.progress-ring-circle');

function updateProgressRing() {
    const radius = progressCircle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (timeLeft / totalTime) * circumference;
    progressCircle.style.strokeDashoffset = offset;
}

function updateTimer() {
    timerDisplay.textContent = timeLeft;
    updateProgressRing();

    if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        isRunning = false;
        timerMessage.textContent = '🎉 Time\'s up!';
        startBtn.disabled = false;
        resetBtn.disabled = false;
        
        // Add completion animation
        document.querySelector('.timer-number').classList.add('timer-complete');
        setTimeout(() => {
            document.querySelector('.timer-number').classList.remove('timer-complete');
        }, 600);
    } else {
        timeLeft -= 1;
    }
}

function startTimer() {
    if (isRunning) return;
    
    if (timeLeft <= 0) {
        timeLeft = totalTime;
    }
    
    isRunning = true;
    timerMessage.textContent = '';
    startBtn.disabled = true;
    resetBtn.disabled = true;
    
    countdownInterval = setInterval(updateTimer, 1000);
}

function resetTimer() {
    clearInterval(countdownInterval);
    isRunning = false;
    timeLeft = totalTime;
    timerDisplay.textContent = timeLeft;
    timerMessage.textContent = '';
    startBtn.disabled = false;
    resetBtn.disabled = false;
    updateProgressRing();
}

// Initialize progress ring
updateProgressRing();
