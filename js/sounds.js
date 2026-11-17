const clickSound = new Audio('sounds/sound_clicked.mp3')
const purchaseSound = new Audio('sounds/paid.mp3')
const soundToggle = document.querySelector('.soundToggle')
let text = document.querySelector('.soundToggleText')



let turn_off_symbol = document.querySelector('.turn_off_symbol')
let turn_on_symbol = document.querySelector('.turn_on_symbol')


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
    text.textContent = soundIsOn
        ? 'Turn off sounds'
        : 'Turn on sounds'

    turn_on_symbol.style.display = soundIsOn ? '' : 'none'
    turn_off_symbol.style.display = soundIsOn ? 'none' : ''


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
