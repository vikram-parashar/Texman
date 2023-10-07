// navigation-toggle
$("#nav-bar .nav-toggle").click(() => {
  $("#nav-bar .pop-part").toggle();
});

// category drop-down (big screen)
$("#nav-bar .nav-links .category-dropdown").click(() => {
  $("#nav-bar .sub-links").toggle();
});

// category drop-down (small screen)
$("#nav-bar .pop-nav-links .category-dropdown").click(() => {
  $("#nav-bar .pop-sub-links").toggle();
});

// attack background gradient to mouse position
$("body").mousemove((e) => {
  $("body").css({
    // transition : 'background 0.5s ease',
    background: `radial-gradient(circle at ${e.pageX}px ${e.pageY}px, var(--bg-gradient), #0c0c0c, transparent 35vw),black`,
  });
});
