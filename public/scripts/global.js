// Get back to top function
window.onscroll = function () {
    scrollFunction()
}

function scrollFunction() {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        document.getElementById('back-to-top').style.display = 'block'
    } else {
        document.getElementById('back-to-top').style.display = 'none'
    }
}

function backToTop() {
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
}

// Navigation Toggle for mobile
function navToggle() {
    const navLink = document.getElementById('nav-link').style
    navLink.display === 'flex'
        ? (navLink.display = 'none')
        : (navLink.display = 'flex')

    const navToggle = document
        .getElementById('nav-toggle')
        .getElementsByClassName('nf')[0]
    navToggle.className == 'nf nf-md-window_close'
        ? (navToggle.className = 'nf nf-md-menu')
        : (navToggle.className = 'nf nf-md-window_close')

    const searchBar = document.getElementById('search-bar').style
    searchBar.display === 'block'
        ? (searchBar.display = 'none')
        : (searchBar.display = 'block')
}
