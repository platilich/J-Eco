const timerDisplay = document.querySelector('#timer')

const TOTAL_TIME = 5 * 60 // 5 минут в секундах
let timeLeft = TOTAL_TIME
let timerInterval = null


function formatTime(seconds) {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
}

function checkWin() {
    // победа = куплены все 5 предметов (eco level 5)
    return window.shopping && window.shopping.allPurchased()
}

function endGame(won) {
    clearInterval(timerInterval)

    const overlay = document.createElement('div')
    overlay.style.cssText = `
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.75);
        display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        color: white; font-family: Roboto, sans-serif;
        z-index: 999;
    `
    overlay.innerHTML = `
        <h1 style="font-size: 3rem; margin-bottom: 1rem">
            ${won ? '🌍 You saved the planet!' : '💀 Game over'}
        </h1>
        <p style="font-size: 1.2rem; color: #ccc">
            ${won ? 'All eco-initiatives launched in time.' : 'Time ran out. The planet is doomed.'}
        </p>
        <button onclick="location.reload()" style="
            margin-top: 2rem; padding: 12px 32px;
            font-size: 1rem; border-radius: 12px;
            border: none; cursor: pointer;
            background: #1a73e8; color: white;
        ">Play again</button>
    `
    document.body.appendChild(overlay)
}

function startTimer() {
    timerDisplay.textContent = formatTime(timeLeft)

    timerInterval = setInterval(() => {
        timeLeft -= 1
        timerDisplay.textContent = formatTime(timeLeft)

        if (checkWin()) {
            endGame(true)
            return
        }

        if (timeLeft <= 0) {
            timerDisplay.textContent = '0:00'
            endGame(false)
        }
    }, 1000)
}

startTimer()