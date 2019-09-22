import $ from "jquery";

$(() => {
  // Détection de la position des éléments de la sidebar pour changer la couleur.
  window.onscroll = function() {
    var contactViewTop = $('.Contact').offset().top;

    $('.Sidebar-socialItem, .Sidebar-toggle').each(function() {
      let elemTop = $(this).offset().top,
        elemBottom = elemTop + $(this).height();
      if(elemBottom - 10 >= contactViewTop){
        $(this).addClass('dark');
      } else {
        $(this).removeClass('dark');
      }
    });
  };

  // Ouverture et fermeture Sidebar.
  let sidebar = $('.Sidebar-nav');

  $('.Sidebar-toggle, .Sidebar-navCross, .Sidebar-navItemLink').on('click', function(e){
    if(!$(this).hasClass('Sidebar-navItemLink')){
      e.preventDefault();
    } else {
      let section = $($(this).attr('href'));
      $('html, body').animate({scrollTop: section.offset().top}, 1000);
    }
    sidebar.toggleClass('active');
  });

  // Clic en dehors de la sidebar pour fermer le menu.
  $(document).click(function (e) {
    if (!$(e.target).closest('.Sidebar').length) {
      sidebar.removeClass('active');
    }
  });
});
