const ecoLevelDisplay = document.querySelector('#eco-level')
const pollutionDisplay = document.querySelector('#pollution')
const pollutionBar = document.querySelector('#pollution-bar')
const earthImage = document.querySelector('.earth')
const earthSkins = ['first', 'second', 'third', 'fourth', 'fifth']


const TOTAL_ITEMS = 5
const POLLUTION_PER_ITEM = 20


let purchasedItems = 0
let pollution = 100
let ecoLevel = 1

function updatePollutionBar() {
    const percent = Math.max(0, Math.min(100, pollution))
    pollutionBar.style.width = percent + '%'
}

function updateEcoLevel() {
    const newLevel = Math.min(5, purchasedItems + 1)
    if (newLevel === ecoLevel) return

    ecoLevel = newLevel
    earthImage.src = `assets/earth/${earthSkins[ecoLevel - 1]}.jpeg`
    ecoLevelDisplay.textContent = String(ecoLevel)
}

function updatePollutionDisplay() {
    pollutionDisplay.textContent = String(pollution)
    updatePollutionBar()
}

// Восстановление из localStorage
const savedShopping = localStorage.getItem('jeco-shopping')
if (savedShopping) {
    try {
        const data = JSON.parse(savedShopping)
        purchasedItems = data.purchasedItems || 0
        pollution = data.pollution ?? 100
        ecoLevel = data.ecoLevel || 1
        earthImage.src = `assets/earth/${earthSkins[ecoLevel - 1]}.jpeg`
        ecoLevelDisplay.textContent = String(ecoLevel)
        updatePollutionDisplay()
    } catch (e) {
        console.error('Failed to restore shopping state:', e)
    }
}

function saveState() {
    localStorage.setItem('jeco-shopping', JSON.stringify({
        purchasedItems,
        pollution,
        ecoLevel
    }))
}

window.shopping = {
    itemPurchased: function () {
        purchasedItems += 1
        pollution = Math.max(0, pollution - POLLUTION_PER_ITEM)
        updatePollutionDisplay()
        updateEcoLevel()
        saveState()

        if (pollution === 0) {
            window.gameTimer.win()
        }
    },
    getState: function () {
        return { pollution, ecoLevel, purchasedItems }
    },
    reset: function () {
        purchasedItems = 0
        pollution = 100
        ecoLevel = 1
        earthImage.src = `assets/earth/${earthSkins[0]}.jpeg`
        ecoLevelDisplay.textContent = '1'
        updatePollutionDisplay()
        saveState()
    }
}