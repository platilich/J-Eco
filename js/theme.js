const themeButton = document.querySelector('.appearance')

// подгружаем тему при открытии
const savedTheme = localStorage.getItem('theme')
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme')
    themeButton.querySelector('p').textContent = 'Light Mode'
}

themeButton.addEventListener('click', function () {
    document.body.classList.toggle('dark-theme')

    const darkThemeIsOn = document.body.classList.contains('dark-theme')

    themeButton.setAttribute('aria-pressed', String(darkThemeIsOn))
    themeButton.querySelector('p').textContent = darkThemeIsOn
        ? 'Light Mode'
        : 'Dark Mode'

    localStorage.setItem('theme', darkThemeIsOn ? 'dark' : 'light')
})