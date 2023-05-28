export default class Timer {
     constructor(root) {
       // Set the initial HTML structure of the timer component
       root.innerHTML = Timer.getHTML();
   
       // Select elements from the DOM
       this.el = {
         minutes: root.querySelector('.timer__part--minutes'), // Select the minutes element
         seconds: root.querySelector('.timer__part--seconds'), // Select the seconds element
         control: root.querySelector('.timer__btn--control'), // Select the control button element
         reset: root.querySelector('.timer__btn--reset') // Select the reset button element
       };
   
       this.interval = null; // Timer interval
       this.remainingSeconds = 0; // Remaining seconds in the timer
   
       // Initialize audio elements for click and end sounds
       this.audio = {
         click: new Audio('sounds/click.mp3'), // Click sound
         end: new Audio('sounds/ringtone.mp3') // End sound
       };
   
       // Select modal and input elements from the DOM
       this.modal = document.getElementById('modal-rules'); // Select the modal element
       this.setTimeButton = document.getElementById('setTimeButton'); // Select the set time button element
       this.timeSettingInput = document.getElementById('timeSettingInput'); // Select the time setting input element
   
       // Add event listeners to the control, reset, and input elements
       this.el.control.addEventListener('click', () => {
         // Start or stop the timer based on its current state
         if (this.interval === null) {
           this.start();
           this.playClickSound();
         } else {
           this.stop();
           this.playClickSound();
         }
       });
   
       this.el.reset.addEventListener('click', () => {
         // Open the modal to set the timer time
         this.openModal();
       });
   
       this.timeSettingInput.addEventListener('keydown', (e) => {
         // Set the timer time when Enter key is pressed in the input field
         if (e.key === 'Enter') {
           this.setTime();
         }
       });
   
       this.setTimeButton.addEventListener('click', () => {
         // Set the timer time when the set time button is clicked
         this.setTime();
       });
   
       // Close the modal when the close button is clicked
       const closeButton = this.modal.querySelector('.modal__close');
       closeButton.addEventListener('click', () => {
         this.closeModal();
       });
   
       // Close the timer when the close button is clicked
       const closeBtn = document.getElementById('timeBtn');
       closeBtn.addEventListener('click', () => {
         this.closeTimer();
       });
     }
   
     // Play the click sound
     playClickSound() {
       this.audio.click.currentTime = 0;
       this.audio.click.play();
     }
   
     // Play the end sound
     playEndSound() {
       this.audio.end.play();
     }
   
     // Open the modal to set the timer time
     openModal() {
       this.modal.style.display = 'block';
       this.timeSettingInput.value = '';
       this.timeSettingInput.focus();
     }
   
     // Close the modal
     closeModal() {
       this.modal.style.display = 'none';
     }
   
     // Update the displayed time in the interface
     updateInterfaceTime() {
       const minutes = Math.floor(this.remainingSeconds / 60);
       const seconds = this.remainingSeconds % 60;
   
       // Update the minutes and seconds elements with the current time values
       this.el.minutes.textContent = minutes.toString().padStart(2, '0');
       this.el.seconds.textContent = seconds.toString().padStart(2, '0');
     }
   
     // Update the control button based on the timer state
     updateInterfaceControls() {
       if (this.interval === null) {
         // Timer is stopped
         this.el.control.innerHTML = `<span class='material-icons'>play_arrow</span>`;
         this.el.control.classList.add('timer__btn--start');
         this.el.control.classList.remove('timer__btn--stop');
       } else {
         // Timer is running
         this.el.control.innerHTML = `<span class='material-icons'>pause</span>`;
         this.el.control.classList.add('timer__btn--stop');
         this.el.control.classList.remove('timer__btn--start');
       }
     }
   
     // Start the timer
     start() {
       if (this.remainingSeconds === 0) return;
   
       // Decrease the remaining seconds every second
       this.interval = setInterval(() => {
         this.remainingSeconds--;
         this.updateInterfaceTime();
   
         if (this.remainingSeconds === 0) {
           // Timer has reached zero, stop the timer and play the end sound
           this.stop();
           this.playEndSound();
         }
       }, 1000);
   
       // Update the control button
       this.updateInterfaceControls();
     }
   
     // Stop the timer
     stop() {
       clearInterval(this.interval);
   
       this.interval = null;
   
       // Update the control button
       this.updateInterfaceControls();
     }
   
     // Set the timer time
     setTime() {
       const inputMinutes = parseFloat(this.timeSettingInput.value);
       if (!isNaN(inputMinutes) && inputMinutes >= 0) {
         // Stop the timer, set the remaining seconds, update the displayed time, and close the modal
         this.stop();
         this.remainingSeconds = Math.floor(inputMinutes * 60);
         this.updateInterfaceTime();
         this.closeModal();
       }
     }
   
     // Close the timer
     closeTimer() {
       const showTimerButton = document.getElementById('showTimerButton');
       const timerContainer = document.getElementById('timerContainer');
   
       timerContainer.style.display = 'none';
       showTimerButton.style.display = 'block';
     }
   
     // Get the HTML structure of the timer component
     static getHTML() {
       return `
         <span class="timer__part timer__part--minutes">00</span>
         <span class="timer__part">:</span>
         <span class="timer__part timer__part--seconds">00</span>
   
         <button type="button" class="timer__btn timer__btn--control timer__btn--start">
           <span class="material-icons">play_arrow</span>
         </button>
   
         <button type="button" class="timer__btn timer__btn--reset">
           <span class="material-icons">timer</span>
         </button>
         <button class="timer-close" id="timeBtn" aria-label="Close timer"></button>
   
         <section class="modal micromodal-slide" id="modal-rules" aria-hidden="true">
           <div class="modal__overlay" tabindex="-1">
             <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-rules-title">
               <button class="modal__close" aria-label="Close modal"></button>
               <article class="modal__content" id="modal-rules-content">
                 <label for="timeSettingInput">Time</label>
                 <input type="number" step="0.1" id="timeSettingInput" class="time-setting" placeholder="Minutes">
                 <button id="setTimeButton" class="modal__button">Set</button>
               </article>
             </div>
           </div>
         </section>
       `;
     }
   }
   