const timerDisplay = document.querySelector('#timer')

const TOTAL_TIME = 5 * 60
let timeLeft = TOTAL_TIME
let timerInterval = null

function formatTime(seconds) {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
}


function showOverlay(won) {
    clearInterval(timerInterval)

    const overlay = document.createElement('div')
    overlay.className = `overlay ${won ? 'overlay--win' : 'overlay--lose'}`
    overlay.innerHTML = `
        <div class="overlay__card">
            <p class="overlay__label">${won ? 'Victory' : 'Defeat'}</p>
            <h1 class="overlay__title">${won ? 'Planet saved' : 'Game over'}</h1>
            <p class="overlay__sub">${won ? 'All eco-initiatives launched in time.' : 'Time ran out. The planet is doomed.'}</p>
            <button class="overlay__btn" onclick="location.reload()">Play again</button>
        </div>
    `
    document.body.appendChild(overlay)
}

function startTimer() {
    timerDisplay.textContent = formatTime(timeLeft)

    timerInterval = setInterval(() => {
        timeLeft -= 1
        timerDisplay.textContent = formatTime(timeLeft)

        if (timeLeft <= 0) {
            timerDisplay.textContent = '0:00'
            showOverlay(false)
        }
    }, 1000)
}

window.gameTimer = {
    win: function () {
        showOverlay(true)
    }
}

startTimer()