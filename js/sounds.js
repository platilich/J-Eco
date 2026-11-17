const clickSound = new Audio('../assets/sounds/sound_clicked.mp3')
const purchaseSound = new Audio('../assets/sounds/paid.mp3')
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

function playSound(sound) {
    if (!soundIsOn) return
    sound.currentTime = 0
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
        playSound(clickSound)
    },
    playPurchase: function () {
        playSound(purchaseSound)
    },
}