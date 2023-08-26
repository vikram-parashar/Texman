// Get back to top function
function scrollFunction() {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        document.getElementById('back-to-top').style.display = 'block'
        document.getElementById('nav-bar').style.backgroundColor =
            'var(--background)'
    } else {
        document.getElementById('back-to-top').style.display = 'none'
        document.getElementById('nav-bar').style.background = 'none'
    }
}

window.onscroll = () => {
    scrollFunction()
}

/* eslint-disable */

// Navigation Toggle for mobile
function navToggle() {
    const navLink = document.getElementById('nav-link').style
    navLink.display === 'flex'
        ? (navLink.display = 'none')
        : (navLink.display = 'flex')

    const navToggleBtn = document
        .getElementById('nav-toggle')
        .getElementsByClassName('nf')[0]
    navToggleBtn.className === 'nf nf-md-window_close'
        ? (navToggleBtn.className = 'nf nf-md-menu')
        : (navToggleBtn.className = 'nf nf-md-window_close')

    const searchBar = document.getElementById('search-bar').style
    searchBar.display === 'block'
        ? (searchBar.display = 'none')
        : (searchBar.display = 'block')
}

function backToTop() {
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
}
/* eslint-enable */
