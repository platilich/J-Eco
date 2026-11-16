const ecoLevelDisplay = document.querySelector('#eco-level')
const pollutionDisplay = document.querySelector('#pollution')
const earthImage = document.querySelector('.earth')
const earthSkins = ['first', 'second', 'third', 'fourth', 'fifth']


let purchasedItems = 0
let ecoLevel = 1


// новый уровень появляется каждые три покупки
function updateEcoLevel() {
    const newLevel = Math.min(5, Math.floor(purchasedItems / 3) + 1)

    // меняем землю и показатели только при переходе на новый уровень
    if (newLevel === ecoLevel) return

    ecoLevel = newLevel
    earthImage.src = `earth/${earthSkins[ecoLevel - 1]}.jpg`
    ecoLevelDisplay.textContent = String(ecoLevel)
    pollutionDisplay.textContent = String(100 - (ecoLevel - 1) * 25)
}

window.shopping = {
    itemPurchased: function () {
        purchasedItems += 1
        updateEcoLevel()
    },
}
