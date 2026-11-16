const clickSound = new Audio('sounds/sound_clicked.mp3')
const purchaseSound = new Audio('sounds/paid.mp3')
const soundToggle = document.querySelector('.turn_off_sound')



let soundIsOn = true


function playSound(sound) {
    if (!soundIsOn) return // если выключен не включаем

    sound.currentTime = 0
    sound.play().catch(error => {
        console.error('не удалось включить звук:', error)
    })
}


soundToggle.addEventListener('click', function () {
    soundIsOn = !soundIsOn
    soundToggle.setAttribute('aria-pressed', String(!soundIsOn))
    soundToggle.querySelector('span').textContent = soundIsOn
        ? 'Turn off sound'
        : 'Turn on sound'
})

// функции для основнрого файла
window.gameSounds = {
    playClick: function () {
        playSound(clickSound)
    },
    playPurchase: function () {
        playSound(purchaseSound)
    },
}
