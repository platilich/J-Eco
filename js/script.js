const earth = document.querySelector('.earth')
const balanceDisplay = document.querySelector('#balance')
const shopMessage = document.querySelector('#shop-message')
const products = document.querySelectorAll('.new_card[data-price]')
const resetBtn = document.querySelector('.resetBtn')

let balance = 0
let restoreTimer

// Восстановление баланса из localStorage
const savedBalance = localStorage.getItem('jeco-balance')
if (savedBalance !== null) {
    try {
        balance = Number(JSON.parse(savedBalance).balance) || 0
    } catch (e) {
        balance = 0
    }
}
updateStatistics()

function updateStatistics() {
    balanceDisplay.textContent = `${balance}`
    localStorage.setItem('jeco-balance', JSON.stringify({ balance }))
}

// Восстановление состояния карточек из localStorage
const savedPurchases = localStorage.getItem('jeco-purchases')
let purchasedCardIndices = []
if (savedPurchases !== null) {
    try {
        purchasedCardIndices = JSON.parse(savedPurchases) || []
    } catch (e) {
        purchasedCardIndices = []
    }
}

// Применяем восстановленные покупки
products.forEach((product, index) => {
    if (purchasedCardIndices.includes(index)) {
        const quantityDisplay = product.querySelector('span')
        quantityDisplay.textContent = 'x'
        product.style.opacity = '0.5'
        product.style.cursor = 'default'
    }
})

let wasTouched = false

// Prevent zoom on iOS and enable multitouch
earth.addEventListener('touchstart', function (e) {
    e.preventDefault()
    wasTouched = true
    const touchCount = e.touches.length

    balance += touchCount

    window.gameSounds.playClick()
    updateStatistics()
    shopMessage.textContent = ''

    earth.style.transform = 'scale(0.9)'
    clearTimeout(restoreTimer)
    restoreTimer = setTimeout(() => {
        earth.style.transform = ''
    }, 100)
}, { passive: false })

earth.addEventListener('click', function () {
    // Ignore synthetic click after touch on mobile
    if (wasTouched) {
        wasTouched = false
        return
    }

    balance += 1

    window.gameSounds.playClick()
    updateStatistics()
    shopMessage.textContent = ''

    earth.style.transform = 'scale(0.9)'
    clearTimeout(restoreTimer)
    restoreTimer = setTimeout(() => {
        earth.style.transform = ''
    }, 100)
})

products.forEach((product, index) => {
    const quantityDisplay = product.querySelector('span')
    let purchased = purchasedCardIndices.includes(index)

    product.addEventListener('click', function () {
        if (purchased) {
            shopMessage.textContent = 'Already purchased.'
            return
        }

        const price = Number(product.dataset.price)

        if (balance < price) {
            shopMessage.textContent = 'Not enough eco-points. Click the Earth to earn more.'
            return
        }

        balance -= price
        purchased = true
        purchasedCardIndices.push(index)
        localStorage.setItem('jeco-purchases', JSON.stringify(purchasedCardIndices))
        quantityDisplay.textContent = 'x'
        product.style.opacity = '0.5'
        product.style.cursor = 'default'

        window.gameSounds.playPurchase()
        window.shopping.itemPurchased()

        const itemName = product.querySelector('p').textContent
        shopMessage.textContent = `${itemName} purchased!`
        updateStatistics()
    })
})

function resetGame() {
    // Сброс баланса
    balance = 0
    updateStatistics()

    // Сброс покупок
    purchasedCardIndices = []
    localStorage.removeItem('jeco-purchases')

    // Сброс карточек
    products.forEach(product => {
        const quantityDisplay = product.querySelector('span')
        const price = Number(product.dataset.price)
        quantityDisplay.textContent = `${price} Eco-points`
        product.style.opacity = '1'
        product.style.cursor = 'pointer'
    })

    // Сброс shopping
    window.shopping.reset()

    // Сброс таймера
    window.gameTimer.restart()

    // Удалить overlay если есть
    const overlay = document.querySelector('.overlay')
    if (overlay) overlay.remove()

    // Очистить localStorage
    localStorage.removeItem('jeco-balance')
    shopMessage.textContent = 'Game reset!'
}

if (resetBtn) {
    resetBtn.addEventListener('click', function () {
        resetGame()
    })
}

window.script = {
    resetGame: function () {
        resetGame()
    },
    getState: function () {
        return { balance }
    }
}