import Timer from './timer.js'


new Timer (
     document.querySelector('.timer')
)


const showTimerButton = document.getElementById('showTimerButton')
const timerContainer = document.getElementById('timerContainer')
const closeBtn = document.getElementById('timeBtn')

showTimerButton.addEventListener('click', () => {
  showTimerButton.style.display = 'none'
  timerContainer.style.display = 'block'
})

const timer = new Timer(timerContainer)

// Close the timer when the timer-close button is clicked

