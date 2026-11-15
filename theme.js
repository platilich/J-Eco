const themeButton = document.querySelector('.turn_off_light')

// кнопка включает тёмную тему и возвращает обычную
themeButton.addEventListener('click', function () {
    document.body.classList.toggle('dark-theme')

    const darkThemeIsOn = document.body.classList.contains('dark-theme')
    themeButton.setAttribute('aria-pressed', String(darkThemeIsOn))
    themeButton.querySelector('span').textContent = darkThemeIsOn
        ? 'Light Mode'
        : 'Dark Mode'
})
