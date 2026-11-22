const timerDisplay = document.querySelector('#timer')

const TOTAL_TIME = 5 * 60
const TIMER_KEY = 'jeco-timer'

let timeLeft = TOTAL_TIME
let timerInterval = null

// Восстановление таймера из localStorage
const savedTime = localStorage.getItem(TIMER_KEY)
if (savedTime !== null) {
    try {
        const parsed = JSON.parse(savedTime)
        if (parsed && parsed.timeLeft > 0) {
            timeLeft = parsed.timeLeft
        }
    } catch (e) {
        // игнорируем ошибки парсинга
    }
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
}


function showOverlay(won) {
    clearInterval(timerInterval)

    const pollution = window.shopping.getState().pollution
    const ecoLevel = window.shopping.getState().ecoLevel
    const balance = window.script.getState().balance

    const overlay = document.createElement('div')
    overlay.className = `overlay ${won ? 'overlay--win' : 'overlay--lose'}`
    overlay.innerHTML = `
        <div class="overlay__card">
            <p class="overlay__label">${won ? 'Victory' : 'Defeat'}</p>
            <h1 class="overlay__title">${won ? 'Planet saved' : 'Game over'}</h1>
            <p class="overlay__sub">${won ? 'All eco-initiatives launched in time.' : 'Time ran out. The planet is doomed.'}</p>
            <p class="overlay__stats">
                Pollution: ${pollution} &nbsp;|&nbsp; Eco-level: ${ecoLevel} &nbsp;|&nbsp; Eco-points: ${balance}
            </p>
            <div class="overlay__btns">
                <button class="overlay__btn" id="overlay-try-again">Try again</button>
                <button class="overlay__btn" id="overlay-continue">Continue</button>
            </div>
        </div>
    `
    document.body.appendChild(overlay)

    document.getElementById('overlay-try-again').addEventListener('click', function () {
        window.script.resetGame()
    })

    document.getElementById('overlay-continue').addEventListener('click', function () {
        clearInterval(timerInterval)
        localStorage.removeItem(TIMER_KEY)
        timerInterval = null
        overlay.remove()
    })
}

function saveTimer() {
    localStorage.setItem(TIMER_KEY, JSON.stringify({ timeLeft }))
}

function startTimer() {
    timerDisplay.textContent = formatTime(timeLeft)

    timerInterval = setInterval(() => {
        timeLeft -= 1
        timerDisplay.textContent = formatTime(timeLeft)
        saveTimer()

        if (timeLeft <= 0) {
            timerDisplay.textContent = '0:00'
            localStorage.removeItem(TIMER_KEY)
            showOverlay(false)
        }
    }, 1000)
}

window.gameTimer = {
    win: function () {
        showOverlay(true)
    },
    getInterval: function () {
        return timerInterval
    },
    getTimeLeft: function () {
        return timeLeft
    },
    setTimeLeft: function (seconds) {
        timeLeft = seconds
        timerDisplay.textContent = formatTime(timeLeft)
    },
    restart: function () {
        clearInterval(timerInterval)
        timeLeft = TOTAL_TIME
        localStorage.removeItem(TIMER_KEY)
        timerDisplay.textContent = formatTime(timeLeft)
        timerInterval = setInterval(() => {
            timeLeft -= 1
            timerDisplay.textContent = formatTime(timeLeft)
            saveTimer()

            if (timeLeft <= 0) {
                timerDisplay.textContent = '0:00'
                localStorage.removeItem(TIMER_KEY)
                showOverlay(false)
            }
        }, 1000)
    }
}

startTimer()