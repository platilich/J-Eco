const earth = document.querySelector('.earth')
const balanceDisplay = document.querySelector('#balance')
const clickCountDisplay = document.querySelector('#click-count')
const shopMessage = document.querySelector('#shop-message')
const products = document.querySelectorAll('.product')
const soundToggle = document.querySelector('.turn_off_sound')


let balance = 0
let clickCount = 0
let restoreTimer


function updateStatistics() {
    balanceDisplay.textContent = `${balance} dinars` // textContent меняет содержание страницы
    clickCountDisplay.textContent = String(clickCount)
}



// события земли
earth.addEventListener('click', function () {
    balance += 1
    clickCount += 1


    updateStatistics()
    shopMessage.textContent = ''


    earth.style.transform = 'scale(0.9)'

    clearTimeout(restoreTimer)
        restoreTimer = setTimeout(() => {
            earth.style.transform = ''
        }, 100)


})