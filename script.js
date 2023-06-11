let countdown;
let targetTime;

const timerDisplay = document.getElementById('timer');
const hoursInput = document.getElementById('hoursInput');
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');
const startButton = document.getElementById('startButton');

startButton.addEventListener('click', startCountdown);

function startCountdown() {
  const hours = parseInt(hoursInput.value) || 0;
  const minutes = parseInt(minutesInput.value) || 0;
  const seconds = parseInt(secondsInput.value) || 0;

  if (hours === 0 && minutes === 0 && seconds === 0) {
    return;
  }

  const currentTime = new Date();
  const targetDate = new Date();
  targetDate.setHours(currentTime.getHours() + hours);
  targetDate.setMinutes(currentTime.getMinutes() + minutes);
  targetDate.setSeconds(currentTime.getSeconds() + seconds);

  startButton.disabled = true;

  countdown = setInterval(() => {
    const timeRemaining = getTimeRemaining(targetDate);

    if (timeRemaining.total <= 0) {
      clearInterval(countdown);
      timerDisplay.textContent = 'Time Up!';
      startButton.disabled = false;
      return;
    }

    displayTime(timeRemaining);
  }, 1000);
}

function getTimeRemaining(targetDate) {
  const total = targetDate - new Date();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds
  };
}

function displayTime(time) {
  const formattedHours = padZero(time.hours);
  const formattedMinutes = padZero(time.minutes);
  const formattedSeconds = padZero(time.seconds);

  timerDisplay.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function padZero(number) {
  return number.toString().padStart(2, '0');
}
