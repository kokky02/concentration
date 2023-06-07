$(document).ready(function() {
  let rainButton = $('#showRain')
  let modal = $('#rainModal')
  let playButton = $('#playButton')
  let closeButton = $('#closeButton')
  let volumeSlider = $('#volumeSlider')
  let audioRain = new Audio('sounds/soft-rain.mp3')
  let isPlaying = false
  let rainAnim = $('.rain')

  audioRain.loop = true // Nastavení opakování přehrávání

  rainButton.on('click', function() {
    modal.css('display', 'block')
    rainButton.css('display', 'none')
  })

  closeButton.on('click', function() {
    modal.css('display', 'none')
    rainButton.css('display', 'block')
  })

  playButton.on('click', function() {
    if (isPlaying) {
      audioRain.pause()
      isPlaying = false
      rainAnim.css('display', 'none')      
    } else {
      audioRain.play()
      isPlaying = true
      rainAnim.css('display', 'flex')
    }
  });

  volumeSlider.on('input', function() {
    let volume = parseFloat(volumeSlider.val()) / 100
    audioRain.volume = volume
  });

  // rain Graphic

  let makeItRain = function() {
    $('.rain').empty()

    let increment = 0
    let drops = ""
    let backDrops = ""

    while (increment < 100) {
      let randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1))
      let randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2))
      increment += randoFiver
      drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
      backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
    }

    $('.rain.front-row').append(drops)
    $('.rain.back-row').append(backDrops)
  }

  $('.splat-toggle.toggle').on('click', function() {
    $('body').toggleClass('splat-toggle')
    $('.splat-toggle.toggle').toggleClass('active')
    makeItRain()
  })

  $('.back-row-toggle.toggle').on('click', function() {
    $('body').toggleClass('back-row-toggle')
    $('.back-row-toggle.toggle').toggleClass('active')
    makeItRain();
  })

  $('.single-toggle.toggle').on('click', function() {
    $('body').toggleClass('single-toggle')
    $('.single-toggle.toggle').toggleClass('active')
    makeItRain()
  })

  makeItRain()
});
