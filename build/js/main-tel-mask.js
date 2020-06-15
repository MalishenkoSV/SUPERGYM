'use strict';

var telInputs = document.querySelectorAll('input[type="tel"]');

if (telInputs) {
  telInputs.forEach(function (input) {
    Inputmask('+7 (999) 999-99-99').mask(input);
  });
}
