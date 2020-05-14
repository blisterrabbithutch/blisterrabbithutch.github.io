'use strict';

$(document).ready(function() {
  $('.business-card__language-button').on('click', function() {
    if ($(this).hasClass('business-card__language-button--active')) return;
    $('.business-card__language-button').removeClass('business-card__language-button--active');
    $(this).addClass('business-card__language-button--active');
    if ($(this).attr('data-language') === 'ru') {
      $('.business-card').addClass('business-card--ru');
      $('.business-card').removeClass('business-card--en');
      window.history.replaceState(null, null, "?lang=Ru");
    } else if ($(this).attr('data-language') === 'en') {
      $('.business-card').removeClass('business-card--ru');
      $('.business-card').addClass('business-card--en');
      window.history.replaceState(null, null, "?lang=En");
    }
  });

  const detectLangInUrl = () => {
    const url = document.location.href;
    const selectedLang = url.split('?lang=')[1];
    if (selectedLang === 'Ru') {
      $('.business-card').addClass('business-card--ru');
      $('.business-card').removeClass('business-card--en');
      $('.business-card__language-button').removeClass('business-card__language-button--active');
      $(`.business-card__language-button[data-language="ru"]`).addClass('business-card__language-button--active');
    } else if (selectedLang === "En") {
      $('.business-card').addClass('business-card--en');
      $('.business-card').removeClass('business-card--ru');
      $('.business-card__language-button').removeClass('business-card__language-button--active');
      $(`.business-card__language-button[data-language="en"]`).addClass('business-card__language-button--active');
    }
  };
  detectLangInUrl();
});