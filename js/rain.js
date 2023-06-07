let rainButton = document.getElementById('showRain');
let modal = document.getElementById('rainModal');
let playButton = document.getElementById('playButton');
let closeButton = document.getElementById('closeButton');
let volumeSlider = document.getElementById('volumeSlider');
let audioRain = new Audio('sounds/soft-rain.mp3');
let isPlaying = false;

audioRain.loop = true; // Nastavení opakování přehrávání

rainButton.addEventListener('click', function() {
  modal.style.display = 'block';
  rainButton.style.display = 'none'
});

closeButton.addEventListener('click', function() {
  modal.style.display = 'none';
  rainButton.style.display = 'block'
});

playButton.addEventListener('click', function() {
  if (isPlaying) {
    audioRain.pause();
    isPlaying = false;
    
  } else {
    audioRain.play();
    isPlaying = true;
    
  }
});

volumeSlider.addEventListener('input', function() {
  let volume = parseFloat(volumeSlider.value) / 100;
  audioRain.volume = volume;
});
