const earth = document.querySelector('.earth')
const balanceDisplay = document.querySelector('#balance')
const clickCountDisplay = document.querySelector('#click-count')
const shopMessage = document.querySelector('#shop-message')
const products = document.querySelectorAll('.product')



let balance = 0
let clickCount = 0
let restoreTimer

// обнова значений
function updateStatistics() {
    balanceDisplay.textContent = `${balance} dinars`
    clickCountDisplay.textContent = String(clickCount)
}


earth.addEventListener('click', function () {
    balance += 1
    clickCount += 1

    window.gameSounds.playClick()
    updateStatistics()
    shopMessage.textContent = ''

    // уменьшение земли
    earth.style.transform = 'scale(0.9)'
    clearTimeout(restoreTimer)
    restoreTimer = setTimeout(() => {
        earth.style.transform = ''
    }, 100)
})


// добавляем обработчик покупки каждой карточке магазина
products.forEach(product => {
    const quantityDisplay = product.querySelector('.about span:last-child')
    let quantity = 0

    product.addEventListener('click', function () {
        const price = Number(product.dataset.price)


        if (balance < price) {
            shopMessage.textContent = 'Not enough dinars. Click the Earth to earn more.'
            return
        }


        balance -= price
        quantity += 1
        quantityDisplay.textContent = `${quantity}x`
        window.gameSounds.playPurchase()
        window.shopping.itemPurchased()

        const itemName = product.querySelector('p').textContent
        shopMessage.textContent = `${itemName} purchased!`
        updateStatistics()
    })
})