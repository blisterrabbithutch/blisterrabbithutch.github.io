'use strict';

$('.business-card__info-item--phone').on('click', function(evt) {
  let phoneButton = $(this);
  let phoneNumber = $(this).attr('data-number');
  if (phoneButton.attr('data-opened') == 'false') {
    evt.preventDefault();
    phoneButton.addClass('business-card__info-item--faded');
    setTimeout(function()
    {
      phoneButton.attr('data-opened', 'true');
      phoneButton.find('.business-card__info-item-title').text(phoneNumber);
      phoneButton.removeClass('business-card__info-item--faded');
    }, 500);
  }
});
