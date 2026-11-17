const earth = document.querySelector('.earth')
const balanceDisplay = document.querySelector('#balance')
const shopMessage = document.querySelector('#shop-message')
const products = document.querySelectorAll('.new_card[data-price]')

let balance = 0
let restoreTimer

function updateStatistics() {
    balanceDisplay.textContent = `${balance}`
}

earth.addEventListener('click', function () {
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

products.forEach(product => {
    const quantityDisplay = product.querySelector('span')
    let purchased = false

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