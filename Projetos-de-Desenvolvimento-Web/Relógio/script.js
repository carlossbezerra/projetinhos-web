const timeDisplay = document.getElementById('time');
const formatSelect = document.getElementById('format');
const timerMinutesInput = document.getElementById('timer-minutes');
const timerSecondsInput = document.getElementById('timer-seconds');
const startTimerButton = document.getElementById('start-timer');
const pauseTimerButton = document.getElementById('pause-timer'); // Variável adicionada
const stopTimerButton = document.getElementById('stop-timer');
const timerDisplay = document.getElementById('timer-display');
let timerInterval;
let timerRunning = false; // Variável declarada
let pausedTime = 0;     // Variável declarada
let totalSeconds = 0;   //Variável declarada


function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
  
    const format = formatSelect.value;
    const ampm = format === '12' ? (hours >= 12 ? 'PM' : 'AM') : ''; // Operador ternário
  
    if (format === '12') {
      hours = hours % 12 || 12; // Converte para 12h
    }
  
    const timeString = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${ampm}`;
    timeDisplay.textContent = timeString;
  }

function padZero(num) {
  return num < 10 ? '0' + num : num;
}


function startTimer() {
  const minutes = parseInt(timerMinutesInput.value, 10) || 0;
  const seconds = parseInt(timerSecondsInput.value, 10) || 0;
  totalSeconds = minutes * 60 + seconds; // Atribui a totalSeconds

  startTimerButton.style.display = 'none';
  pauseTimerButton.style.display = 'inline-block';
  stopTimerButton.style.display = 'inline-block';

  console.log("Minutes:", minutes);
  console.log("Seconds:", seconds);
  console.log("Total Seconds:", totalSeconds);

  timerInterval = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      timerDisplay.textContent = "00:00";
      startTimerButton.style.display = 'inline-block';
      pauseTimerButton.style.display = 'none';
      stopTimerButton.style.display = 'none';
      timerRunning = false;
      return;
    }
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timerDisplay.textContent = `${padZero(minutes)}:${padZero(seconds)}`;
    totalSeconds--;
  }, 1000);

  timerRunning = true;
  pausedTime = 0;
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  pausedTime = totalSeconds; 

  startTimerButton.style.display = 'inline-block';
  pauseTimerButton.style.display = 'none';
  stopTimerButton.style.display = 'inline-block';
}

function stopTimer(){
  clearInterval(timerInterval);
  timerRunning = false;
  pausedTime = 0;
  totalSeconds = 0;

  timerDisplay.textContent = "00:00";
  startTimerButton.style.display = 'inline-block';
  pauseTimerButton.style.display = 'none';
  stopTimerButton.style.display = 'none';
}


setInterval(updateClock, 1000);
updateClock();

startTimerButton.addEventListener('click', startTimer);
pauseTimerButton.addEventListener('click', pauseTimer);
stopTimerButton.addEventListener('click', stopTimer);