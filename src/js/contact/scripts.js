import $ from "jquery";

$(() => {
  // Contact - Polyfill animation label pour IE
  // @see https://codepen.io/wesbos/pen/KggoOo && https://developer.mozilla.org/fr/docs/Web/API/NodeList/forEach
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }

  function placeholderPolyfill() {
    this.classList[this.value ? 'remove' : 'add']('placeholder-shown');
  }

  document.querySelectorAll('.Form-field').forEach(el => {
    el.addEventListener('change', placeholderPolyfill);
    el.addEventListener('keyup', placeholderPolyfill);
  });

  // Contact - champs requis vide
  let notice = $('.Form-notice');

  $('.Form-submit').on('click', function(e){
    e.preventDefault();

    let send = true;

    // Suppression des notices déjà existantes
    $('.Form-noticeItems > li').remove();

    // Vérification des champs requis
    $('.Form-field[required]').each(function(){
      // Si le champ est vide - Alimentation et affichage notice
      if($(this).val() === ''){
        $('.Form-noticeItems').append('<li class="Form-noticeItem List-item">Le champ '+$(this).attr('placeholder')+' est obligatoire !</li>');
        notice.addClass('active');
        send = false;
      }
      // Si le champ n'est pas vide
      else {
        let name = $(this).attr('name'),
          regex,
          format;

        // Type email
        if(name === 'email'){
          regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          format = 'Un e-mail valide est nécessaire.'
        }
        // Type numéro de téléphone
        else if(name === 'phone') {
          regex = /^[+]{1}[0-9]{2}[\s]{0,1}[(]{1}[0-9]{1}[)]{1}[\s]{0,1}[0-9]{2}[\s]{0,1}[0-9]{2}[\s]{0,1}[0-9]{2}[\s]{0,1}[0-9]{2}$/;
          format = 'Le numéro saisi doit correspondre au format +00 (0) 00 00 00 00.';
        }
        // Test de la correspondance
        // Ne correspond pas - Alimentation et affichage notice
        if(!regex.test($(this).val())){
          $('.Form-noticeItems').append('<li class="Form-noticeItem List-item">Le champ '+$(this).attr('placeholder')+' est incorrect ! '+format+'</li>');
          notice.addClass('active');
          send = false;
        }
      }
    });

    // Tout est ok - Envoi formulaire
    if(send){
      $('.Form-noticeItems').append('<li class="Form-noticeItem List-item">Le formulaire a correctement été envoyé !</li>');
      notice.addClass('active');

      $('.Form-noticeCross, .Form-noticeValidate').on('click', function(){
        $('.Form').submit();
      });
    }
  });

  // Fermeture des notices formulaires
  $('.Form-noticeCross, .Form-noticeValidate').on('click', function(e){
    e.preventDefault();
    notice.removeClass('active');
  });
});
