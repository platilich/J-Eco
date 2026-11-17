const ecoLevelDisplay = document.querySelector('#eco-level')
const pollutionDisplay = document.querySelector('#pollution')
const earthImage = document.querySelector('.earth')
const earthSkins = ['first', 'second', 'third', 'fourth', 'fifth']


const TOTAL_ITEMS = 5
const POLLUTION_PER_ITEM = 20


let purchasedItems = 0
let pollution = 100
let ecoLevel = 1

function updateEcoLevel() {
    const newLevel = Math.min(5, purchasedItems + 1)
    if (newLevel === ecoLevel) return

    ecoLevel = newLevel
    earthImage.src = `earth/${earthSkins[ecoLevel - 1]}.jpg`
    ecoLevelDisplay.textContent = String(ecoLevel)
}

window.shopping = {
    itemPurchased: function () {
        purchasedItems += 1
        pollution = Math.max(0, pollution - POLLUTION_PER_ITEM)
        pollutionDisplay.textContent = String(pollution)
        updateEcoLevel()

        if (pollution === 0) {
            window.gameTimer.win()
        }
    },
}