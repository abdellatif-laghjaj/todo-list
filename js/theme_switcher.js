const themes = document.querySelectorAll('.theme-item');
const html = document.querySelector('html');

window.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('theme');
    if (theme) {
        html.setAttribute('data-theme', theme);
    }
});


themes.forEach(theme => {
    theme.addEventListener('click', () => {
        const theme_name = theme.getAttribute('theme');
        console.log(theme_name);
        html.setAttribute('data-theme', theme_name);
        saveTheme(theme_name);
    });
});

//save theme to local storage
function saveTheme(theme_name) {
    localStorage.setItem('theme', theme_name);
}

//get theme from local storage
function getTheme() {
    return localStorage.getItem('theme');
}