const planetBtn = document.querySelector('.planetBtn')
const habitsBtn = document.querySelector('.habitsBtn')

function createOverlay(title, content) {
    // Удалить существующий overlay если есть
    const existing = document.querySelector('.overlay')
    if (existing) existing.remove()

    const overlay = document.createElement('div')
    overlay.className = 'overlay'
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `

    const modal = document.createElement('div')
    modal.style.cssText = `
        background: #ffffff;
        color: #1f1f1f;
        padding: 30px;
        border-radius: 12px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        font-family: 'Roboto', sans-serif;
    `

    const header = document.createElement('div')
    header.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;'

    const heading = document.createElement('h2')
    heading.style.cssText = 'margin: 0; font-size: 1.4rem;'
    heading.textContent = title

    const closeBtn = document.createElement('button')
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: #1f1f1f;
        font-size: 1.8rem;
        cursor: pointer;
        padding: 0 5px;
        line-height: 1;
    `
    closeBtn.textContent = '×'
    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        overlay.remove()
    })

    header.appendChild(heading)
    header.appendChild(closeBtn)
    modal.appendChild(header)

    const contentDiv = document.createElement('div')
    contentDiv.innerHTML = content
    modal.appendChild(contentDiv)

    overlay.appendChild(modal)
    document.body.appendChild(overlay)

    // Закрытие по клику на фон
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
            overlay.remove()
        }
    })
}

if (planetBtn) {
    planetBtn.addEventListener('click', function () {
        const content = `
            <div style="line-height: 1.8;">
                <p><strong>Global Temperature Rise:</strong> The Earth's average temperature has increased by 1.2°C since pre-industrial times. 2023 was the hottest year on record, with global temperatures reaching 1.48°C above pre-industrial levels.</p>
                
                <p><strong>CO2 Emissions:</strong> Global CO2 emissions reached 36.8 billion tons in 2023. Fossil fuels account for over 75% of all greenhouse gas emissions. Atmospheric CO2 levels have exceeded 420 ppm for the first time in 800,000 years.</p>
                
                <p><strong>Ocean Warming:</strong> The oceans have absorbed 90% of excess heat from global warming. Sea surface temperatures have broken records for 14 consecutive months as of 2024, causing mass coral bleaching events.</p>
                
                <p><strong>Deforestation:</strong> Approximately 10 million hectares of forest are lost each year — equivalent to 27 soccer fields per minute. The Amazon rainforest has lost nearly 20% of its trees since the 1970s and is approaching a critical tipping point.</p>
                
                <p><strong>Plastic Pollution:</strong> Over 400 million tons of plastic are produced annually, and only 9% is recycled. By 2050, there could be more plastic than fish in the ocean by weight if current trends continue.</p>
                
                <p><strong>Biodiversity Loss:</strong> We are losing species at 1,000 to 10,000 times the natural extinction rate. Approximately 1 million animal and plant species are threatened with extinction, many within decades, according to the UN.</p>
                
                <p><strong>Water Scarcity:</strong> Over 2 billion people live in water-stressed countries. By 2025, half of the world's population could be living in water-stressed areas, and global demand for fresh water is expected to increase by 55%.</p>
                
                <p><strong>Arctic Ice:</strong> The Arctic is warming nearly four times faster than the global average. Sea ice extent has declined by approximately 13% per decade since 1979, threatening ecosystems and accelerating global warming.</p>
                
                <hr style="border-color: #ddd; margin: 20px 0;">
                <p style="font-size: 0.85rem; color: #666;">Source: UN Environment Programme, IPCC, NASA, World Wildlife Fund</p>
            </div>
        `
        createOverlay('Real Environmental Crisis', content)
    })
}

const ecoHabits = [
    'Recycle paper, plastic, glass and metal properly. Check local recycling guidelines to ensure correct sorting.',
    'Turn off the tap while brushing teeth or washing hands. This simple habit can save up to 6 liters of water per minute.',
    'Walk, bike, or use public transport for short distances instead of driving. Transportation accounts for a significant portion of carbon emissions.',
    'Use reusable shopping bags, water bottles, and coffee cups. Single-use plastics take hundreds of years to decompose.',
    'Switch to LED light bulbs and turn off lights when leaving a room. LEDs use up to 90% less energy than incandescent bulbs.',
    'Reduce meat and dairy consumption. Animal agriculture is responsible for 14.5% of global greenhouse gas emissions.',
    'Unplug electronics and chargers when not in use. Phantom energy can account for 10% of household electricity use.',
    'Take shorter showers and install low-flow showerheads. The average shower uses 75-100 liters of water.',
    'Buy products with minimal packaging and choose reusable containers over disposable ones when possible.',
    'Support local and seasonal food to reduce transportation emissions and support sustainable agriculture.',
    'Compost organic waste instead of sending it to landfills where it produces methane, a potent greenhouse gas.',
    'Wash clothes in cold water and air-dry when possible. Heating water accounts for 90% of the energy used by washing machines.'
]

if (habitsBtn) {
    habitsBtn.addEventListener('click', function () {
        const habitsList = ecoHabits.map(habit => `<p style="margin: 12px 0; line-height: 1.6;">${habit}</p>`).join('')

        const content = `
            <p style="margin-bottom: 20px; color: #555;">Small daily changes make a big difference for the environment. Try incorporating these practical habits into your routine:</p>
            ${habitsList}
        `
        createOverlay('Eco-friendly Habits', content)
    })
}
