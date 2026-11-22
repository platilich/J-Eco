const soundToggle = document.querySelector('.soundToggle')
let text = document.querySelector('.soundToggleText')


let turn_off_symbol = document.querySelector('.turn_off_symbol')
let turn_on_symbol = document.querySelector('.turn_on_symbol')


// читаем из localStorage, если нет — по умолчанию true
let soundIsOn = localStorage.getItem('soundIsOn') !== 'false'

// применяем сохранённое состояние сразу при загрузке
function applySound() {
    text.textContent = soundIsOn ? 'Turn off sounds' : 'Turn on sounds'
    turn_on_symbol.style.display = soundIsOn ? '' : 'none'
    turn_off_symbol.style.display = soundIsOn ? 'none' : ''
    soundToggle.setAttribute('aria-pressed', String(!soundIsOn))
}

applySound()

function playSound(src) {
    if (!soundIsOn) return
    const sound = new Audio(src)
    sound.play().catch(error => {
        console.error('не удалось включить звук:', error)
    })
}

soundToggle.addEventListener('click', function () {
    soundIsOn = !soundIsOn
    localStorage.setItem('soundIsOn', String(soundIsOn))
    applySound()
})

window.gameSounds = {
    playClick: function () {
        playSound('assets/sounds/sound_clicked.mp3')
    },
    playPurchase: function () {
        playSound('assets/sounds/paid.mp3')
    },
}