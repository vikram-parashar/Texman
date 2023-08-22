function navToggle() {
    const navLink = document.getElementById('nav-link').style
    navLink.display === 'flex'
        ? (navLink.display = 'none')
        : (navLink.display = 'flex')
}
