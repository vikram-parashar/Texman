// navigation-toggle
$('#nav-bar .nav-toggle').click(()=>{
  $('#nav-bar .pop-part').toggle();
});

// category drop-down (big screen)
$('#nav-bar .nav-links .category-dropdown').click(()=>{
  $('#nav-bar .sub-links').toggle();
});

// category drop-down (small screen)
$('#nav-bar .pop-nav-links .category-dropdown').click(()=>{
  $('#nav-bar .pop-sub-links').toggle();
});

