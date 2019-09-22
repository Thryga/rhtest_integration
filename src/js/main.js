import $ from 'jquery';
import './sidebar/scripts';
import './contact/scripts';

$(() => {
  // Ready.
  // Simulation du scroll à l'arriver
  $(window).on('load', function () {
    $(this).trigger('scroll');
  });
  $(window).trigger('scroll');

  // Toggle accueil vers à propos
  $('.Logo-toggle').on('click', function(){
    $('html, body').animate({
      scrollTop: $('.Logo').height()
    }, 1000);
  });
});
